<template>
  <div class="text-edit child-component-container media-padding">
    <div class="edit-content">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题" required>
          <el-col :md=24>
            <el-input v-model="form.title" placeholder="填写标题" class="input-btn"></el-input>
            <el-button type="warning" @click="back">返回</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="上传附件">
          <el-col :md=24>
            <up-file @fileUrl="getFileUrl"></up-file>
          </el-col>
        </el-form-item>
        <el-form-item label="正文" required>
          <el-col :md=24>
            <div ref="editor" class="editor"></div>
          </el-col>
        </el-form-item>
        <el-form-item label="分类" required v-if="mark==='add'">
          <el-col :md=24>
            <el-select v-model="form.type" placeholder="请选择产品类型">
              <el-option :value="21" label="产品资料"></el-option>
              <el-option :value="22" label="产品Q&A"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="sub" type="primary">发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import UpFile from 'base/upLoad/upFile'
import {uploadUrl} from 'api/http'
import { mapMutations } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      editor: null,
      form: {
        id: undefined,
        vtext: '',
        title: '',
        type: undefined,
        img: ''
      },
      receiveData: {},
      mark: ''
    }
  },
  created () {
    this.receiveData = this.$route.query.data || this.data
    this.mark = this.receiveData._mark
    // if (this.receiveData._status !== 'add' && !this.receiveData.id) {
    //   this.$router.go(-1)
    //   return
    // }
    this.form = Object.assign({}, this.form, this.receiveData)
    console.log(this.form)
  },
  methods: {
    getFileUrl(file) {
      console.log(file)
      this.form.img = file.response.url
    },
    back () {
      if (this.receiveData._status === 'manage_edit' || this.receiveData._status === 'manage_add') {
        this.$router.go(-1)
      } else if (this.receiveData._status === 'edit') {
        this.setProductListData({_status: 'list'})
        this.setProcessListData({_status: 'list'})
      }
    },
    sub () {
      let params = {
        'id': this.form.id,
        'title': this.form.title,
        'vtext': this.form.vtext,
        'type': this.form.type,
        'cat': this.form.cat,
        'img': this.form.img
      }
      let url = params.id ? '/res.do?set' : '/res.do?add'
      if (!params.title || !params.vtext) {
        this.$message.error('请填写或选择带*项！')
        return
      }
      if (this.mark === 'add' && !params.type) {
        this.$message.error('请选择分类！')
        return
      }
      this.$post(url, params).then(res => {
        if (res.data.success) {
          this.$message.success('发布成功！')
          if (this.receiveData._status === 'manage_add' && this.receiveData.type === 10) {
            this.$router.push({
              path: '/indexPage/productManage',
              query: {data: 'fromDetail'}
            })
          } else if (this.receiveData._status === 'manage_add' && this.receiveData.type === 30) {
            this.$router.push({
              path: '/indexPage/processManage',
              query: {data: 'fromDetail'}
            })
          } else if (this.receiveData._status === 'manage_edit') {
            this.$router.go(-1)
          } else if (this.receiveData._status === 'edit') {
            this.setProductListData({_status: 'list', _mark: 'sub', type: this.form.type, cat: this.form.cat})
            this.setProcessListData({_status: 'list', _mark: 'sub', type: this.form.type, cat: this.form.cat})
          }
        }
      })
    },
    ...mapMutations({
      setProductListData: 'GET_PRODUCTLIST_DATA',
      setProcessListData: 'GET_PROCESSLIST_DATA'
    })
  },
  mounted () {
    this.editor = new E(this.$refs.editor)
    this.editor.customConfig.debug = true
    this.editor.customConfig.onchange = html => {
      this.form.vtext = html
    }
    this.editor.customConfig.uploadImgServer = uploadUrl
    this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024
    this.editor.customConfig.uploadImgHooks = {
      customInsert: function (insertImg, result, editor) {
        console.log(result)
        var url = result.url
        insertImg(url)
      }
    }
    this.editor.create()
    this.editor.txt.html(this.form.vtext)
  },
  components: {
    UpFile
  }
}
</script>

<style lang="less">
  .text-edit .editor{
      >div:nth-child(2){
        height: 500px !important;
      }
    }
</style>
<style lang="less" scoped>
.text-edit {
  .edit-content {
    .maxwidth{
      width: 1000px;
    }
  }
}
</style>

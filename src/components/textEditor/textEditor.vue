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
        <el-form-item label="分类" required v-if="mark==='addClassify'">
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
export default {
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
    this.receiveData = this.$route.query.data
    this.mark = this.receiveData._mark
    if (this.receiveData._status !== 'add' && !this.receiveData.id) {
      console.log('back')
      this.$router.go(-1)
      return
    }
    this.form = Object.assign({}, this.form, this.receiveData)
  },
  methods: {
    getFileUrl(file) {
      console.log(file)
      this.form.img = file.response.url
    },
    back () {
      this.$router.go(-1)
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
      if (this.mark === 'addClassify' && !params.type) {
        this.$message.error('请填写或选择带*项！')
        return
      }
      this.$post(url, params).then(res => {
        if (res.data.success) {
          this.$message.success('发布成功！')
          if (this.form.type === 10) {
            this.$router.push({
              path: '/indexPage/productManage',
              query: {data: 'fromDetail'}
            })
          } else if (this.form.type === 30) {
            this.$router.push({
              path: '/indexPage/processManage',
              query: {data: 'fromDetail'}
            })
          } else if (this.form.type === 40) {
            let queryParams = {
              cat: this.form.cat
            }
            this.$router.push({
              path: '/indexPage/processClassify',
              query: {data: 'fromDetail', queryParams: queryParams}
            })
          } else {
            let queryParams = {
              cat: this.form.cat,
              type: this.form.type
            }
            this.$router.push({
              path: '/indexPage/addClassify',
              query: {data: 'fromDetail', queryParams: queryParams}
            })
          }
        }
      })
    }
  },
  mounted () {
    this.editor = new E(this.$refs.editor)
    this.editor.customConfig.onchange = html => {
      this.form.vtext = html
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

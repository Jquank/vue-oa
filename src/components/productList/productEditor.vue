<template>
  <div class="edit-news child-component-container media-padding">
    <div class="edit-content">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题" required>
          <el-col :md=24 class="maxwidth">
            <el-input v-model="form.title" placeholder="填写标题" class="input-btn"></el-input>
            <el-button type="primary" @click="back">返回</el-button>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="类型" required>
          <el-col :md=24 class="maxwidth">
            <el-select v-model="form.type">
              <el-option label="产品全景" :value="0"></el-option>
              <el-option label="产品资源位" :value="10"></el-option>
            </el-select>
          </el-col>
        </el-form-item> -->
        <el-form-item label="正文" required>
          <el-col :md=24 class="maxwidth">
            <div ref="editor" class="editor"></div>
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
export default {
  data () {
    return {
      editor: null,
      selUserDialog: false,
      form: {
        id: undefined,
        vtext: '',
        title: '',
        type: 10
      },
      echoData: {},
      echoType: 10
    }
  },
  created () {
    console.log(this.$route.query.data)
    let data = this.$route.query.data
    if (data && !data.id) {
      this.$router.go(-1)
      return
    }
    this.echoData = data
    this.echoType = this.$route.query.type
    console.log(this.echoData)
    console.log(this.echoType)
    this.form = Object.assign({}, this.form, this.echoData)
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    sub () {
      let params = {
        'id': this.echoData.id ? undefined : this.form.id,
        'title': this.form.title,
        'vtext': this.form.vtext,
        'type': this.echoType || 10,
        'cat': this.echoData.id
      }
      let url = params.id ? '/res.do?set' : '/res.do?add'
      if (!params.title || !params.vtext) {
        this.$message.error('请填写或选择带*项！')
        return
      }
      this.$post(url, params).then(res => {
        if (res.data.success) {
          this.$message.success('发布成功！')
          if (this.echoType === 20) {
            this.$router.push({
              path: '/indexPage/addClassify'
            })
          } else {
            this.$router.push({
              path: '/indexPage/productManage',
              query: {data: 'fromDetail'}
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
  }
}
</script>

<style lang="less">
.edit-news {
  .edit-content {
    .maxwidth{
      width: 900px;
    }
  }
}
</style>

<template>
  <div class="text-edit child-component-container media-padding">
    <div class="edit-content">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题" required>
          <el-col :md=24 class="maxwidth">
            <el-input v-model="form.title" placeholder="填写标题" class="input-btn"></el-input>
            <el-button type="primary" @click="back">返回</el-button>
          </el-col>
        </el-form-item>
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
      form: {
        id: undefined,
        vtext: '',
        title: '',
        type: undefined
      },
      receiveData: {}
    }
  },
  created () {
    this.receiveData = this.$route.query.data
    if (this.receiveData._status !== 'add' && !this.receiveData.id) {
      console.log('back')
      this.$router.go(-1)
      return
    }
    this.form = Object.assign({}, this.form, this.receiveData)
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    sub () {
      let params = {
        'id': this.form.id,
        'title': this.form.title,
        'vtext': this.form.vtext,
        'type': this.form.type,
        'cat': this.form.cat
      }
      let url = params.id ? '/res.do?set' : '/res.do?add'
      if (!params.title || !params.vtext) {
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
          } else if (this.form.type === 20) {
            let queryParams = {
              cat: this.form.cat
            }
            this.$router.push({
              path: '/indexPage/addClassify',
              query: {data: 'fromDetail', queryParams: queryParams}
            })
          } else {
            this.$router.push({
              path: '/indexPage/processManage',
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
.text-edit {
  .edit-content {
    .maxwidth{
      width: 900px;
    }
  }
}
</style>

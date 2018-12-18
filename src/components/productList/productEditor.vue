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
        <el-form-item label="类型" required>
          <el-col :md=24 class="maxwidth">
            <el-select v-model="form.type">
              <el-option label="百度商业产品资源全景图" :value="0"></el-option>
              <el-option label="百度pc资源位" :value="10"></el-option>
              <el-option label="百度移动端资源位" :value="20"></el-option>
              <el-option label="百度聚屏资源位" :value="30"></el-option>
              <el-option label="文章" :value="40"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="正文" required>
          <el-col :md=24 class="maxwidth">
            <div ref="editor" class="text-left"></div>
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
  name: 'editor',
  data () {
    return {
      editor: null,
      selUserDialog: false,
      form: {
        id: undefined,
        content: '',
        title: '',
        type: 0,
        newsstatus: 0
      },
      echoData: {}
    }
  },
  created () {
    this.echoData = this.$route.query.data
    if (!this.echoData) {
      return
    }
    this.form = Object.assign({}, this.form, this.echoData)
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    sub () {
      let params = {
        'id': this.form.id,
        'title': this.form.title,
        'content': this.form.content,
        'newsstatus': this.form.newsstatus,
        'type': this.form.type
      }
      if (!params.title || !params.content || !params.userid) {
        this.$message.error('请填写或选择带*项！')
        return
      }
      this.$post('/User.do?AddOrUpdateInfo', params).then(res => {
        if (res.data.success) {
          this.$router.push({
            path: '/indexPage/news',
            query: {data: 'fromDetail'}
          })
        }
      })
    }
  },
  mounted () {
    this.editor = new E(this.$refs.editor)
    this.editor.customConfig.onchange = html => {
      this.form.content = html
    }
    this.editor.create()
    this.editor.txt.html(this.form.content)
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

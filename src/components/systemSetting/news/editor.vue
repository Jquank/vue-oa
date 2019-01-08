<template>
  <div class="edit-news child-component-container media-padding">
    <div class="edit-content">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题" required>
          <el-col :md="24">
            <el-input v-model="form.title" placeholder="填写标题" class="input-btn"></el-input>
            <el-button type="warning" @click="back">返回</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="类型" required>
          <el-col :md="24">
            <el-select v-model="form.type">
              <el-option label="消息通知" :value="0"></el-option>
              <el-option label="重要公告" :value="10"></el-option>
              <el-option label="百捷大家庭" :value="20"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="正文" required>
          <el-col :md="24">
            <div ref="editor" class="editor"></div>
          </el-col>
        </el-form-item>
        <el-form-item label="权限" required>
          <el-button @click.native="sel" type="warning">选择</el-button>
        </el-form-item>
        <el-form-item label="状态" required>
          <el-radio v-model="form.newsstatus" :label="0">发布</el-radio>
          <el-radio v-model="form.newsstatus" :label="10">草稿</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="sub" type="primary">发布</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :append-to-body="true" :visible.sync="selUserDialog" width="400px">
      <select-dept :key="dept_key" @subParams="getDept"></select-dept>
    </el-dialog>
  </div>
</template>

<script>
import E from 'wangeditor'
import SelectDept from 'base/selectDept/selectDept'
import {uploadUrl} from 'api/http'
export default {
  name: 'editor',
  data() {
    return {
      dept_key: '',
      editor: null,
      selUserDialog: false,
      form: {
        id: undefined,
        content: '',
        title: '',
        type: 0,
        newsstatus: 0
      },
      dept: '',
      echoData: {}
    }
  },
  created() {
    this.echoData = this.$route.query.data
    if (!this.echoData) {
      return
    }
    this.form = Object.assign({}, this.form, this.echoData)
  },
  methods: {
    sel() {
      this.selUserDialog = true
      this.dept_key = new Date() + ''
    },
    back() {
      this.$router.go(-1)
    },
    getDept(res) {
      this.dept = res
      this.selUserDialog = false
    },
    sub() {
      let params = {
        id: this.form.id,
        title: this.form.title,
        content: this.form.content,
        newsstatus: this.form.newsstatus,
        type: this.form.type,
        userid: this.dept
      }
      if (!params.title || !params.content || !params.userid) {
        this.$message.error('请填写或选择带*项！')
        return
      }
      this.$post('/User.do?AddOrUpdateInfo', params).then(res => {
        if (res.data.success) {
          this.$router.push({
            path: '/indexPage/news',
            query: { data: 'fromDetail' }
          })
        }
      })
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editor)
    this.editor.customConfig.onchange = html => {
      this.form.content = html
    }
    this.editor.customConfig.uploadImgServer = uploadUrl
    this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024
    this.editor.customConfig.uploadImgHooks = {
      customInsert: function (insertImg, result, editor) {
        var url = result.url
        insertImg(url)
      }
    }
    this.editor.create()
    this.editor.txt.html(this.form.content)
  },
  components: {
    SelectDept
  }
}
</script>
<style lang="less">
.edit-news .editor {
  > div:nth-child(2) {
    height: 500px !important;
  }
}
</style>
<style lang="less" scoped>
.edit-news {
  .edit-content {
    .maxwidth {
      width: 900px;
    }
  }
}
</style>

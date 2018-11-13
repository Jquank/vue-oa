<template>
  <div class="edit-news child-component-container media-padding">
    <div class="edit-content">
      <el-form :model="form" label-width="80px" class="max-width">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="填写标题" class="input-btn"></el-input>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type">
            <el-option label="消息通知" :value="form.info"></el-option>
            <el-option label="重要公告" :value="form.public"></el-option>
            <el-option label="百捷大家庭" :value="form.baijieFamily"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="正文">
          <div>
            <div ref="editor" class="text-left"></div>
          </div>
        </el-form-item>
        <el-form-item label="权限">
          <el-button @click.native="sel" type="warning">选择</el-button>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="form.radio" label="1">发布</el-radio>
          <el-radio v-model="form.radio" label="2">草稿</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发布</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :append-to-body="true" :visible.sync="selUserDialog">
      <select-user ref="seluser" :showSaveBtn="false" :showSearch="false"
      title="选择部门"></select-user>
    </el-dialog>
  </div>
</template>

<script>
import E from 'wangeditor'
import selectUser from 'base/selectUser/selectUser'
export default {
  name: 'editor',
  data () {
    return {
      selUserDialog: false,
      editorContent: '',
      form: {
        title: '',
        type: '0',
        info: '0',
        public: '10',
        baijieFamily: '20',
        radio: '1'
      }
    }
  },
  methods: {
    sel () {
      this.selUserDialog = true
    },
    back () {
      this.$router.go(-1)
    }
  },
  mounted () {
    let editor = new E(this.$refs.editor)
    editor.customConfig.onchange = html => {
      this.editorContent = html
    }
    editor.create()
  },
  components: {
    selectUser
  }
}
</script>

<style lang="less">
.edit-news {
  .edit-content {
    .max-width{
      width: 980px;
    }
  }
}
</style>

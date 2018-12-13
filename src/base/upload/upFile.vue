<template>
  <div>
    <el-upload
      class="upload-file"
      id="upload-file"
      :action="uploadUrl"
      :on-success="upSuccess"
      :before-remove="beforeRemove"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      :list-type="listType"
      :file-list="fileList"
      :data="otherParams"
      :show-file-list="showFileList"
    >
      <el-button size="small" :type="type" :class="upIcon"> {{title}}</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
  </div>
</template>

<script>
import { uploadUrl } from 'api/http'
import Viewer from 'viewerjs'
export default {
  props: {
    uploadUrl: {
      type: String,
      default: uploadUrl
    },
    listType: {
      type: String,
      default: 'text'
    },
    title: {
      type: String,
      default: '点击上传'
    },
    upIcon: {
      type: String,
      default: ''
    },
    otherParams: {
      type: Object,
      default: function () {
        return {}
      }
    },
    isHiddenFileList: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {
      fileList: [],
      showFileList: true,
      viewer: null
    }
  },
  methods: {
    upSuccess (response, file, fileList) {
      this.$emit('fileUrl', file)
      if (this.isHiddenFileList) {
        setTimeout(() => {
          this.showFileList = false
        }, 2000)
        if (response.success) {
          this.$message.success(response.msg || '导入成功！')
        } else {
          this.$message.error(response.msg || '导入失败！')
        }
      }
      if (this.listType === 'picture') {
        setTimeout(() => {
          this._initViewer()
        }, 500)
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning('限上传一个文件，请移除后重新上传')
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    _initViewer () {
      if (this.viewer) {
        this.viewer.destroy()
      }
      this.viewer = new Viewer(document.getElementById('upload-file'), {
        zIndex: 100000
      })
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  .upload-file{
    max-width: 300px;
  }
</style>

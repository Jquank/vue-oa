<template>
  <div>
    <el-upload
      class="upload-file"
      :action="uploadUrl"
      :on-success="upSuccess"
      :before-remove="beforeRemove"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      list-type="picture"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
  </div>
</template>

<script>
import { uploadUrl } from 'api/http'
export default {
  data () {
    return {
      uploadUrl: uploadUrl,
      fileList: []
    }
  },
  methods: {
    upSuccess (file, fileList) {
      this.$emit('fileUrl', file)
    },
    handleExceed (files, fileList) {
      this.$message.warning('限上传一个文件，请移除后重新上传')
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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

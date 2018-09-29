<template>
  <div class="import-cus component-container media-padding">
    <div class="import-search">
      <div>
        <el-input v-model="cusName" class="import-item item-width" placeholder="搜索客户名称">
          <template slot="prepend">客户名称:</template>
        </el-input>
        <el-button @click.native="search" type="primary" class="import-item">查 询</el-button>
        <el-button @click.native="reset" type="warning" class="import-item">重 置</el-button>
      </div>
      <div class="import-item">

        <el-upload
          :action="actionUrl"
          :before-upload="beforeUpload"
          :data="uploadData"
          :file-list="fileList"
          :headers="uploadHeaders"
          :on-success="uploadSuccess"
        >
          <el-button type="primary" icon="el-icon-upload">导 入</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
      </div>
    </div>

    <el-table stripe border :data="myFollowList" style="width: 100%;margin-top:10px;">
      <el-table-column prop="name" label="客户名称" min-width="150">
      </el-table-column>
      <el-table-column prop="contactname" label="联系人">
      </el-table-column>
      <el-table-column prop="contact" label="手机">
      </el-table-column>
      <el-table-column prop="full_name" label="行业">
      </el-table-column>
      <el-table-column prop="address" label="地址" min-width="200px">
      </el-table-column>
      <el-table-column prop="uploadusername" label="导入人">
      </el-table-column>
    </el-table>
    <page class="page" :url="myFollowUrl" :sendParams="sendParams" @updateList="updateMyFollowList"></page>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import Page from 'base/page/page'
import { serverUrl } from 'api/http'
const userId = cookie.get('userId')
const tk = cookie.get('token')
export default {
  data () {
    return {
      cusName: '',
      myFollowList: [],
      myFollowUrl: '/Company.do?finduploadcompanyinfo',
      sendParams: {},

      uploadData: {},
      uploadHeaders: {},
      actionUrl: serverUrl + '/Company.do?importcompanyinfo' + '&tk=' + tk,
      fileList: []
    }
  },
  methods: {
    uploadSuccess (response, file, fileList) {
      console.log(response)
    },
    beforeUpload (file) {
      console.log(file)
      this.uploadData = {
        uid: userId
      }
      this.uploadHeaders = {
        'Content-Type': file.type
      }
    },
    search () {
      this.sendParams = {
        'companyname': this.cusName
      }
    },
    reset () {
      this.cusName = ''
    },
    updateMyFollowList (res) {
      this.myFollowList = res.data[0].data
    }
  },
  components: {Page}
}
</script>

<style lang="less" scoped>
.import-cus {
  .import-search {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width:90%;
    margin-top: -10px;
    .import-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
  }
}
</style>

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
        <up-file :title="'导入'" :upIcon="'fa fa-cloud-download'" :uploadUrl="'/Company.do?importcompanyinfo'" :otherParams="{uid: userId}" :isHiddenFileList="true"></up-file>
      </div>
    </div>

    <el-table stripe border :data="myFollowList" style="width: 100%;margin-top:10px;">
      <el-table-column prop="name" label="客户名称" min-width="150">
      </el-table-column>
      <el-table-column prop="contactname" label="联系人">
      </el-table-column>
      <el-table-column prop="contact" label="手机" min-width="150">
      </el-table-column>
      <el-table-column prop="full_name" label="行业">
      </el-table-column>
      <el-table-column prop="address" label="地址" min-width="150">
      </el-table-column>
      <el-table-column prop="uploadusername" label="导入人" width="100">
      </el-table-column>
    </el-table>
    <page class="page" :url="myFollowUrl" :sendParams="sendParams" @updateList="updateMyFollowList"></page>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import Page from 'base/page/page'
import UpFile from 'base/upLoad/upFile'
import { serverUrl } from 'api/http'
const userId = cookie.get('userId')
export default {
  data () {
    return {
      serverUrl: serverUrl,
      tk: cookie.get('token'),
      userId: userId,
      cusName: '',
      myFollowList: [],
      myFollowUrl: '/Company.do?finduploadcompanyinfo',
      sendParams: {}
    }
  },
  methods: {
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
  components: {Page, UpFile}
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

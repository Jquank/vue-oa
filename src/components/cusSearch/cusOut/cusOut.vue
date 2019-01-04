<template>
  <div class="cus-search component-container media-padding">
    <div class="multi-import">
      <up-file :title="'批量导入'" :upIcon="'fa fa-cloud-download'" :isHiddenFileList="true" :uploadUrl="'/Renew.do?rollOutExcle'" style="display: inline-block"></up-file>
      <span class="red">(ps:excell表头为“百度用户名”、“转入客服编号”、“SF系统”)</span>
    </div>
    <div class="search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="search-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <el-input placeholder="搜索百度账号" v-model="bdAccount" class="search-item item-width">
        <template slot="prepend">百度账号:</template>
      </el-input>
      <div class="search-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
    </div>

    <el-table stripe border :data="list" style="width: 100%;margin-top:10px;">
      <el-table-column prop="cName" label="公司名称" width="220">
      </el-table-column>
      <el-table-column prop="baidu_account" label="百度账号">
      </el-table-column>
      <el-table-column prop="baidu_id" label="用户ID">
      </el-table-column>
      <el-table-column prop="proxy_id" label="SF系统">
      </el-table-column>
      <el-table-column prop="uName" label="所属客服">
      </el-table-column>
      <el-table-column prop="" label="操作" width="60px">
        <template slot-scope="scope">
          <el-button @click.native="cusOut(scope.row)" type="success" class="xsbtn">转出</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" @updateList="getList"></page>

    <!-- 转出弹窗 -->
    <el-dialog title="选择客服" :visible.sync="selCusServiceDialog" width="450px">
      <el-input v-model="accountSF" placeholder="请填写SF账号(必填)">
        <span slot="prepend">SF账号</span>
      </el-input>
      <el-input @click.native="searchService($event)" v-model="serviceName" style="margin-top:10px;" placeholder="搜索客服">
        <span slot="append" class="search-service">搜索客服</span>
      </el-input>
      <el-table id="cus-out-table" :data="outList" @current-change="handleCurrentChange" highlight-current-row style="width:100%;margin-top:10px;">
        <el-table-column type="index" width="100">
        </el-table-column>
        <el-table-column prop="NAME" label="转出客服">
        </el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="outUrl" :sendParams="outParams" @updateList="getOutList"></page>
      <div style="text-align:right;margin-top:10px;">
        <el-button @click.native="confirmOut" type="success">确认转出</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import Page from 'base/page/page'
import UpFile from 'base/upLoad/upFile'
import cookie from 'js-cookie'
import { serverUrl } from 'api/http'
export default {
  data () {
    return {
      serverUrl: serverUrl,
      tk: cookie.get('token'),
      cusName: '',
      bdAccount: '',

      list: [],
      url: '/Renew.do?getRenewCompanyList',
      sendParams: {},

      outList: [],
      outUrl: '/Renew.do?rollOutKefuList',
      outParams: {
        serviceid: ''
      },

      rowData: {},
      selCusServiceDialog: false,
      accountSF: '',
      serviceName: '',
      selectedId: ''
    }
  },
  methods: {
    searchService (e) {
      if (e.target.nodeName !== 'INPUT') {
        this.outParams = {
          'serviceid': this.rowData.uid,
          'userName': this.serviceName
        }
      }
    },
    handleCurrentChange (val) {
      if (val) { // 此事件偶尔有bug
        this.selectedId = val.id
      }
    },
    confirmOut () {
      if (!this.accountSF || !this.selectedId) {
        this.$message({
          type: 'warning',
          message: '请填写SF账号或选择转出客服'
        })
        return
      }
      let params = {
        companyid: this.rowData.cid,
        companylogid: this.rowData.logid,
        cpid: this.rowData.cpid,
        induuid: this.selectedId,
        serviceid: this.rowData.uid
      }
      this.$post('/Renew.do?rollOut', params).then(res => {
        if (res.data.success) {
          this.selCusServiceDialog = false
          this.$message({
            type: 'success',
            message: '转出成功'
          })
          this.search()
        }
      })
    },
    search () {
      this.sendParams = {
        'companyName': this.cusName,
        'baiduAccount': this.bdAccount
      }
    },
    reset () {
      this.cusName = ''
      this.bdAccount = ''
    },
    cusOut (data) {
      this.accountSF = ''
      this.serviceName = ''
      this.selectedId = ''
      this.rowData = data
      this.selCusServiceDialog = true
      this.outParams = {
        serviceid: data.uid
      }
    },
    getList (res) {
      this.list = res.data[0].data
    },
    getOutList (res) {
      this.outList = res.data[0].data
    }
  },
  components: {
    AutoSelect,
    SelectDepartment,
    Page,
    UpFile
  }
}
</script>

<style>
#cus-out-table tr.current-row>td{
  background-color:rgb(154, 137, 231)
}
</style>

<style lang="less" scoped>
.marginleft10px{
  margin-left: 10px;
}
.cus-search {
  .multi-import{
    .marginleft10px
  }
  .search {
    display: flex;
    flex-wrap: wrap;
    .search-item {
     .marginleft10px;
      margin-top: 10px;
    }
    .item-width {
      width: 280px;
    }
  }
  .out-btn{
    .marginleft10px;
    margin-top: 10px;
  }

  .search-service{
    display: inline-block;
    width:100%;
    height:100%;
    cursor: pointer;
  }
}
</style>

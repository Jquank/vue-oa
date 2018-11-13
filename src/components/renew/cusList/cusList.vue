<template>
  <div class="cus-list component-container media-padding">
    <div class="allot-search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="list-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <el-input placeholder="搜索百度账号" v-model="bdAccount" class="list-item item-width">
        <template slot="prepend">百度账号:</template>
      </el-input>
      <el-button class="list-item" @click.native="search" type="primary">查 询</el-button>
      <el-button class="list-item" @click.native="reset" type="warning">重 置</el-button>
      <div class="import-btn text-right">
        <el-button class="mt10px" type="primary" icon="el-icon-upload">导入</el-button>
      </div>
    </div>

    <el-table stripe border :data="list" class="table-width">
      <el-table-column prop="name" label="公司名称" min-width="120">
      </el-table-column>
      <el-table-column prop="baiducount" label="百度账号">
      </el-table-column>
      <el-table-column prop="baiduid" label="用户ID">
      </el-table-column>
      <el-table-column prop="proxyid" label="SF账号">
      </el-table-column>
      <el-table-column prop="kefuname" label="所属客服">
      </el-table-column>
      <el-table-column prop="" label="状态" width="100">
        <span slot-scope="scope">{{scope.row.type === null?'未转出':
          scope.row.type === 0?'申请转出中':
          scope.row.type == 10?'已转出':'转出被驳回'}}</span>
      </el-table-column>
      <el-table-column prop="" label="操作" width="90">
        <!-- <template slot-scope="scope"  v-if="scope.row.type!=10&&scope.row.type!=0&&permissions.indexOf('71')>-1"> -->
        <template slot-scope="scope">
          <el-button @click.native="cusOut(scope.row)" type="primary" class="xsbtn">客户转出</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" @updateList="getList"></page>

    <!-- 转出弹窗 -->
    <!-- <el-dialog title="选择客服" :visible.sync="selCusServiceDialog" width="450px">
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
    </el-dialog> -->
  </div>
</template>

<script>
import cookie from 'js-cookie'
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import SelectUser from 'base/selectUser/selectUser'
export default {
  data () {
    return {
      userId: cookie.get('userId'),
      permissions: cookie.getJSON('permissions'),
      cusName: '',
      bdAccount: '',
      list: [],
      url: '/Renew.do?myCustomer',
      sendParams: {}
      // editContractDialog: false, // 转出弹窗
      // detailInfo: {},
      // checkLogs: []
    }
  },
  created () {
    this._getContractTypeList()
  },
  methods: {
    search () {
      this.sendParams = {
        'companyname': this.cusName,
        'baidu_account': this.bdAaccount
      }
    },
    reset () {
      this.cusName = ''
      this.contrbdAaccountatType = ''
    },
    // todo
    cusOut () {},
    getList (res) {
      this.list = res.data[0].data
    }
  },
  components: {
    Page,
    AutoSelect,
    SelectDepartment,
    SelectUser
  }
}
</script>

<style lang="less" scoped>
.cus-list {
  .allot-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .list-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .import-btn{
      flex-grow: 1;
    }
    .item-width {
      width: 280px;
    }
  }
  .btn-input {
    width: calc(~'(100% - 60px)');
  }
}
</style>

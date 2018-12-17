<template>
  <div class="renew-check component-container media-padding">
     <el-radio-group v-model="stateRadio" @change="search" class="ml10px">
      <el-radio-button label="10">1000-3000</el-radio-button>
      <el-radio-button label="20">3000-2万</el-radio-button>
      <el-radio-button label="30">2万-5万</el-radio-button>
      <el-radio-button label="40">5万-10万</el-radio-button>
      <el-radio-button label="50">10万以上</el-radio-button>
      <el-radio-button label="60">全部</el-radio-button>
    </el-radio-group>
    <div class="follow-search">
      <el-input v-model="comName" class="follow-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">公司名称:</template>
      </el-input>
      <div class="follow-item">
        <el-button type="primary" @click.native="search">查 询</el-button>
        <el-button type="warning" @click.native="reset">重 置</el-button>
      </div>
    </div>
    <el-table stripe border :data="myFollowList" style="width: 100%;margin-top:10px;">
      <el-table-column prop="companyname" label="公司名称" min-width="160">
      </el-table-column>
      <el-table-column prop="baidu_account" label="百度账号">
      </el-table-column>
      <el-table-column prop="receiptmoney" label="到账金额">
        <span slot-scope="scope">{{scope.row.receiptmoney | currency}}</span>
      </el-table-column>
      <el-table-column prop="receiptmoney" label="提单金额">
        <span slot-scope="scope">{{scope.row.usemoney+scope.row.servicemoney+scope.row.usevoucher | currency}}</span>
      </el-table-column>
      <el-table-column prop="receiptmoney" label="提单时间" width="150">
        <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="username" label="提单人">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span><span>{{scope.true_name?('('+scope.true_name+')'):''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="addtype" label="续费类型">
        <span slot-scope="scope">{{scope.row.addtype+'' | renewState('addType')}}</span>
      </el-table-column>
      <el-table-column prop="code_desc" label="审核状态" width="120">
        <template slot-scope="scope">
          <el-button type="warning" plain class="xsbtn">{{scope.row.code_desc}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="75" align="center">
        <template slot-scope="scope">
          <el-button @click.native="view(scope.row)" type="success" class="xsbtn">查 看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="myFollowUrl" :sendParams="sendParams" @updateList="updateMyFollowList"></page>

    <!-- 查看弹窗 -->
    <el-dialog :key="key_renew_detail" :modal-append-to-body="false" title="续费详情" :visible.sync="renewDetailDialog" width="1100px">
      <renew-detail  :rowData="rowData" :toMark="'renewCheck'" @closeRenewDetailDialog="closeRenewDetailDialog"></renew-detail>
    </el-dialog>
  </div>
</template>

<script>
import Page from 'base/page/page'
import RenewDetail from 'components/renew/renewList/renewDetail'
export default {
  data () {
    return {
      stateRadio: '10',
      comName: '',

      myFollowList: [],
      myFollowUrl: '/Renew.do?renewlistkf',
      sendParams: {
        'check': 100
      },
      radioMap: {
        '10': '1000#3000',
        '20': '3000#20000',
        '30': '20000#50000',
        '40': '50000#100000',
        '50': '100000#null',
        '60': '-1#null'
      },

      rowData: {},
      renewDetailDialog: false,
      key_renew_detail: ''
    }
  },
  methods: {
    view (data) {
      this.key_renew_detail = new Date() + ''
      this.rowData = data
      setTimeout(() => {
        this.renewDetailDialog = true
      }, 300)
    },
    closeRenewDetailDialog () {
      this.renewDetailDialog = false
      this.search()
    },
    search () {
      this.sendParams = {
        'companyname': this.comName,
        'check': 100,
        'beginmoney': this.radioMap[this.stateRadio].split('#')[0],
        'endmoney': this.radioMap[this.stateRadio].split('#')[1]
      }
    },
    reset () {
      this.comName = ''
    },
    updateMyFollowList (res) {
      this.myFollowList = res.data[0].data
    }
  },
  components: {
    Page, RenewDetail
  }
}
</script>

<style lang="less" scoped>
.renew-check {
  .follow-search {
    display: flex;
    flex-wrap: wrap;
    .follow-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
  }
}
</style>

<template>
  <div class="receive-receive component-container media-padding">
     <el-radio-group v-model="stateRadio" @change="search" class="ml10px">
      <el-radio-button label="100">待处理</el-radio-button>
      <el-radio-button label="300">已处理</el-radio-button>
    </el-radio-group>
    <div class="follow-search">
      <el-input v-model="comName" class="follow-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">公司名称:</template>
      </el-input>
      <el-input v-model="bdAccount" class="follow-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">百度账号:</template>
      </el-input>
      <auto-select :key="key_invoice_state" :title="'发票状态'" v-model="invoiceState" :defaultValue="'100'" class="follow-item item-width">
        <el-option value="100" label="全部"></el-option>
        <el-option value="10" label="已开"></el-option>
        <el-option value="0" label="未开"></el-option>
      </auto-select>
      <el-date-picker v-model="checkTime" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="审核开始日期" end-placeholder="审核结束日期" class="follow-item item-width"></el-date-picker>
      <div class="follow-item">
        <el-button type="primary" @click.native="search">查 询</el-button>
        <el-button type="warning" @click.native="reset">重 置</el-button>
      </div>
    </div>
    <el-table stripe border :data="myFollowList" class="table-width" max-height="500">
      <el-table-column prop="companyname" label="公司名称" min-width="160">
      </el-table-column>
      <el-table-column prop="baidu_account" label="百度账号">
      </el-table-column>
      <el-table-column prop="receiptmoney" label="到账金额" width="110">
        <span slot-scope="scope">{{scope.row.receiptmoney | currency}}</span>
      </el-table-column>
      <el-table-column prop="receiptmoney" label="提单金额" width="110">
        <span slot-scope="scope">{{scope.row.usemoney+scope.row.servicemoney+scope.row.usevoucher | currency}}</span>
      </el-table-column>
      <el-table-column prop="receiptmoney" label="提单时间" width="150">
        <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="username" label="提单人">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
          <span v-if="scope.row.bindName">{{'('+scope.row.bindName+')'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="addtype" label="续费类型">
        <span slot-scope="scope">{{scope.row.addtype+'' | renewState('addType')}}</span>
      </el-table-column>
      <el-table-column prop="code_desc" label="审核状态" width="130">
        <template slot-scope="scope">
          <el-button type="warning" plain class="xsbtn">{{scope.row.step == 300 ? scope.row.code_desc : scope.row.checkName+(scope.row.ckBindName?('('+scope.row.ckBindName+')') : ((scope.row.ckTrueName && scope.row.ckTrueName!=scope.row.checkName)?('('+scope.row.ckTrueName+')'):''))}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="checktime" label="审核时间" v-if="stateRadio==300">
        <span slot-scope="scope">{{scope.row.checktime | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="invoice" label="发票状态" width="80">
        <span slot-scope="scope">{{scope.row.invoice==10?'已开':'未开'}}</span>
      </el-table-column>
      <el-table-column prop="" label="操作" width="140" align="center">
        <template slot-scope="scope">
          <el-button @click.native="view(scope.row)" type="success" class="xsbtn">查 看</el-button>
          <el-button v-if="permissions.indexOf('7n') > -1&&scope.row.step!=400" @click.native="stop(scope.row)" type="danger" class="xsbtn">终 止</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="myFollowUrl" :sendParams="sendParams" :isRememberStatus="false" @updateList="updateMyFollowList"></page>

    <!-- 查看弹窗 -->
    <el-dialog :key="key_renew_detail" :modal-append-to-body="false" title="续费详情" :visible.sync="renewDetailDialog" width="1100px" top="0" fullscreen>
      <renew-detail  :rowData="rowData" :toMark="'renewReceive'" :isPass="!!(stateRadio==100)" @closeRenewDetailDialog="closeRenewDetailDialog"></renew-detail>
    </el-dialog>

    <!-- 终止弹窗 -->
    <el-dialog :modal-append-to-body="false" title="终止" :visible.sync="stopDialog" width="400px">
      <el-input type="textarea" :rows="3" v-model="endRemark" placeholder="备注"></el-input>
      <div class="text-center mt10px">
        <el-button type="danger" @click.native="confirmStop">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Page from 'base/page/page'
import RenewDetail from 'components/renew/renewList/renewDetail'
import AutoSelect from 'base/autoSelect/autoSelect'
import cookie from 'js-cookie'
export default {
  data () {
    return {
      permissions: cookie.get('permissions'),
      stateRadio: '100',
      comName: '',
      bdAccount: '',
      invoiceState: '',
      key_invoice_state: '',
      checkTime: [],

      myFollowList: [],
      myFollowUrl: '/Renew.do?renewlistcw',
      sendParams: {
        'check': 100,
        'step': 110
      },

      rowData: {},
      renewDetailDialog: false,
      key_renew_detail: '',
      stopDialog: false,
      endRemark: ''

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
    stop (data) {
      this.stopDialog = true
      this.rowData = data
    },
    confirmStop () {
      let params = {
        reid: this.rowData.id,
        remark: this.endRemark
      }
      this.$post('/Renew.do?renewStop', params).then(res => {
        if (res.data.success) {
          this.stopDialog = false
          this.search()
        }
      })
    },
    closeRenewDetailDialog () {
      this.renewDetailDialog = false
      this.search()
    },
    search () {
      this.sendParams = {
        'companyname': this.comName,
        'baiduAccount': this.bdAccount,
        'check': this.stateRadio,
        'step': 110,
        'invoice': this.invoiceState,
        'starttime': this.checkTime[0],
        'endtime': this.checkTime[1]
      }
    },
    reset () {
      this.comName = ''
      this.bdAccount = ''
      this.invoiceState = '100'
      this.key_invoice_state = new Date() + ''
      this.checkTime = []
    },
    updateMyFollowList (res) {
      this.myFollowList = res.data[0].data
    }
  },
  components: {
    Page, RenewDetail, AutoSelect
  }
}
</script>

<style lang="less" scoped>
.receive-receive {
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

<template>
  <div class="charge-off component-container media-padding">
    <div>
      <div class="cus-status">
        <el-radio-group @change="search" v-model="checkStep" class="cus-status-radio">
          <el-radio-button :label="100">待处理</el-radio-button>
          <el-radio-button :label="300">已处理</el-radio-button>
        </el-radio-group>
      </div>
      <div class="search-cus">
        <el-input v-model="comName" placeholder="保A公司名" class="cus-item item-width">
          <template slot="prepend">保A公司名:</template>
        </el-input>
        <el-input v-model="invoiceName" placeholder="发票抬头" class="cus-item item-width">
          <template slot="prepend">发票抬头:</template>
        </el-input>
        <el-input v-model="bdAccount" placeholder="百度账户" class="cus-item item-width">
          <template slot="prepend">百度账户:</template>
        </el-input>
        <el-input v-model="applyName" placeholder="发票申请人" class="cus-item item-width">
          <template slot="prepend">发票申请人:</template>
        </el-input>
        <el-date-picker v-model="checkDate" format="yyyy/MM/dd HH:mm" value-format="yyyy/MM/dd HH:mm" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="审核时间" end-placeholder="审核时间" class="cus-item" style="width:310px;"></el-date-picker>
        <div class="cus-item">
          <el-button @click.native="search" type="primary">查 询</el-button>
          <el-button @click.native="reset" type="warning">重 置</el-button>
        </div>
      </div>

      <!-- 列表 -->
      <el-table stripe border :data="makeInvoiceList" max-height="550" style="width: 100%">
        <el-table-column prop="tnumber" label="单据号码" width="110">
        </el-table-column>
        <el-table-column prop="applyuser" label="申请人" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.applyuser}}</span>
            <span>{{scope.row.bindName?('('+scope.row.bindName+')'):((scope.row.true_name && scope.row.true_name!=scope.row.username)?('('+scope.row.true_name+')'):'')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="companyname" label="发票抬头" min-width="180">
        </el-table-column>
        <el-table-column prop="comName" label="保A公司名" min-width="180">
        </el-table-column>
        <el-table-column prop="chargename" label="货物名称" width="100">
        </el-table-column>
        <el-table-column prop="tmoney" label="发票金额" width="110">
          <span slot-scope="scope">{{scope.row.tmoney | currency}}</span>
        </el-table-column>
        <el-table-column prop="invReceiveMoney" label="已销金额" width="110">
          <span slot-scope="scope">{{scope.row.invReceiveMoney | currency}}</span>
        </el-table-column>
        <el-table-column prop="" label="未销金额" width="110">
          <span slot-scope="scope">{{scope.row.tmoney-scope.row.invReceiveMoney | currency}}</span>
        </el-table-column>
        <el-table-column prop="ttype" label="发票类型" width="80">
          <span slot-scope="scope">{{scope.row.ttype | invoiceState('invoiceKind')}}</span>
        </el-table-column>
        <el-table-column prop="invoicenumber" label="发票号码" width="100">
        </el-table-column>
        <el-table-column prop="baidu_account" label="百度账户" width="110">
        </el-table-column>
        <el-table-column prop="offset_money" label="销账金额" width="110">
          <span slot-scope="scope">{{scope.row.offset_money | currency}}</span>
        </el-table-column>
        <el-table-column prop="billtime" label="提单时间" width="95">
          <span slot-scope="scope">{{scope.row.billtime | timeFormat}}</span>
        </el-table-column>
        <el-table-column label="操作" width="65">
          <template slot-scope="scope">
            <el-button @click.native.prevent="view(scope.row)" type="success" class="xsbtn">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page class="page" :url="makeInvoiceUrl" :sendParams="sendParams" @updateList="updateMakeInvoiceList"></page>
    </div>

    <!-- 查看弹窗 -->
    <el-dialog :key="key_invoice_dialog" :modal-append-to-body="false" title="销账信息" :visible.sync="invoiceDialog" width="1100px">
      <renew-detail :rowData="rowData" :toMark="'chargeOffCheck'" :chargeOffStep="checkStep" @closeRenewDetailDialog="closeRenewDetailDialog"></renew-detail>
    </el-dialog>
  </div>
</template>

<script>
// import cookie from 'js-cookie'
import Page from 'base/page/page'
import RenewDetail from 'components/renew/renewList/renewDetail'
export default {
  data () {
    return {
      checkStep: 100,
      comName: '',
      invoiceName: '',
      bdAccount: '',
      applyName: '',
      checkDate: [],
      sendParams: {
        'status': 100
      },
      makeInvoiceUrl: '/Invoice.do?invoiceOffsetList',
      makeInvoiceList: [],
      multipleSelection: [],
      rowData: {}, // 一行的数据

      invoiceDialog: false,
      form: {},
      invoiceLogs: [],
      key_invoice_dialog: '1'
    }
  },
  methods: {
    search () {
      this.sendParams = {
        status: this.checkStep,
        invoice_cname: this.invoiceName.trim(),
        cname: this.comName.trim(),
        baidu_account: this.bdAccount.trim(),
        applyuser: this.applyName.trim(),
        check_start: this.checkDate[0],
        check_end: this.checkDate[1]
      }
    },
    reset () {
      this.invoiceName = ''
      this.comName = ''
      this.bdAccount = ''
      this.applyName = ''
      this.checkDate = []
    },
    // 查看
    view (data) {
      this.rowData = data
      this.key_invoice_dialog = new Date() + '1'
      setTimeout(() => {
        this.invoiceDialog = true
      }, 300)
    },
    closeRenewDetailDialog () {
      this.invoiceDialog = false
      this.search()
    },
    updateMakeInvoiceList (data) {
      this.makeInvoiceList = data.data[0].data
    }
  },
  components: {
    Page, RenewDetail
  }
}
</script>

<style scoped lang="less">
.charge-off {
  .cus-status {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: -10px;
    .cus-status-radio {
      margin-top: 10px;
    }
  }
  .cus-status {
    padding-left: 10px;
  }
  .search-cus {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .cus-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 280px;
    }
  }
}
</style>

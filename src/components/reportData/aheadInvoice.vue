<template>
  <div class="visit-record component-container media-padding">

    <div class="visit-search">
      <el-input v-model="dept" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">部门:</template>
      </el-input>
      <el-input v-model="cusName" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">保A公司名:</template>
      </el-input>
      <el-input v-model="invoiceNum" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">发票号码:</template>
      </el-input>
      <el-input v-model="bdAccount" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">百度账号:</template>
      </el-input>
      <el-input v-model="invoiceComName" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">发票公司名:</template>
      </el-input>
      <auto-select :key="key_invoice_type" title="发票类型" defaultValue="100" v-model="invoiceType" id="visit-status" class="visit-item item-width">
        <el-option label="全部" value="100"></el-option>
        <el-option label="电子普票" value="11"></el-option>
        <el-option label="纸质普票" value="10"></el-option>
        <el-option label="专票" value="20"></el-option>
      </auto-select>
      <el-date-picker v-model="applyDate" format="yyyy/MM/dd HH:mm" value-format="yyyy/MM/dd HH:mm" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="申请时间" end-placeholder="申请时间" class="visit-item" style="width:300px;"></el-date-picker>
      <el-date-picker v-model="invoiceDate" format="yyyy/MM/dd HH:mm" value-format="yyyy/MM/dd HH:mm" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="开票时间" end-placeholder="开票时间" class="visit-item" style="width:300px;"></el-date-picker>
      <el-date-picker v-model="addDate" format="yyyy/MM/dd HH:mm" value-format="yyyy/MM/dd HH:mm" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="加款时间" end-placeholder="加款时间" class="visit-item" style="width:300px;"></el-date-picker>
      <el-date-picker v-model="removeDate" format="yyyy/MM/dd HH:mm" value-format="yyyy/MM/dd HH:mm" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="实际销账时间" end-placeholder="实际销账时间" class="visit-item" style="width:300px;"></el-date-picker>
      <div class="visit-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleTabClick" type="card" class="mt10px">
      <div>
        <el-radio-group v-model="radioGroup" @change="handleChangeRadio">
          <el-radio-button :label="100">未销</el-radio-button>
          <el-radio-button label="">全部</el-radio-button>
        </el-radio-group>
        <span class="fr pr30px">
          <el-button @click.native="exportExcell" type="warning">导出Excell</el-button>
        </span>
      </div>
      <el-tab-pane label="提前开票" name="invoice" class="mt10px">
        <el-table show-summary :summary-method="getSummaries" stripe border :data="invoiceList" class="table-width" max-height="500">
          <el-table-column prop="applytime" label="申请时间" width="90">
            <span slot-scope="scope">{{scope.row.applytime | timeFormat1}}</span>
          </el-table-column>
          <el-table-column prop="fullname" label="部门" width="100">
          </el-table-column>
          <el-table-column prop="" label="姓名" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.uname}}</span><span>{{scope.row.bindName?('('+scope.row.bindName+')'): ((scope.row.true_name && scope.row.true_name!=scope.row.username)?('('+scope.row.true_name+')'):'')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="comName" label="保A公司名" min-width="150">
          </el-table-column>
          <el-table-column prop="invoicecname" label="发票公司名" min-width="150">
          </el-table-column>
          <el-table-column prop="invoicetime" label="开票时间" width="90">
            <span slot-scope="scope">{{scope.row.invoicetime | timeFormat1}}</span>
          </el-table-column>
          <el-table-column prop="tmoney" label="开票金额" width="110">
            <span slot-scope="scope">{{scope.row.tmoney | currency}}</span>
          </el-table-column>
          <el-table-column prop="invoicenumber" label="发票号码" width="110">
          </el-table-column>
          <el-table-column prop="" label="开票类型" width="80">
            <span slot-scope="scope">{{scope.row.ttype | invoiceState('invoiceType')}}</span>
          </el-table-column>
          <el-table-column prop="" label="预计销账时间" width="95">
            <span slot-scope="scope">{{scope.row.offset_time | timeFormat1}}</span>
          </el-table-column>
          <el-table-column prop="receive_money" label="已销金额" width="110">
            <span slot-scope="scope">{{scope.row.receive_money | currency}}</span>
          </el-table-column>
          <el-table-column prop="toRemoveMoney" label="未销金额" width="110">
            <span slot-scope="scope">{{scope.row.tmoney-scope.row.receive_money | currency}}</span>
          </el-table-column>
          <el-table-column prop="" label="实际销账时间" width="95">
            <span slot-scope="scope">{{scope.row.maxcktime | timeFormat1}}</span>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button @click.native.prevent="writeVisitResult(scope.row)" type="primary" class="xsbtn">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <page class="page" :url="invoiceUrl" :sendParams="invoiceParams" @updateList="updateInvoiceList"></page>
      </el-tab-pane>
      <el-tab-pane label="提前加款" name="renew" class="mt10px">
        <el-table show-summary :summary-method="getSummaries" stripe border :data="invoiceList" class="table-width" max-height="500">
          <el-table-column prop="applytime" label="申请时间" width="90">
            <span slot-scope="scope">{{scope.row.applytime | timeFormat1}}</span>
          </el-table-column>
          <el-table-column prop="fullname" label="部门" width="100">
          </el-table-column>
          <el-table-column prop="" label="姓名" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.uname}}</span><span>{{scope.row.bindName?('('+scope.row.bindName+')'): ((scope.row.true_name && scope.row.true_name!=scope.row.username)?('('+scope.row.true_name+')'):'')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="comName" label="保A公司名" min-width="150">
          </el-table-column>
          <el-table-column prop="baidu_account" label="百度账号" min-width="150">
          </el-table-column>
          <el-table-column prop="jiakuanTime" label="加款时间" width="90">
            <span slot-scope="scope">{{scope.row.jiakuanTime | timeFormat1}}</span>
          </el-table-column>
          <el-table-column prop="usemoney" label="加款金额" width="110">
            <span slot-scope="scope">{{scope.row.usemoney | currency}}</span>
          </el-table-column>
          <el-table-column prop="" label="预计销账时间" width="95">
            <span slot-scope="scope">{{scope.row.offset_time | timeFormat1}}</span>
          </el-table-column>
          <el-table-column prop="receiptmoney" label="已销金额" width="110">
            <span slot-scope="scope">{{scope.row.receiptmoney | currency}}</span>
          </el-table-column>
          <el-table-column prop="toRemoveMoney" label="未销金额" width="110">
            <span slot-scope="scope">{{scope.row.usemoney-scope.row.receiptmoney | currency}}</span>
          </el-table-column>
          <el-table-column prop="" label="实际销账时间" width="95">
            <span slot-scope="scope">{{scope.row.maxcktime | timeFormat1}}</span>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button @click.native.prevent="writeVisitResult(scope.row)" type="primary" class="xsbtn">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <page class="page" :url="invoiceUrl" :sendParams="invoiceParams" @updateList="updateInvoiceList"></page>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import elDragDialog from '@/directive/el-dragDialog' // eslint-disable-line
import Page from 'base/page/page'
export default {
  directives: { elDragDialog },
  data () {
    return {
      activeName: 'invoice',
      radioGroup: 100,

      type: 'invoice',
      removeType: 100,
      invoiceList: [],
      invoiceUrl: '/Invoice.do?advanceInvoicelist',
      invoiceParams: { inv_re: 'invoice', ckstatus: 100 },

      dept: '',
      cusName: '',
      invoiceNum: '',
      bdAccount: '',
      invoiceComName: '',
      key_invoice_type: '',
      invoiceType: '',
      applyDate: [],
      invoiceDate: [],
      addDate: [],
      removeDate: []

    }
  },
  methods: {
    search () {
      this.invoiceParams = {
        'companyname': this.cusName,
        'invoicename': this.invoiceComName,
        'inv_re': this.type,
        'ckstatus': this.removeType,
        'invoicetype': this.invoiceType,
        'apply_start': this.applyDate[0],
        'apply_end': this.applyDate[1],
        'add_start': this.addDate[0],
        'add_end': this.addDate[1],
        'receive_start': this.removeDate[0],
        'receive_end': this.removeDate[1],
        'invoice_start': this.invoiceDate[0],
        'invoice_end': this.invoiceDate[1],
        'deptcode': this.dept,
        'baiduaccount': this.bdAccount,
        'invoicenumber': this.invoiceNum
      }
    },
    reset () {
      this.cusName = ''
      this.invoiceNum = ''
      this.invoiceComName = ''
      this.dept = ''
      this.bdAccount = ''
      this.applyDate = []
      this.addDate = []
      this.removeDate = []
      this.invoiceDate = []
      this.key_invoice_type = new Date() + ''
      this.invoiceType = ''
    },
    exportExcell () {
      this.$export('/Invoice.do?exportexcel', this.invoiceParams)
    },
    handleChangeRadio (val) {
      this.removeType = val
      this.search()
    },
    handleTabClick (val) {
      this.type = val.name
      this.search()
    },
    getSummaries (param) {
      let mark = true
      this.activeName === 'invoice' ? mark = true : mark = false
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => {
          if (column.property === 'toRemoveMoney') {
            return Number((mark ? item.tmoney : item.usemoney) - (mark ? item.receive_money : item.receiptmoney))
          }
          return Number(item[column.property])
        })
        if (
          column.property === 'tmoney' ||
          column.property === 'usemoney' ||
          column.property === 'receive_money' ||
          column.property === 'receiptmoney' ||
          column.property === 'toRemoveMoney'
        ) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = '¥ ' + sums[index].toFixed(2)
        } else {
          sums[index] = '--'
        }
      })
      return sums
    },
    updateInvoiceList (data) {
      this.invoiceList = data.data[0].data
    }
  },
  components: {
    AutoSelect,
    Page
  }
}
</script>
<style lang="less">
.el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid rgb(155, 152, 152);
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid rgb(155, 152, 152);
}
</style>
<style lang="less" scoped>
.visit-record {
  padding: 20px;
  .visit-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .visit-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
  .maxwidth {
    max-width: 500px;
  }
}
</style>

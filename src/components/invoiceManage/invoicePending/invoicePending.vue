<template>
  <div class="invoice-pending">
    <p class="bread-title">
      <span>发票管理 / 待开发票</span>
    </p>
    <div class="invoice-content">
      <el-row>
        <el-table ref="multipleTable" :data="invoiceList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border>
          <el-table-column prop="id" label="id">
          </el-table-column>
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="银行类型">
            <template slot-scope="scope">{{ scope.row.bkid | bankType}}</template>
          </el-table-column>
          <el-table-column label="交易时间">
            <template slot-scope="scope">{{ scope.row.tm | timeFormat}}</template>
          </el-table-column>
          <el-table-column prop="fm_name" label="付款公司名">
          </el-table-column>
          <el-table-column label="交易金额">
            <template slot-scope="scope">{{ scope.row.amount | currency}}</template>
          </el-table-column>
          <el-table-column prop="tnumber" label="单据号码">
          </el-table-column>
        </el-table>
        <page class="pagination" :url="url" :sendparams="sendparams"
          @updateList="updateInvoiceList" :key="key">
        </page>
      </el-row>
      <el-button @click.native="bbb">456</el-button>
      <select-department></select-department>
      <select-user :isShow="vvv"></select-user>
    </div>
  </div>
</template>

<script>
import Page from 'base/page/page'
import selectUser from 'base/selectUser/selectUser'
import selectDepartment from 'base/selectDepartment/selectDepartment'
export default {
  data () {
    return {
      invoiceList: [],
      url: '/Invoice.do?invoicelist',
      sendparams: {
        invoicetype: 100,
        hasinvoice: 0
      },
      key: '',
      vvv: 0
    }
  },
  watch: {
    invoiceList () {

    }
  },
  methods: {
    bbb () {
      this.vvv = Math.random()
    },
    cell ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 6) {
        return 'onecell'
      }
    },
    updateInvoiceList (data) {
      this.invoiceList = data.data[0].data
      console.log(data.data[0].data)
      this.$nextTick(() => {
        setTimeout(() => {
          this._rowSpan('el-table__body', 0, [ 0, 1, 2, 3, 4, 5 ])
        }, 100)
      })
    },
    handleSelectionChange () {

    },
    _rowSpan (id, row, cols) {
      console.log(999)
      var tb = document.getElementsByClassName(id)[0]
      var lastValue = ''
      var value = ''
      var pos = 1
      // var len = tb.rows.length
      for (var i = row; i < tb.rows.length; i++) {
        value = tb.rows[i].cells[cols[0]].innerText
        if (value) {
          if (lastValue == value) { //eslint-disable-line
            var colsbak = cols.slice(0)
            colsbak.sort(function (a, b) { return a - b })
            for (var c = colsbak.length - 1; c >= 0; c--) {
              tb.rows[i].deleteCell(colsbak[c])
              tb.rows[i - pos].cells[colsbak[c]].rowSpan = tb.rows[i - pos].cells[colsbak[c]].rowSpan + 1
            }
            pos++
          } else {
            lastValue = value
            pos = 1
          }
        }
      }
    }
  },
  components: {Page, selectUser, selectDepartment}
}
</script>

<style lang="less">
.invoice-pending {
  .invoice-content {

    padding: 20px;
    .onecell{
      display: none;
    }
  }
}
</style>

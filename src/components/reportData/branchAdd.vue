<template>
  <div class="visit-record component-container media-padding">

    <div class="visit-search">
      <el-input v-model="cusName" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <el-input v-model="bdAccount" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">百度账号:</template>
      </el-input>
      <auto-select :key="key_add_type" :classMark="'key_add_type'" title="加款类型" defaultValue="0" v-model="addType" class="visit-item item-width">
        <el-option label="全部" value="0"></el-option>
        <el-option label="正常加款" value="10"></el-option>
        <el-option label="提前加款" value="20"></el-option>
        <el-option label="返款加款" value="30"></el-option>
      </auto-select>
      <auto-select :key="key_money_use" :classMark="'key_money_use'" title="资金用途" defaultValue="0" v-model="moneyUse" class="visit-item item-width">
        <el-option label="全部" value="0"></el-option>
        <el-option label="推广共享资金" value="tgbonus"></el-option>
        <el-option label="广告共享资金" value="ggbonus"></el-option>
        <el-option label="原生代理推广" value="ysdltg"></el-option>
      </auto-select>
      <auto-select :key="key_area" :classMark="'key_area'" title="地区" v-model="area" class="visit-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="(item,index) in areaList" :key="index" :label="item.AREANAME" :value="item.id"></el-option>
      </auto-select>
      <el-date-picker v-model="addDate" format="yyyy/MM/dd HH:mm" value-format="yyyy/MM/dd HH:mm" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="加款时间" end-placeholder="加款时间" class="visit-item" style="width:300px;"></el-date-picker>
      <div class="visit-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
      <div class="visit-item export">
        <el-button @click.native="exportExcell" type="warning">导 出</el-button>
      </div>
    </div>

    <el-table stripe border :data="invoiceList" :row-class-name="setLastRowStyle" class="table-width" max-height="500">
      <el-table-column prop="comName" label="代付账号" min-width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.mark!=='lastRow'">{{scope.row.comName}}</span>
          <span v-else>合计</span>
        </template>
      </el-table-column>
      <el-table-column prop="baidu_account" label="带子" width="100">
      </el-table-column>
      <el-table-column prop="areaname" label="地区" min-width="70">
      </el-table-column>
      <el-table-column prop="addtype" label="加款类型" min-width="80">
      </el-table-column>
      <el-table-column prop="tm" label="到款时间" width="100">
      </el-table-column>
      <el-table-column prop="split_amount" label="到款金额" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.mark!=='lastRow'">{{scope.row.split_amount | currency}}</span>
          <span v-else>{{scope.row.sumSplitAmount | currency}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="addtime" label="加款时间" width="100">
      </el-table-column>
      <el-table-column prop="addmoney" label="加款金额" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.mark!=='lastRow'">{{scope.row.addmoney | currency}}</span>
          <span v-else>{{scope.row.sumAddmoney | currency}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tgbonus" label="推广共享资金" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.mark!=='lastRow'">{{scope.row.tgbonus | currency}}</span>
          <span v-else>{{scope.row.sumTgbonus | currency}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ggbonus" label="广告共享资金" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.mark!=='lastRow'">{{scope.row.ggbonus | currency}}</span>
          <span v-else>{{scope.row.sumGgbonus | currency}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ysdltg" label="原生代理推广" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.mark!=='lastRow'">{{scope.row.ysdltg | currency}}</span>
          <span v-else>{{scope.row.sumYsdltg | currency}}</span>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="invoiceUrl" :sendParams="invoiceParams" @updateList="updateInvoiceList"></page>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import Page from 'base/page/page'
export default {
  data () {
    return {
      invoiceList: [],
      invoiceUrl: '/wf.do?renewChildCompany',
      invoiceParams: {},

      cusName: '',
      bdAccount: '',
      key_add_type: '',
      key_money_use: '1',
      key_area: '2',
      addType: '0',
      moneyUse: '0',
      area: '',
      areaList: [],
      addDate: []
    }
  },
  mounted () {
    this._getAreaList()
  },
  methods: {
    search () {
      this.invoiceParams = {
        comName: this.cusName,
        baiduAccount: this.bdAccount,
        purpose: this.moneyUse,
        addStart: this.addDate[0],
        addEnd: this.addDate[1],
        addtype: this.addType,
        areaId: this.area
      }
    },
    reset () {
      this.cusName = ''
      this.bdAccount = ''
      this.addDate = []
      this.moneyUse = '0'
      this.addType = '0'
      this.area = ''
      this.key_add_type = new Date() + ''
      this.key_money_use = new Date() + '1'
      this.key_area = new Date() + '2'
    },
    _getAreaList () {
      this.$get('/wf.do?childCompanyArea').then(res => {
        if (res.data.success) {
          this.areaList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    exportExcell () {
      this.$export('/wf.do?renewExport', this.invoiceParams)
    },
    // 弃用合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => {
          return Number(item[column.property])
        })
        if (
          column.property === 'split_amount' ||
          column.property === 'addmoney' ||
          column.property === 'tgbonus' ||
          column.property === 'ggbonus' ||
          column.property === 'ysdltg'
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
    updateInvoiceList (res) {
      this.invoiceList = res.data[0].data
      let total = res.data[2].data
      total.mark = 'lastRow'
      this.invoiceList.push(total)
    },
    setLastRowStyle({row, rowIndex}) {
      if (row.mark === 'lastRow') {
        return 'red'
      }
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

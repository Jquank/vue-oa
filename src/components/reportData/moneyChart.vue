<template>
  <div class="visit-record component-container media-padding">

    <div class="visit-search mt-10px">
      <el-input v-model="cusName" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">公司名称:</template>
      </el-input>
      <el-input v-model="bdAccount" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">百度账号:</template>
      </el-input>
      <auto-select :key="key_business" :classMark="'key_business'" title="业务类型" v-model="businessType" class="visit-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="(item,index) in businessList" :key="index" :label="item.code_desc" :value="item.code_val"></el-option>
      </auto-select>
    </div>

    <div class="visit-search">
      <el-date-picker v-model="tallyDate" format="yyyy/MM/dd HH:mm" value-format="yyyy/MM/dd HH:mm" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="记账日期" end-placeholder="记账日期" class="visit-item" style="width:300px;"></el-date-picker>
      <div class="visit-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
      <div class="visit-item export">
        <el-button @click.native="exportExcell" type="warning">导 出</el-button>
      </div>
    </div>

    <el-table :span-method="arraySpanMethod" stripe border :data="invoiceList" class="table-width" max-height="550">
      <el-table-column prop="billtime" label="记账日期" fixed width="90">
        <span slot-scope="scope">{{scope.row.billtime | timeFormat1}}</span>
      </el-table-column>
      <el-table-column prop="fullname" label="部门" fixed width="100">
      </el-table-column>
      <el-table-column prop="username" label="提单员" fixed width="80">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span><span>{{scope.row.bindName?('('+scope.row.bindName+')'): ((scope.row.true_name && scope.row.true_name!=scope.row.username)?('('+scope.row.true_name+')'):'')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="typename" label="类型" fixed width="120">
        <span slot-scope="scope">{{(scope.row.typename+''+(scope.row.addtype||'')) || ''}}</span>
      </el-table-column>
      <el-table-column prop="companyname" label="公司名称" fixed min-width="120">
      </el-table-column>
      <el-table-column prop="baiducount" label="用户名" fixed width="100">
        <span slot-scope="scope">{{scope.row.addtype != '新开' ? scope.row.baiducount : ''}}</span>
      </el-table-column>

      <el-table-column label="现金">
        <el-table-column prop="XJ" label="金额" width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.XJ | currency}}</span>
            <span else>{{scope.row.XJ_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="XJTIME" label="时间" width="90">
          <span slot-scope="scope">{{scope.row.XJTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="糯米现金">
        <el-table-column prop="NMXJ" label="金额" width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.NMXJ | currency}}</span>
            <span else>{{scope.row.NMXJ_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="NMXJTIME" label="时间" width="90">
          <span slot-scope="scope">{{scope.row.NMXJTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="招行">
        <el-table-column prop="ZH" label="金额" width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.ZH | currency}}</span>
            <span else>{{scope.row.ZH_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ZHTIME" label="时间" width="90">
          <span slot-scope="scope">{{scope.row.ZHTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="糯米招行">
        <el-table-column prop="NMZH" label="金额" width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.NMZH | currency}}</span>
            <span else>{{scope.row.NMZH_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="NMZHTIME" label="时间" width="90">
          <span slot-scope="scope">{{scope.row.NMZHTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="银联">
        <el-table-column prop="YL" label="金额" width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.YL | currency}}</span>
            <span else>{{scope.row.YL_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="YLTIME" label="时间" width="90">
          <span slot-scope="scope">{{scope.row.YLTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="糯米银联">
        <el-table-column prop="NMYL" label="金额" width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.NMYL | currency}}</span>
            <span else>{{scope.row.NMYL_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="NMYLTIME" label="时间" width="90">
          <span slot-scope="scope">{{scope.row.NMYLTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="黄华中行">
        <el-table-column prop="HHZH" label="金额" width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.HHZH | currency}}</span>
            <span else>{{scope.row.HHZH_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="HHZHTIME" label="时间" width="90">
          <span slot-scope="scope">{{scope.row.HHZHTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="中行1">
        <el-table-column prop="ZH1" label="金额" width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.ZH1 | currency}}</span>
            <span else>{{scope.row.ZH1_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ZH1TIME" label="时间" width="90">
          <span slot-scope="scope">{{scope.row.ZH1TIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="阳光快付">
        <el-table-column prop="YGKF" label="金额" width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.YGKF | currency}}</span>
            <span else>{{scope.row.YGKF_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="YGKFTIME" label="时间" width="90">
          <span slot-scope="scope">{{scope.row.YGKFTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="糯米快付">
        <el-table-column prop="NMKF" label="金额" width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.NMKF | currency}}</span>
            <span else>{{scope.row.NMKF_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="NMKFTIME" label="时间" width="90">
          <span slot-scope="scope">{{scope.row.NMKFTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="工行">
        <el-table-column prop="GH" label="金额" width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.GH | currency}}</span>
            <span else>{{scope.row.GH_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="GHTIME" label="时间" width="90">
          <span slot-scope="scope">{{scope.row.GHTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="百度币">
        <el-table-column prop="BDBI" label="金额" width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.BDBI | currency}}</span>
            <span else>{{scope.row.BDBI_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="BDBITIME" label="时间" width="90">
          <span slot-scope="scope">{{scope.row.BDBITIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>

      <el-table-column prop="sum" label="合计" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{scope.row.sum | currency}}</span>
          <span else>{{scope.row.sum_count | currency1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="profit" label="毛利" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{scope.row.profit | currency}}</span>
          <span else>{{scope.row.profit_count | currency1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="addmoney" label="实际加款" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{(scope.row.addTime && 500>scope.row.type) ? scope.row.addmoney : '' | currency}}</span>
          <span else>{{scope.row.addmoney_count | currency1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="addTime" label="加款时间" width="90">
        <span slot-scope="scope">{{scope.row.addTime | timeFormat1}}</span>
      </el-table-column>
      <el-table-column prop="serviceyear" label="服务费年限" width="85">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{scope.row.type >= 500 ? scope.row.serviceyear : ''}}</span>
          <span else>{{scope.row.serviceyear_count}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activity" label="活动类型" width="70">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="100">
      </el-table-column>
      <el-table-column prop="xjq" label="现金券" width="90">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{scope.row.xjq | currency}}</span>
          <span else>{{scope.row.xjq_count | currency1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="voucher" label="代金券" width="90">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{scope.row.voucher | currency}}</span>
          <span else>{{scope.row.voucher_count | currency1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="voucher111" label="代金券使用时间" width="70">
      </el-table-column>
      <el-table-column prop="kefadept" label="部门" width="100">
        <template slot-scope="scope">
           <span v-if="scope.row.addtype==='续费'&&(scope.row.kefadept || '').indexOf('客发')>-1">{{ scope.row.kefadept}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="kefaName" label="商务续费" width="80">
        <template slot-scope="scope">
           <span v-if="scope.row.addtype==='续费'&&(scope.row.kefadept || '').indexOf('客发')>-1">{{ scope.row.kefaName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="catName" label="行业类型" width="90">
      </el-table-column>
      <el-table-column prop="oldbillTime" label="新开提单时间" width="90">
        <span slot-scope="scope">{{scope.row.oldbillTime | timeFormat1}}</span>
      </el-table-column>
      <el-table-column prop="web" label="网站完成" width="60">
      </el-table-column>
      <el-table-column prop="invoice_type" label="开发票" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.invoice_type==-10?'不需要':''}}</span>
          <span>{{scope.row.invoice_type==-1?'暂不需要':''}}</span>
          <span>{{scope.row.invoice_type==0?'需要':''}}</span>
          <span>{{scope.row.invoice_type==10?'已开':''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="refund" label="退款" width="90">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{scope.row.refund | currency}}</span>
          <span else>{{scope.row.refund_count | currency1}}</span>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="invoiceUrl" :sendParams="invoiceParams" @updateList="updateInvoiceList"></page>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import Page from 'base/page/page'
import {getByCode} from 'api/getOptions'
export default {
  data () {
    return {
      invoiceList: [],
      invoiceUrl: '/wf.do?moneydetail',
      invoiceParams: {},

      cusName: '',
      bdAccount: '',
      businessList: [],
      key_business: '',
      businessType: '',
      tallyDate: []
    }
  },
  mounted () {
    this._getBusinessList()
  },
  methods: {
    search () {
      this.invoiceParams = {
        code_val: this.businessType,
        starttime: this.tallyDate[0],
        endtime: this.tallyDate[1],
        companyname: this.cusName,
        baidu_account: this.bdAccount
      }
    },
    reset () {
      this.cusName = ''
      this.bdAccount = ''
      this.tallyDate = []
      this.businessType = ''
      this.key_business = new Date() + ''
    },
    _getBusinessList () {
      getByCode(52).then(res => {
        if (res.data.success) {
          this.businessList = res.data.data
        }
      })
    },
    exportExcell () {
      this.$export('/wf.do?exportexcel', this.invoiceParams)
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (row.mark === 'lastRow') {
        if (columnIndex === 0) {
          return [1, 6]
        } else if (columnIndex > 0 && columnIndex < 6) {
          return [0, 0]
        }
      }
    },
    updateInvoiceList (res) {
      this.invoiceList = res.data[0].data
      let total = res.data[2].data
      total.mark = 'lastRow' // 标志最后一行
      total.billtime = '合 计'
      this.invoiceList.push(total)
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
.el-table th, .el-table th.is-leaf {
  border-bottom: 1px solid rgb(155, 152, 152);
}
</style>
<style lang="less" scoped>
.visit-record {
  .visit-search {
    display: flex;
    flex-wrap: wrap;
    // margin-top: -10px;
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
  .export{
     flex-grow: 1;
    text-align: right;
    padding-right: 30px;
  }
}
</style>

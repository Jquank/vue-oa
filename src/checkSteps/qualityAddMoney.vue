<template>
  <div class="init-finance">
    <h3 class="check-title">{{title}}</h3>
    <el-card class="card-money mt10px">
      <p>
        <b>百度订单金额：</b>{{moneyRecord.sum | currency1}}</p>
      <p>
        <b>服务费：</b>{{moneyRecord.service | currency1}}</p>
      <p v-if="pid==='BAITUI'" v-for="(o,index) in moneyInfo" :key="index">
        <template v-if="o.type<100 && o.type!=8">
          <b>{{o.type | productType}}：</b>{{o.value | currency1}}
        </template>
      </p>
      <p v-if="pid==='WEBSITE'" v-for="(o,index) in moneyInfo" :key="index">
        <template v-if="o.type<100">
          <b>{{o.type | productType}}：</b>{{o.value | currency1}}
        </template>
      </p>
    </el-card>
    <el-row :gutter="10" class="mt10px">
      <el-col :md="6">
        <el-input v-model="baiduID" placeholder="百度账户ID"></el-input>
      </el-col>
      <el-col :md="6">
        <el-input v-model="baiduAccount" placeholder="百度账户名"></el-input>
      </el-col>
      <el-col :md="6">
        <el-input v-model="proxyid" placeholder="代理账号"></el-input>
      </el-col>
      <el-col :md="6">
        <el-date-picker v-model="applyFortime" type="datetime" placeholder="申请加款时间"></el-date-picker>
      </el-col>
    </el-row>

    <div class="mt10px">
      <el-form :inline="true">
        <el-form-item label="大搜冲单费：">
          <el-input v-model="dscd">
            <span slot="prepend">¥</span>
          </el-input>
        </el-form-item>
        <el-form-item label="信息流冲单费：">
          <el-input v-model="xxlcd">
            <span slot="prepend">¥</span>
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="payList" border :summary-method="getSummaries" show-summary class="table-width">
      <el-table-column prop="" label="实际到款">
        <span slot-scope="scope">{{scope.row.type | productType}}：{{scope.row.count | currency}}</span>
      </el-table-column>
      <el-table-column prop="" label="代金券">
        <template slot-scope="scope">
          <span>{{scope.row.type>100?'':scope.row.type | productType}}</span>
          <span>{{scope.row.type>100?'':':'}}</span>
          <span>{{scope.row.type>100?'':scope.row.voucher | currency}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="现金券">
        <template slot-scope="scope">
          <span>{{scope.row.type>100?'':scope.row.type | productType}}</span>
          <span>{{scope.row.type>100?'':':'}}</span>
          <span>{{scope.row.type>100?'':scope.row.xjq | currency}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="申请加款">
        <template slot-scope="scope">
          <span>{{scope.row.type>100?'':scope.row.type | productType}}</span>
          <span>{{scope.row.type>100?'':':'}}</span>
          <span>{{scope.row.type>100?'':scope.row.applyAddMoney | currency}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="已申请加款">
        <template slot-scope="scope">
          <span>{{scope.row.type>100?'':scope.row.type | productType}}</span>
          <span>{{scope.row.type>100?'':':'}}</span>
          <span>{{scope.row.type>100?'':scope.row.add_money | currency}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="mt10px">
      <el-button @click.native="pass" type="success" size="medium">审核通过</el-button>
    </div>

    <div class="mt10px">
      <el-input v-model="refuseRemark" style="width:80%" type="textarea" :rows="5" placeholder="请填写驳回理由！！！"></el-input>
    </div>
    <div class="mt10px">
      <auto-select v-model="backValue" :defaultValue="backValue" :title="'驳回至'" style="width:200px;">
        <el-option v-for="(item, index) in backNodeList" :key="index" :value="item.sn+'#'+item.name" :label="item.name"></el-option>
      </auto-select>
      <el-button @click.native="refuse" type="danger" style="margin-left:-6px;">驳回</el-button>
    </div>

  </div>
</template>

<script>
// import storage from 'good-storage'
// import { timeFormat1 } from 'common/js/filters'
import { getByCode } from 'api/getOptions'
import { orderDeal } from 'common/js/mixin'
import { currency } from 'common/js/filters'
import AutoSelect from 'base/autoSelect/autoSelect'
export default {
  mixins: [orderDeal],
  props: {
    title: {
      type: String,
      default: ''
    },
    moneyInfo: {
      // [12]
      type: Array,
      default: function () {
        return []
      }
    },
    moneyRecord: {
      // [8]
      type: Object,
      default: function () {
        return {}
      }
    },
    orderFlowDatas: {
      // [13]
      type: Array,
      default: function () {
        return []
      }
    },
    invoiceInfo: {
      // [11]
      type: Array,
      default: function () {
        return {}
      }
    },
    orderInfo: {
      // [1]
      type: Object,
      default: function () {
        return {}
      }
    },
    templateInfo: {
      // [0]
      type: Object,
      default: function () {
        return {}
      }
    },
    originUser: {
      // [10]
      type: Object,
      default: function () {
        return {}
      }
    },
    pid: {
      type: String,
      default: 'BAITUI'
    },
    sn: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      addIcon: 'fa fa-plus',
      minusIcon: 'fa fa-minus',
      productType: [],
      common: false,
      remark: '',
      next_uid: '', // 下一步审核人
      form_val: null,

      baiduID: '',
      baiduAccount: '',
      proxyid: '',
      applyFortime: '',
      dscd: 0,
      xxlcd: 0,
      voucher_total: 0,
      xjq_total: 0,
      applyAddMoney_total: 0,
      applyed_total: 0
    }
  },
  computed: {
    curid () {
      return this.orderInfo.curid
    }
  },
  created () {
    getByCode(52).then(res => {
      this.productType = res.data.data
    })
  },
  mounted () {
    this._getPayList()
    this._getUrl()
    this._getBackNode(this.sn, this.templateInfo.cpid)
    this.orderFlowDatas.forEach(val => {
      // 取出[13]飘红的bsid
      val.split.forEach(item => {
        if (this.curid === item.curid) {
          val.bsid = item.bsid
        }
      })
    })
    this.payList.forEach(val => {
      if (val.type === 1) {
        val.voucher = this.moneyRecord.dsvoucher
        val.xjq = this.moneyRecord.dsxjq
        val.applyAddMoney = (parseFloat(val.count || 0) + parseFloat(val.xjq || 0))
      } else if (val.type === 2) {
        val.voucher = this.moneyRecord.xxlvoucher
        val.xjq = this.moneyRecord.xxlxjq
        val.applyAddMoney = (parseFloat(val.count || 0) + parseFloat(val.xjq || 0))
      } else if (val.type === 51) {
        val.voucher = this.moneyRecord.ztcvoucher
        val.xjq = this.moneyRecord.ztcxjq
        val.applyAddMoney = (parseFloat(val.count || 0) + parseFloat(val.xjq || 0))
      }
    })
    console.log(this.payList)
  },
  methods: {
    getSummaries (param) {
      console.log(param)
      const { columns, data } = param
      const sums = []

      columns.forEach((column, index) => {
        let x = {}
        x['y' + index] = 0
        data.forEach((item, key) => {
          x['y0'] += parseFloat(item.count || 0)
          x['y1'] += parseFloat(item.voucher || 0)
          x['y2'] += parseFloat(item.xjq || 0)
          x['y3'] += parseFloat(item.applyAddMoney || 0)
          x['y4'] += parseFloat(item.add_money || 0)
        })
        sums[index] = '总计：' + currency(x['y' + index])
      })
      console.log(sums)

      return sums
    }
  },
  components: {
    AutoSelect
  }
}
</script>

<style lang="less">
.init-finance {
  .card-money {
    background: #d9edf7;
    .el-card__body {
      padding: 0 20px;
    }
    p {
      margin: 0;
      padding: 2px 0;
    }
  }
  label.el-form-item__label {
    padding: 0 0 0 10px;
  }
}
</style>

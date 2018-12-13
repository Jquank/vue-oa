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
      <p>
        <b>百度账号：</b><span>{{orderInfo.baiducount}}</span>
        <b class="ml10px">账号ID：</b><span>{{orderInfo.baiduid}}</span>
        <b class="ml10px">代理账号：</b><span>{{orderInfo.proxyid}}</span>
      </p>
    </el-card>

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
      <el-table-column prop="" label="已申请加款">
        <template slot-scope="scope">
          <span>{{scope.row.type>100?'':scope.row.type | productType}}</span>
          <span>{{scope.row.type>100?'':':'}}</span>
          <span>{{scope.row.type>100?'':scope.row.add_money | currency}}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-card v-if="pid==='BAITUI'" class="mt10px card-total">
      <div class="money-total">
        <div>
          <b>到款金额：</b>{{receiveMoney_total | currency1}}
        </div>
        <div>
          <b>实际加款金额：</b>{{realAddMoney_total | currency1}}
        </div>
      </div>
    </el-card>

    <div class="mt10px">
      <el-form :inline="true">
        <el-form-item label="加款时间：">
          <el-date-picker v-model="addMoneyTime" type="datetime" value-format="yyyy/MM/dd HH:mm" placeholder="选择日"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="pass" type="success" size="medium">审核通过</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- <div class="mt10px">
      <el-button @click.native="pass" type="success" size="medium">审核通过</el-button>
    </div> -->

    <div class="mt10px">
      <el-input v-model="refuseRemark" style="width:80%" type="textarea" :rows="4" placeholder="请填写驳回理由！！！"></el-input>
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
      type: Object,
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
      common: false,
      remark: '',
      next_uid: '', // 下一步审核人
      form_val: null,

      voucher_total: 0,
      xjq_total: 0,
      receiveMoney_total: 0,
      realAddMoney_total: 0,
      addMoneyTime: ''
    }
  },
  computed: {
    curid () {
      return this.orderInfo.curid
    }
  },
  created () {
    this._getPayList()
    this.payList.forEach(val => {
      if (val.type === 1) {
        val.voucher = this.moneyRecord.dsvoucher
        val.xjq = this.moneyRecord.dsxjq
      } else if (val.type === 2) {
        val.voucher = this.moneyRecord.xxlvoucher
        val.xjq = this.moneyRecord.xxlxjq
      } else if (val.type === 51) {
        val.voucher = this.moneyRecord.ztcvoucher
        val.xjq = this.moneyRecord.ztcxjq
      }
      this.receiveMoney_total += parseFloat(val.count || 0)
      if (val.type < 100) {
        this.realAddMoney_total += parseFloat(val.add_money || 0)
      }
    })
  },
  mounted () {
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
  },
  methods: {
    // 总计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        let x = {}
        x['y' + index] = 0
        data.forEach((item, key) => {
          x['y0'] += parseFloat(item.count || 0)
          x['y1'] += parseFloat(item.voucher || 0)
          x['y2'] += parseFloat(item.xjq || 0)
          x['y3'] += parseFloat(item.add_money || 0)
        })
        sums[index] = '总计：' + currency(x['y' + index])
      })
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
  .card-total {
    background: #d9edf7;
    .el-card__body {
      padding: 10px 20px;
    }
  }
  label.el-form-item__label {
    padding: 0 0 0 10px;
  }
  .apply-add-money-input{
    width: 90px;
  }
  .apply-div{
    display: inline-block;
    width: 90px;
        height: 32px;
    line-height: 32px;
        padding: 0 15px;
    border: 1px solid #dcdfe6;
        border-radius: 4px;
  }
}
</style>

<template>
  <div class="bs-account">
    <h3 class="check-title">{{title}}</h3>
    <el-input v-model="orderInfo.baiduid" placeholder="百度账户名"></el-input>
    <el-card class="card-money mt10px mb10px">
      <p>
        <b>直通车订单金额：</b>{{moneyRecord.sum | currency1}}</p>
      <p>
        <b>服务费：</b>{{moneyRecord.service | currency1}}</p>
      <p v-for="(o,index) in moneyInfo9" :key="index">
        <template v-if="o.type<100">
          <b>{{o.type | productType}}：</b>{{o.value | currency1}}
        </template>
      </p>
      <p v-if="pid==='WEBSITE'" v-for="(o,index) in moneyInfo" :key="index">
        <template v-if="o.type<100">
          <b>{{o.type | productType}}：</b>{{o.value | currency1}}
        </template>
      </p>
    </el-card>
    <el-button @click.native="pass" type="success">审核通过</el-button>
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
import AutoSelect from 'base/autoSelect/autoSelect'
import { orderDeal } from 'common/js/mixin'
export default {
  mixins: [orderDeal],
  props: {
    title: {
      type: String,
      default: ''
    },
    moneyInfo: { // [12]
      type: Array,
      default: function () {
        return []
      }
    },
    moneyInfo9: { // [9]
      type: Array,
      default: function () {
        return []
      }
    },
    moneyRecord: { // [8]
      type: Object,
      default: function () {
        return {}
      }
    },
    orderFlowDatas: { // [13]
      type: Array,
      default: function () {
        return []
      }
    },
    invoiceInfo: { // [11]
      type: Object,
      default: function () {
        return {}
      }
    },
    orderInfo: { // [1]
      type: Object,
      default: function () {
        return {}
      }
    },
    templateInfo: { // [0]
      type: Object,
      default: function () {
        return {}
      }
    },
    originUser: { // [10]
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
    }
  },
  mounted () {
    this._getPayList()
    this._getUrl()
    this._getBackNode(this.sn, this.templateInfo.cpid)
  },
  methods: {
  },
  components: {
    AutoSelect
  }
}
</script>

<style lang="less" scoped>
.bs-account{
  .card-money {
    background: #d9edf7;
    .el-card__body {
      padding: 5px 20px;
    }
    p {
      margin: 0;
      padding: 2px 0;
    }
  }
}
</style>

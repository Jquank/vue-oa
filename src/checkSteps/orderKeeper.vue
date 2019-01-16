<template>
  <div>
    <h3 class="check-title">{{title}}</h3>
    <el-button @click.native="pass" type="success">审核通过</el-button>
    <div class="mt10px">
      <el-input v-model="refuseRemark" style="width:80%" type="textarea" :rows="5" placeholder="请填写驳回理由！！！"></el-input>
      <el-button @click.native="refuse" type="danger">驳回</el-button>
    </div>
  </div>
</template>

<script>
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
    // invoiceInfo: { // [11]
    //   type: Object,
    //   default: function () {
    //     return {}
    //   }
    // },
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
      refuseRemark: ''
    }
  },
  mounted () {
    this._getUrl()
    this._getBackNode(this.sn, this.templateInfo.cpid)
  },
  methods: {
  }
}
</script>

<style>
</style>

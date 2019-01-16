<template>
  <div>
    <h3 class="check-title">{{title}}</h3>
    <div class="mt10px"  style="width:80%">
      <el-input v-model="newSpaceName" type="textarea" :rows="3" placeholder="新开域名"></el-input>
      <el-input v-model="newSpace" type="textarea" :rows="3" placeholder="新开空间" class="mt10px"></el-input>
      <div class="mt10px text-right">
        <el-button @click.native="pass" type="success">提交</el-button>
      </div>
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
      newSpaceName: '',
      newSpace: '',
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

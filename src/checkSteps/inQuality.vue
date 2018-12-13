<template>
  <div>
    <h3 class="check-title">{{title}}</h3>
    <div class="mt10px">
      <auto-select v-model="dispatchValue" :defaultValue="dispatchValue" :title="'派单至'" style="width:200px;">
        <el-option v-for="(item, index) in dispatchRoleList" :key="index" :value="item.id+'#'+item.name" :label="item.name"></el-option>
      </auto-select>
      <el-button @click.native="pass" type="success" style="margin-left:-6px;">派单</el-button>
    </div>
    <template v-if="pid!=='ZTC_WEBSITE'">
      <div class="mt10px">
        <el-input v-model="refuseRemark" style="width:80%" type="textarea" :rows="5" placeholder="请填写驳回理由！！！"></el-input>
      </div>
      <div class="mt10px">
        <auto-select v-model="backValue" :defaultValue="backValue" :title="'驳回至'" style="width:200px;">
          <el-option v-for="(item, index) in backNodeList" :key="index" :value="item.sn+'#'+item.name" :label="item.name"></el-option>
        </auto-select>
        <el-button @click.native="refuse" type="danger" style="margin-left:-6px;">驳回</el-button>
      </div>
    </template>
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
    originUser: { // [3]
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
    this._getDispatchRole(this.sn, this.pid)
  },
  methods: {
  },
  components: {
    AutoSelect
  }
}
</script>

<style>
</style>

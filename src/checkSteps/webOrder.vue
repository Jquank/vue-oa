<template>
  <div>
    <h3 class="check-title">{{title}}</h3>
    <el-col :md="24" class="mt10px">
      <div class="">
        <auto-select :key="key_a1" v-model="documenter" :valueKey="'id'" :title="'资料员'" :placeholder="'请选择资料员'">
          <el-option v-for="item in dispatchRoleList" :key="item.id" :value="item" :label="item.name"></el-option>
        </auto-select>
      </div>
      <div class="mt10px">
        <auto-select :key="key_a2" v-model="designer" :valueKey="'id'" :title="'设计师'" :placeholder="'请选择设计师'">
          <el-option v-for="item in userList1" :key="item.id" :value="item" :label="item.name"></el-option>
        </auto-select>
      </div>
      <div class="mt10px text-right" style="width:286px;">
        <el-button @click.native="pass" type="success">提交</el-button>
      </div>
    </el-col>
  </div>
</template>

<script>
import { orderDeal } from 'common/js/mixin'
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
    // invoiceInfo: { // [11]
    //   type: Object,
    //   default: function () {
    //     return {}
    //   }
    // },
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
      key_a1: '1',
      key_a2: '2',
      documenter: '',
      designer: '',
      userList1: []
    }
  },
  mounted () {
    this._getUrl()
    this._getDispatchRole(this.sn, this.pid)
  },
  methods: {},
  components: {
    AutoSelect
  }
}
</script>

<style>
</style>

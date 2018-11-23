<template>
  <div>
    <h3 class="check-title">{{title}}</h3>
    <div class="mt10px">
      <el-input v-model="browseAddr" placeholder="访问地址">
        <span v-if="!mobileMark" slot="prepend">访问地址 :</span>
      </el-input>
      <div class="text-right mt10px">
        <el-button @click.native="pass" type="success">审核通过</el-button>
      </div>
    </div>
    <div v-if="sn === 280" class="mt10px">
      <el-input v-model="cdAddr" placeholder="冲单地址">
        <span v-if="!mobileMark" slot="prepend">冲单地址 :</span>
      </el-input>
      <div class="text-right mt10px">
        <el-button @click.native="cd" type="warning">确认冲单</el-button>
      </div>
    </div>
    <div class="mt10px">
      <el-input v-model="refuseRemark" type="textarea" :rows="3" placeholder="请填写驳回理由！！！"></el-input>
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
import { orderDeal, mobileFit } from 'common/js/mixin'
export default {
  mixins: [orderDeal, mobileFit],
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
      // [3]
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
      browseAddr: '',
      cdAddr: '',
      mobileMark: false
    }
  },
  created () {
    this._labelWidth()
  },
  mounted () {
    this._getUrl()
    this._getBackNode(this.sn, this.templateInfo.cpid)
  },
  methods: {
    cd () {
      if (!this.cdAddr) {
        this.$message.warning('请填写冲单地址！')
        return
      }
      this.$confirm('确定冲单？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/wf.do?quickWebsite', {
            orderid: this.orderInfo.id,
            visitwebsite: this.cdAddr
          }).then(res => {
            this.$router.push({
              path: '/indexPage/orderPending',
              query: { data: 'fromDetail' }
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }
  },
  components: {
    AutoSelect
  }
}
</script>

<style lang="less">
</style>

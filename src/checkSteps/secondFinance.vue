<template>
  <div class="init-finance">
    <h3 class="check-title">{{title}}</h3>
    <el-card class="card-money">
      <p>
        <b>百度订单金额：</b>{{moneyRecord.sum | currency1}}
      </p>
      <p>
        <b>服务费：</b>{{moneyRecord.service | currency1}}
      </p>
      <div v-if="pid==='BAITUI'" v-for="(o,index) in moneyInfo9" :key="index">
        <div v-if="o.type<100 && o.type!=8">
          <b>{{o.type | productType}}：</b>{{o.value | currency1}}
        </div>
        <div v-if="o.type==1">
          <b>大搜冲单费：</b><span>{{orderInfo.dscd | currency1}}</span>
          <b class="ml10px">大搜续费代金券：</b><span>{{moneyRecord.dsvoucher | currency1}}</span>
          <b class="ml10px">大搜现金券：</b><span>{{moneyRecord.dsxjq | currency1}}</span>
        </div>
        <div v-if="o.type==2">
          <b>信息流冲单费：</b><span>{{orderInfo.xxlcd | currency1}}</span>
          <b class="ml10px">信息流续费代金券：</b><span>{{moneyRecord.xxlvoucher | currency1}}</span>
          <b class="ml10px">信息流现金券：</b><span>{{moneyRecord.xxlxjq | currency1}}</span>
        </div>
      </div>
    </el-card>
    <el-table :data="tableData" border class="mt10px init-table" style="width: 100%">
      <el-table-column prop="code_desc" label="银行类型" width="100">
      </el-table-column>
      <el-table-column prop="" label="银行订单时间" width="90">
        <span slot-scope="scope">{{scope.row.tm | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="no" label="交易订单号" width="160">
      </el-table-column>
      <el-table-column prop="fm_name" label="付款名" width="120">
      </el-table-column>
      <el-table-column prop="fm_account" label="付款账号" width="100">
      </el-table-column>
      <el-table-column prop="fm_uid" label="现金收款人" width="120">
      </el-table-column>
      <el-table-column prop="company_name" label="付款公司名" width="120">
      </el-table-column>
      <el-table-column prop="remark" label="摘要|备注" width="120">
      </el-table-column>
      <el-table-column prop="" label="交易金额" width="100">
        <span slot-scope="scope">{{scope.row.amount | currency}}</span>
      </el-table-column>
      <!-- 拆 -->
      <el-table-column prop="" label="拆分后金额" class-name="splited-col" width="150">
        <template slot-scope="scopeOut">
          <el-table class="split-item" :data="scopeOut.row.split" :show-header="false">
            <el-table-column class-name="split-item-col" show-overflow-tooltip label="" prop="''">
              <span slot-scope="scope" :class="curid===scope.row.curid?'red':''">{{scope.row.split_amount | currency1}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="" label="预留信息" class-name="splited-col" width="160">
        <template slot-scope="scopeOut">
          <el-table class="split-item" :data="scopeOut.row.split" :show-header="false">
            <el-table-column class-name="split-item-col" show-overflow-tooltip label="" prop="''">
              <span slot-scope="scope" :class="curid===scope.row.curid?'red':''">{{scope.row.id===scope.row.bsid?scope.row.alloc_remark:'.'}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="" label="使用人" class-name="splited-col" width="90">
        <template slot-scope="scopeOut">
          <el-table class="split-item" :data="scopeOut.row.split" :show-header="false">
            <el-table-column class-name="split-item-col" show-overflow-tooltip label="" prop="''">
              <span slot-scope="scope" :class="curid===scope.row.curid?'red':''">{{scope.row.useName || '.'}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="" label="公司名称" class-name="splited-col" width="150">
        <template slot-scope="scopeOut">
          <el-table class="split-item" :data="scopeOut.row.split" :show-header="false">
            <el-table-column class-name="split-item-col" show-overflow-tooltip label="" prop="''">
              <span slot-scope="scope" :class="curid===scope.row.curid?'red':''">{{scope.row.id===scope.row.bsid?scope.row.companyname:'.'}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="" label="分配时间" class-name="splited-col" width="140">
        <template slot-scope="scopeOut">
          <el-table class="split-item" :data="scopeOut.row.split" :show-header="false">
            <el-table-column class-name="split-item-col" show-overflow-tooltip label="" prop="''">
              <span slot-scope="scope" :class="curid===scope.row.curid?'red':''">{{scope.row.id===scope.row.bsid?scope.row.alloc_time:'.' | timeFormat}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>

    <el-card v-if="pid==='BAITUI'" class="mt10px card-total">
      <div class="money-total">
        <div>
          <b>订单金额：</b>{{moneyRecord.sum | currency1}}
        </div>
        <div>
          <b>实际到账金额：</b>{{orderInfo.amount_real | currency1}}
        </div>
      </div>
    </el-card>

    <el-row :class="index?'':'mt10px'" v-for="(p,index) in payList" :key="index">
      <el-form :inline="true" :model="p" label-position="top">
        <el-col :md="4">
          <el-form-item :label="index?'':' 产品类型'">
            <el-select v-model="p.producttype" placeholder="选择产品类型" :disabled="formDisable">
              <el-option v-for="(type,index) in productType" :key="index" :label="type.code_desc" :value="type.code_val"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="4">
          <el-form-item :label="index?'':' 金额'">
            <el-input v-model="p.count" :disabled="formDisable">
              <template slot="prepend">¥</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :md="4">
          <el-form-item :label="index?'':' 收款方式'">
            <el-select v-model="p.receivetype" placeholder="选择到款方式" :disabled="formDisable">
              <el-option v-for="(type,index) in orderFlowDatas" :key="index" :label="type.code_desc" :value="type.code_val+'#'+type.bsid" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="4">
          <el-form-item :label="index?'':' 时间'">
            <el-select v-model="p.receivetime" placeholder="选择时间" :disabled="formDisable">
              <el-option v-for="(tm,index) in orderFlowDatas" :key="index" :label="tm.tm | timeFormat1" :value="tm.tm"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="4">
          <el-form-item :label="index?'':' 毛利'">
            <el-input v-model="p.profit" placeholder="填写毛利" :disabled="formDisable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="4">
          <el-form-item :label="index?'':'增/删'">
          <el-button @click.native="add(index)" :type="index?'danger':'success'" :icon="index?minusIcon:addIcon" size="mini"  :disabled="formDisable"></el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <b>总到账金额：</b><span>{{totalReceive | currency1}}</span>
    </el-row>

    <div class="mt10px">
      <el-form :inline="true">
        <el-form-item>
          <el-checkbox v-model="allReceive" :disabled="formDisable">全款到账</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-if="pid==='BAITUI'" v-model="common" :disabled="formDisable">公对公</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-input v-if="allReceive" v-model="profit" style="width:250px;margin-left:15px;" :disabled="formDisable">
            <template slot="prepend">总毛利(¥)</template>
          </el-input>
        </el-form-item>
        <el-form-item label="提单时间：">
          <el-date-picker v-model="billTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" :disabled="formDisable">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="pass" type="success" size="medium">审核通过</el-button>
        </el-form-item>
      </el-form>
    </div>

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
import { timeFormat1 } from 'common/js/filters'
import { getByCode } from 'api/getOptions'
import { orderDeal } from 'common/js/mixin'
import AutoSelect from 'base/autoSelect/autoSelect'
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
      addIcon: 'fa fa-plus',
      minusIcon: 'fa fa-minus',
      productType: [],
      allReceive: false,
      common: false,
      billTime: '',
      remark: '',
      next_uid: '', // 下一步审核人
      form_val: null,
      formDisable: true
    }
  },
  computed: {
    curid () {
      return this.orderInfo.curid
    },
    tableData () {
      return this.orderFlowDatas
    },
    totalReceive () {
      let sum = 0
      this.payList.forEach(val => {
        sum += parseFloat(val.count || 0)
      })
      if (sum === this.orderInfo.amount_real) {
        this.allReceive = true //eslint-disable-line
      }
      return sum.toFixed(2)
    },
    profit () { // 总毛利
      let sum = 0
      this.payList.forEach(val => {
        sum += parseFloat(val.profit || 0)
      })
      return sum.toFixed(2)
    }
  },
  created () {
    getByCode(52).then(res => {
      this.productType = res.data.data
    })
    this.payList = this.moneyInfo
    // this._getPayList()
    this.payList.forEach(val => {
      // 被驳回，100回显
      if (
        val.receivetype !== undefined &&
        val.receivetype !== null &&
        val.receivetype !== ''
      ) {
        val.receivetype = val.receivetype + '#' + val.bsid
      }
    })
    this._getBsid()
  },
  mounted () {
    this._getUrl()
    this._getBackNode(this.sn, this.templateInfo.cpid)
    this.billTime = timeFormat1(this.orderInfo.bill_time || '')
    this.common = this.orderInfo.receivekind == 0 ? true : false // eslint-disable-line
  },
  methods: {
    _getBsid() {
      this.orderFlowDatas.forEach(val => {
        // 取出[13]飘红的bsid
        val.split.forEach(item => {
          if (this.curid === item.curid) {
            val.bsid = item.bsid
          }
        })
      })
    },
    add (index) {
      if (index === 0) {
        this.payList.push({
          bsid: '',
          producttype: '',
          count: '0',
          receivetime: '',
          receivetype: '',
          profit: '0'
        })
      } else {
        this.payList.splice(index, 1)
      }
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
  .money-total {
    display: flex;
    justify-content: space-around;
  }
  .splited-col {
    padding: 0;
    > div.cell {
      padding: 0;
    }
  }
  .split-item-col {
    border: none;
    padding: 2px 0;
    border-bottom: 1px solid #000;
  }
  label.el-form-item__label {
    padding: 0 0 0 10px;
  }
}
</style>

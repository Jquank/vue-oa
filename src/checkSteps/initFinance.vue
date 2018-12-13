<template>
  <div class="init-finance">
    <h3 class="check-title">{{title}}</h3>
    <el-card class="card-money">
      <p>
        <b>订单总金额：</b>{{moneyRecord.sum | currency1}}</p>
      <p>
        <b>服务费：</b>{{moneyRecord.service | currency1}}</p>
      <p v-for="(o,index) in moneyInfo" :key="index">
        <template v-if="o.type<100">
          <b>{{o.type | productType}}：</b>{{o.value | currency1}}
        </template>
      </p>
      <!-- <p v-if="pid==='WEBSITE'" v-for="(o,index) in moneyInfo" :key="index">
        <template v-if="o.type<100">
          <b>{{o.type | productType}}：</b>{{o.value | currency1}}
        </template>
      </p> -->
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
              <span slot-scope="scope" :class="curid===scope.row.curid?'red':''">{{scope.row.id===scope.row.bsid?scope.row.companyname||'.':'.'}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="" label="分配时间" class-name="splited-col" width="135">
        <template slot-scope="scopeOut">
          <el-table class="split-item" :data="scopeOut.row.split" :show-header="false">
            <el-table-column class-name="split-item-col" show-overflow-tooltip label="" prop="''">
              <span slot-scope="scope" :class="curid===scope.row.curid?'red':''">{{scope.row.id===scope.row.bsid?scope.row.alloc_time:'.' | timeFormat}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>

    <el-card v-if="pid==='BAITUI' || pid==='ZTC2'" class="mt10px card-total">
      <div class="money-total">
        <div>
          <b>订单金额：</b>{{moneyRecord.sum | currency1}}
        </div>
        <div>
          <b>实际到账金额：</b>{{orderInfo.amount_real | currency1}}
        </div>
      </div>
    </el-card>
    <div v-if="payList.length">
      <el-row :class="index?'':'mt10px'" v-for="(p,index) in payList" :key="index">
      <el-form :inline="true" :model="p" label-position="top">
        <el-col :md="4">
          <el-form-item :label="index?'':' 产品类型'">
            <el-select v-model="p.producttype" placeholder="选择产品类型">
              <el-option v-for="(type,index) in productType" :key="index" :label="type.code_desc" :value="type.code_val"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="4">
          <el-form-item :label="index?'':' 金额'">
            <el-input v-model="p.count">
              <template slot="prepend">¥</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :md="4">
          <el-form-item :label="index?'':' 收款方式'">
            <el-select v-model="p.receivetype" placeholder="选择到款方式">
              <el-option v-for="(ty,index) in orderFlowDatas" :key="index" :label="ty.code_desc" :value="ty.code_val+'#'+ty.bsid"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="4">
          <el-form-item :label="index?'':' 时间'">
            <el-select v-model="p.receivetime" placeholder="选择时间">
              <el-option v-for="(tm,index) in orderFlowDatas" :key="index" :label="tm.tm | timeFormat1" :value="tm.tm"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="4">
          <el-form-item :label="index?'':' 毛利'">
            <el-input v-model="p.profit" placeholder="填写毛利"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="4">
          <el-form-item :label="index?'':'增/删'">
          <el-button @click.native="add(index)" :type="index?'danger':'success'" :icon="index?minusIcon:addIcon" size="mini"></el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    </div>
    <el-row>
      <b>总到账金额：</b><span>{{totalReceive | currency1}}</span>
    </el-row>

    <div class="mt10px">
      <el-form :inline="true">
        <el-form-item>
          <el-checkbox v-model="allReceive">全款到账</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-if="pid==='BAITUI'" v-model="common">公对公</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-input v-if="allReceive" v-model="profit" style="width:250px;margin-left:15px;">
            <template slot="prepend">总毛利(¥)</template>
          </el-input>
        </el-form-item>
        <el-form-item label="提单时间：">
          <el-date-picker v-model="billTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="pass" type="success" size="medium">审核通过</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="mt10px">
      <el-input v-model="refuseRemark" :rows="3" style="width:50%" size="medium" type="textarea" placeholder="填写驳回/终止原因"></el-input>
      <el-button @click.native="refuse" type="danger">驳 回</el-button>
      <!-- todo -->
      <el-button type="danger">终止订单</el-button>
    </div>

  </div>
</template>

<script>
// import storage from 'good-storage'
import { timeFormat1 } from 'common/js/filters'
import { getByCode } from 'api/getOptions'
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
      addIcon: 'fa fa-plus',
      minusIcon: 'fa fa-minus',
      productType: [],
      allReceive: false,
      common: false,
      billTime: '',
      remark: '',
      next_uid: '', // 下一步审核人
      form_val: null,
      payList: []
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
    this._getPayList()
    this.payList.forEach(val => { // 被驳回，100回显
      if (val.receivetype !== undefined && val.receivetype !== null && val.receivetype !== '') {
        val.receivetype = val.receivetype + '#' + val.bsid
      }
    })
  },
  mounted () {
    this._getUrl()
    this.billTime = timeFormat1(this.orderInfo.bill_time || '')
    this.common = this.orderInfo.receivekind == 0 ? true : false // eslint-disable-line
    this.orderFlowDatas.forEach(val => { // 取出[13]飘红的bsid
      val.split.forEach(item => {
        if (this.curid === item.curid) {
          val.bsid = item.bsid
        }
      })
    })
  },
  methods: {
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

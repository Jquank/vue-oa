<template>
  <div class="init-finance">
    <h3 class="check-title">财务初审</h3>
    <el-card class="card-money">
      <p>
        <b>百度订单金额：</b>{{moneyRecord.sum | currency1}}</p>
      <p>
        <b>服务费：</b>{{moneyRecord.service | currency1}}</p>
      <p v-if="pid==='BAITUI'" v-for="(o,index) in moneyInfo" :key="index">
        <template v-if="o.type!=500 && o.type!=8">
          <b>{{o.type | productType}}：</b>{{o.value | currency1}}
        </template>
      </p>
      <p v-if="pid==='WEBSITE'" v-for="(o,index) in moneyInfo" :key="index">
        <template v-if="o.type!=500">
          <b>{{o.type | productType}}：</b>{{o.value | currency1}}
        </template>
      </p>
    </el-card>
    <el-table :data="tableData" border class="mt10px init-table" style="width: 100%" :cell-class-name="splitTd">
      <el-table-column prop="code_desc" label="银行类型" width="100">
      </el-table-column>
      <el-table-column prop="" label="银行订单时间" width="140">
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
      <el-table-column prop="" label="拆分后金额" width="100">
        <div slot-scope="scope">
          <template v-for="(s,index) in scope.row.split">
            <div :class="curid===s.curid?'red':''" :key="index">{{s.split_amount | currency}}</div>
          </template>
        </div>
      </el-table-column>
      <el-table-column prop="" label="预留信息" width="150">
        <div slot-scope="scope">
          <template v-for="(s,index) in scope.row.split">
            <div :class="curid===s.curid?'red':''" :key="index">{{s.id===s.bsid?s.alloc_remark:null}}</div>
          </template>
        </div>
      </el-table-column>
      <el-table-column prop="" label="使用人" width="80">
        <div slot-scope="scope">
          <template v-for="(s,index) in scope.row.split">
            <div :class="curid===s.curid?'red':''" :key="index">{{s.useName}}</div>
          </template>
        </div>
      </el-table-column>
      <el-table-column prop="" label="公司名称" width="150">
        <div slot-scope="scope">
          <template v-for="(s,index) in scope.row.split">
            <div :class="curid===s.curid?'red':''" :key="index">{{s.id===s.bsid?s.companyname:null}}</div>
          </template>
        </div>
      </el-table-column>
      <el-table-column prop="" label="分配时间" width="140">
        <div slot-scope="scope">
          <template v-for="(s,index) in scope.row.split">
            <div :class="curid===s.curid?'red':''" :key="index">{{s.id===s.bsid?s.alloc_time:null | timeFormat}}</div>
          </template>
        </div>
      </el-table-column>
    </el-table>

    <el-card v-if="pid==='BAITUI'" class="mt10px card-total">
      <div class="money-total">
        <div>
          <b>实际到账金额：</b>{{orderInfo.amount_real | currency1}}
        </div>
        <div>
          <b>总到款金额：</b>{{totalReceive | currency1}}
        </div>
      </div>
    </el-card>
    <div :class="index?'':'mt10px'" v-for="(p,index) in payList" :key="index">
      <el-form :inline="true" :model="p">
        <el-form-item>
          <el-select v-model="p.producttype" placeholder="选择产品类型">
            <el-option v-for="(type,index) in productType" :key="index" :label="type.code_desc" :value="type.code_val+''"></el-option>
            <el-option label="服务费" value="500"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="p.count">
            <template slot="prepend">¥</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="p.receivetype" placeholder="选择到款方式">
            <el-option v-for="(type,index) in bankType" :key="index" :label="type.code_desc" :value="type.code_val+''"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="add(index)" :type="index?'success':'danger'" :icon="index?minusIcon:addIcon" circle></el-button>
        </el-form-item>
      </el-form>
    </div>

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
            <template slot="prepend">毛利(¥)</template>
          </el-input>
        </el-form-item>
        <el-form-item label="提单时间:">
          <el-date-picker v-model="billTime" type="datetime" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="pass" type="success" size="medium">审核通过</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="mt10px">
      <el-input :rows="3" style="width:50%" size="medium" type="textarea" placeholder="填写驳回理由"></el-input>
      <el-button type="danger">驳 回</el-button>
      <el-button type="danger">终止订单</el-button>
    </div>

  </div>
</template>

<script>
import storage from 'good-storage'
import { timeFormat } from 'common/js/filters'
import { addClass } from 'common/js/dom.js'
export default {
  props: {
    moneyInfo: {
      type: Array,
      default: function () {
        return []
      }
    },
    moneyRecord: {
      type: Object,
      default: function () {
        return {}
      }
    },
    orderFlowDatas: {
      type: Array,
      default: function () {
        return []
      }
    },
    orderInfo: {
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
      payList: [],
      addIcon: 'fa fa-plus',
      minusIcon: 'fa fa-minus',
      productType: [],
      bankType: [],
      allReceive: false,
      common: false,
      profit: 0,
      billTime: '',
      remark: ''
    }
  },
  computed: {
    curid () {
      return this.orderInfo.curid
    },
    tableData () {
      return this.orderFlowDatas
    },
    _moneyInfo () {
      return this.moneyInfo
    },
    totalReceive () {
      let count = 0
      this.payList.forEach(val => {
        count += parseInt(val.count)
      })
      if (count === this.orderInfo.amount_real) {
        this.allReceive = true //eslint-disable-line
      }
      return count
    }
  },
  created () {
    this.productType = storage.get('productType')
  },
  mounted () {
    console.log(this._moneyInfo)
    this._moneyInfo.forEach(val => {
      if (this.pid === 'BAITUI' && val.type !== '8') {
        this.payList.push({
          count: val.value,
          receivetime: '',
          producttype: val.type,
          receivetype: val.receivetype
        })
      }
      if (this.pid === 'WEBSITE' && val.type === '8') {
        this.payList.push({
          count: val.value,
          receivetime: '',
          producttype: val.type,
          receivetype: val.receivetype
        })
      }
      if (this.pid === 'BAITUI') {
        if (val.type === '2') {
          this.profit += 0.2593 * parseFloat(val.value)
        } else if (val.type === '6' || val.type === '8' || val.type === '9') {
          this.profit += 0
        } else if (val.type === '500') {
          this.profit += parseFloat(val.value)
        } else {
          this.profit += 0.1803 * parseFloat(val.value)
        }
      } else {
        this.profit = 0
      }
    })
    this.profit = this.profit.toFixed(2)
    this.orderFlowDatas.forEach(val => {
      this.bankType.push({
        code_desc: val.code_desc,
        code_val: val.code_val
      })
    })
  },
  methods: {
    add (index) {
      if (index === 0) {
        this.payList.push({
          count: '0',
          receivetime: '',
          producttype: '',
          receivetype: ''
        })
      } else {
        this.payList.splice(index, 1)
      }
    },
    pass () {
      this.remark = '百度订单金额：' + this.moneyRecord.sum + '----' + '\n' + '到款金额：'
      this.orderFlowDatas.forEach(val => {
        let split = val.split
        split.forEach(item => {
          if (this.curid === item.curid) {
            this.remark += item.split_amount + '----' + val.code_desc + '----' + timeFormat(val.tm)
          }
        })
      })
      console.log(this.remark)
    },
    splitTd ({row, column, rowIndex, columnIndex}) {
      if (columnIndex > 8) {
        this.$nextTick(() => {
          let table = document.getElementsByClassName('init-table')[0]
          let tbody = table.getElementsByTagName('tbody')[0]
          let td = tbody.getElementsByClassName(column.id)[0]
          console.dir(td)
          addClass(td, 'split-td')
        })
      }
    }
  }
}
</script>

<style lang="less">
.init-finance {
  .card-money {
    background: #d9edf7;
    .el-card__body{
      padding:0 20px;
    }
  }
  .card-total {
    background: #d9edf7;
    .el-card__body{
      padding:10px 20px;
    }
  }
  .money-total {
    display: flex;
    justify-content: space-around;
  }
  .split-td{
    padding: 0;
    div.cell{
      padding: 0;
      div>div{
        padding:3px 8px 3px 8px;
        height:50px;
        word-wrap:break-word;
        word-break:break-all;
      }
      div>div+div{
        border-top: 1px solid #ddd;
      }
    }
  }
}
</style>

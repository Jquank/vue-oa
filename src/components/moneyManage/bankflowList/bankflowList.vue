<template>
  <div class="bank-flow component-container media-padding">
    <div class="top">
      <div class="status">
        <!-- 分配状态按钮 -->
        <el-radio-group v-model="selStatus" @change="changeStatus" class="status-item" style="width:303px;">
          <el-radio-button v-for="item in statusList" :key="item.id" :label="item.val">
            {{item.text}}
          </el-radio-button>
        </el-radio-group>
        <!-- 银行类型 -->
        <auto-select v-model="selBank" :title="'银行类型'" class="status-item">
          <el-option v-for="(item,index) in statusList" :key="index" :value="item.id" :label="item.text"></el-option>
        </auto-select>
        <!-- 发票状态 -->
        <auto-select v-model="invoiceStatus" :title="'发票状态'" class="status-item">
          <el-option value="10" label="已开发票"></el-option>
          <el-option value="20" label="未开发票"></el-option>
        </auto-select>
      </div>
      <div class="btns">
        <el-button type="primary" icon="fa fa-cloud-download"> 导入流水</el-button>
        <el-button type="warning" icon="fa fa-cloud-upload"> 导出流水</el-button>
      </div>
    </div>
    <!-- 搜索 -->
    <div class="search">
      <el-input v-model="companyName" class="search-item">
        <template slot="prepend">公司名称:</template>
      </el-input>
      <el-input v-model="remarkSearch" class="search-item">
        <template slot="prepend">摘要|备注:</template>
      </el-input>
      <el-input v-model="referenceNum" class="search-item">
        <template slot="prepend">参考号:</template>
      </el-input>
      <el-input v-model="reserveInfo" class="search-item">
        <template slot="prepend">预留信息:</template>
      </el-input>
      <el-input v-model="payAccount" class="search-item">
        <template slot="prepend">付款名:</template>
      </el-input>
      <el-date-picker v-model="businessDate" type="datetimerange" range-separator="至" start-placeholder="交易开始日期" end-placeholder="交易结束日期" class="search-item" :unlink-panels="true"></el-date-picker>
      <el-date-picker v-model="orderDate" type="datetimerange" range-separator="至" start-placeholder="提单开始日期" end-placeholder="提单结束日期" class="search-item" :unlink-panels="true"></el-date-picker>
      <div class="search-item">
        <el-button type="primary">查 询</el-button>
        <el-button type="warning">重 置</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table :data="bankFlowList" @expand-change="rowCollapse" style="width: 100%;margin-top:10px;" stripe>
      <!-- 展开内容 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="expandTest" :show-header="false">
            <el-table-column prop="" width="48">
            </el-table-column>
            <el-table-column prop="" width="35">
            </el-table-column>
            <el-table-column prop="name">
            </el-table-column>
            <el-table-column prop="name">
            </el-table-column>
            <el-table-column prop="name">
            </el-table-column>
            <el-table-column prop="name" v-if="selStatus!==-10">
            </el-table-column>
            <el-table-column prop="name" v-if="selStatus!==-10">
            </el-table-column>
            <el-table-column prop="name" v-if="selStatus!==-10">
            </el-table-column>
            <el-table-column prop="name" v-if="selStatus!==-10">
            </el-table-column>
            <el-table-column prop="name" v-if="selStatus!==-10">
            </el-table-column>
            <el-table-column prop="name" v-if="selStatus!==-10">
            </el-table-column>
            <el-table-column prop="name">
            </el-table-column>
            <el-table-column prop="age">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <!-- 复选框 -->
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column label="交易时间" prop="B_JYSJ">
        <span slot-scope="scope">
          {{scope.row.B_JYSJ | timeFormat}}
        </span>
      </el-table-column>
      <!-- <el-table-column
              label="部门"
              prop="B_BM">
              <span slot-scope="scope">
                {{scope.row.B_BM}}
              </span>
            </el-table-column> -->
      <el-table-column label="参考号" prop="B_CKH">
      </el-table-column>
      <el-table-column label="金额" prop="B_COUNT">
        <span slot-scope="scope">
          {{scope.row.B_COUNT | currency}}
        </span>
      </el-table-column>
      <el-table-column v-if="selStatus!==-10" label="预留信息" prop="information">
        <span slot-scope="scope">
          {{scope.row.information}}
        </span>
      </el-table-column>
      <el-table-column v-if="selStatus!==-10" label="使用人" prop="username">
        <span slot-scope="scope">
          {{scope.row.username}}
        </span>
      </el-table-column>
      <el-table-column v-if="selStatus!==-10" label="公司名称" prop="companyname">
        <span slot-scope="scope">
          {{scope.row.companyname}}
        </span>
      </el-table-column>
      <el-table-column v-if="selStatus!==-10" label="用户名" prop="baiducount">
        <span slot-scope="scope">
          {{scope.row.baiducount}}
        </span>
      </el-table-column>
      <el-table-column v-if="selStatus!==-10" label="提单金额" prop="''">
        <span slot-scope="scope">
          {{scope.row.wfndStatus==300?scope.row.orderAmount: (scope.row.reckStatus==300?scope.row.renewMoney:null) | currency}}
        </span>
      </el-table-column>
      <el-table-column v-if="selStatus!==-10" label="提单时间" prop="''">
        <span slot-scope="scope">
          {{scope.row.wfndStatus==300?scope.row.orderTime: (scope.row.reckStatus==300?scope.row.renewTime:null) | timeFormat1}}
        </span>
      </el-table-column>
      <el-table-column label="操作" prop="" v-if="selStatus=== -10||selStatus===10">
        <template slot-scope="scope">
          <el-button @click.native.prevent="chai(myCusList[scope.$index])" type="warning" size="mini">
            拆账
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="查看" prop="">
        <template slot-scope="scope">
          <el-button @click.native.prevent="view(myCusList[scope.$index])" type="success" size="mini">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <page class="pagination" :url="bankUrl" :sendParams="params" @updateList="updateBankList"></page>
    </el-row>
  </div>
</template>

<script>
import { getCode } from 'api/getOptions'
import { serverUrl } from 'api/config'
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
export default {
  data () {
    return {
      expandTest: [{ name: 'ddd', age: 18 }, { name: 'ccc', age: 19 }],
      params: {},
      bankFlowList: [],
      bankUrl: serverUrl + '/receipt.do?showbankreceipt',
      bankList: [],
      statusList: [
        { id: 0, text: '待分配(待认领)', val: -10 },
        { id: 1, text: '已分配', val: 10 },
        { id: 2, text: '已认领', val: 20 },
        { id: 3, text: '全部', val: 30 }
      ],
      selStatus: '',
      selBank: '',
      invoiceStatus: '',
      companyName: '',
      remarkSearch: '',
      referenceNum: '',
      reserveInfo: '',
      payAccount: '',
      businessDate: '',
      orderDate: ''
    }
  },
  created () {
    this.params = {
      alloctype: -10,
      bank: '0',
      usertype: 0
    }
    this._getBankType()
  },
  methods: {
    // 折叠的回调
    rowCollapse (row, expandedRows) {
      console.log(expandedRows)
      console.log(row)
    },
    // 状态按钮change事件
    changeStatus (val) {
      console.log(this.selStatus)
    },
    _getBankType () {
      getCode(42).then(res => {
        this.bankList = res.data.data
        this.selBank = this.bankList[0].code_val // 设置银行类型初始值
        this.selStatus = this.statusList[0].val // 设置分配状态初始值
      })
    },
    updateBankList (data) {
      this.bankFlowList = data.data[0].data
    }
  },
  components: {
    Page,
    AutoSelect
  }
}
</script>

<style lang="less">
.bank-flow {
  .top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: -10px;
    .status {
      display: flex;
      flex-wrap: wrap;
      .status-item {
        margin-top: 10px;
        margin-left: 10px;
        width: 230px;
      }
    }
    .btns {
      > .el-button {
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    .search-item {
      margin-top: 10px;
      margin-left: 10px;
      width: 295px;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

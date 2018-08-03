<template>
<<<<<<< HEAD
   <div>
      <p>
         <span>到款管理 / 银行流水列表</span>
      </p>
      <div class="bankflow">
         <div class="title">
         </div>
         <div class="content">
            <!-- 银行类型按钮 -->
            <el-row class="bank-btn">
               <el-radio-group v-model="selBank">
                  <el-radio-button v-for="item in bankList" :key="item.id" :label="item.code_val">
                     {{item.code_desc}}
                  </el-radio-button>
               </el-radio-group>
            </el-row>
            <!-- 分配状态按钮 -->
            <el-row class="status-btn">
               <el-radio-group v-model="selStatus" @change="changeStatus">
                  <el-radio-button v-for="item in statusList" :key="item.id" :label="item.val">
                     {{item.text}}
                  </el-radio-button>
               </el-radio-group>
            </el-row>
            <!-- 按条件搜索 -->
            <el-row>
               <el-select v-model="searchTitle" placeholder="请选择" style="width:120px;">
                  <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
               </el-select>
               <el-date-picker v-model="dateVal" type="date" placeholder="选择日期时间">
               </el-date-picker>
               <el-input placeholder="请输入摘要" v-model="zhaiYao" style="max-width:300px;">
                  <template slot="prepend">摘要:</template>
               </el-input>
               <el-input placeholder="请输入参考号" v-model="cankaoNum" style="max-width:300px;">
                  <template slot="prepend">参考号:</template>
               </el-input>
            </el-row>
            <el-row>
               <el-col :span="14">
                  <el-input placeholder="请输入收(付)账号" v-model="shoufuAccount" style="max-width:300px;">
                     <template slot="prepend">收(付)账号:</template>
                  </el-input>
                  <el-button type="primary">查询</el-button>
                  <el-button type="warning" style="margin-right:50px;">重置</el-button>
               </el-col>
               <el-col :span="9" style="text-align:right;">
                  <el-button type="danger">批量删除</el-button>
                  <el-button type="success">批量分配</el-button>
                  <el-button type="info">导入流水</el-button>
                  <el-button type="warning">导出流水</el-button>
               </el-col>
            </el-row>
            <el-row>
               <!-- 表格-start -->
               <el-table :data="bankFlowList" @expand-change="rowCollapse" style="width: 100%" stripe>
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
=======
  <div>
    <p>
      <span>到款管理 / 银行流水列表</span>
    </p>
    <div class="bankflow">
      <div class="title">
      </div>
      <div class="content">
        <!-- 银行类型按钮 -->
        <el-row class="bank-btn">
          <el-radio-group v-model="selBank" >
            <el-radio-button v-for="item in bankList" :key="item.id" :label="item.code_val">
              {{item.code_desc}}
            </el-radio-button>
          </el-radio-group>
        </el-row>
        <!-- 分配状态按钮 -->
        <el-row class="status-btn">
          <el-radio-group v-model="selStatus"  @change="changeStatus">
            <el-radio-button v-for="item in statusList" :key="item.id" :label="item.val">
              {{item.text}}
            </el-radio-button>
          </el-radio-group>
        </el-row>
        <!-- 按条件搜索 -->
        <el-row>
          <el-select v-model="searchTitle"  placeholder="请选择" style="width:120px;">
            <el-option
              v-for="item in searchOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            v-model="dateVal"
            type="date"
            placeholder="选择日期时间">
          </el-date-picker>
          <el-input placeholder="请输入摘要" v-model="zhaiYao"  style="max-width:300px;">
            <template slot="prepend">摘要:</template>
          </el-input>
          <el-input placeholder="请输入参考号" v-model="cankaoNum"  style="max-width:300px;">
            <template slot="prepend">参考号:</template>
          </el-input>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-input placeholder="请输入收(付)账号" v-model="shoufuAccount"  style="max-width:300px;">
              <template slot="prepend">收(付)账号:</template>
            </el-input>
            <el-button type="primary" >查询</el-button>
            <el-button type="warning"  style="margin-right:50px;">重置</el-button>
          </el-col>
          <el-col :span="9" style="text-align:right;">
            <el-button type="danger" >批量删除</el-button>
            <el-button type="success" >批量分配</el-button>
            <el-button type="info" >导入流水</el-button>
            <el-button type="warning" >导出流水</el-button>
          </el-col>
        </el-row>
        <el-row>
          <!-- 表格-start -->
          <el-table
            :data="bankFlowList"
            @expand-change="rowCollapse"
            style="width: 100%" stripe>
            <!-- 展开内容 -->
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table :data="expandTest" :show-header="false">
                  <el-table-column prop="" width="48">
                  </el-table-column>
                  <el-table-column prop="" width="35">
>>>>>>> dev
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
               <!-- 表格-end -->
            </el-row>
            <el-row>
               <page class="pagination" :url="bankUrl" :sendparams="params" @updateList="updateBankList"></page>
            </el-row>
         </div>
      </div>
   </div>
</template>

<script>
import { getCode } from 'api/getOptions'
import { serverUrl } from 'api/config'
import Page from 'base/page/page'
import Loading from 'base/loading/loading'
export default {
  data () {
    return {
      expandTest: [
        {name: 'ddd', age: 18},
        {name: 'ccc', age: 19}
      ],
      params: {},
      bankFlowList: [],
      bankUrl: serverUrl + '/receipt.do?showbankreceipt',
      bankList: [],
      statusList: [
        {id: 0, text: '待分配(待认领)', val: -10},
        {id: 1, text: '已分配', val: 10},
        {id: 2, text: '已认领', val: 20},
        {id: 3, text: '全部', val: 30}
      ],
      selBank: '',
      selStatus: '',
      searchTitle: '1',
      searchOptions: [
        {label: '交易时间', value: '1'},
        {label: '交易日', value: '2'},
        {label: '交易日期', value: '3'},
        {label: '提单时间', value: '4'}
      ],
      dateVal: '',
      zhaiYao: '',
      cankaoNum: '',
      shoufuAccount: ''

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
        this.selBank = this.bankList[0].code_val// 设置银行类型初始值
        this.selStatus = this.statusList[0].val// 设置分配状态初始值
      })
    },
    updateBankList (data) {
      this.bankFlowList = data.data[0].data
    }
  },
  components: {
    Page, Loading
  }
}
</script>

<style lang="less">
.bankflow {
  .content {
    background: #fff;
    padding: 20px;
    .el-row {
      margin-bottom: 20px;
    }
    .el-table__expanded-cell {
      padding: 0;
      .el-table {
        min-height: 10px;
        .el-table__row {
          background: rgb(194, 220, 240);
          > td {
            border-bottom: none;
          }
        }
      }
    }
    .pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>

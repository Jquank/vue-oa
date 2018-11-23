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
        <auto-select :key="key_bank" v-model="selBank" :title="'银行类型'" class="status-item">
          <el-option value="" label="全部"></el-option>
          <el-option v-for="(item,index) in bankList" :key="index" :value="item.id" :label="item.code_desc"></el-option>
        </auto-select>
        <!-- 发票状态 -->
        <auto-select :key="key_invoice" v-model="invoiceStatus" :defaultValue="invoiceStatus" :title="'发票状态'" class="status-item">
          <el-option value="100" label="全部"></el-option>
          <el-option value="10" label="已开发票"></el-option>
          <el-option value="0" label="需要"></el-option>
          <el-option value="-1" label="暂不需要"></el-option>
          <el-option value="-10" label="不需要"></el-option>
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
      <el-input v-model="bdAccount" class="search-item">
        <template slot="prepend">百度账户:</template>
      </el-input>
      <el-input v-model="reserveInfo" class="search-item">
        <template slot="prepend">预留信息:</template>
      </el-input>
      <el-input v-model="payAccount" class="search-item">
        <template slot="prepend">付款名:</template>
      </el-input>
      <el-date-picker v-model="businessDate" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="交易开始日期" end-placeholder="交易结束日期" class="search-item" :unlink-panels="true"></el-date-picker>
      <el-date-picker v-model="orderDate" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="提单开始日期" end-placeholder="提单结束日期" class="search-item" :unlink-panels="true"></el-date-picker>
      <div class="search-item">
        <el-button @click.native.prevent="search" type="primary">查 询</el-button>
        <el-button @click.native.prevent="reset" type="warning">重 置</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table :data="bankFlowList" max-height="550" class="table-width" border>
      <!-- <el-table-column type="selection" width="35"></el-table-column> -->
      <el-table-column label="银行类型" prop="code_desc" width="80" :fixed="isFixed"></el-table-column>
      <el-table-column label="交易时间" prop="B_JYSJ" width="90" :fixed="isFixed">
        <span slot-scope="scope">{{scope.row.tm | timeFormat}}</span>
      </el-table-column>
      <el-table-column label="参考号" prop="no" width="90" :fixed="isFixed"></el-table-column>
      <el-table-column label="付款名" prop="fm_name" width="150" :fixed="isFixed"></el-table-column>
      <el-table-column label="付款账号" prop="fm_account" width="90" :fixed="isFixed"></el-table-column>
      <el-table-column label="现金收款人" prop="fm_uid" width="90" :fixed="isFixed"></el-table-column>
      <el-table-column label="付款公司名" prop="company_name" min-width="90"></el-table-column>
      <el-table-column label="摘要|备注" prop="remark"></el-table-column>
      <el-table-column label="百度账户" prop="baidu_account2"></el-table-column>
      <el-table-column label="账户类型" prop="account_type"></el-table-column>
      <el-table-column label="交易金额" prop="" min-width="100">
        <span slot-scope="scope">{{scope.row.amount | currency1}}</span>
      </el-table-column>
      <!-- 拆 -->
      <el-table-column class-name="splited-col" label="拆分后金额" prop="" width="100">
        <template slot-scope="scope">
          <el-table class="split-item" :data="scope.row.split"  :show-header="false">
            <el-table-column class-name="split-item-col" label="" prop="''">
              <span slot-scope="scope">{{scope.row.split_amount | currency1}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column v-if="selStatus!=0" class-name="splited-col" label="预留信息" prop="" width="120">
        <template slot-scope="scope">
          <el-table class="split-item" :data="scope.row.split"  :show-header="false">
            <el-table-column show-overflow-tooltip class-name="split-item-col" label="" prop="">
              <span slot-scope="scope">{{scope.row.alloc_remark || '.'}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column v-if="selStatus!=0" class-name="splited-col" label="使用人" prop="" width="100">
        <template slot-scope="scope">
          <el-table class="split-item" :data="scope.row.split"  :show-header="false">
            <el-table-column show-overflow-tooltip class-name="split-item-col" label="" prop="useName">
              <span slot-scope="scope">{{scope.row.useName || '.'}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column v-if="selStatus!=0" class-name="splited-col" label="公司名称" prop="" width="180">
        <template slot-scope="scope">
          <el-table class="split-item" :data="scope.row.split"  :show-header="false">
            <el-table-column show-overflow-tooltip class-name="split-item-col" label="" prop="">
              <span slot-scope="scope">{{(scope.row.wfndStatus===300||scope.row.reckStatus===300)?scope.row.companyname:'.'}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column v-if="selStatus!=0" class-name="splited-col" label="用户名" prop="" width="120">
        <template slot-scope="scope">
          <el-table class="split-item" :data="scope.row.split"  :show-header="false">
            <el-table-column show-overflow-tooltip class-name="split-item-col" label="" prop="">
              <span slot-scope="scope">{{scope.row.reckStatus===300?scope.row.baidu_account:'.'}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column v-if="selStatus!=0" class-name="splited-col" label="提单金额" prop="" width="120">
        <template slot-scope="scope">
          <el-table class="split-item" :data="scope.row.split"  :show-header="false">
            <el-table-column show-overflow-tooltip class-name="split-item-col" label="" prop="">
              <span slot-scope="scope">{{(scope.row.wfndStatus===300||scope.row.reckStatus===300)?scope.row.split_amount:'.' |currency1}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column v-if="selStatus!=0" class-name="splited-col" label="提单时间" prop="" width="120">
        <template slot-scope="scope">
          <el-table class="split-item" :data="scope.row.split"  :show-header="false">
            <el-table-column show-overflow-tooltip class-name="split-item-col" label="" prop="">
              <span slot-scope="scope">{{(scope.row.wfndStatus===300?scope.row.bill_time:(scope.row.reckStatus===300?scope.row.bill_time:'.')) | timeFormat1}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column v-if="selStatus==100" class-name="splited-col" label="余额" prop="" width="120">
        <template slot-scope="scope">
          <el-table class="split-item" :data="scope.row.split"  :show-header="false">
            <el-table-column show-overflow-tooltip class-name="split-item-col" label="" prop="">
              <span slot-scope="scope">{{(scope.row.wfndStatus!==300||scope.row.reckStatus!==300)?scope.row.split_amount:'.' |currency1}}</span>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column v-if="selStatus!=20" class-name="splited-col" label="操作" prop="" width="100">
        <template slot-scope="scope">
          <el-table class="split-item" :data="scope.row.split"  :show-header="false">
            <el-table-column show-overflow-tooltip class-name="split-item-col" label="" prop="">
              <!-- 后代作用域插槽 -->
              <template slot-scope="cscope">
                <el-dropdown trigger="click" split-button type="primary">
                  操作
                  <el-dropdown-menu id="my-dropdown-menu" divided slot="dropdown">
                    <el-dropdown-item>
                      <el-button v-if="permissions.indexOf( '6s')>-1&&selStatus===0" @click.native.prevent="allot(cscope.row)" size="mini" type="primary">分配</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="permissions.indexOf('6l')>-1&&selStatus===0" @click.native.prevent="split(cscope.row)" size="mini" type="warning">拆账</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <!-- 客服看到的认领(阳光快付不允许认) -->
                      <el-button v-if="(permissions.indexOf( '6k')>-1&&selStatus===0 && (scope.row.bkid!='c5b2159eb53c11e7a1f900e066be4002' && scope.row.bkid!='14721bbfba6f11e8929700e066be4061')) && (rid==='12' || rid==='2y') && cscope.row.isClaim == '1'" @click.native.prevent="claim(cscope.row)" size="mini" type="success">认领</el-button>
                      <!-- 财务和admin看到的认领 -->
                      <el-button v-if="((permissions.indexOf( '6k')>-1&&selStatus===0)&&rid!=='12' && rid!=='2y'|| rid==='0') && cscope.row.isClaim == '1'" @click.native.prevent="claim(cscope.row)" size="mini" type="success">认领</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="permissions.indexOf( '6m')>-1&&selStatus ===10" @click.native.prevent="goBack(cscope.row)" size="mini" type="warning">退回</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="permissions.indexOf( '6t')>-1&&selStatus===0" @click.native.prevent="deleteFlow(cscope.row)" size="mini" type="danger">删除</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="permissions.indexOf('76')>-1&&selStatus===100" @click.native.prevent="editFlow(cscope.row)" size="mini" type="info">编辑</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="bankUrl" :sendParams="sendParams" @updateList="updateBankList"></page>

    <!-- 分配弹窗 -->
    <el-dialog :modal-append-to-body="false" title="分配流水" :visible.sync="allotDialog" width="400px">
      <el-form :model="allotForm" label-width="80px">
        <el-form-item label="预留信息" required>
          <el-input v-model="allotForm.remark" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="商务" required>
          <el-input v-model="allotForm.shangWu" disabled style="width:60%"></el-input>
          <el-button @click.native.prevent="selUser" type="primary">选择</el-button>
        </el-form-item>
        <div class="text-center">
          <el-button @click.native.prevent="confirmAllot" type="success">分配</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 选择人员弹窗 -->
    <el-dialog :modal-append-to-body="false" title="选择人员" :visible.sync="selUserDialog" width="550px">
      <select-user @userId="getUserId" @closeDialog="closeDialog"></select-user>
    </el-dialog>
    <!-- 拆账弹窗 -->
    <el-dialog :modal-append-to-body="false" title="拆账" :visible.sync="splitDialog" width="500px">
      <el-form label-position="left" :model="splitForm" label-width="140px">
        <el-form-item label="总金额 :">
          <span>{{splitForm.totalMoney | currency1}}</span>
        </el-form-item>
        <el-form-item label="已拆账金额 :">
          <span>{{splitedMoney | currency1}}</span>
        </el-form-item>
        <el-form-item label="剩余可拆账金额 :">
          <span>{{restMoney | currency1}}</span>
        </el-form-item>
        <div v-for="(item,index) in splitForm.splitItem" :key="index" class="mt10px">
          <el-input v-model="item.money" class="contact-phone"></el-input>
          <el-button @click.native.prevent="addContact(index)" class="circle-btn" :type="index===0?'success':'danger'" size="mini" :icon="index===0?'fa fa-plus':'fa fa-minus'" circle></el-button>
        </div>
        <div class="text-center mt10px">
          <el-button @click.native.prevent="confirmSplit" type="primary">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 认领弹窗 -->
    <el-dialog :modal-append-to-body="false" title="认领" :visible.sync="claimDialog" width="400px">
      <el-form :model="claimForm" label-width="80px">
        <el-form-item label="备注" required>
          <el-input v-model="claimForm.remark" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <div class="text-center">
          <el-button @click.native.prevent="confirmClaim" type="primary">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 编辑流水弹窗 -->
    <el-dialog :modal-append-to-body="false" :title="'编辑流水信息----金额 : '+ flowMoney" :visible.sync="editDialog" width="800px">
      <el-form :model="editForm" label-width="120px">
        <el-form-item label="" required>
          <template slot="label">
            <el-button @click.native.prevent="selUser" type="primary">选择使用人</el-button>
          </template>
          <el-input v-model="editForm.user" disabled></el-input>
        </el-form-item>
        <el-form-item label="" required>
          <template slot="label">
            <el-button @click.native.prevent="selCompanyDialog=true" type="primary">选择公司</el-button>
          </template>
          <el-input v-model="editForm.company" disabled></el-input>
        </el-form-item>
        <el-form-item label="百度账号 :" required>
          <el-input v-model="editForm.bdAccount"></el-input>
        </el-form-item>
        <el-form-item label="类型 :" required>
          <el-radio v-model="editForm.radio" label="1">新开</el-radio>
          <el-radio v-model="editForm.radio" label="0">续费</el-radio>
        </el-form-item>
        <el-form-item label="产品类型 :">
          <el-checkbox-group @change="selProduct" v-model="editForm.productType">
            <el-checkbox v-for="(item,index) in editForm.productList" :key="index" :label="item">{{item.code_desc}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="editForm.productMoneyList.length!==0">
          <el-table :data="editForm.productMoneyList" border size="mini">
            <el-table-column label="" prop="" width="100">
              <span slot-scope="scope">{{scope.row.type | productType}}</span>
            </el-table-column>
            <el-table-column label="实际到款" prop="">
              <template slot-scope="scope">
                <el-input v-model="scope.row.real_amount"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="代金券" prop="">
              <template slot-scope="scope">
                <el-input v-model="scope.row.djq"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="现金券" prop="">
              <template slot-scope="scope">
                <el-input v-model="scope.row.xjq"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="申请加款" prop="">
              <template slot-scope="scope">
                <el-input v-model="scope.row.apply_amount"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="大搜服务费 :" required>
          <el-input v-model="editForm.searvice"></el-input>
        </el-form-item>
        <el-form-item label="服务费期限 :" required>
          <el-input v-model="editForm.searviceYear">
            <span slot="prepend">月</span>
          </el-input>
        </el-form-item>
        <el-form-item label="提单时间 :" required>
          <el-date-picker
            v-model="editForm.subOrderDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择提单时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预留信息 :">
          <el-input v-model="editForm.remark" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <div class="text-center">
          <el-button @click.native.prevent="subEdit" type="primary">提交</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 选择公司弹窗 -->
    <el-dialog :modal-append-to-body="false" title="选择公司" :visible.sync="selCompanyDialog" width="800px">
      <el-input @click.native.prevent="searchCompany($event)" @keydown.enter.native="searchCompany('enter')" v-model="comForm.companyName" style="margin-top:10px;" placeholder="搜索客服">
        <span slot="append" class="search-service">搜索客服</span>
      </el-input>
      <el-table id="cus-out-table" :data="comList" class="table-width">
        <el-table-column prop="companyname" label="客户名称">
        </el-table-column>
        <el-table-column prop="" label="客户类型">
          <span slot-scope="scope">{{scope.row.producttype | cusState('cusType')}}</span>
        </el-table-column>
        <el-table-column prop="companyname" label="公司状态">
          <span slot-scope="scope">{{scope.row.ctype | cusState('cusStatus')}}</span>
        </el-table-column>
        <el-table-column prop="" label="业务状态">
          <span slot-scope="scope">{{scope.row.cltype + '' + scope.row.cltype | businessStatus}}</span>
        </el-table-column>
        <el-table-column prop="kefa" label="所属商务">
        </el-table-column>
        <el-table-column prop="kefu" label="所属客服">
        </el-table-column>
        <el-table-column prop="baidu_account" label="百度账号">
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="confirmSelCompany(scope.row)" type="success" class="xsbtn">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="comUrl" :sendParams="comParams" @updateList="getComList"></page>
    </el-dialog>
  </div>
</template>

<script>
import { getByCode } from 'api/getOptions'
import cookie from 'js-cookie'
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectUser from 'base/selectUser/selectUser'
export default {
  data () {
    return {
      rid: cookie.get('rid'),
      permissions: cookie.getJSON('permissions'),
      userId: cookie.get('userId'),
      isFixed: true,
      expandTest: [{ name: 'ddd', age: 18 }, { name: 'ccc', age: 19 }],
      bankFlowList: [],
      bankUrl: '/receipt.do?showbankreceipt',
      sendParams: {
        invoice: 100,
        type: 0
      },
      bankList: [],
      statusList: [
        { id: 0, text: '待分配(待认领)', val: 0 },
        { id: 1, text: '已分配', val: 10 },
        { id: 2, text: '已认领', val: 20 },
        { id: 3, text: '全部', val: 100 }
      ],
      selStatus: 0,
      selBank: '',
      key_bank: '',
      invoiceStatus: '100',
      key_invoice: '1',
      companyName: '',
      remarkSearch: '',
      bdAccount: '',
      reserveInfo: '',
      payAccount: '',
      businessDate: [],
      orderDate: [],

      rowData: {},
      allotDialog: false,
      allotForm: {
        remark: '',
        shangWu: ''
      },
      selUserDialog: false,
      selUserId: '',
      splitDialog: false,
      splitForm: {
        totalMoney: 0,
        splitItem: [{money: 0}]
      },
      claimDialog: false,
      claimForm: {
        remark: ''
      },
      editDialog: false,
      editForm: {
        user: '',
        company: '',
        remark: '',
        bdAccount: '',
        radio: '1',
        productType: [],
        productList: [],
        productMoneyList: [],
        searvice: '0',
        searviceYear: '0',
        subOrderDate: ''
      },
      selCompanyDialog: false,
      comForm: {
        companyName: ''
      },
      comList: [],
      comUrl: '/Search.do?ByBaiduAccount',
      comParams: {},
      comInfo: {},
      flowMoney: 0
    }
  },
  computed: {
    // 已拆账金额
    splitedMoney () {
      let sum = 0
      this.splitForm.splitItem.forEach(val => {
        sum += parseFloat(val.money || 0)
      })
      return sum
    },
    // 剩余可拆账金额
    restMoney () {
      return parseFloat(this.splitForm.totalMoney) - parseFloat(this.splitedMoney)
    }
  },
  created () {
    let width = document.documentElement.clientWidth
    width < 768 ? this.isFixed = false : this.isFixed = true
    this.params = {
      alloctype: -10,
      bank: '0',
      usertype: 0
    }
    this._getBankType()
  },
  methods: {
    // 分配流水
    allot (data) {
      this.rowData = data
      // this.allotForm.shangWu = ''
      this.allotDialog = true
    },
    selUser () {
      this.selUserDialog = true
    },
    getUserId (id, name) {
      this.selUserId = id
      this.allotForm.shangWu = name
      this.editForm.user = name
    },
    closeDialog () {
      this.selUserDialog = false
    },
    confirmAllot () {
      let params = {
        'receiptid': [{
          id: this.rowData.id,
          pid: this.rowData.pid
        }],
        'uid': this.selUserId,
        'alloc_remark': this.allotForm.remark,
        'type': 10
      }
      if (!params.alloc_remark || !params.uid) {
        this.$message({
          type: 'warning',
          message: '请完成必填项或必选项！'
        })
        return
      }
      this.$post('/receipt.do?allocationbankreceipt', params).then(res => {
        this.$message({
          type: 'success',
          message: '分配成功'
        })
        this.allotDialog = false
        this.search()
      })
    },
    // 拆账
    split (data) {
      this.rowData = data
      this.splitForm.totalMoney = data.split_amount
      this.splitDialog = true
    },
    addContact (index) {
      if (index === 0) {
        this.splitForm.splitItem.push({
          money: 0
        })
      } else {
        this.splitForm.splitItem.splice(index, 1)
      }
    },
    confirmSplit () {
      let hasZero = this.splitForm.splitItem.some(val => {
        return val.money == 0 // eslint-disable-line
      })
      if (hasZero) {
        this.$message({
          type: 'warning',
          message: '拆账金额不能为0！'
        })
        return
      }
      if (this.restMoney !== 0) {
        this.$message({
          type: 'warning',
          message: '拆账金额不符，请重新拆账'
        })
        return
      }
      let arr = []
      this.splitForm.splitItem.forEach(val => {
        arr.push(val.money)
      })
      let params = {
        brId: this.rowData.id,
        moneyArr: arr
      }
      this.$post('/receipt.do?bankReceiveChai', params).then(res => {
        if (res.data.data) {
          this.$message({
            type: 'success',
            message: '拆账成功'
          })
        }
        this.splitDialog = false
        this.search()
      })
    },
    // 认领
    claim (data) {
      this.rowData = data
      console.log(data)
      this.claimDialog = true
    },
    confirmClaim () {
      let params = {
        'receiptid': [{
          id: this.rowData.id,
          pid: this.rowData.pid
        }],
        'uid': this.userId,
        'alloc_remark': this.claimForm.remark,
        'type': 20
      }
      if (!params.alloc_remark) {
        this.$message({
          type: 'warning',
          message: '请填写备注'
        })
        return
      }
      console.log(params)
      this.$post('/receipt.do?allocationbankreceipt', params).then(res => {
        if (res.data[0].data) {
          this.$message({
            type: 'success',
            message: '认领成功'
          })
          this.search()
          this.claimDialog = false
        }
      })
    },
    // 退回
    goBack (data) {
      this.rowData = data
      this.$confirm('确定要退回吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$get('/receipt.do?receiptClaimBack', {brcId: this.rowData.id}).then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '退回成功'
            })
            this.search()
          } else {
            this.$message({
              type: 'error',
              message: '此笔流水不能退回'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 删除
    deleteFlow () {
      this.$confirm('确定要删除此笔流水吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          idsarray: [{
            id: this.rowData.id,
            pid: this.rowData.pid
          }]
        }
        this.$post('/receipt.do?delBankRecept', params).then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.search()
          } else {
            this.$message({
              type: 'error',
              message: `${res.data.msg}`
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 编辑
    editFlow (data) {
      // this.editForm.user = ''
      this.selUserId = ''
      this.comInfo = {}
      this.editForm.subOrderDate = ''
      this.editForm.productMoneyList = []
      this.editForm.searvice = ''
      this.editForm.searviceYear = ''
      this.rowData = data
      this.flowMoney = this.rowData.split_amount
      this.editDialog = true
      this._getProductList()
    },
    _getProductList () {
      getByCode(38).then(res => {
        this.editForm.productList = res.data.data
      })
    },
    selProduct (val) {
      console.log(val)
      this.editForm.productMoneyList = []
      val.forEach(item => {
        this.editForm.productMoneyList.push({
          id: null,
          type: item.code_val + '',
          code_val: item.code_val,
          bonustype: item.tb_field_name,
          real_amount: 0,
          djq: 0,
          xjq: 0,
          apply_amount: 0
        })
      })
    },
    searchCompany (e) {
      if (e === 'enter' || e.target.nodeName !== 'INPUT') {
        this.comParams = {
          'companyname': this.comForm.companyName
        }
      }
    },
    getComList (res) {
      this.comList = res.data[0].data
    },
    confirmSelCompany (data) {
      this.comInfo = data
      this.editForm.bdAccount = this.comInfo.baidu_account
      this.editForm.company = this.comInfo.companyname
      this.selCompanyDialog = false
    },
    subEdit () {
      let params = {
        bsid: this.rowData.bsid,
        uid: this.selUserId,
        remark: this.editForm.remark,
        companyid: this.comInfo.companyid,
        companylogid: this.comInfo.companylogid,
        baidu_account: this.editForm.bdAccount,
        bill_time: this.editForm.subOrderDate,
        useDetail: this.editForm.productMoneyList,
        service_money: this.editForm.searvice,
        service_year: this.editForm.searviceYear,
        orderOrRenew: this.editForm.radio === '1' ? 'order' : 'renew'
      }
      if (!params.baidu_account || !params.bill_time || !params.companyid || !params.uid || !params.service_money || !params.service_year) {
        this.$message({
          type: 'warning',
          message: '请完善必填信息！'
        })
        return
      }
      let regNum = /^\d{1,}(\.)?\d*$/
      let sum = 0
      if (this.editForm.productMoneyList.length !== 0) {
        this.editForm.productMoneyList.forEach(val => {
          if (!regNum.test(val.real_amount) || !regNum.test(val.djq) || !regNum.test(val.xjq) || !regNum.test(val.apply_amount)) {
            this.$message({
              type: 'warning',
              message: '请填写产品金额！'
            })
            throw new Error('ignore')
          }
          sum += parseFloat(val.real_amount)
        })
        if ((sum + parseFloat(this.editForm.searvice)).toFixed(2) !== parseFloat(this.flowMoney).toFixed(2)) {
          this.$message({
            type: 'warning',
            message: '请确保实际总到款等于流水金额！'
          })
          return
        }
      }
      this.$post('/receipt.do?manualUserReceive', params).then(res => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          this.editDialog = false
          this.search()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    search () {
      this.sendParams = {
        'type': this.selStatus,
        'bank': this.selBank,
        'start_time': this.businessDate[0],
        'start_end': this.businessDate[1],
        'bill_start': this.orderDate[0], // 提单时间
        'bill_end': this.orderDate[1],
        'remark': this.remarkSearch, // 摘要
        'fm_name': this.payAccount, // 付款名
        'companyname': this.companyName,
        'alloc_remark': this.reserveInfo, // 预留信息
        'invoice': this.invoiceStatus,
        'baidu_account2': this.bdAccount
      }
    },
    reset () {
      this.selBank = ''
      this.key_bank = new Date() + ''
      this.invoiceStatus = '100'
      this.key_invoice = new Date() + '1'
      this.companyName = ''
      this.remarkSearch = ''
      this.bdAccount = ''
      this.reserveInfo = ''
      this.payAccount = ''
      this.businessDate = []
      this.orderDate = []
    },
    // 状态按钮change事件
    changeStatus (val) {
      this.search()
    },
    _getBankType () {
      getByCode(42).then(res => {
        this.bankList = res.data.data
      })
    },
    updateBankList (res) {
      this.bankFlowList = res.data[0].data
    }
  },
  components: {
    Page,
    AutoSelect,
    SelectUser
  }
}
</script>

<style>
.el-dropdown-menu--small .el-dropdown-menu__item{
  padding: 2px 15px;
}
</style>

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
  .splited-col{
    padding: 0;
    >div.cell{
      padding: 0;
    }
  }
  .split-item-col{
    border: none;
    padding: 2px 0;
    border-bottom: 1px solid #000;
  }
  .el-dropdown .el-button{
    padding: 5px 7px;
  }
  .contact-phone {
    width: calc(~'(100% - 30px)');
  }
}
</style>

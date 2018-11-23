<template>
  <div class="renew-detail">
    <!-- 续费信息 -->
    <div>
      <div class="title">
        <el-button class="title-btn" type="warning">续费信息</el-button>
        <div class="line"></div>
      </div>
      <el-form :model="baseInfo" label-width="140px" class="weight-label">
        <el-row>
          <el-col :md="8">
            <el-form-item label="公司名称 :">
              <div>{{baseInfo.companyname}}</div>
            </el-form-item>
          </el-col>
          <el-col :md="6" class="maxwidth">
            <el-form-item label="续费类型 :">
              <div>{{baseInfo.addtype+'' | renewState('addType')}}</div>
            </el-form-item>
          </el-col>
          <el-col :md="5" class="maxwidth">
            <el-form-item label="续费次数 :">
              <div>{{baseInfo.addcount}}</div>
            </el-form-item>
          </el-col>
          <el-col :md="5" class="maxwidth">
            <el-form-item label="特殊情况 :">
              <div>{{baseInfo.special==20?'渠道加款':(baseInfo.special==30?'分公司加款':'')}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="8">
            <el-form-item label="SF账号 :">
              <div>{{baseInfo.proxy_id}}</div>
            </el-form-item>
          </el-col>
          <el-col :md="6" class="maxwidth">
            <el-form-item label="用户ID :">
              <div>{{baseInfo.baidu_id}}</div>
            </el-form-item>
          </el-col>
          <el-col :md="5" class="maxwidth">
            <el-form-item label="服务费年限 :">
              <div>{{baseInfo.serviceyear}}</div>
            </el-form-item>
          </el-col>
          <el-col :md="5" class="maxwidth">
            <el-form-item label="值班加款 :">
              <div>{{baseInfo.holiday==0?'无':(baseInfo.holiday==10?'值班加款':'')}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="8" class="maxwidth">
            <el-form-item label="百度账号 :">
              <div>{{baseInfo.baidu_account}}</div>
            </el-form-item>
          </el-col>
          <el-col :md="6">
            <el-form-item label="是否需要发票 :">
              <div>{{baseInfo.invoice+'' | invoiceState('needInvoice')}}</div>
            </el-form-item>
          </el-col>
          <el-col :md="5" class="maxwidth">
            <el-form-item label="已开发票金额 :">
              <div>{{baseInfo.invoice_money | currency}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" v-if="!baseInfo.order3number">
            <el-form-item label="百度推广服务合同 :">
              <div>{{baseInfo.ordernumber}}</div>
            </el-form-item>
          </el-col>
          <template v-else>
            <el-col :md="8">
              <el-form-item label="百度推广服务订单编号 :">
                <div>{{baseInfo.ordernumber}}</div>
              </el-form-item>
            </el-col>
            <el-col :md="6" class="maxwidth">
              <el-form-item label="百度推广首消授权书 :">
                <div>{{baseInfo.order2number}}</div>
              </el-form-item>
            </el-col>
            <el-col :md="5" class="maxwidth">
              <el-form-item label="百度推广服务协议 :">
                <div>{{baseInfo.order3number}}</div>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
        <el-row>
          <el-col :md="8" class="maxwidth">
            <el-form-item label="提交时间 :">
              <span>{{baseInfo.inserttime | timeFormat}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="6" class="maxwidth">
            <el-form-item label="提交人 :">
              <span>{{baseInfo.username}}</span>
            </el-form-item>
          </el-col>
          <el-col :md="10" class="maxwidth">
            <el-form-item label="提交备注 :">
              <span>{{baseInfo.remark}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 到款信息 -->
    <div>
      <div class="title">
        <el-button class="title-btn" type="warning">到款信息</el-button>
        <div class="line"></div>
      </div>
      <el-table :data="moneyDetail" border>
        <el-table-column prop="" label="实际到款" min-width="150">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">
              <b>{{scope.row.type | productType}}</b>&nbsp;:&nbsp;
              <span>{{scope.row.receive_money | currency}}</span>
            </span>
            <span v-else>
              <b>{{scope.row._type}}</b>&nbsp;:&nbsp;
              <span>{{scope.row.realTotal | currency}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="代金券|返款金额" min-width="150">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark" v-show="scope.row.type<500">
              <b>{{scope.row.type | productType}}</b>&nbsp;:&nbsp;
              <span>{{scope.row.truevalue | currency}}</span>
            </span>
            <span v-else>
              <b>{{scope.row._type}}</b>&nbsp;:&nbsp;
              <span>{{scope.row.djqTotal | currency}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="申请加款" min-width="150">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark" v-show="scope.row.type<500">
              <b>{{scope.row.type | productType}}</b>&nbsp;:&nbsp;
              <span>{{scope.row.add_money > 0 ? scope.row.add_money : scope.row.truevalue+scope.row.value | currency}}</span>
            </span>
            <span v-else>
              <b>{{scope.row._type}}</b>&nbsp;:&nbsp;
              <span>{{scope.row.applyTotal | currency}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="活动备注" min-width="200" v-if="permissions.indexOf('7y') > -1">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark && scope.row.type<500">
              <el-input v-model="scope.row.activity" type="textarea" :rows="2"></el-input>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="toMark==='renewReceive'">
        <el-table :data="renewFlowList" max-height="550" class="table-width" border>
          <!-- <el-table-column type="selection" width="35"></el-table-column> -->
          <el-table-column label="银行类型" prop="code_desc" width="80"></el-table-column>
          <el-table-column label="交易时间" prop="B_JYSJ" width="90">
            <span slot-scope="scope">{{scope.row.tm | timeFormat}}</span>
          </el-table-column>
          <el-table-column label="参考号" prop="no" width="90"></el-table-column>
          <el-table-column label="付款名" prop="fm_name" width="100"></el-table-column>
          <el-table-column label="付款账号" prop="fm_account" width="90"></el-table-column>
          <el-table-column label="现金收款人" prop="fm_uid" width="90"></el-table-column>
          <el-table-column label="付款公司名" prop="company_name" min-width="90"></el-table-column>
          <el-table-column label="摘要|备注" prop="remark"></el-table-column>
          <el-table-column label="百度账户" prop="baidu_account2"></el-table-column>
          <el-table-column label="账户类型" prop="account_type"></el-table-column>
          <el-table-column label="交易金额" prop="" min-width="100">
            <span slot-scope="scope">{{scope.row.amount | currency1}}</span>
          </el-table-column>
          <!-- 拆 -->
          <el-table-column header-align="center" class-name="splited-col" label="拆分后金额" prop="" width="100">
            <template slot-scope="scope">
              <el-table class="split-item" :data="scope.row.split" :show-header="false">
                <el-table-column class-name="split-item-col" label="" prop="">
                  <span slot-scope="scope" :class="{'red':baseInfo.id === scope.row.reid}">
                    {{scope.row.split_amount | currency1}}
                  </span>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column header-align="center" class-name="splited-col" label="预留信息" prop="" width="120">
            <template slot-scope="scope">
              <el-table class="split-item" :data="scope.row.split" :show-header="false">
                <el-table-column show-overflow-tooltip class-name="split-item-col" label="" prop="">
                  <span slot-scope="scope" :class="{'red':baseInfo.id === scope.row.reid}">
                    {{scope.row.id===scope.row.bsid?scope.row.alloc_remark || '.':'.'}}</span>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column header-align="center" class-name="splited-col" label="使用人" prop="" width="100">
            <template slot-scope="scope">
              <el-table class="split-item" :data="scope.row.split" :show-header="false">
                <el-table-column show-overflow-tooltip class-name="split-item-col" label="" prop="useName">
                  <span slot-scope="scope" :class="{'red':baseInfo.id === scope.row.reid}">
                    {{scope.row.id===scope.row.bsid?scope.row.useName || '.':'.'}}</span>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column header-align="center" class-name="splited-col" label="公司名称" prop="" width="200">
            <template slot-scope="scope">
              <el-table class="split-item" :data="scope.row.split" :show-header="false">
                <el-table-column show-overflow-tooltip class-name="split-item-col" label="" prop="">
                  <span slot-scope="scope" :class="{'red':baseInfo.id === scope.row.reid}">
                    {{scope.row.id===scope.row.bsid?scope.row.companyname||'.':'.'}}</span>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column header-align="center" class-name="splited-col" label="分配时间" prop="" width="135">
            <template slot-scope="scope">
              <el-table class="split-item" :data="scope.row.split" :show-header="false">
                <el-table-column show-overflow-tooltip class-name="split-item-col" label="" prop="">
                  <span slot-scope="scope" :class="{'red':baseInfo.id === scope.row.reid}">
                    {{scope.row.id===scope.row.bsid?scope.row.alloc_time||'.':'.' | timeFormat}}</span>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </el-table>
        <div class="text-center">
          <b>实际到账金额：</b><span>{{realReceive | currency}}</span>
        </div>
      </div>
    </div>
    <!-- 操作 -->
    <div>
      <div class="title">
        <el-button class="title-btn mt10px" type="warning">操作</el-button>
        <div class="line"></div>
      </div>
      <div v-if="permissions.indexOf('7x') > -1">
        <el-table :data="productMoneyList" border>
          <el-table-column prop="" label="产品类型" min-width="200">
            <template slot-scope="scope">
              <el-select v-model="scope.row.type" style="width:100%">
                <el-option v-for="(item,index) in productList" :key="index" :value="item.code_val+''" :label="item.code_desc"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="" label="产品金额" min-width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.receive_money">
                <span slot="prepend">¥</span>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="" label="银行类型" min-width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.receivetype">
                <el-option v-for="(item,index) in renewFlowList" :key="index" :value="item.code_val" :label="item.code_desc"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="" label="时间" min-width="135">
            <template slot-scope="scope">
              <el-select v-model="scope.row.receivetime">
                <el-option v-for="(item,index) in renewFlowList" :key="index" :value="item.tm" :label="timeFormat1(item.tm)"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="" label="毛利" min-width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.profit"><span slot="prepend">¥</span></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="60">
            <template slot-scope="scope">
              <el-button @click.native="add(scope.$index)" :type="scope.$index===0?'success':'danger'" :icon="scope.$index===0?'el-icon-plus':'el-icon-minus'" circle class="xsbtn"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="text-center">
          <b>产品总金额：</b><span>{{productTotal | currency}}</span>
        </div>
      </div>
      <!-- 续费主管选择退款 -->
      <div v-for="(back,outIndex) in backList" :key="outIndex">
        <p>{{back.cname}}</p>
        <el-table :data="back.attrs" border :show-header="false">
          <el-table-column prop="" label="产品类型" min-width="200">
            <template slot-scope="scope">
              <el-select v-model="scope.row.type" style="width:100%">
                <el-option v-for="(item,index) in productList" :key="index" :value="item.code_val" :label="item.code_desc"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="" label="产品金额" min-width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.receive_money">
                <span slot="prepend">¥</span>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="" label="时间" min-width="150">
            <template slot-scope="scope">
              <el-date-picker disabled v-model="scope.row.receivetime" type="datetime"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="" label="毛利" min-width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.refprofitund"><span slot="prepend">¥</span></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="100">
            <template slot-scope="scope">
              <el-button v-if="scope.$index===0" @click.native="add1(outIndex)" type="success" icon="el-icon-plus" circle class="xsbtn"></el-button>
              <el-button @click.native="minus(outIndex,scope.$index)" type="danger" icon="el-icon-minus" circle class="xsbtn"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-form label-width="80px" class="mt10px">
        <el-row v-if="permissions.indexOf('7x') > -1">
          <el-col :md="24" class="maxwidth">
            <el-form-item label="提单时间 :">
              <el-date-picker v-model="billTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="备注 :">
              <el-input v-model="subRemark" type="textarea" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-center">
        <!-- 续费主管 -->
        <template v-if="permissions.indexOf('7y') > -1">
          <el-button @click.native="checkReceive(300)" type="success">通 过</el-button>
          <el-button @click.native="selBackMoney" type="warning">选 择</el-button>
          <el-button @click.native="checkReceive(200)" type="danger">驳 回</el-button>
        </template>
        <!-- 收单出纳 7x -->
        <template v-if="permissions.indexOf('7x') > -1">
          <el-button @click.native="checkReceive(300)" type="success">通 过</el-button>
          <el-button @click.native="checkReceive(200)" type="danger">驳 回</el-button>
        </template>
        <template v-if="toMark==='renewCheck'">
          <el-button @click.native="check(300)" type="success">通 过</el-button>
          <el-button @click.native="check(200)" type="danger">驳 回</el-button>
        </template>
        <el-button v-if="toMark==='renewList'" @click.native="addCheckRemark" type="success">提交备注</el-button>
        <el-button v-if="toMark==='renewAdd'" @click.native="checkAdd(300)" type="success">通过</el-button>
      </div>
    </div>
    <!-- 销账发票 -->
    <div v-if="toMark==='renewList' || toMark==='renewReceive'">
      <div class="title">
        <el-button class="title-btn mt10px" type="warning">销账发票</el-button>
        <div class="line"></div>
      </div>
      <el-table :data="inreList" class="table-width" max-height="400">
        <el-table-column prop="tnumber" label="单据号码"></el-table-column>
        <el-table-column prop="companyname" label="购方名称(发票公司名)" min-width="120">
        </el-table-column>
        <el-table-column prop="chargename" label="货物名称"></el-table-column>
        <el-table-column prop="tmoney" label="发票金额">
          <span slot-scope="scope">{{scope.row.tmoney | currency}}</span>
        </el-table-column>
        <el-table-column prop="ttype" label="发票类型">
          <span slot-scope="scope">{{scope.row.ttype | invoiceState('invoiceKind')}}</span>
        </el-table-column>
        <el-table-column prop="invoicecode" label="发票代码" width="100">
        </el-table-column>
        <el-table-column prop="invoicenumber" label="发票号码" width="100">
        </el-table-column>
        <el-table-column prop="invoicetime" label="开票日期" width="90">
          <span slot-scope="scope">{{scope.row.invoicetime | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="prove_img" label="发票垫款证明" width="110">
          <template slot-scope="scope">
            <div>
              <img id="image" ref="proveImg" :src="scope.row.prove_img" height="50px">
            </div>
          </template>
        </el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="inreUrl" :sendParams="inreParams" @updateList="updateInreList"></page>
    </div>
    <!-- 操作记录 -->
    <div>
      <div class="title">
        <el-button class="title-btn mt10px" type="warning">操作记录</el-button>
        <div class="line"></div>
      </div>
      <el-table :data="recordList" class="table-width" max-height="400">
        <el-table-column prop="inserttime" label="操作时间" width="135">
          <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="name" label="操作人">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
            <span>{{scope.row.bindName?('('+scope.row.bindName+')'): ((scope.row.true_name && scope.row.true_name!=scope.row.name)?('('+scope.row.true_name+')'):'')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="record" label="操作记录" min-width="140">
        </el-table-column>
        <el-table-column prop="remark" label="处理备注"></el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="recordUrl" :sendParams="recordParams" @updateList="updateRecordList"></page>
    </div>

    <!-- 选择公司弹窗 -->
    <el-dialog :key="key_com_table" :append-to-body="true" title="选择公司" :visible.sync="selCompanyDialog" width="750px">
      <el-input @click.native="searchService($event)" @keyup.enter.native="searchService($event,'enter')" v-model="companyName" placeholder="搜索公司名">
        <span slot="append" class="search-service">搜索</span>
      </el-input>
      <el-table @selection-change="handleSelectionChange" id="cus-out-table" :data="companyList" class="table-width">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="companyname" label="公司名称" min-width="140">
        </el-table-column>
        <el-table-column prop="baidu_account" label="百度账号">
        </el-table-column>
        <el-table-column prop="receiptmoney" label="金额">
          <span slot-scope="scope">{{scope.row.receiptmoney | currency}}</span>
        </el-table-column>
        <el-table-column prop="receiptmoney" label="记账日期" width="90">
          <span slot-scope="scope">{{scope.row.bill_time | timeFormat1}}</span>
        </el-table-column>
        <el-table-column prop="receiptmoney" label="申请时间" width="90">
          <span slot-scope="scope">{{scope.row.inserttime | timeFormat1}}</span>
        </el-table-column>
        <el-table-column prop="receiptmoney" label="商务|客服">
          <span slot-scope="scope">{{scope.row.username}}{{scope.row.username != scope.row.true_name ? (','+scope.row.true_name) : ''}}</span>
        </el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="companyUrl" :sendParams="companyParams" @updateList="getCompanyList"></page>
      <div class="text-center">
        <el-button @click.native="confirmHandleCheck" type="success">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Page from 'base/page/page'
import { getByCode } from 'api/getOptions'
import { timeFormat1 } from 'common/js/filters' // eslint-disable-line
import cookie from 'js-cookie'
// import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs'
export default {
  props: {
    rowData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    toMark: {
      type: String,
      default: ''
    }
  },
  computed: {
    productTotal () {
      let sum = 0
      this.productMoneyList.forEach(val => {
        sum += parseFloat(val.receive_money || 0)
      })
      return sum
    }
  },
  data () {
    return {
      permissions: cookie.getJSON('permissions'),
      timeFormat1: timeFormat1,
      baseInfo: {},
      moneyDetail: [],
      subRemark: '',
      inreList: [],
      inreUrl: '/Invoice.do?invoiceOffsetList',
      recordList: [],
      recordUrl: '/Renew.do?renewrecord',
      renewFlowList: [],
      realReceive: 0,
      productMoneyList: [],
      productList: [],
      billTime: '',

      selCompanyDialog: false,
      key_com_table: '',
      companyName: '',
      companyList: [],
      companyUrl: '/Renew.do?renewapplylist',
      companyParams: {
        companyName: ''
      },
      multipleSelection: [],
      backList: []
    }
  },
  created () {
    this._getRenewBaseInfo()
    this.toMark === 'renewReceive' && this._getRenewMoney()
    this._getProductList()
  },
  mounted () {
    setTimeout(() => {
      this.$nextTick(() => {
        const gallery = new Viewer(document.getElementById('image')) // eslint-disable-line
      })
    }, 500)
  },
  methods: {
    confirmHandleCheck () {
      this.$post('/Renew.do?renewRefundCK', { reidArr: this.multipleSelection }).then(res => {
        if (res.data.success) {
          this.selCompanyDialog = false
          this.backList = res.data.data
          console.log(this.backList)
        }
      })
    },
    handleSelectionChange (val) {
      val.forEach(val => {
        this.multipleSelection.push(val.id)
      })
    },
    searchService (e, type) {
      if (type === 'enter' || e.target.nodeName !== 'INPUT') {
        this.companyParams = {
          companyName: this.companyName
        }
      }
    },
    getCompanyList (res) {
      this.companyList = res.data[0].data
    },
    selBackMoney () {
      this.backList = []
      this.multipleSelection = []
      this.companyList = []
      this.key_com_table = new Date() + ''
      setTimeout(() => {
        this.selCompanyDialog = true
      }, 200)
    },
    checkAdd (type) {
      let params = {
        checkresult: type,
        reid: this.rowData.reid,
        remark: this.checkRemark
      }
      this.$post('/Renew.do?checkrenew', params).then(res => {
        if (res.data.success) {
          this.$emit('closeRenewDetailDialog')
        }
      })
    },
    checkReceive (type) {
      if (type === 200 && !this.subRemark) {
        this.$message.warning('请填写驳回备注！')
        return
      }
      if (this.permissions.indexOf('7x') > -1) { // 收单出纳校验
        let testProInfo = this.productMoneyList.every(val => {
          return (
            val.type && val.receive_money && val.receivetype && val.receivetime
          )
        })
        if (!testProInfo) {
          this.$message.warning('请完善产品信息！')
          return
        }
        if (!this.billTime) {
          this.$message.warning('请填写提单时间！')
          return
        }
      }
      let receiveIds = []
      this.renewFlowList.forEach(val => {
        val.split.forEach(item => {
          if (item.reid === this.baseInfo.id) {
            receiveIds.push(item.id)
          }
        })
      })
      let inreids = []
      this.inreList.forEach(val => {
        inreids.push({ inreid: val.inreid, invoiceid: val.invoiceid })
      })

      let refundArr = []
      if (this.backList.length) {
        this.backList.forEach(val => {
          val.attrs.forEach(item => {
            item.receivetime = timeFormat1(item.receivetime)
            refundArr.push({
              logid: val.companylogid,
              uid: val.uid,
              comName2: val.cname,
              baidu_account2: val.baidu_account,
              type: item.type,
              reid2: item.id,
              refund: item.receive_money,
              receivetime: item.receivetime,
              refprofitund: item.refprofitund || 0
            })
          })
        })
      }
      let params = {
        type: this.rowData.status == 10000 ? 0 : this.rowData.type, // eslint-disable-line
        receiveids: receiveIds.join(','),
        reuid: this.rowData.uid,
        companylogid: this.baseInfo.companylogid,
        checkresult: type,
        status: type,
        reid: this.rowData.id,
        remark: this.subRemark,
        addtype: this.baseInfo.addtype,
        usemoney: this.baseInfo.usemoney,
        accountid: this.baseInfo.accountid,
        billtime: this.billTime,
        inreids: inreids,
        // allReceiveMoney: '',
        renewreceive: this.productMoneyList,
        receiveAttr: this.moneyDetail.slice(0, this.moneyDetail.length - 1),
        refundArr: refundArr
      }
      this.$post('/Renew.do?checkrenew', params).then(res => {
        if (res.data.success) {
          this.$emit('closeRenewDetailDialog')
        }
      })
    },
    add (index) {
      if (index === 0) {
        this.productMoneyList.push({
          type: '',
          receive_money: '0',
          receivetype: '',
          receivetime: '',
          value: '0',
          profit: '0'
        })
      } else {
        this.productMoneyList.splice(index, 1)
      }
    },
    add1 (outIndex) {
      this.backList[outIndex].attrs.push({
        type: '',
        receive_money: 0,
        reid: this.backList[outIndex].attrs[0].reid
      })
    },
    minus (outIndex, index) {
      this.backList[outIndex].attrs.splice(index, 1)
    },
    _getProductList () {
      getByCode(52).then(res => {
        this.productList = res.data.data
      })
    },
    _getRenewMoney () {
      this.$get('/Renew.do?renewBankReceive', { reid: this.rowData.id }).then(
        res => {
          this.renewFlowList = res.data.data.receiveList
          this.productMoneyList = res.data.data.renewAttrList
          if (this.renewFlowList.length) {
            this.renewFlowList.forEach(val => {
              val.split.forEach(item => {
                if (item.reid === this.baseInfo.id) {
                  this.realReceive += parseFloat(item.split_amount || 0) // 实际总到款
                  item.bill_time
                    ? (this.billTime = timeFormat1(item.bill_time))
                    : (this.billTime = new Date())
                }
              })
            })
          }
          console.log(this.billTime)
        }
      )
    },
    _getRenewBaseInfo () {
      this.inreParams = {
        reid: this.rowData.id || this.rowData.reid,
        status: 100
      }
      this.recordParams = {
        reid: this.rowData.id || this.rowData.reid
      }
      this.$get('/Renew.do?renewdetail', {
        reid: this.rowData.id || this.rowData.reid
      }).then(res => {
        this.baseInfo = res.data[0].data
        this.moneyDetail = res.data[1].data
        let realTotal = 0
        let djqTotal = 0
        let applyTotal = 0
        this.moneyDetail.push({ mark: 'last' })
        this.moneyDetail.forEach((val, index) => {
          realTotal += val.receive_money || 0
          if (val.type < 500) {
            djqTotal += val.truevalue || 0
            if (val.add_money > 0) {
              applyTotal += val.add_money || 0
            } else {
              applyTotal += (val.value || 0) + (val.truevalue || 0)
            }
          }
        })
        this.moneyDetail.forEach((val, index) => {
          val._type = '总计'
          val.realTotal = realTotal
          val.djqTotal = djqTotal
          val.applyTotal = applyTotal
        })
      })
    },
    check (type) {
      let params = {
        checkresult: type,
        reid: this.rowData.id,
        remark: this.checkRemark,
        addtype: this.baseInfo.addtype,
        usemoney: this.baseInfo.usemoney,
        accountid: this.baseInfo.accountid
      }
      this.$post('/Renew.do?checkrenew', params).then(res => {
        if (res.data.success) {
          this.$emit('closeRenewDetailDialog')
        }
      })
    },
    addCheckRemark () {
      let params = {
        reid: this.baseInfo.id,
        checkRemark: this.subRemark
      }
      this.$post('/Renew.do?checkrenew', params).then(res => {
        if (res.data.success) {
          this.$emit('closeRenewDetailDialog')
        }
      })
    },
    updateInreList (res) {
      this.inreList = res.data[0].data
    },
    updateRecordList (res) {
      this.recordList = res.data[0].data
    }
  },
  components: {
    Page
  }
}
</script>

<style lang="less">
.renew-detail {
  .splited-col {
    padding: 0;
    > div.cell {
      padding: 0;
    }
  }
  .split-item {
    table {
      border: 0;
      td,
      th.is-leaf {
        border: 0;
      }
    }
    .split-item-col {
      padding: 2px 0;
      border-bottom: 1px solid #000;
    }
  }
}
</style>

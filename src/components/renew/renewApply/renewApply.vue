<template>
  <div class="renew-apply component-container media-padding">
    <el-form :model="form" ref="form" :rules="rules" :label-width="leftLabelWidth">
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="公司名称 :" prop="comName">
            <el-input v-model="form.comName" disabled class="input-btn"></el-input>
            <el-button @click.native="selCompanyDialog = true" type="primary">选 择</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="流水 :">
            <el-button @click.native="selFlow" type="primary">选 择</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24">
          <el-form-item label="流水信息 :">
            <el-table border :data="flows" style="max-width: 400px;">
              <el-table-column prop="code_desc" label="到款方式">
              </el-table-column>
              <el-table-column prop="" label="到款时间" width="135">
                <span slot-scope="scope">{{scope.row.tm | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="" label="金额">
                <span slot-scope="scope">{{scope.row.split_amount | currency1}}</span>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 新旧合同 -->
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="合同编号:">
            <el-tabs v-model="contractTab" @tab-click="handleTabClick">
              <el-tab-pane label="新合同" name="new">
                <el-row :gutter="5" type="flex" style="flex-wrap:wrap;">
                  <el-col :md="8">
                    <el-select v-model="form.bdOrderNumber" placeholder="百度推广服务订单编号">
                      <el-option label="百度推广服务合同" value="0"></el-option>
                      <el-option v-for="contract0 in contract.newBdOrderNumber" :key="contract0.id" :label="contract0.number" :value="contract0.id"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="旧合同" name="old">
                <el-row :gutter="5" type="flex" style="flex-wrap:wrap;">
                  <el-col :md="8">
                    <el-select v-model="form.bdOrderNumber" placeholder="百度推广服务订单编号">
                      <el-option label="百度推广服务订单编号" value="0"></el-option>
                      <el-option v-for="contract1 in contract.bdOrderNumber" :key="contract1.id" :label="contract1.number" :value="contract1.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :md="8">
                    <el-select v-model="form.bdProxy" @change="selProxy(form.bdProxy)" placeholder="百度推广首消授权书">
                      <el-option label="百度推广首消授权书" value="0"></el-option>
                      <el-option label="无首消授权书" value="no_proxy20180625160112"></el-option>
                      <el-option v-for="contract2 in contract.bdProxy" :key="contract2.id" :label="contract2.number" :value="contract2.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :md="8">
                    <el-select v-model="form.bdServiceProtocol" placeholder="百度推广服务协议">
                      <el-option label="百度推广服务协议" value="0"></el-option>
                      <el-option v-for="contract3 in contract.bdServiceProtocol" :key="contract3.id" :label="contract3.number" :value="contract3.id"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="值班加款 :" prop="holiday">
            <el-radio v-model="form.holiday" label="10">是</el-radio>
            <el-radio v-model="form.holiday" label="0">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="加款类型 :" prop="addType">
            <el-radio v-model="form.addType" label="10">正常加款</el-radio>
            <el-radio v-model="form.addType" label="20">提前加款</el-radio>
            <el-radio v-model="form.addType" label="30">返款加款</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="特殊情况 :">
            <el-radio v-model="form.special" label="20">渠道</el-radio>
            <el-radio v-model="form.special" label="30">分公司</el-radio>
            <span class="red ml10px">( 请慎重选择此项！)</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="是否需要发票 :" prop="isNeedInvoice">
            <el-radio v-model="form.isNeedInvoice" label="-10">不再需要</el-radio>
            <el-radio v-model="form.isNeedInvoice" label="-1">本月暂不需要</el-radio>
            <el-radio v-model="form.isNeedInvoice" label="0">需要(有效期3个月)</el-radio>
            <el-radio v-model="form.isNeedInvoice" label="10">已开</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="选择提前发票 :">
            <el-button @click.native="selAheadInvoice" type="primary">选 择</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="发票信息 :">
            <el-table stripe border :data="handleSelInvoice">
              <el-table-column prop="tnumber" label="单据号码" width="100">
              </el-table-column>
              <el-table-column prop="companyname" label="购方名称(发票公司名)" min-width="150">
              </el-table-column>
              <el-table-column prop="chargename" label="货物名称" min-width="140">
              </el-table-column>
              <el-table-column prop="" label="发票金额" width="100">
                <span slot-scope="scope">{{scope.row.tmoney | currency}}</span>
              </el-table-column>
              <el-table-column prop="" label="已销金额" width="100">
                <span slot-scope="scope">{{scope.row.receive_money | currency}}</span>
              </el-table-column>
              <el-table-column prop="" label="未销金额" width="100">
                <span slot-scope="scope">{{scope.row.tmoney - scope.row.receive_money | currency}}</span>
              </el-table-column>
              <el-table-column prop="ttype" label="发票类型">
                <span slot-scope="scope">{{scope.row.ttype | invoiceState('invoiceKind')}}</span>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="垫款证明 :">
            <up-file @fileUrl="getFileUrl" :listType="'picture'" style="display:inline-block;"></up-file>
            <a @click="exportBankFlow" href="javascript:void(0)" class="a-search-number tipfont fa fa-download">点击下载模板</a>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="百度账号 :">
            <el-input v-model="form.bdAccount" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="用户ID :">
            <el-input v-model="form.userID" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="SF账号 :">
            <el-input v-model="form.sfAccount" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="产品类型 :" prop="selProList">
            <el-checkbox-group @change="handleProChange" v-model="form.selProList">
              <el-checkbox v-for="item in form.productList" :key="item.id" :label="item.code_val">
                {{item.code_desc}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(pro,index) in productMoneyList" :key="index" :gutter="20" class="maxwidth">
        <el-col :md="12">
          <el-form-item :label="pro.code_desc">
            <el-input v-model="pro.value">
              <span slot="prepend">¥</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="代金券/返款金额 :">
            <el-input v-model="pro.truevalue">
              <span slot="prepend">¥</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="服务费 :" prop="serviceMoney">
            <el-input v-model="form.serviceMoney" placeholder="服务费"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="服务费期限 :"  prop="serviceYear">
            <el-input v-model="form.serviceYear" placeholder="服务费期限">
              <template slot="append">年</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="到款总金额 :">
            <span>{{receiveTotal | currency1}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="加款总金额 :">
            <span>{{addTotal | currency1}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.addType == 20">
        <el-col :md="24" class="maxwidth">
          <el-form-item label="预计还款时间 :" :prop="form.addType==20?'expectTime':''">
            <el-date-picker v-model="form.expectTime" value-format="yyyy/MM/dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.special == 30">
        <el-col :md="24" class="maxwidth">
          <el-form-item label="分公司到款时间 :" prop="receiveTime">
            <el-date-picker v-model="form.receiveTime" value-format="yyyy/MM/dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="填写备注 :">
            <el-input v-model="form.remark" rows="3" type="textarea" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth" style="text-align:right">
          <el-form-item>
            <el-button type="primary" @click.native="subApply('form')">提 交</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 续费审核记录 -->
    <div v-if="isEdit" class="maxwidth">
      <el-table stripe border :data="checkRecords">
        <el-table-column prop="" label="操作时间" width="135">
          <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="name" label="操作人" width="100">
        </el-table-column>
        <el-table-column prop="record" label="操作记录" width="100">
        </el-table-column>
        <el-table-column prop="remark" label="处理备注">
        </el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="checkRecordsUrl" :sendParams="checkRecordsParams" @updateList="getRecordsList"></page>
    </div>

    <!-- 选择公司弹窗 -->
    <el-dialog title="选择公司" :visible.sync="selCompanyDialog" width="550px">
      <el-input @click.native="searchService($event)" @keyup.enter.native="searchService($event,'enter')" v-model="companyName" placeholder="搜索公司名">
        <span slot="append" class="search-service">搜索</span>
      </el-input>
      <el-table id="cus-out-table" :data="companyList" class="table-width">
        <el-table-column prop="name" label="公司名称" min-width="140">
        </el-table-column>
        <el-table-column prop="baiducount" label="百度账号">
        </el-table-column>
        <el-table-column prop="" label="操作" width="60">
          <template slot-scope="scope">
            <el-button @click.native="selCompany(scope.row)" type="primary" class="xsbtn">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="companyUrl" :sendParams="companyParams" @updateList="getCompanyList"></page>
    </el-dialog>

    <!-- 选择流水弹窗 -->
    <el-dialog :modal-append-to-body="false" title="选择流水" :visible.sync="selFlowDialog" width="700px">
      <el-table @selection-change="handleSelectionChange" stripe border :data="selFlowList" max-height="500">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="code_desc" label="银行类型" width="80">
        </el-table-column>
        <el-table-column prop="" label="交易时间" width="90">
          <span slot-scope="scope">{{scope.row.tm | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="fm_name" label="付款名" min-width="140">
        </el-table-column>
        <el-table-column prop="" label="金额" width="100">
          <span slot-scope="scope">{{scope.row.split_amount | currency}}</span>
        </el-table-column>
        <el-table-column prop="alloc_remark" label="备注">
        </el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="selFlowUrl" :sendParams="selFlowParams" @updateList="getFlowList"></page>
      <div class="text-right mt10px">
        <el-button @click.native="confirmSelFlowDialog" type="primary">确定</el-button>
      </div>
    </el-dialog>

    <!-- 选择提前发票弹窗 -->
    <el-dialog :modal-append-to-body="false" title="选择发票" :visible.sync="selInvoiceDialog" width="700px">
      <el-table @selection-change="handleInvoiceChange" stripe border :data="invoiceList">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="tnumber" label="单据号码" width="100">
        </el-table-column>
        <el-table-column prop="companyname" label="购方名称(发票公司名)" min-width="120">
        </el-table-column>
        <el-table-column prop="chargename" label="货物名称" min-width="140">
        </el-table-column>
        <el-table-column prop="" label="发票金额" width="100">
          <span slot-scope="scope">{{scope.row.tmoney | currency}}</span>
        </el-table-column>
        <el-table-column prop="" label="已销金额" width="100">
          <span slot-scope="scope">{{scope.row.receive_money | currency}}</span>
        </el-table-column>
        <el-table-column prop="" label="未销金额" width="100">
          <span slot-scope="scope">{{scope.row.tmoney - scope.row.receive_money | currency}}</span>
        </el-table-column>
        <el-table-column prop="ttype" label="发票类型">
          <span slot-scope="scope">{{scope.row.ttype | invoiceState('invoiceKind')}}</span>
        </el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="selInvoiceUrl" :sendParams="selInvoiceParams" @updateList="getInvoiceList"></page>
      <div class="text-right mt10px">
        <el-button @click.native="selInvoiceDialog = false" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Page from 'base/page/page'
import { getByCode, getMyContract } from 'api/getOptions'
import cookie from 'js-cookie'
import UpFile from 'base/upLoad/upFile'
import { productType } from 'common/js/filters' //eslint-disable-line
export default {
  computed: {
    receiveTotal () {
      let sum = 0
      this.flows.forEach(val => {
        sum += parseFloat(val.split_amount || 0)
      })
      return sum
    },
    addTotal () {
      let sum = 0
      this.productMoneyList.forEach(val => {
        sum += parseFloat(val.value || 0)
      })
      return sum
    },
    truevalueTotal () {
      let sum = 0
      this.productMoneyList.forEach(val => {
        sum += parseFloat(val.truevalue || 0)
      })
      return sum
    },
    checkRecordsParams () {
      return {
        'reid': this.ids.reid
      }
    }
  },
  data () {
    return {
      USER_ID: cookie.get('userId'),
      leftLabelWidth: '130px',
      form: {
        comName: '',
        addType: '10',
        special: '',
        isNeedInvoice: '',
        bdAccount: '',
        userID: '',
        sfAccount: '',
        productType: [],
        serviceMoney: '0',
        serviceYear: '0',
        remark: '',
        holiday: '0',
        productList: [],
        selProList: [],
        receiveTime: '',
        expectTime: ''
      },
      selCompanyDialog: false,
      companyName: '',
      companyList: [],
      companyUrl: '/Renew.do?get',
      companyParams: {},
      companyid: '',
      selFlowDialog: false,
      selFlowList: [],
      selFlowUrl: '/receipt.do?searchbankclaim',
      selFlowParams: {
        companyid: ''
      },
      rowData: {},
      handleSelFlow: [],
      flowIdArr: [],
      flowArr: [],

      contractTab: 'new',
      contract: {
        newBdOrderNumber: [],
        bdOrderNumber: [],
        bdProxy: [],
        bdServiceProtocol: [],
        bdXXLProtocol: [],
        wjContract: []
      },

      selInvoiceDialog: false,
      invoiceList: [],
      selInvoiceUrl: '/Invoice.do?advanceInvoice',
      selInvoiceParams: {},
      handleSelInvoice: [],
      invoiceIdArr: [],
      fileUrl: '',
      productMoneyList: [],
      detail: {},
      pro: [],
      flows: [],
      ids: {},
      checkRecords: [],
      checkRecordsUrl: '/Renew.do?renewrecord',
      isEdit: false,

      rules: {
        holiday: [],
        addType: [],
        isNeedInvoice: [],
        selProList: [],
        serviceMoney: [],
        serviceYear: [],
        expectTime: [],
        receiveTime: []
      }
    }
  },
  created () {
    this.isEdit = this.$route.query.edit || false
    this._getEditData(this.isEdit)
    let specialRules = {
      comName: [{ required: true, message: '请选择公司', trigger: 'blur' }]
    }
    for (let key in this.rules) {
      this.rules[key].push({ required: true, message: '请填写必填项', trigger: 'blur' })
    }
    this.rules = Object.assign({}, this.rules, specialRules)
    let viewWidth = document.documentElement.clientWidth
    if (viewWidth && viewWidth < 768) {
      this.leftLabelWidth = '50px'
    }
    getByCode(38).then(res => {
      this.form.productList = res.data.data
    })
  },
  mounted () {
    this._getMyContract()
  },
  methods: {
    // 编辑
    _getEditData (bool) {
      if (!bool) {
        return
      }
      this.ids = this.$route.query.ids
      if (!this.ids.reid) {
        this.$router.push('/indexPage/renewList')
        return
      }
      this.detail = this.$route.query.detail
      this.pro = this.$route.query.pro
      this.flows = this.$route.query.flows
      this.form = {
        comName: this.detail.companyname,
        addType: this.detail.addtype + '',
        special: this.detail.special,
        isNeedInvoice: this.detail.invoice + '',
        bdAccount: this.detail.baidu_account,
        userID: this.detail.baidu_id,
        sfAccount: this.detail.proxy_id,
        productType: [],
        serviceMoney: this.detail.servicemoney,
        serviceYear: this.detail.serviceyear,
        remark: this.detail.remark,
        holiday: this.detail.holiday + '',
        productList: [],
        selProList: [],
        receiveTime: this.detail.receive_time,
        expectTime: this.detail.offset_time
      }
      console.log(this.pro)
      this.pro.forEach(item => {
        this.form.selProList.push(item.type)
        this.productMoneyList.push({
          id: null,
          code_val: item.type,
          code_desc: productType(item.type, ' :'),
          type: item.type,
          value: item.value,
          truevalue: item.truevalue
        })
      })
    },
    getRecordsList (res) {
      this.checkRecords = res.data[0].data
    },
    subApply (formName) {
      let hasValue = this.productMoneyList.every(val => {
        return val.value > 0
      })
      if (!hasValue) {
        this.$message.error('请填写所勾选产品的金额！')
        return
      }
      if (this.receiveTotal.toFixed(2) !== this.addTotal.toFixed(2)) {
        this.$message.error('下单金额与到款总金额不匹配！')
        return
      }
      if (this.truevalueTotal > 0 && !this.form.remark) {
        this.$message.error('请填写备注！')
        return
      }
      let params = {
        prove_img: this.fileUrl,
        comName: this.form.comName,
        cpid: this.rowData.cpid,
        companylogid: this.rowData.companylogid,
        companyid: this.rowData.companyid, // 公司id
        claim: this.flowArr, // 流水id
        invoiceIds: this.invoiceIdArr, // 发票id
        addtype: this.form.addType, // 续费类型
        servicemoney: this.form.serviceMoney, // 服务费
        serviceyear: this.form.serviceYear, // 服务费年限
        remark: this.form.remark, // 备注
        activity: this.form.special, // 活动类型
        baiduAccount: this.form.bdAccount, // 百度账号
        baiduId: this.form.userID, // 用户ID
        proxyId: this.form.sfAccount, // 代理账号
        usemoney: this.addTotal, // 产品总额
        receiptmoney: this.receiveTotal, // 总到款
        renewdetail: this.productMoneyList,
        invoice_status: this.form.isNeedInvoice, // 发票状态
        holiday: this.form.holiday,
        special: this.form.special,
        receive_time: this.form.receiveTime,
        offsetTime: this.form.expectTime,
        con_id: this.form.bdOrderNumber || undefined, // 服务订单
        con_id2: this.form.bdProxy || undefined, // 首消授权书
        con_id3: this.form.bdServiceProtocol || undefined // 服务协议
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(params)
          // return
          this.$post('/Renew.do?apply', params).then(res => {
            if (res.data.success) {
              this.$router.push('/indexPage/renewList')
            }
          })
        } else {
          return false
        }
      })
    },
    getFileUrl (res) {
      this.fileUrl = res.url
    },
    // 下载垫款证明模板
    exportBankFlow () {
      let params = {
        receiveIds: this.flowIdArr.join(','),
        invoiceIds: this.invoiceIdArr.join(',')
      }
      this.$export('/Invoice.do?invoiceCushionProof', params)
    },
    // 勾选产品
    handleProChange (val) {
      this.productMoneyList = val.map(item => {
        return {
          id: null,
          code_val: item,
          code_desc: productType(item, ' :'),
          type: item,
          value: '0',
          truevalue: '0'
        }
      })
      console.log(this.productMoneyList)
    },
    // 勾选流水
    handleSelectionChange (val) {
      this.handleSelFlow = val
      val.forEach(item => {
        this.flowIdArr.push(item.id)
        this.flowArr.push({
          B_YHLX: item.code_val,
          id: item.bsaid,
          bkid: item.bkid,
          bsid: item.id,
          use: item.split_amount,
          fm_name: item.fm_name,
          brid: item.bsid
        })
      })
    },
    confirmSelFlowDialog () {
      this.selFlowDialog = false
      this.flows = this.flows.concat(this.handleSelFlow)
    },
    // 勾选发票
    handleInvoiceChange (val) {
      this.handleSelInvoice = val
      val.forEach(val => {
        this.invoiceIdArr.push(val.id)
      })
    },
    selFlow () {
      this.selFlowDialog = true
      this.selFlowParams = {
        companyid: this.rowData.companyid
      }
    },
    selAheadInvoice () {
      this.selInvoiceDialog = true
      this.selInvoiceParams = {
        comName: this.form.comName
      }
    },
    selCompany (val) {
      this.rowData = val
      this.selCompanyDialog = false
      this.form.comName = val.name
      this.form.bdAccount = val.baiducount
      this.form.userID = val.baiduid
      this.form.sfAccount = val.proxyid
    },
    searchService (e, type) {
      if (type === 'enter' || e.target.nodeName !== 'INPUT') {
        this.companyParams = {
          companyname: this.companyName
        }
      }
    },
    // 新旧合同切换
    handleTabClick (val) {
    },
    _getMyContract () {
      getMyContract('CONTRACT_BJHT', this.USER_ID).then(res => {
        this.contract.newBdOrderNumber = res.data[0].data
      })
      getMyContract('CONTRACT_BTDD', this.USER_ID).then(res => {
        this.contract.bdOrderNumber = res.data[0].data
      })
      getMyContract('CONTRACT_BTSQ', this.USER_ID).then(res => {
        this.contract.bdProxy = res.data[0].data
      })
      getMyContract('CONTRACT_BTXY', this.USER_ID).then(res => {
        this.contract.bdServiceProtocol = res.data[0].data
      })
    },
    getCompanyList (res) {
      this.companyList = res.data[0].data
    },
    getFlowList (res) {
      this.selFlowList = res.data[0].data
    },
    getInvoiceList (res) {
      this.invoiceList = res.data[0].data
    }
  },
  components: { Page, UpFile }
}
</script>

<style lang="less" scoped>
.renew-apply {
  .maxwidth {
    max-width: 800px;
  }
  .input-btn {
    width: calc(~'(100% - 70px)');
  }
  .search-service {
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
</style>

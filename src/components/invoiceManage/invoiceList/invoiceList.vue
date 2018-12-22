<template>
  <div class="incoice-list-component component-container media-padding">
    <div class="visit-search mt-10px">
      <up-file v-if="permissions.indexOf('53') > -1 && (mark==='list' || mark==='handled')" :title="'导入'" :upIcon="'fa fa-cloud-download'" :uploadUrl="serverUrl+'/Invoice.do?import'"  :isHiddenFileList="true" :otherParams="{'code': '50', 'tk': tk}" class="visit-item"></up-file>
      <el-button @click.native="exportExcellHandled" v-if="mark==='handled'" icon="fa fa-cloud-upload" type="info" class="visit-item"> 导出Excell</el-button>
      <el-button @click.native="exportExcellSend" v-if="permissions.indexOf('7c') > -1 && mark==='list'" type="warning" icon="fa fa-cloud-upload" class="visit-item"> 寄发票导出Excell</el-button>

      <el-button @click.native="exportTxt" v-if="permissions.indexOf('50') > -1 && mark==='pending'" type="primary" class="visit-item" icon="fa fa-cloud-upload"> 导出txt</el-button>
      <el-button @click.native="exportExcell" v-if="permissions.indexOf('51') > -1 && mark==='pending'" type="warning"  icon="fa fa-cloud-upload" class="visit-item"> 导出Excell</el-button>
      <span v-if="mark==='list'" class="visit-item tipfont fa fa-search" style="line-height:34px;color:#06c;">
        <a href="http://www.kuaidi100.com/?from=openv" target="_blank" class="a-search-number"> 查询快递单号</a>
      </span>
    </div>
    <div class="visit-search">
      <el-input v-model="baoAName" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">保A公司名:</template>
      </el-input>
      <el-input v-model="invoiceName" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">发票公司名:</template>
      </el-input>
      <el-input v-model="num" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">单据号码:</template>
      </el-input>
      <el-input v-model="bdAccount" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">百度账号:</template>
      </el-input>
      <el-input v-model="applyName" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">申请人:</template>
      </el-input>
      <auto-select :key="key_invoice_type" title="发票类型" defaultValue="100" v-model="invoiceType" id="visit-status" class="visit-item item-width">
        <el-option label="全部" value="100"></el-option>
        <el-option label="电子普票" value="11"></el-option>
        <el-option label="纸质普票" value="10"></el-option>
        <el-option label="专票" value="20"></el-option>
      </auto-select>
      <auto-select :key="key_ahead_invoice" title="提前开票" defaultValue="100" v-model="aheadInvoice" id="visit-status" class="visit-item item-width">
        <el-option label="全部" value="100"></el-option>
        <el-option label="正常" value="10"></el-option>
        <el-option label="提前" value="20"></el-option>
      </auto-select>
      <auto-select :key="key_invoice_state" title="发票状态" defaultValue="100" v-model="invoiceState" id="visit-status" class="visit-item item-width">
        <el-option label="全部" value="100"></el-option>
        <el-option label="待开" value="0"></el-option>
        <el-option label="已开" value="10"></el-option>
        <el-option label="寄出" value="20"></el-option>
      </auto-select>
      <auto-select v-if="mark==='send'" :key="key_tnumber_state" title="单号状态" defaultValue="100" v-model="tnumberState" id="visit-status" class="visit-item item-width">
        <el-option label="全部" value="100"></el-option>
        <el-option label="未填写快递单号" value="0"></el-option>
        <el-option label="已填写快递单号" value="10"></el-option>
      </auto-select>
      <el-date-picker v-model="applyDate" format="yyyy/MM/dd HH:mm" value-format="yyyy/MM/dd HH:mm" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="申请时间" end-placeholder="申请时间" class="visit-item" style="width:310px;"></el-date-picker>
      <div class="visit-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
      <div class="visit-item export">
        <el-button v-if="permissions.indexOf('87')>-1 && mark==='list'" @click.native="changeUser" type="primary">更换责任人</el-button>
      </div>
    </div>

    <!-- 已处理和邮寄发票列表 -->
    <div v-if="mark==='send' || (mark==='handled'&&permissions.indexOf('7c') > -1)">
      <el-table stripe border :data="invoiceList" max-height="550" class="table-width">
        <el-table-column prop="tnumber" label="销售单据编号" width="110">
        </el-table-column>
        <el-table-column prop="ttype" label="发票种类" width="80">
          <span slot-scope="scope">{{scope.row.ttype | invoiceState('invoiceKind')}}</span>
        </el-table-column>
        <el-table-column prop="invoicecode" label="发票代码" width="100">
        </el-table-column>
        <el-table-column prop="invoicenumber" label="发票号码" width="100">
        </el-table-column>
        <el-table-column prop="companyname" label="购方名称" min-width="150">
        </el-table-column>
        <el-table-column prop="invoicetime" label="开票日期" width="100">
          <span slot-scope="scope">{{scope.row.invoicetime | timeFormat1}}</span>
        </el-table-column>
        <el-table-column prop="tmoney" label="总金额" width="120">
          <span slot-scope="scope">{{scope.row.tmoney | currency}}</span>
        </el-table-column>
        <el-table-column prop="invoicecode" label="主要商品名称" width="100">
          <span slot-scope="scope">{{scope.row.chargetype+'' | invoiceState('invoiceMoneyType')}}</span>
        </el-table-column>
        <el-table-column prop="baiducount" label="百度账号" width="120">
        </el-table-column>
        <el-table-column prop="applyusername" label="申请人" width="130">
          <template slot-scope="scope">
            <span>{{scope.row.applyusername}}</span>
            <span v-if="scope.row.true_name != scope.row.applyusername">{{'('+scope.row.true_name+')'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="taddr" label="收货地址" min-width="150">
        </el-table-column>
        <el-table-column prop="tname" label="收件人姓名" width="100">
        </el-table-column>
        <el-table-column prop="tmobile" label="收件人电话" width="110">
        </el-table-column>
        <el-table-column prop="tphone" label="收件人手机" width="110">
        </el-table-column>
        <el-table-column prop="" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <div v-if="mark==='handled'">
              <el-button @click.native="view(scope.row)" type="success" class="xsbtn">查看</el-button>
              <el-button @click.native="moreCancle(scope.row)" type="warning" class="xsbtn">开多废除</el-button>
            </div>
            <div v-if="mark==='send'">
              <el-button @click.native="writeTnumber(scope.row)" v-if="permissions.indexOf('6h') >-1" type="primary" class="xsbtn">填写快递单号</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 公用列表 -->
    <div v-if="mark==='list' || mark==='pending' || (mark==='handled'&&permissions.indexOf('7c') < 0)">
      <el-table :key="key_table" border :data="invoiceList" class="table-width" id="invoice-list-table" max-height="500">
        <el-table-column prop="banktype" :fixed="fixed" label="银行类型" width="80">
        </el-table-column>
        <el-table-column prop="tm" label="交易时间" :fixed="fixed" width="100">
          <span slot-scope="scope">{{scope.row.tm | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="fm_name" label="付款公司名" :fixed="fixed" width="120">
        </el-table-column>
        <el-table-column prop="bsremark" label="备注" :fixed="fixed" width="120">
        </el-table-column>
        <el-table-column prop="amount" label="交易金额" :fixed="fixed" width="110">
          <span slot-scope="scope">{{scope.row.amount | currency}}</span>
        </el-table-column>
        <el-table-column prop="bsid" label="bsid" :fixed="fixed" width="50" show-overflow-tooltip>
        </el-table-column>
        <!-- 此处dom有合并，但数据并没有合并，故用不了table的selection -->
        <el-table-column prop="id" label="选择" width="50" :fixed="fixed" align="center">
          <template slot-scope="scope">
            <el-checkbox @change="((val,$event)=>singleCheck(val,$event,scope.row))" :true-label="scope.row.id"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="tnumber" label="单据号码" width="110">
        </el-table-column>
        <el-table-column prop="applyusername" label="申请人" width="90">
        </el-table-column>
        <el-table-column prop="baiducount" label="百度账户" width="100">
        </el-table-column>
        <el-table-column prop="companyname" label="购方名称(发票公司名)" width="150">
        </el-table-column>
        <el-table-column prop="cName" label="保A公司名" width="150">
        </el-table-column>
        <el-table-column prop="chargetype" label="货物名称" width="100">
          <span slot-scope="scope">{{scope.row.chargetype+'' | invoiceState('invoiceMoneyType')}}</span>
        </el-table-column>
        <el-table-column prop="tmoney" label="总金额" width="120">
          <span slot-scope="scope">{{scope.row.tmoney | currency}}</span>
        </el-table-column>
        <el-table-column prop="ttype" label="发票类型" width="90">
          <span slot-scope="scope">{{scope.row.ttype==11?'电子普票':
            scope.row.ttype==10?'纸质普票':'专票'}}</span>
        </el-table-column>
        <el-table-column prop="is_advance" label="提前开票" width="80">
          <span slot-scope="scope">{{scope.row.is_advance==20?'是':'否'}}</span>
        </el-table-column>
        <el-table-column prop="" label="状态" width="100">
          <template slot-scope="scope">
            <el-button plain :type="scope.row.step==300?'success':scope.row.step==0?'danger':scope.row.step<=40?'info':''" class="xsbtn">{{scope.row.step==300?'审核通过':scope.row.stepName}}</el-button>
            <el-button v-if="scope.row.step==300&&scope.row.invoice==0" plain type="warning" class="xsbtn">待开</el-button>
            <el-button v-if="scope.row.invoice==1" plain type="warning" class="xsbtn">正在开</el-button>
            <el-button v-if="scope.row.invoice==10" plain type="warning" class="xsbtn">已开</el-button>
            <el-button v-if="scope.row.invoice==20" plain type="warning" class="xsbtn">寄出</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <el-button type="primary" size="mini">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="text-center">
                <el-dropdown-item>
                  <el-button @click.native="view(scope.row)" type="success" class="xsbtn">查看</el-button>
                </el-dropdown-item>
                <el-dropdown-item divided v-if="permissions.indexOf('52') > -1&&mark==='pending'">
                  <el-button @click.native="editInvoice(scope.row)" type="warning" class="xsbtn">编辑</el-button>
                </el-dropdown-item>
                <el-dropdown-item divided v-if="mark==='pending'">
                  <el-button @click.native="del(scope.row)" type="danger" class="xsbtn">删除</el-button>
                </el-dropdown-item>
                <el-dropdown-item divided v-if="scope.row.step < 300 && scope.row.hasinvoice == 0 && permissions.indexOf('52') > -1 && mark==='list'">
                  <el-button @click.native="del(scope.row)" type="danger" class="xsbtn">删除</el-button>
                </el-dropdown-item>
                <el-dropdown-item divided v-if="scope.row.hasinvoice>=10" @click.native="moreCancle(scope.row)">
                  <el-button type="warning" class="xsbtn">开多废除</el-button>
                </el-dropdown-item>
                <el-dropdown-item divided v-if="scope.row.is_advance == 20 && scope.row.receive_money < scope.row.tmoney && mark==='list'" >
                  <el-button @click.native="repayment(scope.row)" type="primary" class="xsbtn">还款</el-button>
                </el-dropdown-item>
                <el-dropdown-item divided v-if="scope.row.hasinvoice >= 10 && permissions.indexOf('7d')>-1">
                  <el-button @click.native="errorRed(scope.row)" type="warning" class="xsbtn">发票开错冲红</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <page class="page" :url="invoiceListUrl" :sendParams="params[mark+'Params']" @updateList="updateInvoiceList"></page>

    <!-- 人员选择弹窗 -->
    <el-dialog :modal-append-to-body="false" title="人员选择" :visible.sync="selUserDialog" width="550px">
      <select-user @userId="getUserId" @closeDialog="closeUserDialog"></select-user>
    </el-dialog>

    <!-- 确定选择弹窗 -->
    <el-dialog :title="'确定更换为：'+ selUserName + ' ?'" :visible.sync="confirmUserDialog" width="550px">
      <el-input v-model="remark" type="textarea" :rows="3"></el-input>
      <div class="text-center mt10px">
        <el-button type="primary" @click.native="confirmSel">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 发票信息弹窗 -->
    <el-dialog :key="key_invoice_dialog" title="发票信息" :visible.sync="invoiceDialog" width="850px">
      <invoice-info-dialog :form="form" :invoiceLogs="invoiceLogs"   :isShowBtn="isShowBtn" @closeInvoiceDialog="invoiceDialog=false"></invoice-info-dialog>
    </el-dialog>

    <!-- 还款弹窗 -->
    <el-dialog title="还款" :visible.sync="repaymentDialog" width="600px">
      <div class="prove-wrapper">
        <img :src="form.prove_img" width="50px" height="50px" alt="">
        <up-file @fileUrl="getFileUrl" :listType="'picture'" class="ml10px mr10px"></up-file>
        <!-- <up-file @fileUrl="getFileUrl" :listType="'picture'" style="display:inline-block;"></up-file> -->
        <a @click="exportBankFlow" href="javascript:void(0)" class="a-search-number tipfont fa fa-download">点击下载模板</a>
      </div>
      <el-table @selection-change="handleFlowSelectionChange" stripe border :data="repaymentList" class="table-width">
        <el-table-column type="selection" width="45">
        </el-table-column>
        <el-table-column prop="companyname" label="公司名" width="150">
        </el-table-column>
        <el-table-column prop="baidu_account" label="百度账户" width="80">
        </el-table-column>
        <el-table-column prop="inserttime" label="申请时间" width="150">
          <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="receiptmoney" label="到账金额" width="100">
          <span slot-scope="scope">{{scope.row.receiptmoney | currency}}</span>
        </el-table-column>
        <el-table-column prop="" label="提单金额" width="100">
          <span slot-scope="scope">{{scope.row.usemoney+scope.row.servicemoney+scope.row.usevoucher | currency}}</span>
        </el-table-column>
        <el-table-column prop="username" label="申请人" width="100">
        </el-table-column>
      </el-table>
      <page class="page" :url="repaymentUrl" :sendParams="repaymentParams" @updateList="updateRepaymentList"></page>
      <div class="text-center mt10px">
        <el-button @click.native="confirmFlow" type="success">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 快递单号弹窗 -->
    <el-dialog title="快递单号" :visible.sync="tnumberDialog" width="400px">
      <el-form :model="tnumberForm" label-width="100px">
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="快递单号 :" required>
              <el-input v-model="tnumberForm.express_no"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="快递时间 :">
              <el-date-picker v-model="tnumberForm.express_time" value-format="yyyy/MM/dd HH:mm" type="datetime" style="width:100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="快递备注 :">
              <el-input type="textarea" v-model="tnumberForm.express_remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="text-center">
          <el-button type="primary" @click.native="subTnumber">提 交</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 发票开错冲红弹窗 -->
    <el-dialog :modal-append-to-body="false" :title="makeInvoiceTitle" :visible.sync="makeInvoiceDialog" width="900px">
      <make-invoice-dialog
        @closeDialog="makeInvoiceDialog=false"
        :key="key_make_invoice"
        :echoData="echoData"
        :makeInvoiceStatus="makeInvoiceStatus"
        :offset="offset"
      >
      </make-invoice-dialog>
    </el-dialog>
  </div>
</template>

<script>
import InvoiceInfoDialog from 'components/invoiceManage/invoiceList/invoiceInfoDialog'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectUser from 'base/selectUser/selectUser'
import elDragDialog from '@/directive/el-dragDialog' // eslint-disable-line
import UpFile from 'base/upLoad/upFile'
import Page from 'base/page/page'
import { rowSpan } from 'common/js/utils'
import cookie from 'js-cookie'
import { serverUrl } from 'api/http'
import { timeFormat } from 'common/js/filters'
import MakeInvoiceDialog from 'components/makeInvoice/makeInvoiceDialog'
export default {
  directives: { elDragDialog },
  props: {
    fixed: {
      type: Boolean,
      default: true
    },
    mark: {
      type: String,
      default: 'list'
    }
  },
  data () {
    return {
      serverUrl: serverUrl,
      tk: cookie.get('token'),
      permissions: cookie.getJSON('permissions'),
      baoAName: '',
      invoiceName: '',
      num: '',
      bdAccount: '',
      applyName: '',
      key_invoice_type: '1',
      key_ahead_invoice: '2',
      key_invoice_state: '3',
      key_tnumber_state: '4',
      invoiceType: '100',
      aheadInvoice: '100',
      invoiceState: '100',
      tnumberState: '100',
      applyDate: [],

      key_table: '',
      invoiceList: [],
      invoiceListUrl: '/Invoice.do?invoicelist',
      params: {
        listParams: {
          invoicetype: 100,
          hasinvoice: 100
        },
        handledParams: {
          invoicetype: 100,
          hasinvoice: 10
        },
        pendingParams: {
          invoicetype: 100,
          hasinvoice: 0
        },
        sendParams: {
          invoicetype: 100,
          expressType: 100,
          hasinvoice: 20
        }
      },
      multipleSelection: [],
      selUserDialog: false,
      selUserId: '',
      selUserName: '',
      confirmUserDialog: false,
      remark: '',

      invoiceDialog: false,
      form: {},
      invoiceLogs: [],
      key_invoice_dialog: '5',

      repaymentDialog: false,
      repaymentUrl: '/Renew.do?renewapplylist',
      repaymentParams: {},
      repaymentList: [],
      flowSelectArr: [],
      flowRowData: {},

      tnumberDialog: false,
      tnumberForm: {
        express_no: '',
        express_time: '',
        express_remark: ''
      },
      makeInvoiceDialog: false,
      key_make_invoice: '50',
      echoData: [],
      makeInvoiceTitle: '',
      makeInvoiceStatus: '',
      offset: '',
      isShowBtn: false
    }
  },
  methods: {
    search () {
      this.params[this.mark + 'Params'] = {
        expressType: this.tnumberState,
        companyname: this.baoAName,
        invoicecname: this.invoiceName,
        applyuser: this.applyName,
        baiduAccount: this.bdAccount,
        advance: this.aheadInvoice,
        hasinvoice: this.mark === 'send' ? '20' : this.invoiceState,
        tnumber: this.num,
        invoicetype: this.invoiceType,
        starttime: this.applyDate[0],
        endtime: this.applyDate[1]
      }
    },
    reset () {
      this.baoAName = ''
      this.invoiceName = ''
      this.num = ''
      this.applyName = ''
      this.bdAccount = ''
      this.aheadInvoice = '100'
      this.invoiceState = '100'
      this.invoiceType = '100'
      this.expressType = '100'
      this.key_invoice_type = new Date() + '1'
      this.key_ahead_invoice = new Date() + '2'
      this.key_invoice_state = new Date() + '3'
      this.key_tnumber_state = new Date() + '4'
      this.applyDate = []
    },
    // 查看
    view (data) {
      this.key_invoice_dialog = new Date() + '5'
      this.$get('/Invoice.do?invoicebyid', { invoiceid: data.invoiceid }).then(
        res => {
          if (res.data[0].success) {
            this.form = res.data[0].data[0]
            this.invoiceLogs = res.data[1].data
            setTimeout(() => {
              this.invoiceDialog = true
            }, 100)
          }
        }
      )
    },
    // 编辑
    editInvoice(data) {
      this.isShowBtn = true
      this.key_invoice_dialog = new Date() + '5'
      this.$get('/Invoice.do?invoicebyid', { invoiceid: data.invoiceid }).then(
        res => {
          if (res.data[0].success) {
            this.form = res.data[0].data[0]
            this.invoiceLogs = res.data[1].data
            setTimeout(() => {
              this.invoiceDialog = true
            }, 100)
          }
        }
      )
    },
    // 删除
    del (data) {
      let params = {
        reid: data.reid,
        oid: data.oid,
        invoiceid: data.invoiceid,
        companylogid: data.companylogid,
        applyuid: data.applyuid,
        type: 0
      }
      this.$confirm('确定删除吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/Invoice.do?invoiceDel', params).then(res => {
            if (res.data.success) {
              this.$message.success('已删除！')
              this.search()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 开多废除
    moreCancle (data) {
      let params = {
        invoiceid: data.invoiceid,
        companylogid: data.companylogid,
        oid: data.oid,
        reid: data.reid,
        applyuid: data.applyuid,
        type: 10
      }
      this.$confirm('确定废除吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/Invoice.do?invoiceDel', params).then(res => {
            if (res.data.success) {
              this.$message.success('已废除！')
              this.search()
            } else {
              this.$message.error('废除失败！')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 发票开错冲红
    errorRed (data) {
      this._getInvoiceData(data, data.reid)
      this.key_make_invoice = new Date() + '50'
      this.makeInvoiceTitle = '发票开错冲红'
      this.makeInvoiceStatus = 10
      this.offset = 10
      setTimeout(() => {
        this.makeInvoiceDialog = true
      }, 200)
    },
    _getInvoiceData(data, reid = null) {
      let params = {
        reid: reid,
        companylogid: data.companylogid
      }
      this.$post('/Invoice.do?getInvoiceInfo', params).then(res => {
        if (res.data.success) {
          this.echoData = res.data.data[0]
          let productMoneyList = res.data.data[1]
          this.echoData[0].productMoneyList = productMoneyList
          if (!this.echoData[0].companyname) {
            this.echoData[0].companyname = this.echoData[0].comName
          }
        }
      })
    },
    // 还款
    repayment (data) {
      this.flowRowData = data
      this.repaymentParams = {
        companyName: data.cName,
        invoiceOffset: 'invoiceOffset',
        invoiceid: data.invoiceid
      }
      this.$get('/Invoice.do?invoicebyid', { invoiceid: data.invoiceid }).then(
        res => {
          if (res.data[0].success) {
            this.form = res.data[0].data[0]
          }
        }
      )
      this.repaymentDialog = true
    },
    exportBankFlow() {
      this.$export('/Invoice.do?invoiceCushionProof')
    },
    getFileUrl (res) {
      this.prove_img = res.response.url
    },
    // 还款确认
    confirmFlow () {
      if (this.flowSelectArr.length === 0) {
        this.$message.error('请至少勾选一笔续费！')
        return
      }
      let flowList = []
      this.flowSelectArr.forEach(val => {
        flowList.push(val.id)
      })
      let params = {
        invoiceId: this.flowRowData.invoiceid,
        reids: flowList,
        prove_img: this.prove_img,
        comName: this.flowRowData.cName
      }
      this.$post('/Invoice.do?invoiceOffset', params).then(res => {
        if (res.data.success) {
          this.repaymentDialog = false
          this.search()
        }
      })
    },
    // 填写快递单号
    writeTnumber (data) {
      this.tnumberDialog = true
      this.tnumberForm = {
        express_no: data.express_no,
        express_time: timeFormat(data.express_time),
        express_remark: data.express_remark
      }
    },
    subTnumber () {
      if (!this.tnumberForm.express_no) {
        this.$message.error('请填写快递单号！')
        return
      }
      this.$post('/Invoice.do?edit', this.tnumberForm).then(res => {
        if (res.data.success) {
          this.tnumberForm = {
            express_no: '',
            express_time: '',
            express_remark: ''
          }
          this.tnumberDialog = false
          this.search()
        }
      })
    },
    // 更换责任人
    changeUser () {
      if (!this.multipleSelection.length) {
        this.$message({
          type: 'error',
          message: '请勾选客户'
        })
        return
      }
      this.selUserDialog = true
    },
    getUserId (id, name) {
      this.selUserId = id
      this.selUserName = name
    },
    closeUserDialog () {
      this.selUserDialog = false
      setTimeout(() => {
        this.confirmUserDialog = true
      }, 300)
    },
    confirmSel () {
      if (!this.remark) {
        this.$message({
          type: 'error',
          message: '请填写备注'
        })
        return
      }
      let params = {
        invoiceArr: this.multipleSelection,
        sendeeUid: this.selUserId,
        sendeeUname: this.selUserName,
        remark: this.remark
      }
      this.$post('/Invoice.do?invoiceReplace', params).then(res => {
        if (res.data.success) {
          this.confirmUserDialog = false
          this.search()
        }
      })
    },
    singleCheck (val, e, data) {
      if (e.target.checked) {
        this.multipleSelection.push(data)
      } else {
        this.multipleSelection = this.multipleSelection.filter(val => val.id !== data.id)
      }
    },
    handleFlowSelectionChange (val) {
      this.flowSelectArr = val
    },
    updateInvoiceList (res) {
      this.key_table = new Date() + ''
      this.invoiceList = res.data[0].data
      if (this.mark === 'list' || this.mark === 'pending') {
        this._getRowSpan()
      }
    },
    updateRepaymentList (res) {
      this.repaymentList = res.data[0].data
    },
    // 待开导出
    exportTxt () {
      let obj = {
        invoiceIds: this.multipleSelection.toString()
      }
      this.$export('/Invoice.do?export', this.params[this.mark + 'Params'], obj)
    },
    exportExcell () {
      let obj = {
        invoiceIds: this.multipleSelection.toString(),
        hasinvoice: 0
      }
      this.$export('/Invoice.do?exportexcel', this.params[this.mark + 'Params'], obj)
    },
    // 已开导出
    exportExcellHandled () {
      let obj = {
        code: 74,
        hasinvoice: 10
      }
      this.$export('/Invoice.do?exportexcel', this.params[this.mark + 'Params'], obj)
    },
    exportExcellSend () {
      let obj = {
        code: 72
      }
      this.$export('/Invoice.do?exportexcel', this.params[this.mark + 'Params'], obj)
    },
    // 多对多，合并行
    _getRowSpan () {
      this.$nextTick(() => {
        let table = document.querySelector(
          '#invoice-list-table .el-table__body-wrapper table.el-table__body'
        )
        table.setAttribute('id', 'tb')
        // let fixedRightTable = document.querySelector(
        //   '#invoice-list-table .el-table__fixed-right .el-table__fixed-body-wrapper table.el-table__body'
        // )
        // fixedRightTable.setAttribute('id', 'fixedrighttb')
        // rowSpan('fixedrighttb', 0, [17], 6)
        if (this.fixed) {
          let fixedTable = document.querySelector(
            '#invoice-list-table .el-table__fixed .el-table__fixed-body-wrapper table.el-table__body'
          )
          fixedTable.setAttribute('id', 'fixedtb')
          rowSpan('tb', 0, [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 7)
          rowSpan('fixedtb', 0, [0, 1, 2, 3, 4, 5], 5)
        } else {
          rowSpan('tb', 0, [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 7)
          setTimeout(() => {
            rowSpan('tb', 0, [0, 1, 2, 3, 4, 5], 5)
          }, 800)
        }
      })
    }
  },
  components: {
    InvoiceInfoDialog,
    AutoSelect,
    Page,
    SelectUser,
    UpFile,
    MakeInvoiceDialog
  }
}
</script>
<style lang="less" scoped>
.incoice-list-component {
  .visit-search {
    display: flex;
    flex-wrap: wrap;
    .visit-item {
      align-items: center;
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
  .a-search-number {
    text-decoration: underline;
    color: #06c;
  }
  .table-btns {
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    .el-button {
      margin: 1px 0 0 2px;
    }
  }
  .prove-wrapper{
    display: flex;
    flex-wrap: wrap;
    align-items: center;

  }
}
</style>

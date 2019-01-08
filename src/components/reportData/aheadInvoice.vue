<template>
  <div class="ahead-invoice component-container media-padding">
    <el-tabs v-model="activeName" @tab-click="handleTabClick" type="card">
      <div class="top ml10px">
        <el-radio-group v-model="radioGroup" @change="handleChangeRadio">
          <el-radio-button :label="100">未销</el-radio-button>
          <el-radio-button label>全部</el-radio-button>
        </el-radio-group>
        <div class="export">
          <up-file
            :uploadUrl="'/Renew.do?holidayRenewImport'"
            :title="'值班加款导入'"
            :upIcon="'fa fa-cloud-download'"
            :isHiddenFileList="true"
          ></up-file>
          <el-button @click.native="exportExcell" type="warning" icon="fa fa-cloud-upload" class="ml10px">导出Excell</el-button>
        </div>
      </div>
      <div class="visit-search">
        <el-input v-model="dept" class="visit-item item-width" placeholder="搜索客户名称">
          <template slot="prepend">部门:</template>
        </el-input>
        <el-input v-model="cusName" class="visit-item item-width" placeholder="搜索客户名称">
          <template slot="prepend">保A公司名:</template>
        </el-input>
        <el-input v-model="invoiceNum" class="visit-item item-width" placeholder="搜索客户名称">
          <template slot="prepend">发票号码:</template>
        </el-input>
        <el-input v-model="bdAccount" class="visit-item item-width" placeholder="搜索客户名称">
          <template slot="prepend">百度账号:</template>
        </el-input>
        <el-input v-model="invoiceComName" class="visit-item item-width" placeholder="搜索客户名称">
          <template slot="prepend">发票公司名:</template>
        </el-input>
        <auto-select
          :key="key_invoice_type"
          title="发票类型"
          defaultValue="100"
          v-model="invoiceType"
          id="visit-status"
          class="visit-item item-width"
        >
          <el-option label="全部" value="100"></el-option>
          <el-option label="电子普票" value="11"></el-option>
          <el-option label="纸质普票" value="10"></el-option>
          <el-option label="专票" value="20"></el-option>
        </auto-select>
        <el-date-picker
          v-model="applyDate"
          format="yyyy/MM/dd HH:mm"
          value-format="yyyy/MM/dd HH:mm"
          :unlink-panels="true"
          type="datetimerange"
          range-separator="至"
          start-placeholder="申请时间"
          end-placeholder="申请时间"
          class="visit-item item-width"
        ></el-date-picker>
        <el-date-picker
          v-model="invoiceDate"
          format="yyyy/MM/dd HH:mm"
          value-format="yyyy/MM/dd HH:mm"
          :unlink-panels="true"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开票时间"
          end-placeholder="开票时间"
          class="visit-item item-width"
        ></el-date-picker>
        <el-date-picker
          v-model="addDate"
          format="yyyy/MM/dd HH:mm"
          value-format="yyyy/MM/dd HH:mm"
          :unlink-panels="true"
          type="datetimerange"
          range-separator="至"
          start-placeholder="加款时间"
          end-placeholder="加款时间"
          class="visit-item item-width"
        ></el-date-picker>
        <el-date-picker
          v-model="removeDate"
          format="yyyy/MM/dd HH:mm"
          value-format="yyyy/MM/dd HH:mm"
          :unlink-panels="true"
          type="datetimerange"
          range-separator="至"
          start-placeholder="实际销账时间"
          end-placeholder="实际销账时间"
          class="visit-item item-width"
        ></el-date-picker>
        <div class="visit-item">
          <el-button @click.native="search" type="primary">查 询</el-button>
          <el-button @click.native="reset" type="warning">重 置</el-button>
        </div>
      </div>
      <el-tab-pane label="提前开票" name="invoice" class="mt10px">
        <el-table
          stripe
          border
          :data="invoiceList"
          class="table-width"
          max-height="500"
          :row-class-name="setLastRowStyle"
        >
          <el-table-column prop="applytime" label="申请时间" width="95">
            <template slot-scope="scope">
              <span v-if="scope.row.mark!=='lastRow'">{{scope.row.applytime | timeFormat1}}</span>
              <span v-else>合计</span>
            </template>
          </el-table-column>
          <el-table-column prop="fullname" label="部门" min-width="120"></el-table-column>
          <el-table-column prop label="姓名" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.mark!=='lastRow'">{{scope.row.uname}}</span>
              <span>{{scope.row.bindName?('('+scope.row.bindName+')'): ((scope.row.true_name && scope.row.true_name!=scope.row.username)?('('+scope.row.true_name+')'):'')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="comName" label="保A公司名" min-width="200">
            <span slot-scope="scope" v-if="scope.row.mark!=='lastRow'">{{scope.row.comName}}</span>
          </el-table-column>
          <el-table-column prop="invoicecname" label="发票公司名" min-width="200">
            <span slot-scope="scope" v-if="scope.row.mark!=='lastRow'">{{scope.row.invoicecname}}</span>
          </el-table-column>
          <el-table-column prop="invoicetime" label="开票时间" width="95">
            <span slot-scope="scope" v-if="scope.row.mark!=='lastRow'">{{scope.row.invoicetime | timeFormat1}}</span>
          </el-table-column>
          <el-table-column prop="tmoney" label="开票金额" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.mark!=='lastRow'">{{scope.row.tmoney | currency}}</span>
              <span v-else>{{scope.row.sumInvMoney | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="invoicenumber" label="发票号码" width="110">
            <span slot-scope="scope" v-if="scope.row.mark!=='lastRow'">{{scope.row.invoicenumber}}</span>
          </el-table-column>
          <el-table-column prop label="开票类型" width="80">
            <span slot-scope="scope" v-if="scope.row.mark!=='lastRow'">{{scope.row.ttype | invoiceState('invoiceType')}}</span>
          </el-table-column>
          <el-table-column prop label="预计销账时间" width="95">
            <span slot-scope="scope" v-if="scope.row.mark!=='lastRow'">{{scope.row.offset_time | timeFormat1}}</span>
          </el-table-column>
          <el-table-column prop="receive_money" label="已销金额" width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.mark!=='lastRow'">{{scope.row.receive_money | currency}}</span>
              <span v-else>{{scope.row.sumReceiptmoney | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="toRemoveMoney" label="未销金额" width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.mark!=='lastRow'">{{scope.row.tmoney-scope.row.receive_money | currency}}</span>
              <span v-else>{{scope.row.sumUnsoldmoney | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column prop label="实际销账时间" width="95">
            <span slot-scope="scope" v-if="scope.row.mark!=='lastRow'">{{scope.row.maxcktime | timeFormat1}}</span>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope" v-if="scope.row.mark!=='lastRow'">
              <el-button @click.native.prevent="viewInvoice(scope.row)" type="primary" class="xsbtn">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <page class="page" :url="invoiceUrl" :sendParams="invoiceParams" @updateList="updateInvoiceList"></page>
      </el-tab-pane>
      <el-tab-pane label="提前加款" name="renew" class="mt10px">
        <el-table
          stripe
          border
          :data="invoiceList"
          :row-class-name="setLastRowStyle"
          class="table-width"
          max-height="500"
        >
          <el-table-column prop="applytime" label="申请时间" width="95">
            <template slot-scope="scope">
              <span v-if="scope.row.mark!=='lastRow'">{{scope.row.applytime | timeFormat1}}</span>
              <span v-else>合计</span>
            </template>
          </el-table-column>
          <el-table-column prop="fullname" label="部门" min-width="120"></el-table-column>
          <el-table-column prop label="姓名" width="140">
            <template slot-scope="scope">
              <span>{{scope.row.uname}}</span>
              <span>{{scope.row.bindName?('('+scope.row.bindName+')'): ((scope.row.true_name && scope.row.true_name!=scope.row.username)?('('+scope.row.true_name+')'):'')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="comName" label="保A公司名" min-width="210"></el-table-column>
          <el-table-column prop="baidu_account" label="百度账号" min-width="159"></el-table-column>
          <el-table-column prop="jiakuanTime" label="加款时间" width="95">
            <span slot-scope="scope">{{scope.row.jiakuanTime | timeFormat1}}</span>
          </el-table-column>
          <el-table-column prop="usemoney" label="加款金额" width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.mark!=='lastRow'">{{scope.row.usemoney | currency}}</span>
              <span v-else>{{scope.row.sumUsemoney | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column prop label="预计销账时间" width="95">
            <span slot-scope="scope">{{scope.row.offset_time | timeFormat1}}</span>
          </el-table-column>
          <el-table-column prop="receiptmoney" label="已销金额" width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.mark!=='lastRow'">{{scope.row.receiptmoney | currency}}</span>
              <span v-else>{{scope.row.sumReceiptmoney | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="toRemoveMoney" label="未销金额" width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.mark!=='lastRow'">{{scope.row.usemoney-scope.row.receiptmoney | currency}}</span>
              <span v-else>{{scope.row.sumUnsoldmoney | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column prop label="实际销账时间" width="95">
            <span slot-scope="scope">{{scope.row.maxcktime | timeFormat1}}</span>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope" v-if="scope.row.mark!=='lastRow'">
              <el-button @click.native.prevent="viewAddMoney(scope.row)" type="primary" class="xsbtn">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <page class="page" :url="invoiceUrl" :sendParams="invoiceParams" @updateList="updateInvoiceList"></page>
      </el-tab-pane>
    </el-tabs>

    <!-- 查看发票信息弹窗 -->
    <el-dialog :key="key_invoice_dialog" title="发票信息" :visible.sync="invoiceDialog" width="850px">
      <invoice-info-dialog :form="form" :invoiceLogs="invoiceLogs" :renewList="renewList" @closeInvoiceDialog="invoiceDialog=false" :mark="'aheadInvoice'">
      </invoice-info-dialog>
    </el-dialog>

    <!-- 查看续费加款信息弹窗 -->
    <el-dialog :key="key_renew_dialog" title="发票信息" :visible.sync="renewDialog" width="850px">
      <!-- 续费信息 -->
      <div>
        <div class="title">
          <el-button class="title-btn" type="warning">续费信息</el-button>
          <div class="line"></div>
        </div>
        <el-form :model="baseInfo" label-width="100px" class="weight-label">
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
            <el-col :md="6" class="maxwidth">
              <el-form-item label="活动类型 :">
                <div>{{baseInfo.code_desc}}</div>
              </el-form-item>
            </el-col>
            <el-col :md="6" class="maxwidth">
              <el-form-item label="是否假期加款 :">
                <div>{{baseInfo.holiday == 10 ? '是' : '否'}}</div>
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
          <el-table-column prop label="实际到款" min-width="150">
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
          <el-table-column prop label="代金券|返款金额" min-width="150">
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
          <el-table-column prop label="申请加款" min-width="150">
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
        </el-table>
      </div>
      <!-- 续费手动销账 -->
      <div class="mt10px">
        <div class="title">
          <el-button class="title-btn" type="warning">续费手动销账</el-button>
          <div class="line"></div>
        </div>
        <el-table :data="moneyDetail.slice(0,moneyDetail.length-1)" :show-header="false">
          <el-table-column width="140">
            <template slot-scope="scope">
              <span>{{scope.row.type | productType}}加款金额 :</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <span>{{scope.row.type>=500?null:(scope.row.add_money > 0 ? scope.row.add_money : scope.row.truevalue+scope.row.value)|currency}}</span>
            </template>
          </el-table-column>
          <el-table-column width="80">
            <template slot-scope="scope">
              <span>销账金额 :</span>
            </template>
          </el-table-column>
          <el-table-column min-width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.offset_money"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-form label-width="100px" class="mt10px" :model="charge">
          <el-row :gutter="10">
            <el-col :md="12">
              <el-form-item label="销账时间 :">
                <el-date-picker style="width: 100%;"
                  v-model="charge.chargeTime"
                  type="datetime"
                  value-format="yyyy/MM/dd HH:mm"
                  placeholder="选择日期时间 :">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="charge.chargeRemark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="text-center">
            <el-button @click.native="handleChargeOffMoney" type="primary">续费手动销账</el-button>
          </el-row>
        </el-form>
      </div>
      <!-- 操作记录 -->
      <div>
        <div class="title">
          <el-button class="title-btn mt10px" type="warning">操作记录</el-button>
          <div class="line"></div>
        </div>
        <el-table :data="recordList" class="table-width" max-height="400">
          <el-table-column prop="inserttime" label="操作时间" width="150">
            <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
          </el-table-column>
          <el-table-column prop="name" label="操作人">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
              <span>{{scope.row.bindName?('('+scope.row.bindName+')'): ((scope.row.true_name && scope.row.true_name!=scope.row.name)?('('+scope.row.true_name+')'):'')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="record" label="操作记录" min-width="140"></el-table-column>
          <el-table-column prop="remark" label="处理备注"></el-table-column>
        </el-table>
        <page
          :simpleLayout="'total, prev, next, jumper'"
          class="page"
          :url="recordUrl"
          :sendParams="recordParams"
          @updateList="updateRecordList"
        ></page>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import elDragDialog from '@/directive/el-dragDialog' // eslint-disable-line
import Page from 'base/page/page'
import UpFile from 'base/upLoad/upFile'
import InvoiceInfoDialog from 'components/invoiceManage/invoiceList/invoiceInfoDialog'
import { productType } from 'common/js/filters'
export default {
  directives: { elDragDialog },
  data() {
    return {
      activeName: 'invoice',
      radioGroup: 100,

      type: 'invoice',
      removeType: 100,
      invoiceList: [],
      invoiceUrl: '/Invoice.do?advanceInvoicelist',
      invoiceParams: { inv_re: 'invoice', ckstatus: 100 },

      dept: '',
      cusName: '',
      invoiceNum: '',
      bdAccount: '',
      invoiceComName: '',
      key_invoice_type: '',
      invoiceType: '',
      applyDate: [],
      invoiceDate: [],
      addDate: [],
      removeDate: [],

      invoiceDialog: false,
      key_invoice_dialog: '',
      form: {},
      invoiceLogs: [],
      renewList: [],

      key_renew_dialog: '1',
      renewDialog: false,
      baseInfo: {},
      moneyDetail: [],
      recordList: [],
      recordUrl: '/Renew.do?renewrecord',
      recordParams: {},
      charge: {
        chargeTime: '',
        chargeRemark: ''
      }
    }
  },
  methods: {
    // 查看
    viewInvoice (data) {
      this.key_invoice_dialog = new Date() + '5'
      this.$get('/Invoice.do?invoicebyid', { invoiceid: data.invoiceid, inre: 'renew' }).then(
        res => {
          if (res.data[0].success) {
            this.form = res.data[0].data[0]
            this.invoiceLogs = res.data[1].data
            this.renewList = res.data[2].data
            setTimeout(() => {
              this.invoiceDialog = true
            }, 100)
          }
        }
      )
    },
    viewAddMoney (data) {
      this.key_renew_dialog = new Date() + '6'
      this.$get('/Renew.do?renewdetail', { reid: data.reid }).then(
        res => {
          if (res.data[0].success) {
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
            setTimeout(() => {
              this.recordParams = {reid: data.reid}
              this.renewDialog = true
            }, 100)
          }
        }
      )
    },
    handleChargeOffMoney() {
      let totalOffsetMoney = 0
      let remark = ''
      for (let i = 0; i < this.moneyDetail.length - 1; i++) {
        remark += productType(this.moneyDetail[i].type) + ' 销账金额：' + this.moneyDetail[i].offset_money + ','
        totalOffsetMoney += parseFloat(this.moneyDetail[i].offset_money || 0)
      }
      let params = {
        'remark': remark + '。备注：' + this.chargeRemark + '销账时间：' + this.charge.chargeTime,
        'reId': this.baseInfo.id,
        'offsetMoney2': totalOffsetMoney,
        'offsetTime2': this.charge.chargeTime
      }
      this.$post('/Renew.do?renewOffsetCheck', params).then(res => {
        if (res.data.success) {
          this.renewDialog = false
          this.search()
        }
      })
    },
    updateRecordList(res) {
      this.recordList = res.data[0].data
    },
    search() {
      this.invoiceParams = {
        companyname: this.cusName,
        invoicename: this.invoiceComName,
        inv_re: this.type,
        ckstatus: this.removeType,
        invoicetype: this.invoiceType,
        apply_start: this.applyDate[0],
        apply_end: this.applyDate[1],
        add_start: this.addDate[0],
        add_end: this.addDate[1],
        receive_start: this.removeDate[0],
        receive_end: this.removeDate[1],
        invoice_start: this.invoiceDate[0],
        invoice_end: this.invoiceDate[1],
        deptcode: this.dept,
        baiduaccount: this.bdAccount,
        invoicenumber: this.invoiceNum
      }
    },
    reset() {
      this.cusName = ''
      this.invoiceNum = ''
      this.invoiceComName = ''
      this.dept = ''
      this.bdAccount = ''
      this.applyDate = []
      this.addDate = []
      this.removeDate = []
      this.invoiceDate = []
      this.key_invoice_type = new Date() + ''
      this.invoiceType = ''
    },
    exportExcell() {
      let obj = {
        code: this.activeName === 'invoice' ? 78 : 79,
        hasinvoice: 10,
        isAdvance: 'isAdvance'
      }
      this.$export('/Invoice.do?exportexcel', this.invoiceParams, obj)
    },
    handleChangeRadio(val) {
      this.removeType = val
      this.search()
    },
    handleTabClick(val) {
      this.type = val.name
      this.search()
    },
    updateInvoiceList(res) {
      this.invoiceList = res.data[0].data
      let total = res.data[2].data
      total.mark = 'lastRow'
      this.invoiceList.push(total)
    },
    setLastRowStyle({ row, rowIndex }) {
      if (row.mark === 'lastRow') {
        return 'red'
      }
    }
  },
  components: {
    AutoSelect,
    Page,
    UpFile,
    InvoiceInfoDialog
  }
}
</script>
<style lang="less">
.ahead-invoice {
  .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
    border-right: 1px solid rgb(155, 152, 152);
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid rgb(155, 152, 152);
  }
}
</style>
<style lang="less" scoped>
.ahead-invoice {
  padding: 20px;
  .visit-search {
    display: flex;
    flex-wrap: wrap;
    .visit-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 310px;
    }
  }
  .maxwidth {
    max-width: 500px;
  }
  .top{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>

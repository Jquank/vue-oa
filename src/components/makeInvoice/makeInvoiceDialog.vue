<template>
  <div class="make-invoice-form">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :status-icon="true"
      :validate-on-rule-change="false"
      :label-width="labelWidth"
    >
      <div class="title">
        <el-button class="title-btn" type="warning">开票信息</el-button>
        <div class="line"></div>
      </div>
      <el-row class="top-radio">
        <el-col :md="8" class="maxwidth">
          <el-form-item label>
            <el-radio v-model="form.invoice_com" label="10">公司</el-radio>
            <el-radio v-model="form.invoice_com" label="1">个人</el-radio>
          </el-form-item>
        </el-col>
        <el-col :md="8" class="maxwidth">
          <el-form-item label>
            <el-radio v-model="form.invoice_open" label="10">百推</el-radio>
            <el-radio v-model="form.invoice_open" label="20">糯米</el-radio>
          </el-form-item>
        </el-col>
        <el-col :md="8" class="maxwidth">
          <el-form-item label>
            <span class="tipfont fa fa-search" style="line-height:34px;color:#06c;">
              <a
                href="https://wsswj.hb-n-tax.gov.cn/portal/iframe.c?goUrl=/zyy-typt/typt/ggcx/sfybnsr.jsp"
                target="_blank"
                class="a-search-number"
              >查询纳税人资格</a>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="16" class="maxwidth">
          <el-form-item label="公司名称 :" prop="comName">
            <el-input v-model="form.comName" disabled :class="makeInvoiceStatus==20?'input-btn':''"></el-input>
            <slot name="selBtn"></slot>
          </el-form-item>
        </el-col>
        <el-col :md="8" class="maxwidth">
          <el-form-item label label-width="15px">
            <p class="red tipfont" style="margin-top: 10px;">1、专票能抵扣增值税，普票不可以抵扣。</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="16" class="maxwidth">
          <el-form-item label="历史发票 :">
            <el-select :key="key_sel_invoice" v-model="form.id" @change="selInvoiceChange" style="width: 100%;">
              <el-option v-for="(item, index) in form.invoice" :key="index" :value="item.id" :label="item.companyname"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" class="maxwidth">
          <el-form-item label label-width="15px">
            <p class="red tipfont">2、客服或商务申请提前开发票的，应由发票申请人所属部门副总审批。</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="8" class="maxwidth">
          <el-form-item label="合并发票 :">
            <el-button @click.native="mixinInvoice" type="primary">选择合并</el-button>
          </el-form-item>
        </el-col>
        <el-col :md="16" class="maxwidth">
          <el-form-item label label-width="15px">
            <p class="red tipfont">3、关于客服申请开具发票抬头的公司名称，与签约推广的公司不一致的， 需要发票申请人所属部门副总审批以及线下提供资质如垫款证明。</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="已选中发票 :">
            <el-table :data="selectedMixinInvoice" border stripe class="table-width">
              <el-table-column prop="companyname" label="公司名称" min-width="130"></el-table-column>
              <el-table-column prop="baidu_account" label="百度账号" width="100"></el-table-column>
              <el-table-column prop="receiptmoney" label="金额" width="110">
                <span slot-scope="scope">{{scope.row.receiptmoney | currency}}</span>
              </el-table-column>
              <el-table-column prop="bill_time" label="记账日期" width="95">
                <span slot-scope="scope">{{scope.row.bill_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="insert_time" label="申请时间" width="95">
                <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop label="商务|客服" width="80">
                <span
                  slot-scope="scope"
                >{{scope.row.applyUname+(scope.row.username !== scope.row.ckBdName ? (','+scope.row.ckBdName) : '')}}</span>
              </el-table-column>
              <el-table-column prop="orderOrRenew" label="订单或续费" width="80"></el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="发票公司名 :" :prop="form.invoice_com==10?'companyname':''">
            <el-input v-model="form.companyname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="纳税人识别号 :" :prop="form.invoice_com==10?'identinum':''">
            <el-input v-model="form.identinum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="地址 :" :prop="form.invoice_com==10?'companyaddr':''">
            <el-input v-model="form.companyaddr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="电话 :" :prop="form.invoice_com==10?'companyphone':''">
            <el-input v-model="form.companyphone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="开户行 :" :prop="form.invoice_com==10?'bank':''">
            <el-input v-model="form.bank"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="账号 :" :prop="form.invoice_com==10?'account':''">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="发票类型 :" prop="ttype" class="invoice-kind-radio">
            <el-radio v-model="form.ttype" label="11">电子普票(免邮寄，随用随打印)</el-radio>
            <el-radio v-model="form.ttype" label="10">纸质普票</el-radio>
            <el-radio v-model="form.ttype" label="20">专票</el-radio>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth" id="images">
          <el-form-item label="发票图例 :">
            <el-tooltip class="item" effect="dark" content="电子普票" placement="top-start">
              <img class="img-invoice" src="./invoice3.jpg" alt="电子普票">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="纸质普票" placement="top-start">
              <img class="img-invoice" src="./invoice1.jpg" alt="纸质普票">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="专票" placement="top-start">
              <img class="img-invoice" src="./invoice2.jpg" alt="专票">
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="12" v-if="form.ttype==11" class="maxwidth">
          <el-form-item label="收票手机号 :" prop="email">
            <el-input v-model="form.email" placeholder="收票手机号或电子邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="maxwidth">
          <el-form-item label="产品类型 :" prop="proArr">
            <el-checkbox-group :key="key_sel_pro" v-model="form.proArr">
              <el-checkbox
                @change="selProChange(item)"
                v-for="item in form.productList"
                :key="item.code_val"
                :label="item.code_val"
              >{{item.code_desc}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="item in form.productMoneyList" :key="item.code_val">
        <el-col :md="12" class="maxwidth">
          <el-form-item :label="item.code_desc+' :'" label-width="120px">
            <el-input v-model="item.value" :placeholder="item.code_desc">
              <span slot="prepend">¥</span>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="maxwidth">
          <el-form-item label="备注 :">
            <el-input v-model="form.remark" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="预计还款时间 :" :prop="makeInvoiceStatus===20?'offsetTime':''">
            <el-date-picker v-model="form.offsetTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="垫款证明 :">
            <up-file @fileUrl="getFileUrl" :listType="'picture'" style="display:inline-block;"></up-file>
            <a @click="exportBankFlow" href="javascript:void(0)" class="a-search-number tipfont fa fa-download">点击下载模板</a>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="title">
        <el-button class="title-btn" type="warning">寄票信息</el-button>
        <div class="line"></div>
      </div>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="公司名称 :" :prop="form.ttype!=11?'tcname':''">
            <el-input v-model="form.tcname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="收票地址 :" :prop="form.ttype!=11?'taddr':''">
            <el-input v-model="form.taddr"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="收票电话 :" :prop="form.ttype!=11?'tphone':''">
            <el-input v-model="form.tphone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="收票手机号 :" :prop="form.ttype!=11?'tmobile':''">
            <el-input v-model="form.tmobile"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="maxwidth">
          <el-form-item label="收票联系人 :" :prop="form.ttype!=11?'tname':''">
            <el-input v-model="form.tname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="text-center">
      <el-button type="primary" @click.native="subChange('form')">提 交</el-button>
      <el-button @click.native="changeSixTip" type="warning">修改发票信息</el-button>
    </div>

    <!-- 选择合并发票 -->
    <el-dialog
      v-drag-dialog
      title="选择公司"
      :append-to-body="true"
      :modal-append-to-body="false"
      :visible.sync="mixinInvoiceDialog"
      width="850px"
    >
      <el-table :data="mixinInvoiceList" border stripe class="table-width" @selection-change="handleSelectionChange" max-height="500">
        <el-table-column type="selection" width="45" fixed></el-table-column>
        <el-table-column prop="companyname" label="公司名称" min-width="130"></el-table-column>
        <el-table-column prop="baidu_account" label="百度账号" width="100"></el-table-column>
        <el-table-column prop="receiptmoney" label="金额" width="110">
          <span slot-scope="scope">{{scope.row.receiptmoney | currency}}</span>
        </el-table-column>
        <el-table-column prop="bill_time" label="记账日期" width="95">
          <span slot-scope="scope">{{scope.row.bill_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="insert_time" label="申请时间" width="95">
          <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop label="商务|客服" width="80">
          <span
            slot-scope="scope"
          >{{scope.row.applyUname+(scope.row.username !== scope.row.ckBdName ? (','+scope.row.ckBdName) : '')}}</span>
        </el-table-column>
        <el-table-column prop="orderOrRenew" label="订单或续费" width="95">
          <span slot-scope="scope">{{scope.row.orderOrRenew==='renew'?'续费':'订单'}}</span>
        </el-table-column>
      </el-table>
      <page
        :simpleLayout="'total, prev, next, jumper'"
        class="page"
        :url="mixinInvoiceUrl"
        :sendParams="mixinInvoiceParams"
        @updateList="updateMixinInvoiceList"
      ></page>
      <div class="text-center">
        <el-button @click.native="confirmSelMixinInvoice" type="success">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getByCode } from 'api/getOptions'
import { appMark } from 'common/js/utils'
import Viewer from 'viewerjs'
import Page from 'base/page/page'
import UpFile from 'base/upLoad/upFile'
export default {
  props: {
    echoData: {
      type: Array,
      default: function() {
        return []
      }
    },
    makeInvoiceStatus: {
      type: Number,
      default: 20 // 提前开票
    },
    offset: {
      type: Number,
      default: 20 // 提前开票
    },
    mark: {
      type: String,
      default: 'renew' // 提前开票
    },
    rowData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  watch: {
    echoData: {
      handler: function(newEcho) {
        this.form.proArr = []
        this.form.invoice = newEcho
        this.form = Object.assign(this.form, newEcho[0])
        this.key_sel_invoice = new Date() + '10'
        this.key_sel_pro = new Date() + '20'
        this.form.productMoneyList.forEach(val => {
          this.form.proArr.push(val.code_val)
        })
        console.log(this.form.proArr)
      },
      deep: true,
      immediate: true // 将立即以表达式的当前值触发回调
    }
  },
  data() {
    return {
      labelWidth: '115px',
      key_sel_pro: '1',
      key_sel_invoice: '',
      form: {
        invoice_com: '10',
        invoice: [],
        productList: [],
        productMoneyList: [],
        comName: '',
        id: '',
        companyname: '',
        identinum: '',
        companyaddr: '',
        companyphone: '',
        bank: '',
        account: '',
        ttype: '',
        proArr: [],
        email: '',
        remark: '',
        tcname: '',
        taddr: '',
        tphone: '',
        tmobile: '',
        tname: '',
        offsetTime: '',
        invoice_open: '10'
      },
      mixinInvoiceList: [],
      mixinInvoiceDialog: false,
      mixinInvoiceUrl: '/Renew.do?renewRefundList',
      mixinInvoiceParams: {
        companyName: ''
      },
      multipleSelection: [],
      selectedMixinInvoice: [],

      rules: {
        comName: [{ required: true, message: '请选择公司', trigger: 'blur' }],
        id: [{ required: true, message: '请选择发票', trigger: 'blur' }],
        companyname: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        identinum: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        companyaddr: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        companyphone: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        ttype: [{ required: true, message: '请选择发票类型', trigger: 'blur' }],
        proArr: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        tmoney: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        offsetTime: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        tcname: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        taddr: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        tname: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        tphone: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        tmobile: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    getByCode(47).then(res => {
      this.form.productList = res.data.data
    })
    if (appMark()) {
      this.labelWidth = '60px'
    }
  },
  mounted() {
    /* eslint-disable no-new */
    new Viewer(document.getElementById('images'), {
      zIndex: 100000
    })
  },
  methods: {
    getFileUrl (res) {
      this.fileUrl = res.response.url
    },
    // 下载垫款证明模板
    exportBankFlow () {
      let reids = []
      reids = this.selectedMixinInvoice.map(val => {
        if (val.orderOrRenew === 'renew') {
          return val.fkid
        } else {
          return val.curid
        }
      })
      let params = {
        reids: reids.toString(),
        receiveIds: '',
        invoiceIds: '',

        companyname: this.form.companyname,
        identinum: this.form.identinum,
        companyaddr: this.form.companyaddr,
        companyphone: this.form.companyphone,
        bank: this.form.bank,
        account: this.form.account
      }
      this.$export('/Invoice.do?invoiceCushionProof', params)
    },
    // 合并发票
    mixinInvoice() {
      this.mixinInvoiceDialog = true
      this.mixinInvoiceParams = {
        companyName: this.form.comName
      }
    },
    confirmSelMixinInvoice() {
      this.mixinInvoiceDialog = false
    },
    handleSelectionChange(val) {
      this.selectedMixinInvoice = val
      this.multipleSelection = val.map(item => {
        return {
          id: item.fkid,
          orderOrRenew: item.orderOrRenew
        }
      })
    },
    updateMixinInvoiceList(res) {
      this.mixinInvoiceList = res.data[0].data
    },
    // 修改六要素
    changeSixTip() {
      let params = {
        invoiceInfoId: this.form.id,
        offset: this.offset,
        orderOrRenew: this.mark,
        is_advance: this.makeInvoiceStatus,
        reid: this.rowData.id,
        orderId: this.rowData.orderid,
        companyid: this.form.comId,
        chargearray: this.form.productMoneyList,
        invoice_open: this.form.invoice_open,
        invoiceremark: this.form.remark
      }
      params = Object.assign({}, this.form, params)
      this.$post('/Invoice.do?invoiceInfo', params).then(res => {
        if (res.data.success) {
          this.$emit('closeDialog')
        }
      })
    },
    // 提交
    subChange(formName) {
      if (this.form.productMoneyList.some(val => val.value > 100000)) {
        this.$message.error('金额需小于或等于10万！')
        return
      }
      let params = {
        invoiceInfoId: this.form.id,
        offset: this.offset,
        orderOrRenew: this.mark,
        is_advance: this.makeInvoiceStatus,
        reid: this.rowData.id,
        orderId: this.rowData.orderid,
        companyid: this.form.comId,
        chargearray: this.form.productMoneyList,
        invoiceremark: this.form.remark,
        fkidArr: this.multipleSelection,
        prove_img: this.fileUrl
      }
      params = Object.assign({}, this.form, params)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$post('/Invoice.do?apply', params).then(res => {
            // this.$refs[formName].resetFields()
            if (res.data.success) {
              this.$message.success('已提交申请，等待审核！')
              this.$emit('closeDialog')
            }
          })
        } else {
          return false
        }
      })
    },
    selInvoiceChange(id) {
      this.form.invoice.forEach((val, key, arr) => {
        if (val.id === id) {
          this.form = Object.assign({}, this.form, arr[key])
        }
      })
    },
    selProChange(obj) {
      let index = -1
      this.form.productMoneyList.forEach((val, key) => {
        if (val.code_val === obj.code_val) {
          index = key
        }
      })
      if (index > -1) {
        this.form.productMoneyList.splice(index, 1)
      } else {
        this.form.productMoneyList.push({
          code_desc: obj.code_desc,
          code_val: obj.code_val,
          value: 0
        })
      }
      this.form.productMoneyList.sort(function(a, b) {
        var val1 = a.code_val
        var val2 = b.code_val
        if (val1 > val2) {
          return 1
        } else if (val1 < val2) {
          return -1
        } else {
          return 0
        }
      })
    }
  },
  components: { Page, UpFile }
}
</script>

<style lang="less" scoped>
.make-invoice-form {
  .invoice-kind-radio {
    .el-radio {
      display: block;
      margin: 0;
    }
    .el-radio:not(:first-child) {
      margin-top: 8px;
    }
  }
  .img-invoice {
    width: 70px;
    height: 70px;
  }
  p.tipfont {
    margin: 0;
  }
  .top-radio .el-form-item {
    margin-bottom: 0;
  }
}
</style>

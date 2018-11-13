<template>
  <div class="make-invoice-form">
    <el-form :model="form" ref="form" :rules="rules" :status-icon="true" :validate-on-rule-change="false" label-width="115px">
      <div class="title">
        <el-button class="title-btn" type="warning">开票信息</el-button>
        <div class="line"></div>
      </div>
      <el-row>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="">
            <el-radio v-model="form.invoice_com" label="10">公司</el-radio>
            <el-radio v-model="form.invoice_com" label="1">个人</el-radio>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="">
            <span class="tipfont fa fa-search" style="line-height:34px;color:#06c;">
              <a href="https://wsbs.hb-n-tax.gov.cn/hbgs/tax/xyzkcx/sfybnsr1" target="_blank" class="a-search-number"> 查询快递单号</a>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="18" class="maxwidth">
          <el-form-item label="公司名称 :" prop="comName">
            <el-input v-model="form.comName" disabled class="input-btn"></el-input>
            <slot name="selBtn"></slot>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="makeInvoiceStatus==20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="选择发票 :">
            <el-select :key="key_sel_invoice" v-model="form.id" @change="selInvoiceChange" style="width: 100%;">
              <el-option v-for="(item, index) in form.invoice" :key="index" :value="item.id" :label="item.companyname"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="" label-width="15px">
            <p class="red tipfont" style="margin-top: 10px;">1、专票能抵扣增值税，普票不可以抵扣。</p>
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
          <el-form-item label="" label-width="15px">
            <p class="red tipfont">2、关于客服申请开具发票抬头的公司名称，与签约推广的公司不一致的， 需要发票申请人所属部门副总审批以及线下提供资质如垫款证明。</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="纳税人识别号 :" :prop="form.invoice_com==10?'identinum':''">
            <el-input v-model="form.identinum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="" label-width="15px">
            <p class="red tipfont">3、客服或商务申请提前开发票的，应由发票申请人所属部门副总审批。</p>
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
        <el-col :md="12" class="maxwidth">
          <el-form-item label="发票图例 :">
            <el-tooltip class="item" effect="dark" content="电子普票" placement="top-start">
              <img class="img-invoice" src="./invoice3.jpg" alt="">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="纸质普票" placement="top-start">
              <img class="img-invoice" src="./invoice3.jpg" alt="">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="专票" placement="top-start">
              <img class="img-invoice" src="./invoice3.jpg" alt="">
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
            <el-checkbox-group v-model="form.proArr" @change="selProChange">
              <el-checkbox v-for="(item,index) in form.productList" :key="index" :label="item">{{item.code_desc}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="item in form.productMoneyList" :key="item.code_val">
        <el-col :md="12" class="maxwidth">
          <el-form-item :label="item.code_desc+' :'">
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
            <el-date-picker v-model="form.offsetTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="title">
        <el-button class="title-btn" type="warning">寄票信息</el-button>
        <div class="line"></div>
      </div>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="公司名称 :" :prop="form.ttype==11?'tcname':''">
            <el-input v-model="form.tcname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="收票地址 :" :prop="form.ttype==11?'taddr':''">
            <el-input v-model="form.taddr"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="收票电话 :" :prop="form.ttype==11?'tphone':''">
            <el-input v-model="form.tphone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="收票手机号 :" :prop="form.ttype==11?'tmobile':''">
            <el-input v-model="form.tmobile"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="maxwidth">
          <el-form-item label="收票联系人 :" :prop="form.ttype==11?'tname':''">
            <el-input v-model="form.tname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="text-center">
      <el-button type="primary" @click.native="subChange('form')">提 交</el-button>
      <el-button @click.native="changeSixTip" type="warning">修改发票信息</el-button>
    </div>
  </div>
</template>

<script>
import { getByCode } from 'api/getOptions'
export default {
  props: {
    echoData: {
      type: Array,
      default: function () {
        return []
      }
    },
    makeInvoiceStatus: {
      type: Number,
      default: 20 // 提前开票
    }
  },
  watch: {
    echoData: {
      handler: function (newEcho) {
        this.form.invoice = newEcho
        this.form = Object.assign(this.form, newEcho[0])
        this.key_sel_invoice = new Date() + '10'
        console.log(this.form)
      },
      deep: true,
      immediate: true // 将立即以表达式的当前值触发回调
    }
  },
  data () {
    return {
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
        offsetTime: ''
      },

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
  created () {
    getByCode(47).then(res => {
      this.form.productList = res.data.data
    })
  },
  methods: {
    // 修改六要素
    changeSixTip () {
      let params = {
        invoiceInfoId: this.form.id,
        offset: 0,
        orderOrRenew: 'renew',
        is_advance: this.makeInvoiceStatus,
        reid: '',
        companyid: this.form.comId,
        chargearray: this.form.productMoneyList,
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
    subChange (formName) {
      let params = {
        invoiceInfoId: this.form.id,
        offset: 0,
        orderOrRenew: 'renew',
        is_advance: this.makeInvoiceStatus,
        reid: '',
        companyid: this.form.comId,
        chargearray: this.form.productMoneyList,
        invoiceremark: this.form.remark
      }
      params = Object.assign({}, this.form, params)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$post('/Invoice.do?apply', params).then(res => {
            // this.$refs[formName].resetFields()
            if (res.data.success) {
              this.$emit('closeDialog')
            }
          })
        } else {
          return false
        }
      })
    },
    selInvoiceChange (id) {
      this.form.invoice.forEach((val, key, arr) => {
        if (val.id === id) {
          this.form = Object.assign({}, this.form, arr[key])
        }
      })
    },
    selProChange (val) {
      this.form.productMoneyList = []
      val.forEach(val => {
        this.form.productMoneyList.push({
          code_desc: val.code_desc,
          code_val: val.code_val,
          value: 0
        })
      })
      this.form.productMoneyList.sort(function (a, b) {
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
  components: {}
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
}
</style>

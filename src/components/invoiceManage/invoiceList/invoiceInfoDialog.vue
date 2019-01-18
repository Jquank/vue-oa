<template>
  <div>
    <!-- 发票信息弹窗 -->
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :status-icon="true"
      :validate-on-rule-change="false"
      label-width="115px"
      :label-position="labelPosition"
    >
      <!-- 开票信息 -->
      <div>
        <div class="title">
          <el-button class="title-btn" type="warning">开票信息</el-button>
          <div class="line"></div>
        </div>
        <el-row>
          <el-col class="maxwidth">
            <el-form-item label="发票类型 :">
              <el-radio v-model="form.ttype" label="11">电子普票</el-radio>
              <el-radio v-model="form.ttype" label="10">纸质普票</el-radio>
              <el-radio v-model="form.ttype" label="20">专票</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="发票公司名 :" prop="companyname">
              <el-input v-model="form.companyname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="纳税人识别号 :" prop="identinum">
              <el-input v-model="form.identinum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="地址 :" prop="companyaddr">
              <el-input v-model="form.companyaddr" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="电话 :" prop="companyphone">
              <el-input v-model="form.companyphone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="开户行 :" prop="bank">
              <el-input v-model="form.bank"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="账号 :" prop="account">
              <el-input v-model="form.account"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="产品类型 :">
              <el-input v-model="form.chargename" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="开票金额 :" prop="tmoney">
              <el-input v-model="form.tmoney"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="单据号码 :">
              <el-input v-model="form.tnumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" v-if="form.ttype==11" class="maxwidth">
            <el-form-item label="邮箱 :" prop="email">
              <el-input v-model="form.email"></el-input>
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
        <el-row id="prove-img">
          <el-col class="maxwidth">
            <el-form-item label="发票垫款证明 :">
              <img v-if="form.prove_img" :src="form.prove_img" width="50px" height="50px" alt>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!-- 发票手动销账 -->
      <div v-if="mark==='aheadInvoice'">
        <div class="title">
          <el-button class="title-btn" type="warning">发票手动销账</el-button>
          <div class="line"></div>
        </div>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="销账金额 :">
              <el-input v-model="chargeMoney"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="销账时间 :">
              <el-date-picker
                v-model="chargeTime"
                type="datetime"
                value-format="yyyy/MM/dd HH:mm"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="备注 :">
              <el-input v-model="chargeRemark" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item>
              <el-button @click.native="handleChargeOffMoney" type="primary">发票手动销账</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!-- 寄票信息 -->
      <div>
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
            <el-form-item label="收票联系人 :" :prop="form.ttype!=11?'tname':''">
              <el-input v-model="form.tname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="收票电话 :" :prop="form.ttype!=11?'tphone':''">
              <el-input v-model="form.tphone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="maxwidth">
            <el-form-item label="收票手机号 :" :prop="form.ttype!=11?'tmobile':''">
              <el-input v-model="form.tmobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <div class="text-center" v-if="(form.hasinvoice == 0 && permissions.indexOf('52') > -1) || isShowBtn">
      <el-button type="primary" @click.native="subChange('form')">修改发票信息</el-button>
    </div>

    <!-- 开票审核 -->
    <slot name="invoiceCheck"></slot>

    <!-- 销账续费列表 -->
    <div v-if="mark==='aheadInvoice'">
      <div class="title">
        <el-button class="title-btn" type="warning">销账续费列表</el-button>
        <div class="line"></div>
      </div>
      <el-table stripe border :data="renewlist">
        <el-table-column prop="comName" label="公司名称" min-width="100"></el-table-column>
        <el-table-column prop="baidu_account" label="百度账号" width="100"></el-table-column>
        <el-table-column prop="receiptmoney" label="到账金额" width="110">
          <span slot-scope="scope">{{scope.row.receiptmoney | currency}}</span>
        </el-table-column>
        <el-table-column prop="billtime" label="提单时间" width="95">
          <span slot-scope="scope">{{scope.row.billtime | timeFormat1}}</span>
        </el-table-column>
        <el-table-column prop="usemoney" label="提单金额" width="110">
          <span slot-scope="scope">{{scope.row.usemoney+scope.row.servicemoney+scope.row.usevoucher | currency}}</span>
        </el-table-column>
        <el-table-column prop="uname" label="提单人" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.uname}}</span>
            <span v-show="scope.row.uname===scope.row.true_name">{{scope.row.true_name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="addtype" label="加款类型" width="100">
          <span slot-scope="scope">{{scope.row.addtype | renewState('addType')}}</span>
        </el-table-column>
      </el-table>
    </div>

    <!-- 审核日志 -->
    <div class="title">
      <el-button class="title-btn" type="warning">审核日志</el-button>
      <div class="line"></div>
    </div>
    <el-table stripe border :data="invoiceLogs">
      <el-table-column prop="uname" label="审核人" width="100"></el-table-column>
      <el-table-column prop="insert_time" label="审核时间" width="150">
        <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="remark" label="审核备注" min-width="300"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectUser from 'base/selectUser/selectUser'
import elDragDialog from '@/directive/el-dragDialog' // eslint-disable-line
import Page from 'base/page/page'
import cookie from 'js-cookie'
import Viewer from 'viewerjs'
import { appMark } from 'common/js/utils'
export default {
  props: {
    form: {
      type: Object,
      default: function() {
        return {}
      }
    },
    invoiceLogs: {
      type: Array,
      default: function() {
        return []
      }
    },
    renewlist: {
      type: Array,
      default: function() {
        return []
      }
    },
    isShowBtn: {
      type: Boolean,
      default: false
    },
    mark: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      labelPosition: 'right',
      permissions: cookie.getJSON('permissions'),
      chargeMoney: 0,
      chargeTime: '',
      chargeRemark: '',

      rules: {
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
        chargename: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        tmoney: [
          { required: true, message: '请输入必填项内容', trigger: 'blur' }
        ],
        email: [
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
    if (appMark()) {
      this.labelPosition = 'top'
    }
  },
  mounted() {
    this.$nextTick(() => {
      /* eslint-disable no-new */
      new Viewer(document.getElementById('prove-img'), {
        zIndex: 10000
      })
    })
  },
  methods: {
    handleChargeOffMoney() {
      let params = {
        'remark': this.chargeRemark,
        'invoiceid': this.form.id,
        'offsetMoney2': this.chargeMoney,
        'offsetTime2': this.chargeTime
      }
      this.$post('/Invoice.do?invoiceOffsetCheck', params).then(res => {
        if (res.data.success) {
          this.$emit('closeInvoiceDialog')
          this.search()
        }
      })
    },
    // 提交修改
    subChange(formName) {
      this.form.invoiceremark = this.form.remark
      this.form.invoiceid = this.form.id
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$post('/Invoice.do?edit', this.form).then(res => {
            if (res.data.success) {
              this.$emit('closeInvoiceDialog')
              this.$message.success('修改成功！')
            }
          })
        } else {
          return false
        }
      })
    }
  },
  components: {
    AutoSelect,
    Page,
    SelectUser
  }
}
</script>
<style lang="less" scoped>
</style>

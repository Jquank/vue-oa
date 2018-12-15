<template>
  <div>
    <!-- 发票信息弹窗 -->

    <el-form :model="form" ref="form" :rules="rules" :status-icon="true" :validate-on-rule-change="false" label-width="115px">
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
            <img v-if="form.prove_img" :src="form.prove_img" width="50px" height="50px" alt="">
          </el-form-item>
        </el-col>
      </el-row>

      <div class="title">
        <el-button class="title-btn" type="warning">寄票信息</el-button>
        <div class="line"></div>
      </div>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="公司名称 :" prop="tcname">
            <el-input v-model="form.tcname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="收票地址 :" prop="taddr">
            <el-input v-model="form.taddr"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="收票联系人 :" prop="tname">
            <el-input v-model="form.tname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="收票电话 :" prop="tphone">
            <el-input v-model="form.tphone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="maxwidth">
          <el-form-item label="收票手机号 :" prop="tmobile">
            <el-input v-model="form.tmobile"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="text-center" v-if="(form.hasinvoice == 0 && permissions.indexOf('52') > -1) || isShowBtn">
      <el-button type="primary" @click.native="subChange('form')">修改发票信息</el-button>
    </div>

    <!-- 开票审核 -->
    <slot name="invoiceCheck"></slot>

    <div class="title">
      <el-button class="title-btn" type="warning">审核日志</el-button>
      <div class="line"></div>
    </div>
    <el-table stripe border :data="invoiceLogs" class="table-width">
      <el-table-column prop="uname" label="审核人" width="100">
      </el-table-column>
      <el-table-column prop="insert_time" label="审核时间" width="140">
        <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="remark" label="审核备注">
      </el-table-column>
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
export default {
  props: {
    form: {
      type: Object,
      default: function () {
        return {}
      }
    },
    invoiceLogs: {
      type: Array,
      default: function () {
        return []
      }
    },
    isShowBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      permissions: cookie.getJSON('permissions'),

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
  mounted() {
    this.$nextTick(() => {
      /* eslint-disable no-new */
      new Viewer(document.getElementById('prove-img'), {
        zIndex: 10000
      })
    })
  },
  methods: {
    // 提交修改
    subChange (formName) {
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

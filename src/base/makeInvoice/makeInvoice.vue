<template>
  <div class="make-invoice">
    <el-dialog :title="title" :visible.sync="showInvoice" width="70%" style="max-height:800px;">
      <div class="invoice-title">
        <el-button type="warning">开票信息</el-button>
        <el-button type="primary" size="mini" icon="el-icon-view">查询纳税人资格</el-button>
      </div>
      <hr/>
      <el-form :model="form">
        <el-row :gutter="10">
          <el-col :sm="12">
            <el-form-item label="客户名称 :" :label-width="leftLabelWidth">
              <el-input v-model="form.cusName" disabled placeholder="客户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item :label-width="leftLabelWidth">
              <el-button v-if="isShowBtn" slot="label" type="primary">选择</el-button>
              <span class="tipWord">1、专票能抵扣增值税，普票不可以抵扣</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="12">
            <el-form-item label="发票公司名 :" :label-width="leftLabelWidth">
              <el-input v-model="form.comName" placeholder="发票公司名" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label-width="10px">
              <span class="tipWord">2、关于客服申请开具发票抬头的公司名称，与签约推广的公司不一致
              的，需要发票申请人所属部门副总审批以及线下提供资质如垫款证明</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="12">
            <el-form-item label="纳税人识别号 :" :label-width="leftLabelWidth">
              <el-input v-model="form.taxpayerNum" placeholder="发票公司名" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label-width="10px">
                <span class="tipWord">3、客服或商务申请提前开发票的，应由发票申请人所属部门副总审批</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="12">
            <el-form-item label="地址 :" :label-width="leftLabelWidth">
              <el-input v-model="form.addr" placeholder="地址" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="电话 :" :label-width="rightLabelWidth">
              <el-input v-model="form.phone" placeholder="电话" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="12">
            <el-form-item label="开户行 :" :label-width="leftLabelWidth">
              <el-input v-model="form.bank" placeholder="开户行" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="账号 :" :label-width="rightLabelWidth">
              <el-input v-model="form.account" placeholder="账号" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="12">
            <el-form-item label="发票类型 :" :label-width="leftLabelWidth">
              <el-radio v-model="form.invoiceType" label="11" class="radio-block">
                电子普票<span class="tipWord">(免邮寄、随用随打印)</span></el-radio>
              <el-radio v-model="form.invoiceType" label="10" class="radio-block">
                纸质普票</el-radio>
              <el-radio v-model="form.invoiceType" label="20" class="radio-block">
                专票</el-radio>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="发票示例 :" :label-width="rightLabelWidth" style="margin-bottom:0">
              <dl class="invoice-img">
                <dt><img src="./invoice3.jpg" class="img-responsive"></dt>
                <dd>电子普票</dd>
              </dl>
              <dl class="invoice-img">
                <dt><img src="./invoice1.jpg" class="img-responsive"></dt>
                <dd>纸质普票</dd>
              </dl>
              <dl class="invoice-img">
                <dt><img src="./invoice2.jpg" class="img-responsive"></dt>
                <dd>专票</dd>
              </dl>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="24">
            <el-form-item label="产品类型 :" :label-width="leftLabelWidth">
              <el-checkbox-group v-model="form.productType">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="24">
            <el-form-item label="备注 :" :label-width="leftLabelWidth">
              <el-input v-model="form.invoiceRemark" placeholder="备注" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="invoice-title">
          <el-button type="warning">寄票信息</el-button>
        </div>
        <hr/>
        <el-row :gutter="10">
          <el-col :sm="12">
            <el-form-item label="公司名称 :" :label-width="leftLabelWidth">
              <el-input v-model="form.receiveComName" placeholder="公司名称" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="收票地址 :" :label-width="rightLabelWidth">
              <el-input v-model="form.receiveAddr" placeholder="收票地址" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="12">
            <el-form-item label="收票电话 :" :label-width="leftLabelWidth">
              <el-input v-model="form.receiveTel" placeholder="收票电话" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="收票手机号 :" :label-width="rightLabelWidth">
              <el-input v-model="form.receivePhone" placeholder="收票手机号" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="12">
            <el-form-item label="收票联系人 :" :label-width="leftLabelWidth">
              <el-input v-model="form.receiveContact" placeholder="收票联系人" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showInvoice = false">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '申请发票'
    },
    isShowBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showInvoice: true,
      leftLabelWidth: '110px',
      rightLabelWidth: '90px',
      form: {
        cusName: '',
        comName: '',
        taxpayerNum: '',
        addr: '',
        phone: '',
        bank: '',
        account: '',
        invoiceType: '',
        productType: [],
        invoiceRemark: '',
        receiveComName: '',
        receiveAddr: '',
        receiveTel: '',
        receivePhone: '',
        receiveContact: ''
      }
    }
  },
  methods: {
    submit () {

    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
  .make-invoice{
    .invoice-title{
      display: flex;
      justify-content: space-between;
    }
    .tipWord{
      display: inline-block;
      color:red;
      height:16px;
      font-size: 12px;
      line-height: 16px;
    }
    .radio-block{
      display: block;
      margin-left: 0;
      margin-top:3px;
    }
    .invoice-img{
      display: inline-block;
      margin:0 5px;
      width:80px;
      height:100px;
      dd{
        margin:0;
        font-size: 12px;
      }
    }
    .dialog-footer{
      padding:0 50px 0 0;
    }
  }
</style>

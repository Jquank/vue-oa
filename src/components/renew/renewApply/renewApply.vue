<template>
  <div class="renew-apply">
    <el-form :model="form">
      <el-row :gutter="10">
        <el-col :sm="12">
          <el-form-item label="公司名称 :" :label-width="leftLabelWidth" required>
            <el-input v-model="form.comName" disabled placeholder="客户名称" class="input-btn"></el-input>
            <el-button type="primary">选 择</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="12">
          <el-form-item label="流水 :" :label-width="leftLabelWidth" required>
            <el-button type="primary">选 择</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="12">
          <el-form-item label="加款类型 :" :label-width="leftLabelWidth" required>
            <el-radio v-model="form.addType" label="11">电子普票</el-radio>
            <el-radio v-model="form.addType" label="10">纸质普票</el-radio>
            <el-radio v-model="form.addType" label="20">专票</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="12">
          <el-form-item label="活动类型 :" :label-width="leftLabelWidth" required>
            <el-radio v-model="form.activityType" label="11">电子普票</el-radio>
            <el-radio v-model="form.activityType" label="10">纸质普票</el-radio>
            <el-radio v-model="form.activityType" label="20">专票</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="12">
          <el-form-item label="是否需要发票 :" :label-width="leftLabelWidth" required>
            <el-radio v-model="form.isNeedInvoice" label="11">电子普票</el-radio>
            <el-radio v-model="form.isNeedInvoice" label="10">纸质普票</el-radio>
            <el-radio v-model="form.isNeedInvoice" label="20">专票</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="12">
          <el-form-item label="百度账号 :" :label-width="leftLabelWidth" required>
            <el-input v-model="form.bdAccount" disabled placeholder="百度账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="12">
          <el-form-item label="用户ID :" :label-width="leftLabelWidth">
            <el-input v-model="form.userID" disabled placeholder="用户ID"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="12">
          <el-form-item label="SF账号 :" :label-width="leftLabelWidth">
            <el-input v-model="form.sfAccount" disabled placeholder="SF账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="24">
          <el-form-item label="产品类型 :" :label-width="leftLabelWidth" required>
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
        <el-col :sm="12">
          <el-form-item label="大搜服务费 :" :label-width="leftLabelWidth" required>
            <el-input v-model="form.dsService" placeholder="大搜服务费"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="12">
          <el-form-item label="服务费期限 :" :label-width="leftLabelWidth" required>
            <el-input v-model="form.serviceYear" placeholder="服务费期限">
               <template slot="append">月</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="12">
          <el-form-item label="到款总金额 :" :label-width="leftLabelWidth">
            <span>{{form.receiveTotal | currency1}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="12">
          <el-form-item label="加款总金额 :" :label-width="leftLabelWidth">
            <span>{{form.addTotal | currency1}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="12">
          <el-form-item label="填写备注 :" :label-width="leftLabelWidth">
            <el-input v-model="form.remark" rows="3" type="textarea" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :sm="12" style="text-align:right">
          <el-form-item>
            <el-button type="primary" @click="submit">提 交</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leftLabelWidth: '115px',
      form: {
        comName: '',
        addType: '',
        activityType: '',
        isNeedInvoice: '',
        bdAccount: '',
        userID: '',
        sfAccount: '',
        productType: [],
        dsService: '',
        serviceYear: '',
        receiveTotal: 0,
        addTotal: '',
        remark: ''
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
  .renew-apply{

    padding: 20px;
    .input-btn{
      width:calc(~"(100% - 70px)");
    }
  }
</style>

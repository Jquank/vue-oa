<template>
  <div class="add-user">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :md="10">
          <el-form-item label="客户名称 :" :label-width="labelWidth" required>
            <el-input v-model="form.cusName" placeholder="客户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="10">
          <el-form-item label="成立日期 :" :label-width="labelWidth" required>
            <el-date-picker v-model="form.buildDate" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="10">
          <el-form-item label="客户法人 :" :label-width="labelWidth" required>
            <el-input v-model="form.cus" placeholder="客户法人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="10">
          <el-form-item label="客户地址 :" :label-width="labelWidth" required>
            <el-input v-model="form.cusAddr" placeholder="客户地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="10">
          <el-form-item label="客户网址 :" :label-width="labelWidth" required>
            <el-input v-model="form.cusWeb" placeholder="客户网址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="10">
          <el-form-item label="客户来源 :" :label-width="labelWidth" required>
            <el-input v-model="form.cusFrom" placeholder="客户来源"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="10">
          <el-form-item label="所属行业 :" :label-width="labelWidth" required>
            <select-trade style="width:100%"></select-trade>
          </el-form-item>
        </el-col>
        <el-col :md="10">
          <el-form-item label="所属地区 :" :label-width="labelWidth" required>
            <select-area style="width:100%"></select-area>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="20">
          <el-form-item label="经营范围 :" :label-width="labelWidth" required>
            <el-input type="textarea" placeholder="经营范围"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="20">
          <el-form-item label="备注 :" :label-width="labelWidth" required>
            <el-input type="textarea" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="10">
          <el-form-item label="联系人 :" :label-width="labelWidth" required>
            <el-input v-model="form.contact" placeholder="联系人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="10">
          <el-form-item label="联系电话 :" :label-width="labelWidth" required>
            <el-input v-model="form.phone" placeholder="联系电话" class="contact-phone"></el-input>
            <el-button type="success" size="mini" icon="fa fa-plus" circle></el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="0" class="btns">
        <el-button type="primary" @click="submit">添加为公共客户</el-button>
        <el-button type="primary" @click="submit">添加为我的跟踪客户</el-button>
        <el-button type="primary" @click="submit">添加并申请保A</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
export default {
  data () {
    return {
      labelWidth: '90px',
      form: {
        cusName: '',
        buildDate: '',
        cus: '',
        cusAddr: '',
        cusWeb: '',
        cusFrom: ''
      }
    }
  },
  methods: {
    accountNameBlur () {},
    submit () {}
  },
  components: {
    SelectArea,
    SelectTrade
  }
}
</script>

<style lang="less" scoped>
.add-user {
  background: #fff;
  padding: 20px;
  .contact-phone{
    width:calc(~"(100% - 30px)");
  }
  .btns .el-form-item__content{
    display: flex;
    justify-content: space-between;
  }
}
</style>

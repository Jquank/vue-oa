<template>
  <div class="add-user">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :md="10">
          <el-form-item label="账户名 :" :label-width="labelWidth" required>
            <el-input @blur.native="accountNameBlur" v-model="form.accountName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="10">
          <el-form-item label="真实姓名 :" :label-width="labelWidth" required><el-input v-model="form.trueName"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="10">
          <el-form-item label="工号 :" :label-width="labelWidth" required><el-input v-model="form.userNum"></el-input></el-form-item>
        </el-col>
        <el-col :md="10">
          <el-form-item label="性别 :" :label-width="labelWidth" required>
            <el-select v-model="form.sex" placeholder="选择性别" style="width:100%">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="10">
          <el-form-item label="身份证号 :" :label-width="labelWidth" required><el-input v-model="form.idCardNum"></el-input></el-form-item>
        </el-col>
        <el-col :md="10">
          <el-form-item label="密码 :" :label-width="labelWidth"><el-input v-model="form.password"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="10">
          <el-form-item label="银行卡号 :" :label-width="labelWidth"><el-input v-model="form.bankCardNum"></el-input></el-form-item>
        </el-col>
        <el-col :md="10">
          <el-form-item label="角色 :" :label-width="labelWidth" required>
            <el-select v-model="form.role" placeholder="选择性别" style="width:100%">
              <el-option v-for="item in form.role" :key="item.id" label="form.role.name" value="form.role.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="10">
          <!-- <el-form-item label="部门 :" :label-width="labelWidth"><el-input v-model="form.department"></el-input></el-form-item> -->
          <el-form-item label="部门 :" :label-width="labelWidth">
            <select-department @upDeptId="upDeptId" v-model="form.dept" style="width:100%"></select-department>
          </el-form-item>
        </el-col>
        <el-col :md="10">
          <el-form-item label="职位 :" :label-width="labelWidth" required>
            <el-select v-model="form.job" placeholder="选择性别" style="width:100%">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="10">
          <el-form-item label="手机 :" :label-width="labelWidth"><el-input v-model="form.phone"></el-input></el-form-item>
        </el-col>
        <el-col :md="10">
          <el-form-item label="分机 :" :label-width="labelWidth"><el-input v-model="form.extention"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="10">
          <el-form-item label="Hi号 :" :label-width="labelWidth"><el-input v-model="form.hi"></el-input></el-form-item>
        </el-col>
        <el-col :md="10">
          <el-form-item label="入职日期 :" :label-width="labelWidth">
             <el-date-picker v-model="form.entryDate" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="10">
          <el-form-item label="是否允许打电话 :" label-width="150px">
            <el-checkbox v-model="form.canCall" label="允许打电话" border></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item style="text-align:center">
        <el-button type="primary" @click="submit">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SelectDepartment from 'base/selectDepartment/selectDepartment'
export default {
  data () {
    return {
      labelWidth: '90px',
      form: {
        dept: '',
        accountName: '',
        trueName: '',
        userNum: '',
        sex: '',
        idCardNum: '',
        password: '',
        bankCardNum: '',
        role: '',
        department: '',
        job: '',
        phone: '',
        extention: '',
        hi: '',
        entryDate: '',
        canCall: ''
      }
    }
  },
  mounted () {
    this.$post('/Role/AllRolesGet').then(res => {
      console.log(res.data)
      if (res.data.status === 1) {

      }
    })
  },
  methods: {
    upDeptId (id) {
      this.form.dept = id
    },
    accountNameBlur () {

    },
    submit () {
      let params = {
        code: this.form.dept, // 部门编号
        true_name: this.form.trueName,
        sex: this.form.sex, // 0.男 1.女
        name: this.form.accountName, // 登录名
        workid: this.form.userNum, // 工号
        hi: this.form.hi, // hi号
        position: this.form.job, // 职位
        bankcard: this.form.bankCardNum,
        hiredate: this.form.entryDate,
        pwd: this.form.password,
        SFZ: this.form.idCardNum,
        office_phone: this.form.extention,
        mobile: this.form.phone
      }
      this.$post('/User/UserAdd', params).then(res => {
        console.log(res)
      })
    }
  },
  components: {SelectDepartment}
}
</script>

<style lang="less" scoped>
  .add-user{
    background: #fff;
    padding: 20px;
  }
</style>

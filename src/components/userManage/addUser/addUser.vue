<template>
  <div class="add-user padding20px media-padding">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="账户名 :" :label-width="labelWidth" required>
            <el-input @blur="accountNameBlur(form.accountName)" v-model="form.accountName" :disabled="editDisable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="真实姓名 :" :label-width="labelWidth" required>
            <el-input v-model="form.trueName" :disabled="editDisable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="工号 :" :label-width="labelWidth" required>
            <el-input @blur="accountNameBlur(form.userNum)" v-model="form.userNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="性别 :" :label-width="labelWidth" required>
            <el-select v-model="form.sex" :disabled="repeatDisabled" placeholder="选择性别" style="width:100%">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="身份证号 :" :label-width="labelWidth" required>
            <el-input v-model="form.idCardNum"  :disabled="repeatDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="密码 :" :label-width="labelWidth"><el-input v-model="form.password" :disabled="repeatDisabled"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="银行卡号 :" :label-width="labelWidth"><el-input v-model="form.bankCardNum" :disabled="repeatDisabled"></el-input></el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="角色 :" :label-width="labelWidth" required>
            <el-select v-model="form.role" :disabled="repeatDisabled" placeholder="选择角色" style="width:100%">
              <el-option v-for="item in form.roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保A配额 -->
      <el-row v-if="editDisable" :gutter="20">
        <el-col :md="12">
          <el-form-item label="保A配额 :" :label-width="labelWidth">
            <el-input v-model="form.baoAquota"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="跟踪配额 :" :label-width="labelWidth">
            <el-input v-model="form.followQuota"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="部门 :" :label-width="labelWidth">
            <select-department @upDeptId="upDeptId" :echoDept="echoDept" :key="key_dept" v-model="form.dept" style="width:100%"></select-department>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="职位 :" :label-width="labelWidth" required>
            <el-select v-model="form.job" :disabled="repeatDisabled" placeholder="选择职位" style="width:100%">
              <el-option v-for="item in form.jobList" :key="item.id" :label="item.code_desc" :value="item.code_val"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="手机 :" :label-width="labelWidth"><el-input v-model="form.phone" :disabled="repeatDisabled"></el-input></el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="座机 :" :label-width="labelWidth"><el-input v-model="form.extention" :disabled="repeatDisabled"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="Hi号 :" :label-width="labelWidth"><el-input v-model="form.hi" :disabled="repeatDisabled"></el-input></el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="入职日期 :" :label-width="labelWidth">
             <el-date-picker v-model="form.entryDate" :disabled="repeatDisabled" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 转正日期 -->
      <el-row v-if="editDisable" :gutter="20">
          <el-col :md="12">
            <el-form-item label="转正日期 :" :label-width="labelWidth">
              <el-date-picker v-model="form.turnRealDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="离职日期 :" :label-width="labelWidth">
              <el-date-picker v-model="form.leaveDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="是否允许打电话 :" label-width="150px">
            <el-checkbox v-model="form.canCall" :disabled="repeatDisabled" label="允许打电话" border></el-checkbox>
          </el-form-item>
        </el-col>
        <!-- 百度ID -->
        <el-col v-if="editDisable" :md="12">
          <el-form-item label="百度ID :" :label-width="labelWidth">
            <el-input v-model="form.baiduID" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item style="text-align:center">
        <el-button type="primary" @click="submit" :disabled="repeatDisabled">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SelectDepartment from 'base/selectDepartment/selectDepartment'
export default {
  props: {
    editDisable: {
      type: Boolean,
      default: false
    },
    echoUserInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      key_dept: '',
      echoDept: '',
      repeatDisabled: false,
      labelWidth: '90px',
      form:
      {
        dept: '',
        accountName: '',
        trueName: '',
        userNum: '',
        sex: '',
        idCardNum: '',
        password: '',
        bankCardNum: '',
        role: '',
        roleList: [],
        job: '',
        jobList: [],
        phone: '',
        extention: '',
        hi: '',
        entryDate: '',
        canCall: '',
        leaveDate: '',
        turnRealDate: '',
        baoAquota: '',
        followQuota: '',
        baiduID: ''
      }

    }
  },
  created () {
    this._getRolesAndPosition()
  },
  mounted () {
    if (!this.editDisable) {
      return
    }
    this.echoDept = this.echoUserInfo.fullDeptName
    this.key_dept = new Date() + ''
    let receiveData = {
      dept: this.echoUserInfo.code,
      accountName: this.echoUserInfo.name,
      trueName: this.echoUserInfo.true_name,
      userNum: this.echoUserInfo.workid,
      sex: this.echoUserInfo.sex + '',
      idCardNum: this.echoUserInfo.sfz,
      password: this.echoUserInfo.pwd,
      bankCardNum: this.echoUserInfo.bankcard,
      role: this.echoUserInfo.roles[0].rid,
      job: this.echoUserInfo.position,
      phone: this.echoUserInfo.mobile,
      extention: this.echoUserInfo.office_phone,
      hi: this.echoUserInfo.hi,
      entryDate: this.echoUserInfo.hiredate,
      canCall: this.echoUserInfo.dept,
      leaveDate: this.echoUserInfo.resignationtime,
      turnRealDate: this.echoUserInfo.turningtime,
      baoAquota: this.echoUserInfo.max_a,
      followQuota: this.echoUserInfo.max_b,
      baiduID: this.echoUserInfo.bdcall_id,
      id: this.echoUserInfo.id
    }
    this.form = Object.assign({}, this.form, receiveData)
  },
  methods: {
    upDeptId (id) {
      this.form.dept = id
    },
    accountNameBlur (name) {
      this.$post('/User/UserIsRepeat', {param: name}).then(res => {
        if (res.data.status === 0) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
          this.repeatDisabled = true
        } else {
          this.repeatDisabled = false
        }
      })
    },
    _getRolesAndPosition () {
      this.$post('/User/RolesAndPosition').then(res => {
        if (res.data.status === 1) {
          this.form.roleList = res.data.data.roles
          this.form.jobList = res.data.data.positions
        }
      })
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
        sfz: this.form.idCardNum,
        office_phone: this.form.extention,
        mobile: this.form.phone,
        rids: [this.form.role],
        dept: this.form.canCall
      }
      if (!this.editDisable) { // 新增人员页的提交
        this.$post('/User/UserAdd', params).then(res => {
          let code = res.data.status
          this.$message({
            message: res.data.msg,
            type: code === 1 ? 'success' : 'error'
          })
        }).catch(err => {
          console.log(err)
        })
      } else { // 人员列表编辑的提交
        let _params = {
          id: this.form.id,
          resignationtime: this.form.leaveDate,
          turningtime: this.form.turnRealDate,
          max_a: this.form.baoAquota,
          max_b: this.form.followQuota,
          bdcall_id: this.form.baiduID
        }
        params = Object.assign({}, params, _params)
        this.$post('/User/UserUpdate', params).then(res => {
          let code = res.data.status
          this.$message({
            message: res.data.msg,
            type: code === 1 ? 'success' : 'error'
          })
          if (code === 1) { // 派发编辑页关闭弹窗事件
            this.$emit('closeDialog', false)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  components: {SelectDepartment}
}
</script>

<style lang="less" scoped>
  .add-user{
    background: #fff;
  }
</style>

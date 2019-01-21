<template>
  <div class="add-user component-container media-padding">
    <scroll class="scroll-wrap">
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="账户名 :"  prop="accountName">
              <el-input @blur="accountNameBlur" v-model="form.accountName" :disabled="editDisable || quotaDisable" placeholder="账户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="真实姓名 :"   prop="trueName">
              <el-input v-model="form.trueName" :disabled="editDisable || quotaDisable" placeholder="真实姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="工号 :">
              <el-input v-model="form.userNum" :disabled="quotaDisable" placeholder="工号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="性别 :"  prop="sex">
              <el-select v-model="form.sex" :disabled="repeatDisabled || quotaDisable" placeholder="选择性别" style="width:100%;">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="!quotaDisable">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="身份证号 :">
              <el-input v-model="form.idCardNum" :disabled="repeatDisabled" placeholder="身份证号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="密码 :" >
              <el-input v-model="form.password" :disabled="repeatDisabled" placeholder="密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 保A配额 -->
        <el-row v-if="editDisable || quotaDisable" :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="保A配额 :" >
              <el-input v-model="form.baoAquota" placeholder="保A配额"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="跟踪配额 :" >
              <el-input v-model="form.followQuota" placeholder="跟踪配额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="!quotaDisable">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="部门 :" prop="dept">
              <select-department @upDeptId="upDeptId" :prepend="false" :echoDept="echoDept" :key="key_dept" v-model="form.dept" style="width:100%"></select-department>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="职位 :"  prop="job">
              <el-select v-model="form.job" :disabled="repeatDisabled" placeholder="选择职位" style="width:100%">
                <el-option v-for="item in form.jobList" :key="item.id" :label="item.code_desc" :value="item.code_val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="!quotaDisable">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="手机 :" >
              <el-input v-model="form.phone" :disabled="repeatDisabled" placeholder="手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="座机 :" >
              <el-input v-model="form.extention" :disabled="repeatDisabled" placeholder="座机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="!quotaDisable">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="Hi号 :" >
              <el-input v-model="form.hi" :disabled="repeatDisabled" placeholder="Hi号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="入职日期 :" prop="entryDate">
              <el-date-picker v-model="form.entryDate" :disabled="repeatDisabled" value-format="yyyy/MM/dd" type="date" placeholder="选择入职日期" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 转正日期 -->
        <el-row v-if="editDisable" :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="转正日期 :" >
              <el-date-picker v-model="form.turnRealDate" value-format="yyyy-MM-dd" type="date" placeholder="选择转正日期" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="离职日期 :" >
              <el-date-picker v-model="form.leaveDate" value-format="yyyy-MM-dd" type="date" placeholder="选择离职日期" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="!quotaDisable">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="是否允许打电话 :" label-width="135px">
              <el-checkbox @change="canCallChange" v-model="form.canCall" :disabled="repeatDisabled" label="允许打电话" border></el-checkbox>
              <el-button @click.native="getBaiduID" v-if="showBaiduisBtn" type="warning" size="mini">获取百度id</el-button>
            </el-form-item>
          </el-col>
          <!-- 百度ID -->
          <el-col :md="12" v-if="editDisable" class="maxwidth">
            <el-form-item label="百度ID :" >
              <el-input v-model="form.baiduID" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="角色 :"  prop="role">
              <el-select v-model="form.role" :disabled="repeatDisabled" placeholder="选择角色" style="width:100%;">
                <el-option v-for="item in form.roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="!quotaDisable">
          <!-- 序列 -->
          <el-col :md="12" class="maxwidth">
            <el-form-item label="序列 :">
              <el-select @focus="getRank(form.dept)" v-model="form.rank" :disabled="repeatDisabled" placeholder="选择序列" style="width:100%;">
                <el-option v-for="item in form.rankList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="所属地区 :" prop="inArea">
              <el-select v-model="form.inArea"  :disabled="repeatDisabled" placeholder="所属地区" style="width: 100%;">
                <el-option v-for="item in form.inAreaList" :key="item.id" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="!quotaDisable">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="招行卡号 :" >
              <el-input v-model="form.EX_ZHYHK" :disabled="repeatDisabled" placeholder="招行卡号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="中银卡号 :" >
              <el-input v-model="form.EX_ZGYHYHK" :disabled="repeatDisabled" placeholder="中银卡号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="text-right" style="max-width:900px;">
          <el-button type="primary" @click.native="submit('form')" :disabled="repeatDisabled">提 交</el-button>
        </div>
      </el-form>
    </scroll>
  </div>
</template>

<script>
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import { getRoles, getByCode } from 'api/getOptions'
import { timeFormat1 } from 'common/js/filters'
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    editDisable: { // 编辑人员信息
      type: Boolean,
      default: false
    },
    quotaDisable: { // 编辑配额
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
      showBaiduisBtn: false,
      form: {
        dept: '',
        accountName: '',
        trueName: '',
        userNum: '',
        sex: '',
        idCardNum: '',
        password: '',
        role: '',
        roleList: [],
        job: '',
        jobList: [],
        phone: '',
        extention: '',
        hi: '',
        entryDate: '',
        canCall: false,
        leaveDate: '',
        turnRealDate: '',
        baoAquota: '',
        followQuota: '',
        baiduID: '',
        EX_ZHYHK: '',
        EX_ZGYHYHK: '',
        rank: '',
        rankList: [],
        inArea: 'HUB027',
        inAreaList: []
      },

      rules: {
        accountName: [],
        trueName: [],
        userNum: [],
        sex: [],
        idCardNum: [],
        role: [],
        job: [],
        dept: [],
        entryDate: [],
        inArea: []
      }
    }
  },
  created () {
    for (let key in this.rules) {
      if (key === 'sex' || key === 'role' || key === 'job' || key === 'dept' || key === 'inArea') {
        this.rules[key].push({required: true, message: '请选择必选项', trigger: 'change'})
      } else {
        this.rules[key].push({required: true, message: '请输入必填项内容', trigger: 'blur'})
      }
    }
    this._getRoles()
    this._getPositions()
    if (!this.editDisable && !this.quotaDisable) {
      return
    }
    console.log(this.echoUserInfo)
    this.echoDept = this.echoUserInfo.deptfullname
    this.key_dept = new Date() + ''
    let receiveData = {
      canCall: this.echoUserInfo.dept === '9999' ? true : false, //eslint-disable-line
      baiduID: this.echoUserInfo.bdcall_id,
      accountName: this.echoUserInfo.uname,
      trueName: this.echoUserInfo.true_name,
      userNum: this.echoUserInfo.workid,
      idCardNum: this.echoUserInfo.SFZ,
      password: this.echoUserInfo.pwd, // 新密码
      sex: this.echoUserInfo.sex + '',
      extention: this.echoUserInfo.office_phone,
      phone: this.echoUserInfo.mobile,
      dept: this.echoUserInfo.deptcode,
      job: this.echoUserInfo.position,
      role: this.echoUserInfo.rid,
      followQuota: this.echoUserInfo.max_b,
      baoAquota: this.echoUserInfo.max_a,
      hi: this.echoUserInfo.hi,
      leaveDate: timeFormat1(this.echoUserInfo.resignationtime),
      turnRealDate: timeFormat1(this.echoUserInfo.turningtime),
      entryDate: timeFormat1(this.echoUserInfo.hiredate),
      EX_ZHYHK: this.echoUserInfo.EX_ZHYHK,
      EX_ZGYHYHK: this.echoUserInfo.EX_ZGYHYHK,
      rank: this.echoUserInfo.sequence,
      inArea: this.echoUserInfo.place_id
    }
    this.form = Object.assign({}, this.form, receiveData)
    this.getRank(this.form.dept) // 序列回显
  },
  mounted() {
    this._getInAreaList()
  },
  methods: {
    canCallChange(val) {
      if (val) {
        this.showBaiduisBtn = true
      } else {
        this.showBaiduisBtn = false
      }
    },
    getBaiduID() {
      let params = {
        username: this.echoUserInfo.uname,
        uid: this.echoUserInfo.uid
      }
      this.$post('/User.do?getBdcallId', params).then(res => {
        if (res.data.success === true) {
          this.form.baiduID = res.data.data
        }
      })
    },
    _getInAreaList() {
      this.$get('/System/setQueryArea.do').then(res => {
        if (res.data.success) {
          this.form.inAreaList = res.data.data
        }
      })
    },
    upDeptId (id) {
      this.form.dept = id
    },
    accountNameBlur () {
      if (!this.form.accountName) { return }
      this.$post('/Oper.do?SearchName', { name: this.form.accountName }).then(res => {
        if (res.data.success && res.data.data[0].number >= 1) {
          this.repeatDisabled = true
          this.$message({
            message: '名称重复',
            type: 'error'
          })
        } else {
          this.repeatDisabled = false
        }
      })
    },
    getRank (dept) {
      // if (!dept) {
      //   this.$message.warning('请先选择部门！')
      //   return
      // }
      this.$post('/Search.do?orgSequence', {deptCode: dept}).then(res => {
        if (res.data.success) {
          this.form.rankList = res.data.data
        }
      })
    },
    _getRoles () {
      getRoles().then(res => {
        if (res.data.success) {
          this.form.roleList = res.data.data
        }
      })
    },
    _getPositions () {
      getByCode(39).then(res => {
        if (res.data.success) {
          this.form.jobList = res.data.data
        }
      })
    },
    submit (formName) {
      let params = {
        dept: this.form.canCall ? '9999' : null,
        name: this.form.accountName, // 账户名
        truename: this.form.trueName,
        workid: this.form.userNum, // 工号
        pwd: this.form.password,
        sex: this.form.sex, // 0.男 1.女
        role: this.form.role,
        mobile: this.form.phone,
        phone: this.form.extention,
        code: this.form.dept, // 最下级部门编号
        position: this.form.job, // 职位
        hi: this.form.hi, // hi号
        hiredate: this.form.entryDate, // 入职日期 ,格式需要后台更改，新增页和编辑页不同
        SFZ: this.form.idCardNum,
        EX_ZHYHK: this.form.EX_ZHYHK,
        EX_ZGYHYHK: this.form.EX_ZGYHYHK,
        sequence: this.form.rank,
        place_id: this.form.inArea
      }
      // console.log(params)
      // return
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.editDisable && !this.quotaDisable) {
            // 新增人员页的提交
            this.$post('/Oper.do?AddUser', params)
              .then(res => {
                if (res.data[0].success) {
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                  })
                  this.$router.push('/indexPage/userList')
                } else {
                  this.$message({
                    message: '新增失败',
                    type: 'error'
                  })
                }
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            // 编辑人员和编辑配额的提交
            let _params = {
              dept: this.form.canCall ? '9999' : null,
              resignationtime: this.form.leaveDate,
              turningtime: this.form.turnRealDate,
              max_a: this.form.baoAquota,
              max_b: this.form.followQuota,
              update_a: this.echoUserInfo.max_a - this.form.baoAquota,
              update_b: this.echoUserInfo.max_b - this.form.followQuota,
              bdcall_id: this.form.baiduID,
              urid: this.echoUserInfo.urid,
              id: this.echoUserInfo.id,
              rid: this.form.role,
              role: this.echoUserInfo.urid
            }
            params = Object.assign({}, params, _params)
            // console.log(params)
            // return
            this.$post('/Oper.do?EditUser', params)
              .then(res => {
                if (res.data[0].success) {
                  this.$message({
                    message: '更改成功',
                    type: 'success'
                  })
                  // 派发编辑页关闭弹窗事件
                  this.$emit('closeDialog', false)
                } else {
                  this.$message({
                    message: '更改失败',
                    type: 'error'
                  })
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        } else {
          return false
        }
      })
    }
  },
  components: { SelectDepartment, Scroll }
}
</script>

<style lang="less" scoped>
.add-user {
  .maxwidth {
    max-width: 500px;
  }
  .scroll-wrap{
    height: 100%;
    overflow: hidden;
  }
}
</style>

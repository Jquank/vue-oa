<template>
  <div class="login-page">
    <div class="background">
      <div class="top">
        <div class="logo">
          <img src="../../common/img/main_logo1.png">
        </div>
      </div>
      <div class="bottom">
        <div class="cloud">
          <img src="../../common/img/cloud3.png">
          <div class="login">
            <el-form :model="form" :rules="rules" ref="ruleForm">
              <el-form-item prop="myName">
                <el-input v-model="form.myName" size="medium" placeholder=" 请输入用户名" prefix-icon="fa fa-user" @blur="myNameBlur"></el-input>
              </el-form-item>
              <el-form-item prop="myPassword">
                <el-input
                  @keyup.native.enter="login"
                  v-model="form.myPassword"
                  type="password"
                  size="medium"
                  placeholder=" 请输入密码"
                  prefix-icon="fa fa-lock"
                ></el-input>
              </el-form-item>
              <template v-if="showBindRealName">
                <el-form-item prop="realName">
                  <el-input v-model="form.realName" size="medium" placeholder=" 绑定真实账号" prefix-icon="fa fa-user"></el-input>
                </el-form-item>
                <el-form-item prop="realPassword">
                  <el-input
                    @keyup.native.enter="login"
                    v-model="form.realPassword"
                    type="password"
                    size="medium"
                    placeholder=" 绑定真实密码"
                    prefix-icon="fa fa-lock"
                  ></el-input>
                </el-form-item>
              </template>
              <el-form-item>
                <div class="btn-login text-right">
                  <el-checkbox @change="handleClickRemember" v-model="form.rememberPwd">记住此账号</el-checkbox>
                  <el-button @click.native="submitForm('ruleForm')" type="primary" style="width:100%;">登 录</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import axios from 'axios'
import { serverUrl } from 'api/http'
import { getByCode } from 'api/getOptions'
import storage from 'good-storage'
import { Base64 } from 'js-base64'
const REG = /^[\w-_,]{6,16}$/
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!REG.test(value)) {
        callback(new Error('密码格式错误，由字母、数字、下划线组成，6到16位'))
      } else {
        callback()
      }
    }
    return {
      form: {
        myName: '',
        myPassword: '',
        realName: '',
        realPassword: '',
        rememberPwd: false
      },
      handleRememberPwd: false,
      showBindRealName: false,
      regUserList: [],
      rules: {
        myName: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
        myPassword: [{ validator: validatePass, trigger: 'blur' }],
        realName: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
        realPassword: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.$route.query.data) {
      this.form.myName = this.$route.query.data.name || ''
      this.form.myPassword = this.$route.query.data.pwd || ''
    }
    this._rememberPwd()
  },
  methods: {
    myNameBlur() {
      this._isBindRealAccount(this.form.myName)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    login() {
      let params = {
        username: this.form.myName,
        password: this.form.myPassword,
        bind_name: this.form.realName,
        bind_pwd: this.form.realPassword
      }
      axios
        .post(serverUrl + '/User.do?login', params)
        .then(res => {
          if (res.data.success) {
            let preName = (cookie.getJSON('rememberForm') || {}).remName
            if (this.handleRememberPwd || (this.form.rememberPwd && this.form.myName !== preName)) {
              let data = {
                remName: this.form.myName,
                remPwd: Base64.encode(this.form.myPassword),
                remRealName: this.form.realName,
                remRealPwd: Base64.encode(this.form.realPassword)
              }
              cookie.set('rememberForm', data, { expires: 10 })
            }
            if (!this.handleRememberPwd && !this.form.rememberPwd) {
              cookie.remove('rememberForm')
            }
            let permissions = res.data.data.permissions
            permissions = permissions.split(',')
            cookie.set('permissions', permissions)
            cookie.set('token', res.data.data.tk)
            cookie.set('rid', res.data.data.rid)
            cookie.set('userId', res.data.data.id)
            cookie.set('userName', res.data.data.name)
            cookie.set('allowBar', res.data.data.dept)
            getByCode(52).then(res => {
              storage.set('x52', res)
            })
            this.$router.push('/indexPage')
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
        .catch(err => {
          this.$message({
            message: '网络错误，请检查！',
            type: 'error'
          })
          console.error(err)
        })
    },
    handleClickRemember(val) {
      this.handleRememberPwd = val
    },
    _rememberPwd() {
      let data = cookie.getJSON('rememberForm') || {}
      this._isBindRealAccount(data.remName)
      if (data.remPwd) {
        this.form.myName = data.remName
        this.form.myPassword = Base64.decode(data.remPwd)
        this.form.realName = data.remRealName
        this.form.realPassword = Base64.decode(data.remRealPwd)
        this.form.rememberPwd = true
      } else {
        this.form.myName = ''
        this.form.myPassword = ''
        this.form.realName = ''
        this.form.realPassword = ''
        this.form.rememberPwd = false
      }
    },
    _isBindRealAccount(loginName) {
      axios.get(serverUrl + '/User.do?getVirtualList').then(res => {
        if (res.data.success) {
          this.regUserList = res.data.data
          if (this.regUserList.findIndex(val => val.name === loginName) > 0) {
            this.showBindRealName = true
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-page {
  width: 100%;
  height: 100vh;
  // background: #63aeff;
  background: #FF9791;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .top {
    height: 50vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 150px;
      height: 150px;
    }
  }
  .bottom {
    height: 50vh;
    width: 100%;
    .cloud {
      height: 50vh;
      position: relative;
      .login {
        width: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .el-input,
        .el-button {
          font-size: 15px;
        }
      }
      img {
        height: 100%;
        width: 100%;
        display: block;
      }
    }
  }
}
</style>

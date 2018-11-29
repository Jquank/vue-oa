<template>
  <div class="login-page">
    <div class="background">
      <div class="top">
        <div class="logo">
          <img src="../../common/img/main_logo.png">
        </div>
      </div>
      <div class="bottom">
        <div class="cloud">
          <img src="../../common/img/cloud2.jpg">
          <div class="login">
            <el-form :model="form" :rules="rules" ref="ruleForm">
              <el-form-item prop="myName">
                <el-input
                  v-model="form.myName"
                  size="medium"
                  placeholder=" 请输入用户名"
                  prefix-icon="fa fa-user">
                </el-input>
              </el-form-item>
              <el-form-item prop="myPassword">
                <el-input
                  @keyup.native.enter="login"
                  v-model="form.myPassword"
                  type="password"
                  size="medium"
                  placeholder=" 请输入密码"
                  prefix-icon="fa fa-lock">
                </el-input>
              </el-form-item>
              <el-form-item>
                <div class="btn-login">
                  <el-button
                    @click.native="submitForm('ruleForm')"
                    type="primary"
                    style="width:100%;">登 录
                  </el-button>
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
const REG = /^[\w-_]{6,16}$/
export default {
  data () {
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
        myName: 'admin',
        myPassword: '1234rfv'
      },
      rules: {
        myName: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        myPassword: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    login () {
      let params = {
        username: this.form.myName,
        password: this.form.myPassword
      }
      axios
        .post(serverUrl + '/User.do?login', params)
        .then(res => {
          if (res.data.success) {
            console.log(res.data.data)
            let permissions = res.data.data.permissions
            permissions = permissions.split(',')
            cookie.set('token', res.data.data.tk)
            cookie.set('rid', res.data.data.rid)
            cookie.set('userId', res.data.data.id)
            cookie.set('userName', res.data.data.name)
            cookie.set('permissions', permissions)
            cookie.set('allowCall', res.data.data.dept)
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
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="less">
.login-page {
  width: 100%;
  height: 100vh;
  background: #63aeff;
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

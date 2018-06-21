<template>
  <div class="login-page">
    <div class="background">
      <div class="top">
        <div class="logo">
          <img src="../../common/img/main_logo.png" alt="">
        </div>
      </div>
      <div class="bottom">
        <div class="cloud">
          <img src="../../common/img/cloud2.jpg" alt="">
          <div class="login">
            <div>
              <el-input v-model="myName" size="medium" placeholder=" 请输入用户名" prefix-icon="fa fa-user"></el-input>
            </div>
            <div class="in-password">
              <el-input @keyup.native.enter="login" v-model="myPassword" type="password" size="medium" placeholder=" 请输入密码" prefix-icon="fa fa-lock"></el-input>
            </div>
            <div class="btn-login">
              <el-button @click="login" type="primary" style="width:100%;">登 录</el-button>
            </div>
            <div class="download">
              <a href="http://bg.baijiegroup.com/BaiJieOA/bj_crm_oa.zip">下载客户端</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { $post } from '@/api/http'
import { serverUrl } from '@/api/config'
import { mapMutations, mapActions } from 'vuex'
import { getCode } from 'api/getOptions'
import storage from 'good-storage'
const LOGIN_URL = serverUrl + '/User.do?login'
export default {
  data () {
    return {
      myName: 'admin',
      myPassword: '1234rfv'
      // userName: ""
    }
  },
  mounted () {
    storage.remove('productType')
  },
  methods: {
    ...mapActions([
      'getProductType'
    ]),
    login () {
      let params = {
        username: this.myName,
        password: this.myPassword
      }
      $post(LOGIN_URL, params)
        .then(res => {
          if (res.data.success === true) {
            sessionStorage.setItem('userName', res.data.data.name)
            sessionStorage.setItem('userId', res.data.data.id)
            sessionStorage.setItem('permissions', res.data.data.permissions)
            sessionStorage.setItem('token', res.data.data.tk)

            getCode(38).then(res => {
              this.getProductType(res)
            })
            this.getUserName()
            setTimeout(() => {
              this.$router.push('/indexPage')
            })
          } else {
            this.$message({
              message: '账号或密码错误！',
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
    },
    ...mapMutations({
      getUserName: 'GET_USERNAME',
      getProductType: 'GET_PRODUCT_TYPE'
    })

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
        .in-password,
        .btn-login {
          margin-top: 10px;
        }
        .download {
          margin-top: 5px;
          display: flex;
          justify-content: flex-end;
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

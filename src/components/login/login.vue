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
import cookie from 'js-cookie'
export default {
  data () {
    return {
      myName: 'admin',
      myPassword: '1234rfv'
      // userName: ""
    }
  },
  created () {
    // storage.remove('productType')
    // storage.remove('wjType')
    // storage.remove('department')
    // storage.remove('province')
    // storage.remove('trade')
    // storage.remove('bankType')
  },
  mounted () {
  },
  methods: {
    login () {
      // this.$router.push('/indexPage')
      let params = {
        username: this.myName,
        password: this.myPassword
      }
      this.$post('/login', params)
        .then(res => {
          if (res.data.status === 1) {
            // storage.session.set('userId', res.data.data.id)
            // storage.session.set('permissions', res.data.data.permissions)
            // storage.session.set('token', res.data.data.tk)
            cookie.set('userName', this.myName)
            this.$router.push('/indexPage')
            // getCode(38).then(res => {
            //   let data = res.data.data || []
            //   storage.set('productType', data)
            // })

            // getCode(28).then(res => {
            //   let data = res.data.data || []
            //   storage.set('wjType', data)
            // })

            // getCode(42).then(res => {
            //   let data = res.data.data || []
            //   storage.set('bankType', data)
            // })

            // getArea({parentid: 1}).then(res => {
            //   let data = res.data.data || []
            //   // let data = this._transTree(res.data.data, 'id', 'parentid')
            //   data.forEach(val => {
            //     val.children = []
            //     val.label = val.AREANAME
            //   })
            //   storage.set('province', data)
            // })

            // getTrade().then(res => {
            //   let data = res.data.data || []
            //   data.forEach(val => {
            //     val.children = []
            //     val.label = val.name
            //   })
            //   storage.set('trade', data)
            // })

            // getDepartment().then(res => {
            //   let data = res.data.data || []
            //   let department = this._transTree(data)
            //   storage.set('department', department)
            // })
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
    _transTree (arr) {
      let r = []
      let hash = {}
      arr.forEach((val, key) => {
        hash[val.code] = val
      })
      for (let i = 0; i < arr.length; i++) {
        let oneData = arr[i]
        let parentcode = oneData.parentcode
        let hashVP = hash[parentcode]
        if (hashVP) {
          !hashVP['children'] && (hashVP['children'] = [])
          hashVP['children'].push(oneData)
        } else {
          r.push(oneData)
        }
      }
      return r
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

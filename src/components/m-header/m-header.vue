<template>
  <div>
    <div ref="nested" class="nested" id="nested">
      <a @click="nested" class="fa" :class="collapseIcon"></a>
    </div>
    <div class="m-header">
      <div class="header-left">
        <div>
          <img ref="logoimg" class="logo-img" src="../../common/img/logo.jpg" alt="">
        </div>
        <div class="m-bread" id="m-bread">
          <span>{{firstTitle}}</span>
          <span v-show="secondTitle">&nbsp;/&nbsp;</span>
          <span ref="secondTitle">{{secondTitle}}</span>
          <span v-show="thirdTitle">&nbsp;/&nbsp;</span>
          <span>{{thirdTitle}}</span>
        </div>
      </div>
      <ul class="head-ul">
        <!-- <li id="down-client">
          <a href="http://bg.baijiegroup.com/BaiJieOA/bj_crm_oa.zip" title="下载客户端">
            <span class="fa fa-download"></span>
          </a>
        </li> -->
        <li id="help-doc">
          <a href="http://bg.baijiegroup.com/hlp/index.html" target="_blank" title="帮助文档">
            <span class="fa fa-file"></span>
          </a>
        </li>
        <li>
          <a href="javascript:void (0)" title="刷新" @click="refresh">
            <span class="fa fa-refresh"></span>
          </a>
        </li>
        <li>
          <a href="javascript:void (0)" title="未读消息">
            <span class="fa fa-bell"></span>
          </a>
        </li>
        <li id="full-screen">
          <a href="javascript:void (0)" title="全屏" @click="fullScreen">
            <span class="fa fa-arrows-alt"></span>
          </a>
        </li>
        <li id="user-name">
          <a href="javascript:void (0)">
            <span>{{uName}}</span>
          </a>
        </li>
        <li>
          <a href="javascript:void (0)">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <img class="avater" src="../../common/img/avatar.jpg" alt="">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="dialogFormVisible = true">修改个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="exitLogin">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </a>
        </li>
      </ul>
    </div>
    <!-- 修改个人信息弹窗 start-->
    <el-dialog @open="open" title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="formLabelWidth">
          <el-input v-model="form.trueName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="editPwd" type="password" v-model="form.mima" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPwd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改个人信息弹窗 end-->
  </div>

</template>

<script>
import { enterfullscreen, exitfullscreen } from 'api/myHeader'
import { serverUrl } from 'api/config'
import { $post } from 'api/http'
import cookie from 'js-cookie'

export default {
  computed: {
    uName () {
      return cookie.get('userName')
    }
  },
  data () {
    return {
      collapseIcon: 'fa-outdent',
      dialogFormVisible: false,
      form: {
        name: '',
        trueName: '',
        mima: ''
      },
      formLabelWidth: '75px',
      count: 0,
      collapseCount: 0,
      firstTitle: '首页',
      secondTitle: '',
      thirdTitle: '',
      lastRoutePath: ''
    }
  },
  watch: {
    $route (to, from) {
      this._findBread()
      this.lastRoutePath = from.path
    }
  },
  created () {
    this._findBread()
  },
  mounted () {
  },
  methods: {
    // 侧边栏折叠
    nested () {
      this.collapseCount++
      let result = this.collapseCount % 2 === 0
      let width = document.documentElement.clientWidth
      width < 768 ? this.phoneCollapse(width, result) : this.pcCollapse(width, result)
    },
    phoneCollapse (width, result) {
      let aside = document.getElementById('nav-aside')
      let logo = this.$refs.logoimg
      this.$refs.nested.style.left = result ? '10px' : '170px'
      result ? aside.setAttribute('style', 'width:0 !important') : aside.setAttribute('style', 'width:160px !important')
      result ? logo.setAttribute('style', 'width:0 !important') : logo.setAttribute('style', 'width:160px !important')
    },
    pcCollapse (width, result) {
      let aside = document.getElementById('nav-aside')
      let logo = this.$refs.logoimg
      this.$refs.nested.style.left = result ? '190px' : '10px'
      result ? aside.setAttribute('style', 'width:180px !important') : aside.setAttribute('style', 'width:0 !important')
      result ? logo.setAttribute('style', 'width:180px !important') : logo.setAttribute('style', 'width:0 !important')
    },
    fullScreen () {
      this.count++
      this.count % 2 === 1 ? enterfullscreen() : exitfullscreen()
    },
    open () {
      this.form.name = this.uName
    },
    editPwd () {
      let userUrl = serverUrl + '/Oper.do?EditPwd'
      let reg = /^[0-9A-Za-z_]{4,10}$/
      let myPassword = '' + this.form.mima
      if (reg.test(myPassword)) {
        $post(userUrl, { username: this.uName }).then(res => {
          if (res.data.status === 1) {
            this.$message({
              message: '修改成功,请重新登录',
              type: 'success'
            })
            this.dialogFormVisible = false
            setTimeout(() => {
              cookie.remove('userName')
              this.$router.push('/login')
            }, 100)
          }
        })
      } else {
        this.$message({
          message: '密码请填写4到8位的数字、字母、下划线组合',
          type: 'error'
        })
      }
    },
    exitLogin () {
      cookie.remove('token')
      cookie.remove('userId')
      cookie.remove('permissions')
      this.$router.push('/login')
      // $post('/logout').then(res => {
      //   if (res.data.status === -1) {

      //   }
      // })
    },
    refresh () {
      this.$router.go(0)
    },
    _findBread () {
      let text = this.$router.currentRoute.meta.text || ''
      let bread = text.split('/')
      this.secondTitle = bread[0] === '首页' ? '' : bread[0]
      this.thirdTitle = bread[1]
    }
  }
}
</script>

<style scoped lang="less">
.nested {
  width: 25px;
  font-size: 16px;
  z-index: 1000;
  position: fixed;
  top: 17px;
  left: 190px;
  transition: all 0.5s;
  cursor: pointer;
}
.m-header {
  display: flex;
  justify-content: space-between;
  .header-left {
    display: flex;
    .m-bread {
      height: 50px;
      min-width: 260px;
      line-height: 50px;
      padding-left: 35px;
      color: gray;
      & > span:nth-child(2n-1) {
        cursor: pointer;
      }
    }
    .logo-img {
      width: 180px;
      height: 50px;
      // position: relative;
      // top: 0;
      // left: -10px;
      transition: all 0.5s;
    }
  }

  ul {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    // align-items: center;
    li {
      height: 100%;
      line-height: 50px;
      margin-right: 10px;
      > a {
        width: 100%;
        height: 100%;
        display: inline-block;
        padding: 0 5px;
        text-align: center;
      }
      & > a:hover {
        background: #eeeeee;
      }
      .avater {
        width: 30px;
        border-radius: 50%;
      }
      .el-dropdown-link {
        height: 50px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

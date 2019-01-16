<template>
  <div>
    <div ref="nested" class="nested" id="nested">
      <a @click="nested" class="fa" :class="collapseIcon"></a>
    </div>
    <div class="m-header">
      <div class="header-left">
        <div class="logo-wrapper">
          <img ref="logoimg" id="logo-img" class="logo-img" src="../../common/img/logo_no.png" alt="">
        </div>
        <div class="m-bread" id="m-bread">
          <span>{{firstTitle}}</span>
          <span v-show="secondTitle">&nbsp;/&nbsp;</span>
          <span ref="secondTitle">{{secondTitle}}</span>
          <span v-show="thirdTitle">&nbsp;/&nbsp;</span>
          <span>{{thirdTitle}}</span>
          <el-input v-model="phoneNum" size="mini" class="contact-phone ml10px" @keyup.enter.native="call_phone"></el-input>
          <el-button class="xsbtn" circle type="success" icon="fa fa-phone" @click.native="call_phone"></el-button>
          <!-- <el-button class="xsbtn" circle type="primary" icon="fa fa-envelope-o" @click.native="send_message"></el-button> -->
        </div>
      </div>
      <ul class="head-ul">
        <!-- <li id="header-phone">
          <el-input v-model="phoneNum" size="mini" class="contact-phone" @keyup.enter.native="call_phone"></el-input>
          <el-button class="xsbtn" circle type="success" icon="fa fa-phone" @click.native="call_phone"></el-button>
          <el-button class="xsbtn" circle type="primary" icon="fa fa-envelope-o" @click.native="send_message"></el-button>
        </li> -->
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
                <el-dropdown-item @click.native="openChangeInfoDialog">修改个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="exitLogin">退出登录</el-dropdown-item>
                <!-- <el-dropdown-item @click.native="errorHistory">历史报错</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </a>
        </li>
      </ul>
    </div>
    <!-- 修改个人信息弹窗 start-->
    <el-dialog :append-to-body="true" title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="85px">
        <el-form-item label="用户名 :">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="真实姓名 :">
          <el-input v-model="form.trueName"></el-input>
        </el-form-item>
        <el-form-item label="密码 :">
          <el-input @keyup.enter.native="editPwd" type="password" v-model="form.mima"></el-input>
        </el-form-item>
      </el-form>
      <div class="text-right">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPwd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :modal-append-to-body="false" :append-to-body="true" title="错误收集" :visible.sync="errorDialog" width="900px">
      <error-collect></error-collect>
    </el-dialog>
  </div>

</template>

<script>
import { enterfullscreen, exitfullscreen } from 'api/myHeader'
import cookie from 'js-cookie'
import storage from 'good-storage'
import { mapGetters, mapMutations } from 'vuex'
import { autoHeight, appMark } from 'common/js/utils'
import ErrorCollect from 'base/errorCollect/errorCollect'
// const phoneReg = /^((13[0-9])|(14([0-3]|[5-9]))|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/
export default {
  computed: {
    uName() {
      return cookie.get('userName')
    },
    ...mapGetters([
      'collapseCount'
    ])
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
      count: 0,
      firstTitle: '首页',
      secondTitle: '',
      thirdTitle: '',
      lastRoutePath: '',
      errorDialog: false,

      phoneNum: ''
    }
  },
  watch: {
    $route(to, from) {
      this._findBread()
      this.lastRoutePath = from.path
      // todo 此处transition会移除掉此样式(暂未使用动画，如用，请使用定时器)
      this.$nextTick(() => {
        autoHeight()
      })
      // setTimeout(() => {
      //   autoHeight()
      // }, 500)

      // 自动添加电话图标，打电话
      setTimeout(() => {
        let appendPhones = document.getElementsByClassName('append-phone')
        if (!appendPhones) {
          return
        }
        for (let i = 0, len = appendPhones.length; i < len; i++) {
          let appendPhone = appendPhones[i]
          let el = document.createElement('i')
          el.className = 'fa fa-phone call-phone-icon'
          appendPhone.appendChild(el)
          el.addEventListener('click', (e) => {
            this.callPhone(e.target.previousElementSibling.innerText, 30, appendPhone.getAttribute('data-cpid'))
          })
        }
      }, 50)
    }
  },
  created () {
    this._findBread()
  },
  mounted () {
    autoHeight()
    this.handleClickCollapse()
  },
  methods: {
    call_phone() {
      this.phoneNum = this._regPhone(this.phoneNum)
      this.callPhone(this.phoneNum, 100)
    },
    send_message() {
      this.phoneNum = this._regPhone(this.phoneNum)
      this.$post('/cc.do?callSMS', {phone: this.phoneNum}).then(res => {
        if (res.data.success) {
          this.$message.success('短信已发送')
        }
      })
    },
    _regPhone(num) {
      if (num) {
        return num.match(/[-\d]/g).join('')
      }
    },
    errorHistory () {
      this.errorDialog = true
    },
    // 侧边栏折叠
    nested () {
      this.changeCollapseCount()
      let result = this.collapseCount % 2 === 0
      let width = document.documentElement.clientWidth
      appMark() ? this.phoneCollapse(width, result) : this.pcCollapse(width, result)
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
      this.$refs.nested.style.left = result ? '170px' : '10px'
      result ? aside.setAttribute('style', 'width:160px !important') : aside.setAttribute('style', 'width:0 !important')
      result ? logo.setAttribute('style', 'width:160px !important') : logo.setAttribute('style', 'width:0 !important')
    },
    fullScreen () {
      this.count++
      this.count % 2 === 1 ? enterfullscreen() : exitfullscreen()
    },
    // 手机上点击导航栏以外的地方收起导航栏
    handleClickCollapse() {
      let main = document.getElementById('main')
      main.addEventListener('click', () => {
        if (!appMark()) {
          return
        }
        if (this.collapseCount % 2 !== 0) {
          this.phoneCollapse('', true)
          this.changeCollapseCount()
        }
      })
    },
    openChangeInfoDialog() {
      this.dialogFormVisible = true
      this.$get('/Oper.do?ListAll', { 'id': cookie.get('userId') }).then(res => {
        let info = res.data[0].data[0]
        this.form = {
          name: info.uname,
          trueName: info.true_name,
          mima: ''
        }
      })
    },
    editPwd () {
      const userUrl = '/Oper.do?EditPwd'
      const reg = /^[\w-_,]{6,16}$/
      let myPassword = '' + this.form.mima
      if (reg.test(myPassword)) {
        let params = {
          'id': cookie.get('userId'),
          'pwd': this.form.mima,
          'truename': this.form.trueName || undefined
        }
        this.$post(userUrl, params).then(res => {
          if (res.data[0].success) {
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
            this.dialogFormVisible = false
          }
        })
      } else {
        this.$message({
          message: '密码请填写6到16位的数字、字母、下划线组合',
          type: 'error'
        })
      }
    },
    exitLogin () {
      cookie.remove('token')
      cookie.remove('rid')
      cookie.remove('userId')
      cookie.remove('permissions')
      cookie.remove('allowBar')
      storage.clear()
      storage.session.clear()
      this.$router.push('/login')
    },
    refresh () {
      this.$router.go(0)
    },
    _findBread () {
      let text = this.$router.currentRoute.meta.text || ''
      let bread = text.split('/')
      this.secondTitle = bread[0] === '首页' ? '' : bread[0]
      this.thirdTitle = bread[1]
    },
    ...mapMutations({
      changeCollapseCount: 'CHANGE_COLLAPSE_COUNT'
    })
  },
  components: {
    ErrorCollect
  }
}
</script>

<style scoped lang="less">
.nested {
  width: 25px;
  font-size: 16px;
  z-index: 1000;
  position: fixed;
  top: 14px;
  left: 170px;
  transition: all 0.5s;
  cursor: pointer;
}
.m-header {
  display: flex;
  justify-content: space-between;
  .header-left {
    flex: 1;
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
      & .el-button+.el-button{
        margin-left: 2px;
      }
      .contact-phone{
        width: 140px;
      }
    }
    .logo-img {
      width: 160px;
      height: 50px;
      // position: relative;
      // top: 0;
      // left: -10px;
      transition: all 0.5s;
    }
    .logo-wrapper{
      height: 50px;
      overflow: hidden;
      background: @bg-nav !important;
      border-bottom: 1px solid #babdc2;
      margin-top: -1px;
      // margin-left: -20px;
      // box-shadow:2px 0px 30px 2px #b6cfe9 inset;
    }
  }

  ul {
    width: 100%;
    height: 50px;
    flex: 0 0 260px;
    width: 260px;
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
  #header-phone{
  }
}
</style>

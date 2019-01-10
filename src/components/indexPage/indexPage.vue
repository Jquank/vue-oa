<template>

  <div id="app">
    <el-container>
      <!-- 头部 -->
      <el-header id="my-header" height="50px" v-if="menushow">
        <m-header></m-header>
      </el-header>
      <!-- 左侧边栏和主体内容 -->
      <el-container class="con-bottom">
        <!-- 左侧边栏 -->
        <el-aside @touchstart.native="touchStart" @touchmove.native="touchMove" @touchend.native="touchEnd" id="nav-aside" class="nav-aside" width="160px" v-if="menushow">
          <navbar></navbar>
        </el-aside>
        <!-- 主体内容 -->
        <el-main id="main" @click.native="hiddenDepartment">
          <div id="call-center" v-if="isShow&&menushow">
            <iframe ref="iframecall" id="iframe-call" src="http://gccp.baidu.com/gaiamgmt/fe-communication/communications/index.html#/" frameborder="0"></iframe>
          </div>
          <!-- <transition name="fade" mode="out-in"> -->
            <router-view></router-view>
          <!-- </transition> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import { loadCallIframe } from 'api/call'
import Navbar from 'components/navbar/navbar'
import MHeader from 'components/m-header/m-header'
// import { getArea, getSource, getTrade } from '@/api/getOptions'
// import BScroll from 'better-scroll'
import cookie from 'js-cookie'
import { mapMutations } from 'vuex'
// import { autoHeight } from 'common/js/utils'
let startX = 0
let startY = 0
let endX = 0
let endY = 0
export default {
  data () {
    return {
      nav: null,
      logo: null,
      nested: null,
      menushow: true
    }
  },
  computed: {
    isShow () {
      return cookie.get('allowBar') === '9999'
    }
  },
  created() {
    let mark = window.location.href.split('?menu=')[1]
    let str = ''
    if (mark) {
      str = mark.substr(0, 2)
      this.menushow = str !== 'no'
    }
  },
  mounted () {
    // autoHeight()
    let allowBar = cookie.getJSON('allowBar')
    if (allowBar && this.menushow) {
      window.agentbar.init('iframe-call')
      let iframe = document.getElementById('iframe-call')
      let urlParams = '/gaiaopt/rest/interface/agent/agentBarInit4H5'
      iframe.onload = () => {
        this.$get('/bdurl.do?init', {'url': urlParams}).then(res => {
          if (res.data.success) {
            window.agentbar.initial(res.data.data)
          }
        })
      }
    }
    this.nav = document.getElementById('nav-aside')
    this.logo = document.getElementById('logo-img')
    this.nested = document.getElementById('nested')
    // loadCallIframe('iframe-call')
    // let main = document.getElementById('main')
    // this.$nextTick(() => {
    //   let scroll = new BScroll(main, { //eslint-disable-line
    //     click: true,
    //     scrollY: true,
    //     scrollX: true,
    //     freeScroll: true
    //   })
    // })
  },
  methods: {
    hiddenDepartment (e) { // 隐藏部门树
      let tree = document.getElementById('department')
      if (tree && e.target.id !== 'dept-input') {
        tree.style.display = 'none'
      }
    },
    touchStart (e) {
      startX = e.changedTouches[0].pageX
      startY = e.changedTouches[0].pageY
    },
    touchEnd (e) {
      endX = e.changedTouches[0].pageX
      endY = e.changedTouches[0].pageY
      const X = endX - startX
      const Y = endY - startY
      if (Math.abs(X) > Math.abs(Y) && X < -20) { // 导航栏向左划入
        this.nav.setAttribute('style', 'width:0 !important')
        this.logo.setAttribute('style', 'width:0 !important')
        this.nested.setAttribute('style', 'left:10px')
        this.changeCollapseCount() // 触发一次折叠标志
      }
    },
    touchMove (e) {
    },
    ...mapMutations({
      changeCollapseCount: 'CHANGE_COLLAPSE_COUNT'
    })
  },
  components: {
    Navbar,
    MHeader
  }
}
</script>

<style scoped lang="less">
#app {
  padding: 0;

  .el-header {
    width: 100%;
    padding: 0 5px 0 0;
    border-bottom: 1px solid #e2e5ec;
    position: fixed;
    top: 0;
    left: 0;
  }
  .con-bottom {
    margin-top: 50px;
    height: calc(~'(100vh - 50px)');
    #call-center {
      width: 100%;
      overflow: hidden;
      #iframe-call {
        width: 100%;
        max-height: 95px;
      }
    }
    .nav-aside {
      z-index: 1999;
      height: 100%;
      overflow: hidden;
      transition: all 0.5s;
    }
    .el-main {
      padding: 5px;
      background: #e2e5ec;
      // -webkit-overflow-scrolling: touch;
    }
  }
  .fade-enter-active{
    transition: opacity .4s ease, transform .3s cubic-bezier(0.3, 0.5, 0.8, 1.15);
  }
  .fade-leave-active {
    transition: opacity .4s ease-in-out, transform .3s ease-in;
  }
  .fade-enter{
    opacity: 0;
    transform: translate3d(-40px, 0, 0);
  }
  .fade-leave-to{
    opacity: 0;
    transform: translate3d(40px, 0, 0);
  }
}
</style>

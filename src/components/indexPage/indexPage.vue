<template>

  <div id="app">
    <el-container>
      <!-- 头部 -->
      <el-header id="my-header" height="50px">
        <m-header></m-header>
      </el-header>
      <!-- 左侧边栏和主体内容 -->
      <el-container class="con-bottom">
        <!-- 左侧边栏 -->
        <el-aside id="nav-aside" class="nav-aside" width="180px">
          <navbar></navbar>
        </el-aside>
        <!-- 主体内容 -->
        <el-main id="main">
          <!-- <div id="call-center">
            <iframe ref="iframecall" id="iframe-call" src="http://gccp.baidu.com/gaiamgmt/fe-communication/communications/index.html#/" frameborder="0"></iframe>
          </div> -->
          <transition name="fade">
            <router-view></router-view>
          </transition>
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
export default {
  data () {
    return {}
  },
  mounted () {
    // loadCallIframe('iframe-call')
    let main = document.getElementById('main')
    this.$nextTick(() => {
      let scroll = new BScroll(main, { //eslint-disable-line
        click: true,
        scrollY: true,
        scrollX: true,
        freeScroll: true
      })
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
    // #call-center {
    //   width: 100%;
    //   #iframe-call {
    //     width: 100%;
    //     max-height: 95px;
    //   }
    // }
    .nav-aside {
      z-index: 1999;
      background: #19233c;
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
  .fade-enter-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .fade-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>

<template>

  <div id="app">
    <el-container>
      <!-- 1左侧边栏 -->
      <el-aside id="nav-aside" class="nav-aside" width="180px">
        <navbar></navbar>
      </el-aside>
      <!-- 2右侧头部和主体内容 -->
      <el-container class="con-right">
        <!-- 头部 -->
        <el-header height="50px">
          <m-header></m-header>
        </el-header>
        <!-- 主体内容 -->
        <el-main>
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
import { loadCallIframe } from 'api/call'
import Navbar from 'components/navbar/navbar'
import MHeader from 'components/m-header/m-header'
// import { getArea, getSource, getTrade } from '@/api/getOptions'
export default {
  data () {
    return {}
  },
  mounted () {
    loadCallIframe('iframe-call')
  },
  components: {
    Navbar,
    MHeader
  }
}
</script>

<style scoped lang="less">
@import '../../common/css/media.css';
#app {
  padding: 0;
  .nav-aside {
    background: #19233c;
    height: 100%;
    overflow: hidden;
    transition: all 0.5s;
  }
  .con-right {
    height: 100vh;
    #call-center {
      width: 100%;
      #iframe-call {
        width:100%;
        max-height: 95px;
      }
    }
    .el-header {
      padding: 0;
      background: #fff;
      border-bottom: 1px solid #e2e5ec;
    }
    .el-main {
      padding: 5px 10px;
      background: #e2e5ec;
    }
  }
  .fade-enter-active{
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter{
    opacity: 0;
    transform: translate3d(100%,0,0)
  }
}
</style>

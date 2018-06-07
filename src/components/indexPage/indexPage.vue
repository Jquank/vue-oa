<template>

  <div id="app">
    <el-container>
      <!-- 1左侧边栏 -->
      <el-aside class="nav-aside" width="180px">
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
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Navbar from '../../components/navbar/navbar'
import MHeader from '../../components/m-header/m-header'
// import { getArea, getSource, getTrade } from '@/api/getOptions'
export default {

  data () {
    return {

    }
  },
  created () {

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
    .nav-aside {
      background: #19233c;
      height: 100%;
      overflow: hidden;
    }
    .con-right{
      height:100vh;
      .el-header{
        padding:0;
        background: #FFF;
        border-bottom: 1px solid #e2e5ec;
      }
      .el-main{
        padding:10px;
        background: #e2e5ec;
      }
    }

  }

</style>

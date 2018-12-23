<template>
  <div class="control-scroll">
    <div ref="navbar" class="nav-bar">
      <el-menu :collapse="myCollapse" router background-color="#19233C" text-color="#bfcbd9" active-text-color="#fff" :unique-opened="false" :default-active="$router.currentRoute.fullPath">
        <el-menu-item index="/indexPage/indexContent" class="home-title">
          <i class="fa fa-home fa-fw fa-lg"></i>
          <span slot="title">&nbsp;首页</span>
        </el-menu-item>
        <el-submenu v-for="(item, index) in navList" :key="index" :index="item.id+''"  v-if="permissions.indexOf(item.id)>-1">
          <span slot="title">
            <i :class="item.fontIcon"></i>&nbsp;
            <span>{{item.text}}</span>
          </span>
          <el-menu-item class="item-active" :ref="child.to" v-for="(child, index) in item.cList" :key="index" :index="child.to"  v-if="permissions.indexOf(child.cid)>-1 || child.cid === '1000' || child.cid === '1100'">
          <!-- <el-menu-item class="item-active" :ref="child.to" v-for="(child, index) in item.cList" :key="index" :index="child.to"> -->
            {{child.text}}
            <!-- 1000: 客户搜索，1100：工资管理 -->
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { navList } from '@/api/config'
import cookie from 'js-cookie'
// import { addClass, removeClass } from 'common/js/dom'
export default {
  data () {
    return {
      permissions: cookie.getJSON('permissions'),
      navList: navList,
      myCollapse: false
    }
  },
  watch: {
    $route (to, from) {
      if (this.$refs[to.path]) {
        this.$nextTick(() => {
          // let liActive = document.getElementsByClassName('is-active')[0]
          // removeClass(liActive, 'is-active')
          // addClass(this.$refs[to.path][0].$el, 'is-active') // 路由跳转时设置背景色
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.control-scroll {
  height: calc(~'(100vh - 50px)');
  width: 177px;
  overflow-x: hidden;
  overflow-y: auto;
  .nav-bar {
    width: 177px;
    height: 100%;
    .el-menu {
      width: 100%;
      height: 100%;
      border: none;
    }
    .el-menu-item.is-active {
      background: #108cee !important;
    }
    .el-menu-item, .el-submenu__title{
      height: 45px;
      line-height: 45px;
      padding-left: 20px;
    }
    .item-active {
      background: #121929 !important;
    }
    .item-active:hover {
      background: darken(#121929, 20%) !important;
    }
  }
}
</style>

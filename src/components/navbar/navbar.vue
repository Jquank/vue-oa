<template>
  <div class="control-scroll">
    <div ref="navbar" class="nav-bar">
      <el-menu :collapse="myCollapse" router background-color="#19233C" text-color="#bfcbd9" active-text-color="#fff" :unique-opened="true" :default-active="$route.path">
        <el-menu-item index="/indexPage/indexContent" class="home-title">
          <i class="fa fa-home fa-fw fa-lg"></i>
          <span slot="title">&nbsp;首页</span>
        </el-menu-item>
        <el-submenu v-for="(item, index) in navList" :key="index" :index="item.id+''"  v-if="permissions.indexOf(item.id)>-1">
          <span slot="title">
            <i :class="item.fontIcon"></i>&nbsp;
            <span>{{item.text}}</span>
          </span>
          <el-menu-item class="item-active" :ref="child.to" v-for="(child, index) in item.cList" :key="index" :index="child.to"  v-if="permissions.indexOf(child.cid)>-1 || child.cid === '1000'">
            {{child.text}}
            <!-- 默认权限1000: 客户搜索，工资管理 -->
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { navList } from '@/api/config'
import cookie from 'js-cookie'
export default {
  data () {
    return {
      permissions: cookie.getJSON('permissions') || [],
      navList: navList,
      myCollapse: false
    }
  }
}
</script>

<style lang="less">
.nav-bar{
  .el-submenu__title, .home-title{
      background: @bg-nav !important;
  }
  .el-menu-item, .el-submenu__title{
    height: 42px;
    line-height: 42px;
    padding-left: 20px;
  }
  .el-submenu .el-menu-item{
    height: 40px;
    line-height: 40px;
  }
}
</style>

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
      background: @bg-nav !important;
    }
    .el-menu-item.is-active {
      background: lighten(@bg-nav, 10%) !important;
    }
    .item-active {
      background: lighten(@bg-nav, 30%) !important;
    }
    .item-active:hover {
      background: lighten(@bg-nav, 20%) !important;
    }
  }
}
</style>

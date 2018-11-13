<template>
  <div class="control-scroll">
    <div ref="navbar" class="nav-bar">
      <el-menu :collapse="myCollapse" router background-color="#19233C" text-color="#bfcbd9" active-text-color="#fff" :unique-opened="true" :default-active="$router.currentRoute.fullPath">
        <el-menu-item index="/indexPage/indexContent">
          <i class="fa fa-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu v-for="(item, index) in navList" :key="index" :index="item.id+''"  v-if="permissions.indexOf(item.id)>-1">
          <span slot="title">
            <i :class="item.fontIcon"></i>&nbsp;
            <span>{{item.text}}</span>
          </span>
          <el-menu-item class="item-active" ref="item" v-for="(child, index) in item.cList" :key="index" :index="child.to"  v-if="permissions.indexOf(child.cid)>-1 || child.cid === '1000' || child.cid === '1100'">{{child.text}}
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
export default {
  data () {
    return {
      permissions: cookie.getJSON('permissions'),
      navList: navList,
      myCollapse: false
    }
  },
  mounted () {
    // let that = this
    // window.onresize = function () {
    //   let width = document.body.clientWidth
    //   if (width < 960 && !that.myCollapse) {
    //     that.nested()
    //   }
    //   if (width >= 960 && that.myCollapse) {
    //     that.nested()
    //   }
    // }
  },
  methods: {
    // nested () {
    //   let aside = document.getElementById('nav-aside')
    //   if (this.myCollapse) {
    //     this.myCollapse = false
    //     aside.style.width = '180px'
    //     this.$refs.navbar.style.width = '197px'
    //     this.$refs.nested.style.left = '190px'
    //     this.$refs.loginimg.style.left = '-10px'
    //     this.collapseIcon = 'fa-outdent'
    //   } else {
    //     this.myCollapse = true
    //     aside.style.width = '63px'
    //     this.$refs.navbar.style.width = '63px'
    //     this.$refs.nested.style.left = '73px'
    //     this.$refs.loginimg.style.left = '-26px'
    //     this.collapseIcon = 'fa-indent'
    //   }
    // }
  }
}
</script>

<style scoped lang="less">
.control-scroll {
  height: calc(~'(100vh - 50px)');
  width: 197px;
  overflow-x: hidden;
  overflow-y: auto;
  .nav-bar {
    width: 197px;
    height: 100%;
    .el-menu {
      width: 100%;
      height: 100%;
      border: none;
    }
    .el-menu-item.is-active {
      background: #108cee !important;
    }
    .index-title {
      height: 56px;
      line-height: 56px;
      padding-left: 20px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
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

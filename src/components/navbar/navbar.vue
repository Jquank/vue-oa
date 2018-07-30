<template>
  <div class="control-scroll">
    <div ref="navbar" class="nav-bar">
      <div ref="nested" class="nested">
        <a @click="nested" class="fa" :class="collapseIcon"></a>
      </div>
      <img ref="loginimg" class="logo-img" src="../../common/img/logo.jpg" alt="">
      <el-menu
      :collapse="myCollapse"
      router
      background-color="#19233C"
      text-color="#bfcbd9"
      active-text-color="#fff"
      :unique-opened="true"
      :default-active="$router.currentRoute.fullPath">
        <el-menu-item
          index="/indexPage/indexContent">
          <i class="el-icon-document"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu v-for="item in navList" :key="item.id" :index="item.id+''">
          <template slot="title">
            <i :class="item.fontIcon"></i>&nbsp;
            <span>{{item.text}}</span>
          </template>
            <el-menu-item class="item-active" ref="item" v-for="child in item.cList" :key="child.cid"
              :index="child.to">{{child.text}}
            </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { navList } from '@/api/config'
export default {
  data () {
    return {
      navList: navList,
      myCollapse: false,
      collapseIcon: 'fa-outdent'
    }
  },
  mounted () {
    let that = this
    window.onresize = function () {
      let width = document.body.clientWidth
      if (width < 960 && !that.myCollapse) {
        that.nested()
      }
      if (width >= 960 && that.myCollapse) {
        that.nested()
      }
    }
  },
  methods: {
    nested () {
      let aside = document.getElementById('nav-aside')
      if (this.myCollapse) {
        this.myCollapse = false
        aside.style.width = '180px'
        this.$refs.navbar.style.width = '197px'
        this.$refs.nested.style.left = '190px'
        this.$refs.loginimg.style.left = '-10px'
        this.collapseIcon = 'fa-outdent'
      } else {
        this.myCollapse = true
        aside.style.width = '63px'
        this.$refs.navbar.style.width = '63px'
        this.$refs.nested.style.left = '73px'
        this.$refs.loginimg.style.left = '-26px'
        this.collapseIcon = 'fa-indent'
      }
    }
  }
}
</script>

<style scoped lang="less">

.control-scroll{
  height:100vh;
  width:197px;
  overflow-x: hidden;
  overflow-y: auto;
  .nav-bar {
    width: 197px;
    .nested{
      font-size: 16px;
      position: fixed;
      top: 17px;
      left: 190px;
      transition: all 0.5s;
      cursor: pointer;
    }
    .logo-img {
      width: 197px;
      height: 50px;
      position: relative;
      top:0;
      left:-10px;
      transition: all 0.5s;
    }
    .el-menu {
      width: 100%;
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
      background: #121a2c !important;
    }
  }

}

</style>

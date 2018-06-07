<template>
  <div class="control-scroll">
    <div ref="navbar" class="nav-bar">
      <img class="logo-img" src="../../common/img/logo.jpg" alt="">
      <el-menu
      router
      @open="handleOpen"
      @close="handleClose"
      background-color="#19233C"
      text-color="#fff"
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
          <el-menu-item-group>
            <el-menu-item class="item-active" ref="item"
              v-for="child in item.cList" :key="child.cid" :index="child.to">
              {{child.text}}</el-menu-item>
          </el-menu-item-group>
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
      navList: navList
    }
  },
  computed: {

  },
  mounted () {
  },
  methods: {
    handleOpen (key, keyPath) {},
    handleClose (key, keyPath) {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@bgcolor: darken(#121a2c, 20%);
.control-scroll{
  height:100vh;
  width:197px;
  overflow-x: hidden;
  overflow-y: auto;
  .nav-bar {
    width: 197px;
    .logo-img {
      width: 100%;
      height: 50px;
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
    .el-menu-item-group {
      background: @bgcolor;
    }
    .item-active {
      background: @bgcolor !important;
    }
  }

}

</style>

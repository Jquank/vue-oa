<template>
  <div class="cus-search">
    <div class="search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="search-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <el-input placeholder="搜索用户名" v-model="userName" class="search-item item-width">
        <template slot="prepend">用户名:</template>
      </el-input>
      <div class="search-item">
        <el-button type="primary">查 询</el-button>
        <el-button type="warning">重 置</el-button>
      </div>
      <div class="search-item countTip">
        <span>当前可保A数量 :<span class="red"> {{10}}</span></span>
        <span>当前可跟踪数量 :<span class="red"> {{10}}</span></span>
      </div>
    </div>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
export default {
  data () {
    return {
      cusName: '',
      userName: ''

    }
  },
  components: {
    AutoSelect,
    SelectDepartment
  }
}
</script>

<style lang="less" scoped>
.cus-search {

  padding: 20px;
  .search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .search-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
    .countTip{
      display: flex;
      align-items: center;
      span+span{
        padding-left: 15px;
      }
    }
  }
}
</style>

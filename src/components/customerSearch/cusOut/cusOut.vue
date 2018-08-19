<template>
  <div class="cus-search">
    <div class="multi-import">
      <el-button type="primary" icon="fa fa-cloud-download"> 批量导入</el-button>
      <span class="red">(ps:excell表头为“百度用户名”、“转入客服编号”、“SF系统”)</span>
    </div>
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
    </div>
    <div class="out-btn">
      <el-button type="success">转 出</el-button>
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
.marginleft10px{
  margin-left: 10px;
}
.cus-search {
  background: #fff;
  padding: 20px;
  .multi-import{
    .marginleft10px
  }
  .search {
    display: flex;
    flex-wrap: wrap;
    .search-item {
     .marginleft10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
  }
  .out-btn{
    .marginleft10px;
    margin-top: 10px;
  }
}
</style>

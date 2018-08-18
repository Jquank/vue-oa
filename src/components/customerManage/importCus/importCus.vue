<template>
  <div class="import-cus">
    <div class="import-search">
      <el-input v-model="cusName" class="import-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <div class="import-item">
        <el-button type="primary">查 询</el-button>
        <el-button type="warning">重 置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cusName: ''
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.import-cus {
  background: #fff;
  padding: 20px;
  .import-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .import-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
  }
}
</style>

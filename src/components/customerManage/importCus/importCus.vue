<template>
  <div class="import-cus component-container media-padding">
    <div class="import-search">
      <div>
        <el-input v-model="cusName" class="import-item item-width" placeholder="搜索客户名称">
          <template slot="prepend">客户名称:</template>
        </el-input>
        <el-button type="primary" class="import-item">查 询</el-button>
        <el-button type="warning" class="import-item">重 置</el-button>
      </div>
      <div class="import-item">
        <el-button type="primary" icon="el-icon-upload">导 入</el-button>
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
  components: {}
}
</script>

<style lang="less" scoped>
.import-cus {
  .import-search {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width:90%;
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

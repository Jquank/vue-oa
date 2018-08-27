<template>
  <div class="follow-record component-container media-padding">
    <div class="follow-search">
      <el-input v-model="cusName" class="follow-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <el-date-picker v-model="followDate" type="datetimerange" range-separator="至" start-placeholder="出访开始日期"
        end-placeholder="出访结束日期" class="follow-item" style="width:350px;"></el-date-picker>
      <div class="follow-item">
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
      cusName: '',
      followDate: ''
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.follow-record {

  padding: 20px;
  .follow-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .follow-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
}
</style>

<template>
  <div class="visit-record component-container media-padding">
    <div class="visit-search">
      <el-input v-model="cusName" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <auto-select title="出访类型" v-model="visitType" id="visit-status" class="visit-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option label="今日申领客户" value="10"></el-option>
        <el-option label="今日完成客户" value="20"></el-option>
      </auto-select>
      <el-date-picker v-model="visitDate" type="datetimerange" range-separator="至" start-placeholder="出访开始日期"
        end-placeholder="出访结束日期" class="visit-item" style="width:350px;"></el-date-picker>
      <div class="visit-item">
        <el-button type="primary">查 询</el-button>
        <el-button type="warning">重 置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
export default {
  data () {
    return {
      cusName: '',
      visitType: '',
      visitDate: ''
    }
  },
  components: {
    AutoSelect
  }
}
</script>
<style>
 /* 自定义select的padding */
#visit-status input.el-input__inner {
  padding-left: 86px;
}
</style>
<style lang="less" scoped>
.visit-record {

  padding: 20px;
  .visit-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .visit-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
}
</style>

<template>
  <div class="check-record  component-container media-padding">
    <div class="record-search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="record-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <auto-select title="审核状态" v-model="recordStatus" class="record-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option label="待审核" value="10"></el-option>
        <el-option label="已审核" value="20"></el-option>
      </auto-select>
      <select-department title="提交部门" class="record-item item-width"></select-department>
      <el-date-picker v-model="subDate" type="datetimerange" range-separator="至" start-placeholder="审核开始日期" end-placeholder="审核结束日期" class="record-item" style="width:350px;"></el-date-picker>
      <div class="record-item">
        <el-button type="primary">查 询</el-button>
        <el-button type="warning">重 置</el-button>
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
      recordStatus: '',
      cusName: '',
      subDate: ''

    }
  },
  components: {
    AutoSelect,
    SelectDepartment
  }
}
</script>

<style lang="less" scoped>
.check-record {
  padding: 20px;
  margin-top: -10px;
  .record-search {
    display: flex;
    flex-wrap: wrap;
    .record-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
  }
}
</style>

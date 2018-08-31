<template>
  <div class="salary-list component-container media-padding">
    <div class="salary-search">
      <select-department :title="'部门'" @upDeptId="upDeptId" v-model="dept" class="salary-item item-width"></select-department>
      <el-input v-model="workerName" class="salary-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">员工姓名:</template>
      </el-input>
      <el-date-picker v-model="date" type="datetimerange" range-separator="至" start-placeholder="出访开始日期"
        end-placeholder="出访结束日期" class="salary-item" style="width:350px;"></el-date-picker>
      <div class="salary-item">
        <el-button type="primary">查 询</el-button>
        <el-button type="warning">重 置</el-button>
        <el-button type="primary">导 入</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectDepartment from 'base/selectDepartment/selectDepartment'
export default {
  data () {
    return {
      dept: '',
      workerName: '',
      date: ''
    }
  },
  methods: {
    upDeptId () {

    }
  },
  components: {
    SelectDepartment
  }
}
</script>

<style lang="less" scoped>
.salary-list {

  padding: 20px;
  .salary-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .salary-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
}
</style>

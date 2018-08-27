<template>
  <div class="allot-contract">
    <div class="allot-search">
      <auto-select title="合同类型" v-model="contratType" class="allot-item item-width">
        <el-option label="待审核" value=""></el-option>
        <el-option label="已审核" value="20"></el-option>
      </auto-select>
      <el-date-picker v-model="applyDate" type="datetimerange" range-separator="至" start-placeholder="申请开始日期" end-placeholder="申请结束日期" class="allot-item" style="width:350px;"></el-date-picker>
      <el-input placeholder="搜索客户名称" v-model="applyName" class="allot-item item-width">
        <template slot="prepend">申请人:</template>
      </el-input>
      <div class="allot-item">
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
      contratType: '',
      applyDate: '',
      applyName: ''

    }
  },
  components: {
    AutoSelect,
    SelectDepartment
  }
}
</script>

<style lang="less" scoped>
.allot-contract {
  padding: 20px;
  .allot-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .allot-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
}
</style>

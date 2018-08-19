<template>
  <div class="apply-contract">
    <div class="apply-btn">
      <el-button type="primary" icon="fa fa-plus"> 申请合同</el-button>
    </div>
    <div class="apply-search">
      <auto-select title="合同类型" v-model="contratType" class="apply-item item-width">
        <el-option label="待审核" value=""></el-option>
        <el-option label="已审核" value="20"></el-option>
      </auto-select>
      <auto-select title="合同状态" v-model="contratStatus" class="apply-item item-width">
        <el-option label="全部" value="10"></el-option>
        <el-option label="未领用" value="20"></el-option>
        <el-option label="已领用" value="30"></el-option>
        <el-option label="签约" value="40"></el-option>
        <el-option label="作废" value="50"></el-option>
      </auto-select>
      <el-date-picker v-model="applyTime" type="datetimerange" range-separator="至" start-placeholder="申请开始日期" end-placeholder="申请结束日期" class="apply-item" style="width:350px;"></el-date-picker>
      <div class="apply-item">
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
      contratStatus: '',
      applyTime: ''

    }
  },
  components: {
    AutoSelect,
    SelectDepartment
  }
}
</script>

<style lang="less" scoped>
.apply-contract {
  background: #fff;
  padding: 20px;
  .apply-btn{
    margin-left:10px;
  }
  .apply-search {
    display: flex;
    flex-wrap: wrap;
    .apply-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
}
</style>

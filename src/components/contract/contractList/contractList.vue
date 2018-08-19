<template>
  <div class="contract-list">
    <div class="allot-search">
      <el-input placeholder="搜索合同编号" v-model="contractNum" class="list-item item-width">
        <template slot="prepend">合同编号:</template>
      </el-input>
      <auto-select title="合同类型" v-model="contratType" class="list-item item-width">
        <el-option label="待审核" value=""></el-option>
        <el-option label="已审核" value="20"></el-option>
      </auto-select>
      <auto-select title="合同状态" v-model="contratStatus" class="list-item item-width">
        <el-option label="全部" value="10"></el-option>
        <el-option label="未领用" value="20"></el-option>
        <el-option label="已领用" value="30"></el-option>
        <el-option label="签约" value="40"></el-option>
        <el-option label="作废" value="50"></el-option>
      </auto-select>
      <el-input placeholder="搜索领用人" v-model="receiptName" class="list-item item-width">
        <template slot="prepend">领用人:</template>
      </el-input>
      <el-date-picker v-model="receiptTime" type="datetimerange" range-separator="至" start-placeholder="领用开始日期" end-placeholder="领用结束日期" class="list-item" style="width:350px;"></el-date-picker>
      <div class="list-item">
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
      contractNum: '',
      contratType: '',
      contratStatus: '',
      receiptName: '',
      receiptTime: ''

    }
  },
  components: {
    AutoSelect,
    SelectDepartment
  }
}
</script>

<style lang="less" scoped>
.contract-list {
  background: #fff;
  padding: 20px;
  .allot-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .list-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
}
</style>

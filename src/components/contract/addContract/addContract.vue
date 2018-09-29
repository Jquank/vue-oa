<template>
  <div class="add-contract component-container media-padding">
    <div class="contract-type">
      <auto-select title="合同类型" v-model="contractType" class="contract-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option label="待审核" value="10"></el-option>
        <el-option label="已审核" value="20"></el-option>
      </auto-select>
      <el-input v-model="stratNum" class="contract-item item-width">
        <template slot="prepend">起始号:</template>
      </el-input>
      <el-input v-model="contractCount" class="contract-item item-width">
        <template slot="prepend">合同份数:</template>
      </el-input>
      <div class="contract-item item-width" style="text-align:center">
        <el-button type="primary" >提 交</el-button>
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
      contractType: '',
      stratNum: '',
      contractCount: ''
    }
  },
  components: {
    AutoSelect,
    SelectDepartment
  }
}
</script>

<style lang="less" scoped>
.add-contract {
  .contract-type {
    .contract-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 51%;
    }
  }
}
</style>

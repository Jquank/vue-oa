<template>
  <div class="deal-check">
    <div class="check-status">
      <el-radio-group v-model="checkRadio">
        <el-radio-button label="10">全部</el-radio-button>
        <el-radio-button label="20">保A审核</el-radio-button>
        <el-radio-button label="30">公共库审核</el-radio-button>
      </el-radio-group>
    </div>
    <div class="check-search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="check-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <auto-select title="审核状态" v-model="checkStatus" class="check-item item-width">
        <el-option label="待审核" value="10"></el-option>
        <el-option label="已审核" value="20"></el-option>
      </auto-select>
      <select-department title="提交部门" class="check-item item-width"></select-department>
      <el-date-picker v-model="subDate" type="datetimerange" range-separator="至" start-placeholder="提交开始日期" end-placeholder="提交结束日期" class="check-item" style="width:350px;"></el-date-picker>
      <div class="check-item">
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
      checkRadio: '10',
      checkStatus: '10',
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
.deal-check {
  background: #fff;
  padding: 20px;
  .check-status {
    margin-left: 10px;
  }
  .check-search {
    display: flex;
    flex-wrap: wrap;
    .check-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
  }
}
</style>

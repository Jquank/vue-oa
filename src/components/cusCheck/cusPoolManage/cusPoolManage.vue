<template>
  <div class="cus-pool component-container media-padding">
    <div class="cus-status">
        <el-radio-group v-model="statusRadio">
          <el-radio-button label="10">全部</el-radio-button>
          <el-radio-button label="20">保A客户</el-radio-button>
          <el-radio-button label="30">公共库客户</el-radio-button>
          <el-radio-button label="40">签约客户</el-radio-button>
        </el-radio-group>
      </div>
    <div class="pool-search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="pool-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <el-input placeholder="提交人姓名" v-model="subName" class="pool-item item-width">
        <template slot="prepend">提交人:</template>
      </el-input>
      <select-department title="提交部门" class="pool-item item-width"></select-department>
      <auto-select title="审核状态" v-model="poolStatus" class="pool-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option label="待审核" value="10"></el-option>
        <el-option label="审核通过" value="20"></el-option>
        <el-option label="审核未通过" value="30"></el-option>
      </auto-select>
      <el-date-picker v-model="subDate" type="datetimerange" range-separator="至" start-placeholder="审核开始日期" end-placeholder="审核结束日期" class="pool-item" style="width:350px;"></el-date-picker>
      <div class="pool-item">
        <el-button type="primary">查 询</el-button>
        <el-button type="warning">重 置</el-button>
        <el-button type="warning" @click.native="view">查 看</el-button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
export default {
  data () {
    return {
      statusRadio: '10',
      poolStatus: '',
      cusName: '',
      subName: '',
      subDate: ''

    }
  },
  methods: {
    view () {
      this.$router.push({
        path: 'cusPoolManage/54666'
      })
    }
  },
  components: {
    AutoSelect,
    SelectDepartment
  }
}
</script>

<style lang="less" scoped>
.cus-pool {
  position: relative;
  .cus-status{
    margin-left: 10px;
  }
  .pool-search {
    display: flex;
    flex-wrap: wrap;
    .pool-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
  }
}
</style>

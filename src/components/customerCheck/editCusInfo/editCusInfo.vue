<template>
  <div class="cus-edit component-container media-padding">
    <div class="edit-search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="edit-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <auto-select title="审核状态" v-model="editStatus" class="edit-item item-width">
        <el-option label="待审核" value=""></el-option>
        <el-option label="已审核" value="20"></el-option>
      </auto-select>
      <select-department title="提交部门" class="edit-item item-width"></select-department>
      <el-date-picker v-model="subDate" type="datetimerange" range-separator="至" start-placeholder="提交开始日期" end-placeholder="提交结束日期" class="edit-item" style="width:350px;"></el-date-picker>
      <div class="edit-item">
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
      editStatus: '',
      cusName: '',
      subDate: ''

    }
  },
  methods: {
    view () {
      this.$router.push({
        path: `editCusInfo/8465`
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
.cus-edit {
  position: relative;
  .edit-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .edit-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
  }
}
</style>

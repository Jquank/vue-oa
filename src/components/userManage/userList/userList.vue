<template>
  <div class="user-list">
    <div class="search">
      <select-department></select-department>
      <el-input placeholder="搜索员工姓名" v-model="staffName" @focus="showDepartment">
        <template slot="prepend">员工姓名:</template>
      </el-input>
      <auto-select title="司龄" v-model="workAge" class="sel-age">
        <el-option label="3个月以上" value="3"></el-option>
        <el-option label="6个月以上" value="6"></el-option>
        <el-option label="12个月以上" value="12"></el-option>
        <el-option label="24个月以上" value="24"></el-option>
      </auto-select>
      <p>哇{{workAge}}</p>
    </div>
    <el-table v-loading="isLoading" ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="loginName" label="账户名" width="100">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="50">
      </el-table-column>
      <el-table-column prop="gender" label="手机号" width="160">
      </el-table-column>
      <el-table-column prop="gender" label="部门" width="100">
      </el-table-column>
      <el-table-column prop="gender" label="保A数量/保A配额" width="140">
      </el-table-column>
      <el-table-column prop="gender" label="跟踪数量/跟踪配额" width="140">
      </el-table-column>
      <el-table-column prop="gender" label="角色" width="140">
      </el-table-column>
      <el-table-column prop="gender" label="状态" width="140">
      </el-table-column>
      <el-table-column prop="gender" label="账号开关" width="140">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click.native="editDept" size="mini" type="primary">编辑管理部门</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page @updateList="updateList" :url="url" :sendParams="sendParams" class="page"></page>
    <select-dept :showDeptTree="showDeptTree"></select-dept>
  </div>
</template>

<script>
// import { $post } from 'api/http'
import Page from 'base/page/page'
import SelectDept from 'base/selectDept/selectDept'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import AutoSelect from 'base/autoSelect/autoSelect'
export default {
  data () {
    return {
      staffName: '',
      workAge: '',
      url: '/User/search',
      sendParams: {
        name: '',
        workTime: 12,
        deptCode: 'KD01'
      },
      tableData: [],
      isLoading: true,
      showDeptTree: 0
    }
  },
  created () {},
  methods: {
    updateList (data, load) {
      this.isLoading = load
      if (!load) {
        this.tableData = data.data.data.list
      }
    },
    handleSelectionChange () {},
    editDept () {
      this.showDeptTree = Math.random()
    }
  },
  components: { Page, SelectDept, SelectDepartment, AutoSelect }
}
</script>

<style lang="less">
.sel-age {
  margin:10px 0;
  input.el-input__inner {
    padding-left: 85px;
  }
  .prefix{
    display: inline-block;
    position: relative;
    left:-4px;
    top:1px;
    height: 30px;
    padding:0 20px;
    line-height: 32px;
    background: #f5f7fa;
    color:#909399;
    border-right: 1px solid #dcdfe6;
    border-radius: 4px;
  }
}
</style>

<style lang="less" scoped>
.user-list {
  background: #fff;
  padding: 20px;
  .page {
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

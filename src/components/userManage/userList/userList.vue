<template>
  <div class="user-list padding20px media-padding">
    <div class="import-file">
      <el-button type="primary" icon="el-icon-upload">导入人员</el-button>
      <el-button type="warning" icon="el-icon-upload">导入组织结构</el-button>
    </div>
    <div class="search">
      <select-department @upDeptId="upDeptId" :key="key_dept" class="search-item"></select-department>
      <el-input v-model="staffName" @focus="showDepartment" class="search-item" style="width:300px;" placeholder="搜索员工姓名">
        <template slot="prepend">员工姓名:</template>
      </el-input>
      <auto-select title="司龄" v-model="workAge" :key="key_sel" class="search-item" style="width:300px;">
        <el-option label="3个月以上" value="3"></el-option>
        <el-option label="6个月以上" value="6"></el-option>
        <el-option label="12个月以上" value="12"></el-option>
        <el-option label="24个月以上" value="24"></el-option>
      </auto-select>
      <div class="search-item">
        <el-button type="primary" @click="search">查 询</el-button>
        <el-button type="warning" @click="reset">重 置</el-button>
      </div>
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
      <el-table-column prop="mobile" label="手机号" width="160">
      </el-table-column>
      <el-table-column prop="deptName" label="部门">
      </el-table-column>
      <el-table-column prop="" label="保A数量/保A配额" width="140">
        <template slot-scope="scope">
          <span>{{scope.row.true_a+'/'+scope.row.max_a}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="跟踪数量/跟踪配额" width="140">
        <template slot-scope="scope">
          <span>{{scope.row.true_b+'/'+scope.row.max_b}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="角色" width="140">
      </el-table-column>
      <el-table-column prop="isResign" label="状态" width="140">
      </el-table-column>
      <el-table-column prop="status" label="账号开关" width="140">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click.native="editUserInfo(scope.row.id)" size="mini" type="primary">编辑</el-button>
          <el-button @click.native="editDept" size="mini" type="primary">编辑管理部门</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page @updateList="updateList" :url="url" :sendParams="sendParams" class="page"></page>
    <!-- 编辑部门弹窗 -->
    <el-dialog title="编辑部门" :visible.sync="deptTreeDialog" width="350px">
      <select-dept></select-dept>
    </el-dialog>
    <!-- 编辑人员信息弹窗 -->
    <el-dialog title="编辑人员信息" :visible.sync="userInfoDialog" width="800px">
      <add-user :key="key_add_user" :echoUserInfo="userInfo" :editDisable="true"></add-user>
    </el-dialog>
    <!-- 编辑配额弹窗 -->
    <el-dialog title="编辑配额" :visible.sync="editQuotaDialog" width="800px">
      <add-user :key="key_add_user" :echoUserInfo="userInfo" :editDisable="true"></add-user>
    </el-dialog>
  </div>
</template>

<script>
// import { $post } from 'api/http'
import Page from 'base/page/page'
import SelectDept from 'base/selectDept/selectDept'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import AutoSelect from 'base/autoSelect/autoSelect'
import AddUser from 'components/userManage/addUser/addUser'
export default {
  data () {
    return {
      key_dept: '',
      key_sel: '1',
      key_add_user: '', // 异步获取数据传递时，用key更新子组件
      userInfo: {}, // 回显人员信息
      userInfoDialog: false,
      deptTreeDialog: false,
      editQuotaDialog: false,
      staffName: '',
      workAge: '',
      deptCode: '',
      url: '/User/search',
      sendParams: {},
      tableData: [],
      isLoading: true
    }
  },
  created () {},
  methods: {
    search () {
      this.sendParams = {
        name: this.staffName,
        deptCode: this.deptCode,
        workTime: this.workAge
      }
    },
    reset () {
      this.staffName = ''
      this.workAge = ''
      this.key_dept = new Date() + ''
      this.key_sel = new Date() + '' // 重置时绑定新的key值来重新加载子组件以达到重置的目的
    },
    updateList (data, load) {
      this.isLoading = load
      if (!load) {
        this.tableData = data.data.data.list
      }
    },
    handleSelectionChange () {},
    editDept () {
      this.deptTreeDialog = true
    },
    editUserInfo (uid) {
      this.userInfoDialog = true
      this.$post('/User/UserGetById', {uid: uid}).then(res => {
        if (res.data.status === 1) {
          this.userInfo = res.data.data
          this.key_add_user = new Date() + ''
          // let editPageParams = {
          //   baoAquota: this.baoAquota,
          //   followQuota: this.followQuota,
          //   turnRealDate: this.turnRealDate,
          //   leaveDate: this.leaveDate
          // }
        }
      })
    },
    upDeptId (id) {
      this.deptCode = id
    },
    showDepartment () {}
  },
  components: { Page, SelectDept, SelectDepartment, AutoSelect, AddUser }
}
</script>

<style lang="less" scoped>
.user-list {
  background: #fff;
  .page {
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .search {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .search-item {
      margin-left: 10px;
      margin-top: 10px;
    }
  }
  .import-file {
    padding-left: 10px;
  }
}
</style>

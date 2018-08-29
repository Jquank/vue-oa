<template>
  <div class="user-list component-container media-padding" @click="hiddenDepartment">
    <div class="import-file">
      <el-button type="primary" icon="el-icon-upload">导入人员</el-button>
      <el-button type="success" icon="el-icon-upload">导入组织结构</el-button>
      <el-button size="mini">
        <span>账号开关：</span>
        <el-switch @change="turnOff(accountOff)" v-model="accountOff" active-color="#13ce66" inactive-color="#13ce66"></el-switch>
      </el-button>
    </div>
    <!-- 搜索 -->
    <div class="search">
      <select-department @upDeptId="upDeptId" :title="'部门'" :key="key_dept" class="search-item"></select-department>
      <el-input v-model="staffName" class="search-item" style="width:300px;" placeholder="搜索员工姓名">
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
    <!-- 列表 -->
    <el-table ref="multipleTable" :data="tableData" style="width:100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="loginName" label="账户名" width="100">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="gender" label="性别">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="160">
      </el-table-column>
      <el-table-column prop="deptName" label="部门" width="120">
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
      <el-table-column prop="" label="账号开关" width="140">
        <template slot-scope="scope">
          <el-button plain disabled class="xsbtn" :type="scope.row.status==-10?'danger':'success'">{{scope.row.status==-10?'已关闭':'已打开'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button @click.native="editUserInfo(scope.row.id)" class="xsbtn" type="primary">编辑</el-button>
          <el-button @click.native="editQuota(scope.row.id)" class="xsbtn" type="primary">编辑配额</el-button>
          <el-button @click.native="editDept(scope.row.id)" class="xsbtn" type="primary">编辑管理部门</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page @updateList="updateList" :url="url" :sendParams="sendParams" class="page"></page>
    <!-- 编辑部门弹窗 -->
    <el-dialog title="编辑部门管理" :visible.sync="deptTreeDialog" width="350px">
      <select-dept :key="key_dept_manage" @sendDeptCodes="receiveDeptCodes" :defaultChecked="defaultChecked" :defaultExpanded="defaultExpanded"></select-dept>
      <div style="text-align:center;padding-top:15px;">
        <el-button @click.native="subDeptManage" type="primary" size="mini">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 编辑人员信息弹窗 -->
    <el-dialog title="编辑人员信息" :visible.sync="userInfoDialog" width="800px">
      <add-user @closeDialog="closeDialog" :key="key_add_user" :echoUserInfo="userInfo" :editDisable="true"></add-user>
    </el-dialog>
    <!-- 编辑配额弹窗 -->
    <el-dialog title="编辑配额" :visible.sync="editQuotaDialog" width="800px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :md="12">
            <el-form-item label="账户名 :" :label-width="labelWidth" required>
              <el-input v-model="form.accountName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="姓名 :" :label-width="labelWidth" required>
              <el-input v-model="form.trueName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12">
            <el-form-item label="工号 :" :label-width="labelWidth" required>
              <el-input v-model="form.userNum" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="性别 :" :label-width="labelWidth" required>
              <el-select v-model="form.sex" disabled placeholder="选择性别" style="width:100%">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12">
            <el-form-item label="保A配额 :" :label-width="labelWidth">
              <el-input v-model="form.baoAquota"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="跟踪配额 :" :label-width="labelWidth">
              <el-input v-model="form.followQuota"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="text-align: center;">
          <el-button @click.native="subQuota" type="primary">提 交</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Page from 'base/page/page'
import SelectDept from 'base/selectDept/selectDept'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import AutoSelect from 'base/autoSelect/autoSelect'
import AddUser from 'components/userManage/addUser/addUser'
export default {
  data () {
    return {
      accountOff: '',
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
      labelWidth: '80px',
      form: {
        accountName: '',
        trueName: '',
        userNum: '',
        sex: '',
        baoAquota: '',
        followQuota: ''
      },
      uid: '',
      deptCodes: [],
      multipleSelection: [],
      defaultChecked: [], // 部门树默认勾选
      defaultExpanded: [], // 部门树默认展开
      componentid: '',
      key_dept_manage: ''
    }
  },
  created () {},
  mounted () {
  },
  methods: {
    // 账号开关
    turnOff (val) {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请进行勾选',
          type: 'warning'
        })
        return
      }
      this._turnOffRequest()
    },
    _turnOffRequest () {
      this.$post('/User/UserStatusBatchUpdate', {
        uids: this.multipleSelection
      }).then(res => {
        if (res.data.status === 1) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.search()
        }
      })
    },
    handleSelectionChange (val = []) {
      this.multipleSelection.length = 0
      val.forEach(item => {
        this.multipleSelection.push(item.id)
      })
    },
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
      this.deptCode = ''
      this.key_dept = new Date() + ''
      this.key_sel = new Date() + '1' // 重置时绑定新的key值来重新加载子组件以达到重置的目的
    },
    updateList (data) {
      this.tableData = data.data.data.list
    },
    // 编辑部门
    editDept (uid) {
      this.key_dept_manage = uid
      this.uid = uid
      this.deptTreeDialog = true
      this.$post('/Department/MgrDepartmentGetByUser', { uid: this.uid }).then(res => {
        if (res.data.status === 1) {
          this.defaultChecked = res.data.data
          this.defaultExpanded = res.data.data
        }
      })
    },
    // 编辑配额
    editQuota (uid) {
      this.uid = uid
      this.editQuotaDialog = true
      this.$post('/User/UserGetById', { uid: uid }).then(res => {
        if (res.data.status === 1) {
          this.userInfo = res.data.data
          this.form = {
            accountName: this.userInfo.name,
            trueName: this.userInfo.true_name,
            userNum: this.userInfo.workid,
            sex: this.userInfo.sex + '',
            baoAquota: this.userInfo.max_a,
            followQuota: this.userInfo.max_b
          }
        }
      })
    },
    // 编辑人员信息
    editUserInfo (uid) {
      this.userInfoDialog = true
      this.$post('/User/UserGetById', { uid: uid }).then(res => {
        if (res.data.status === 1) {
          this.userInfo = res.data.data
          this.key_add_user = new Date() + ''
        }
      })
    },
    closeDialog () {
      this.userInfoDialog = false
    },
    upDeptId (id) {
      this.deptCode = id
    },
    // 提交配额
    subQuota () {
      let params = {
        id: this.uid,
        max_a: this.form.baoAquota,
        max_b: this.form.followQuota
      }
      this.$post('/User/UserUpdateMax', params).then(res => {
        if (res.data.status === 1) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.editQuotaDialog = false
        }
      })
    },
    receiveDeptCodes (data) {
      console.log(123)
      this.deptCodes = data
      console.log(data)
    },
    // 提交部门管理
    subDeptManage () {
      let params = {
        deptCodes: this.deptCodes,
        uid: this.uid
      }
      this.$post('/User/UserUpdateMgr', params).then(res => {
        if (res.data.status === 1) {
          this.deptTreeDialog = false
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        }
      })
    },
    // 隐藏带input的部门树
    hiddenDepartment (e) {
      let tree = document.getElementById('department')
      if (tree && e.target.id !== 'dept-input') {
        tree.style.display = 'none'
      }
    }
  },
  components: { Page, SelectDept, SelectDepartment, AutoSelect, AddUser }
}
</script>

<style lang="less" scoped>
.user-list {
  .import-file {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    & > .el-button {
      margin-top: 10px;
    }
  }
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

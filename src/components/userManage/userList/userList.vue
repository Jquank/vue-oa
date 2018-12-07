<template>
  <div class="user-list component-container media-padding">
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
      <select-department  @keydown.enter.native="search" @upDeptId="upDeptId" :title="'部门'" :key="key_dept" class="search-item item-width"></select-department>
      <el-input @keydown.enter.native="search" v-model="staffName" class="search-item item-width" placeholder="搜索员工姓名">
        <template slot="prepend">员工姓名:</template>
      </el-input>
      <el-input @keydown.enter.native="search" v-model="roleName" class="search-item item-width" placeholder="搜索角色名">
        <template slot="prepend">角色名:</template>
      </el-input>
      <auto-select @keydown.enter.native="search" title="司龄" v-model="workAge" :key="key_sel" class="search-item item-width">
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
    <el-table ref="multipleTable" :data="tableData" style="width:100%;" @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection" width="55">
      </el-table-column>
      <el-table-column prop="uname" label="账户名" min-width="100">
      </el-table-column>
      <el-table-column prop="true_name" label="姓名" min-width="80">
      </el-table-column>
      <el-table-column prop="" label="性别" min-width="50">
        <span slot-scope="scope">{{scope.row.sex==0?'男':'女'}}</span>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" min-width="100">
      </el-table-column>
      <el-table-column prop="deptfullname" label="部门" min-width="120">
      </el-table-column>
      <el-table-column prop="" label="保A数量 /保A配额" min-width="80">
        <template slot-scope="scope">
          <span>{{scope.row.true_a+' / '+scope.row.max_a}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="跟踪数量 /跟踪配额" min-width="80">
        <template slot-scope="scope">
          <span>{{scope.row.true_b+' / '+scope.row.max_b}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rname" label="角色" width="100">
      </el-table-column>
      <el-table-column prop="isResign" label="状态" width="50">
        <span :class="scope.row.resignationtime!=''?'':'red'" slot-scope="scope">{{scope.row.resignationtime!=''?'在职':'离职'}}</span>
      </el-table-column>
      <el-table-column prop="" label="账号开关" width="140">
        <template slot-scope="scope">
          <el-button plain disabled class="xsbtn" :type="scope.row.status==-10?'danger':'success'">{{scope.row.status==-10?'已关闭':'已打开'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button @click.native="editUserInfo(scope.row.uid)" class="xsbtn" type="primary">编辑</el-button>
          <el-button @click.native="editQuota(scope.row.uid)" class="xsbtn" type="primary">编辑配额</el-button>
          <el-button @click.native="editDept(scope.row.uid)" class="xsbtn" type="primary">编辑管理部门</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page @updateList="updateList" :url="url" :sendParams="sendParams" class="page"></page>
    <!-- 编辑人员信息弹窗 -->
    <el-dialog title="编辑人员信息" :visible.sync="userInfoDialog" width="800px">
      <add-user @closeDialog="closeDialog" :key="key_add_user" :echoUserInfo="userInfo" :editDisable="true"></add-user>
    </el-dialog>
    <!-- 编辑配额弹窗 -->
    <el-dialog title="编辑配额" :visible.sync="editQuotaDialog" width="800px">
      <add-user @closeDialog="closeDialog" :key="key_add_user" :echoUserInfo="userInfo" :quotaDisable="true"></add-user>
    </el-dialog>
    <!-- 编辑部门弹窗 -->
    <el-dialog title="编辑部门管理" :visible.sync="deptTreeDialog" width="350px">
      <select-dept @subParams="subParams" :defaultChecked="defaultChecked" :key="key_dept_manage"></select-dept>
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
      roleName: '',
      workAge: '',
      deptCode: '',
      url: '/Oper.do?ListAll',
      sendParams: {},
      tableData: [],
      labelWidth: '80px',
      uid: '',
      deptCodes: [],
      multipleSelection: [],
      defaultChecked: [], // 部门树默认勾选
      componentid: '',
      key_dept_manage: ''
    }
  },
  created () {
  },
  methods: {
    // 账号开关
    // todo
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
        deptcode: this.deptCode,
        username: this.staffName,
        worktime: this.workAge,
        rolename: this.roleName
      }
    },
    reset () {
      this.staffName = ''
      this.roleName = ''
      this.workAge = ''
      this.deptCode = ''
      this.key_dept = new Date() + ''
      this.key_sel = new Date() + '1' // 重置时绑定新的key值来重新加载子组件以达到重置的目的
    },
    updateList (res) {
      this.tableData = res.data[0].data
    },
    // 编辑部门
    editDept (uid) {
      this.key_dept_manage = new Date() + ''
      this.uid = uid
      this.deptTreeDialog = true
      this.$get('/User/findManagerDeptCode.do', { uid: this.uid }).then(res => {
        if (res.data.success && res.data.data.length) {
          let resArr = res.data.data
          resArr.forEach(val => {
            this.defaultChecked.push(val.deptcode)
          })
        }
      })
    },
    // 提交部门设置
    // todo
    subParams (data) {
      if (!data) {
        return
      }
      let params = {codes: data, uid: this.uid}
      this.$get('/User/managerDeptCode.do', params).then(res => {
        console.log(res) // get请求参数有问题，可改post
      })
    },
    // 编辑配额
    editQuota (uid) {
      this.uid = uid
      this.editQuotaDialog = true
      this._getUserInfo(uid)
    },
    // 编辑人员信息
    editUserInfo (uid) {
      this.userInfoDialog = true
      this._getUserInfo(uid)
    },
    _getUserInfo (uid) {
      this.$get('/Oper.do?ListAll', { id: uid }).then(res => {
        if (res.data[0].success) {
          this.userInfo = res.data[0].data[0]
          this.userInfo.id = uid // uid传过去
          this.key_add_user = new Date() + ''
        }
      })
    },
    closeDialog () {
      this.userInfoDialog = false
      this.editQuotaDialog = false
    },
    upDeptId (id) {
      this.deptCode = id
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
  .search {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .search-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width{
      width: 280px;
    }
  }
  .import-file {
    padding-left: 10px;
  }
}
</style>

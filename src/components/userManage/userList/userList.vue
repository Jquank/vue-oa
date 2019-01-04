<template>
  <div class="user-list component-container media-padding">
    <div class="import-file">
      <up-file v-if="permissions.indexOf('4o') > -1" :title="'导入人员'" :upIcon="'fa fa-cloud-download'" :uploadUrl="serverUrl+'/employee.do?importUser'+'&tk='+tk" :isHiddenFileList="true" class="import-item mr10px"></up-file>
      <up-file v-if="permissions.indexOf('5v') > -1" :title="'导入组织结构'" :upIcon="'fa fa-cloud-download'" :uploadUrl="'/employee.do?importOrg'" :isHiddenFileList="true" :type="'success'" class="import-item mr10px"></up-file>
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
      <auto-select title="账号" v-model="allowed" :defaultValue="'100'" :key="key_allowed" class="search-item item-width">
        <el-option label="所有" value="100"></el-option>
        <el-option label="开" value="1"></el-option>
        <el-option label="关" value="0"></el-option>
      </auto-select>
      <div class="search-item">
        <el-button type="primary" @click="search">查 询</el-button>
        <el-button type="warning" @click="reset">重 置</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table ref="multipleTable" :data="tableData" class="table-width" border stripe @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection" width="45">
      </el-table-column>
      <el-table-column prop="uname" label="账户名">
      </el-table-column>
      <el-table-column prop="true_name" label="姓名">
      </el-table-column>
      <el-table-column prop="" label="性别" width="60" align="center">
        <span slot-scope="scope">{{scope.row.sex==0?'男':'女'}}</span>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" min-width="110">
      </el-table-column>
      <el-table-column prop="deptfullname" label="部门" min-width="120">
      </el-table-column>
      <el-table-column prop="" label="保A数量 /保A配额" width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.true_a+' / '+scope.row.max_a}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="跟踪数量 /跟踪配额" width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.true_b+' / '+scope.row.max_b}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rname" label="角色"  min-width="100">
      </el-table-column>
      <el-table-column prop="isResign" label="状态" width="50">
        <span :class="scope.row.resignationtime?'red':''" slot-scope="scope">{{scope.row.resignationtime?'离职':'在职'}}</span>
      </el-table-column>
      <el-table-column v-if="permissions.indexOf('5e') > -1" prop="" label="账号开关" width="100" align="center">
        <template slot-scope="scope">
          <el-switch @change="((val)=>turnOff(val,scope.row.uid))" v-model="scope.row.allowed" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-dropdown trigger="hover">
            <el-button type="primary" size="mini">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" class="text-center">
              <el-dropdown-item>
                <el-button v-if="permissions.indexOf('4j') > -1" @click.native="editUserInfo(scope.row.uid)" class="xsbtn" type="success">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-button v-if="permissions.indexOf('4k') > -1" @click.native="editQuota(scope.row.uid)" class="xsbtn" type="primary">编辑配额</el-button>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-button v-if="permissions.indexOf('66') > -1" @click.native="editDept(scope.row.uid)" class="xsbtn" type="warning">编辑管理部门</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    <el-dialog title="编辑部门管理" :visible.sync="deptTreeDialog" width="400px">
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
import UpFile from 'base/upLoad/upFile'
import cookie from 'js-cookie'
import { serverUrl } from 'api/http'
export default {
  data () {
    return {
      permissions: cookie.getJSON('permissions'),
      serverUrl: serverUrl,
      tk: cookie.get('token'),
      allowed: '100',
      key_allowed: '2',
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
    turnOff (val, uid) {
      this.$confirm(`确定${val === 1 ? '打开' : '关闭'}此账号？`, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this._turnOffRequest(val, uid)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    _turnOffRequest (val, uid) {
      this.$post('/Oper.do?EditAllowed', {
        'uid': uid,
        'allowed': val
      }).then(res => {
        if (res.data.success) {
          this.$message.success(val === 1 ? '已打开' : '已关闭')
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
        rolename: this.roleName,
        allowed: this.allowed
      }
    },
    reset () {
      this.staffName = ''
      this.roleName = ''
      this.workAge = ''
      this.deptCode = ''
      this.allowed = '100'
      this.key_dept = new Date() + ''
      this.key_sel = new Date() + '1'
      this.key_allowed = new Date() + '2'
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
    subParams (data) {
      if (!data) {
        return
      }
      let params = {codes: data, uid: this.uid}
      console.log(params)
      this.$post('/User/managerDeptCode.do', params).then(res => {
        if (res.data.success) {
          this.$message.success('修改成功！')
          this.deptTreeDialog = false
        }
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
  components: { Page, SelectDept, SelectDepartment, AutoSelect, AddUser, UpFile }
}
</script>

<style lang="less" scoped>
.user-list {
  .import-file {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .import-item {
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
      width: 250px;
    }
  }
  .import-file {
    padding-left: 10px;
  }
}
</style>

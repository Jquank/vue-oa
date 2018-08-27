<template>
  <div class="auth component-container media-padding">
    <el-row style="margin-bottom:10px;">
      <el-button type="primary" size="mini" @click.native="addNewRole">
        <i class="fa fa-plus"></i> 新增角色
      </el-button>
    </el-row>
    <el-row>
      <el-table
        stripe
        :data="authList"
        style="width: 100%">
        <el-table-column type="index" width="100">
        </el-table-column>
        <el-table-column prop="name" label="角色名称" width="200">
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="mini"
              @click.native="editRoleName(scope.row.name,scope.row.id)">
              <i class="fa fa-exchange"></i> 修改名称
            </el-button>
            <el-button type="primary" size="mini"
              @click.native="editRoleAuth(scope.row.name,scope.row.id)">
              <i class="fa fa-edit"></i> 编辑角色权限
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-row>
    <!-- 编辑角色弹窗 -->
    <el-dialog title="配置权限" :visible.sync="editAuthDialog" width="300px">
      <div style="color:red;">
        <span>所配角色：{{handleRoleName}}</span>
      </div>
      <el-tree
        :data="roleData"
        :props="roleProps"
        show-checkbox accordion :check-strictly="true"
        node-key="id" ref="tree"
        :default-checked-keys="defaultChecked"
        @check-change="checkChange">
      </el-tree>
      <div style="width:90%;text-align:right;margin-top:10px;">
        <el-button type="primary"  @click.native="savePermission">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { serverUrl } from '@/api/config'
import { $post } from '@/api/http'
import submitBox from '@/api/submitBox'
const getRoleUrl = serverUrl + '/Roles.do?get'
const getRolePermissionUrl = serverUrl + '/Roles.do?getpermission'
const getAllRulePermissionUrl = serverUrl + '/Permission.do?all'
const savePermissonUrl = serverUrl + '/Roles.do?update'
const editRoleAuthUrl = serverUrl + '/Roles.do?ChangeName'
const addRoleUrl = serverUrl + '/Roles.do?set'
export default {
  data () {
    return {
      handleRoleName: '',
      defaultChecked: [],
      authList: [],
      editAuthDialog: false,
      roleData: [],
      roleProps: {
        children: 'children',
        label: 'name'
      },
      savePermissonParams: {
        'id': '',
        'new': '',
        'old': ''
      }
    }
  },
  created () {
    this._getRoleName()
    this._getAllRolePermission()
  },
  methods: {
    // 保存按钮
    savePermission () {
      $post(savePermissonUrl, this.savePermissonParams).then(res => {
        if (res.data.success === true) {
          this.editAuthDialog = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      }).catch(err => { console.log(err) })
    },
    // 选中或移除选中的回调
    checkChange (handleObj, isChecked, hasChild) {
      let newCheckedArr = this.$refs.tree.getCheckedKeys()// 所有被选中的id
      // 算出选中前后的交集
      let preChk = new Set(this.defaultChecked)
      let allChk = new Set(newCheckedArr)
      let removed = [...preChk].filter(val => !allChk.has(val))
      let newAdd = [...allChk].filter(val => !preChk.has(val))
      this.savePermissonParams.old = removed.toString()
      this.savePermissonParams.new = newAdd.toString()
    },
    // 编辑角色权限
    editRoleAuth (name, id) {
      this.handleRoleName = name
      this.savePermissonParams.id = id
      $post(getRolePermissionUrl, {id: id}).then(res => {
        let idArr = res.data.data.pid.split(',')
        this.defaultChecked = idArr // 设置默认选中
        this.editAuthDialog = true
      })
    },
    // 修改角色名称
    editRoleName (name, id) {
      let that = this
      submitBox(that, {
        url: editRoleAuthUrl,
        editParams: {
          name: '',
          id: id
        },
        title: '修改角色名称',
        inputValue: name
      })
    },
    // 新增角色
    addNewRole () {
      let that = this
      submitBox(that, {
        url: addRoleUrl,
        editParams: {
          name: '',
          id: ''
        },
        title: '新增角色',
        inputValue: ''
      })
    },
    _getAllRolePermission () {
      $post(getAllRulePermissionUrl).then(res => {
        let allData = res.data.data
        console.log(allData)
        this.roleData = this._transTree(allData)
      })
    },
    _transTree (arr) {
      let r = []
      let hash = {}
      arr.forEach((val, key) => {
        hash[val.id] = val
      })
      for (let i = 0; i < arr.length; i++) {
        let oneData = arr[i]
        let pid = oneData.pid
        let hashVP = hash[pid]
        if (hashVP) {
          !hashVP['children'] && (hashVP['children'] = [])
          hashVP['children'].push(oneData)
        } else {
          r.push(oneData)
        }
      }
      return r
    },
    _getRoleName () {
      $post(getRoleUrl).then(res => {
        this.authList = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {

  }
}
</script>

<style lang="less">
  .auth{
    .el-dialog__body{
      padding:0 20px 20px;
    }
  }

</style>

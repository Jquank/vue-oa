<template>
  <div class="auth component-container media-padding">
    <el-row style="margin-bottom:10px;">
      <el-button type="primary" size="mini" @click.native="addNewRole">
        <i class="fa fa-plus"></i> 新 增
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
              @click.native="editRoleName(scope.row.name,scope.row.id)">修改名称
            </el-button>
            <el-button type="primary" size="mini"
              @click.native="editRoleAuth(scope.row.name,scope.row.id)">编辑角色权限
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
      <role-tree @closeDialog="closeDialog" :key="key_role" :defaultChecked="defaultChecked" :editId="editId"></role-tree>
    </el-dialog>
  </div>
</template>

<script>
import submitBox from 'base/submitBox/submitBox'
import roleTree from 'base/roleTree/roleTree'
export default {
  data () {
    return {
      key_role: '',
      handleRoleName: '',
      defaultChecked: [],
      authList: [],
      editAuthDialog: false,
      editId: ''
    }
  },
  created () {
    this._getRoleName()
  },
  methods: {
    // 编辑角色权限
    editRoleAuth (name, id) {
      this.handleRoleName = name
      this.editId = id
      this.$post('/Roles.do?getpermission', {id: id}).then(res => {
        if (res.data.success) {
          let idArr = res.data.data.pid.split(',')
          this.defaultChecked = idArr // 设置默认选中
          this.editAuthDialog = true
          this.key_role = new Date() + '' // 刷新tree组件
        }
      })
    },
    closeDialog (close) {
      this.editAuthDialog = close
    },
    // 修改角色名称
    editRoleName (name, id) {
      let that = this
      submitBox(that, {
        url: '/Roles.do?ChangeName',
        editParams: {
          name: '',
          id: id
        },
        title: '修改角色名称',
        inputValue: name
      }).then(res => {
        if (res) {
          this._getRoleName()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 新增角色
    addNewRole () {
      let that = this
      submitBox(that, {
        url: '/Roles.do?set',
        editParams: {
          name: ''
        },
        title: '新增角色',
        inputValue: ''
      }).then(res => {
        if (res) {
          this._getRoleName()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _getRoleName () {
      this.$post('/Roles.do?get').then(res => {
        if (res.data.success) {
          this.authList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    roleTree
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

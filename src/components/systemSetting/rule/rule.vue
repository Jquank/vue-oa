<template>
  <div class="rule component-container media-padding">
    <div class="rule-content media-padding">
      <div style="padding-bottom:5px;">
        <el-button @click.native="addRule" size="mini" type="primary" icon="fa fa-plus"> 新 增</el-button>
        <el-button @click.native="backWard" size="mini" type="primary" icon="fa fa-step-backward"> 返回上一级</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column prop="name" label="权限名称" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleCheckNext(scope.row.id)">查看下级权限</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.row.id,scope.row.name,pid)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { $post } from '@/api/http'
import submitBox from 'base/submitBox/submitBox'
const ruleUrl = '/Permission/PermissionGetByPid'
const editUrl = '/Permission/MenuNameUpdate'
const addUrl = '/User/UserAdd'
export default {
  data () {
    return {
      tableData: [],
      pid: '',
      lastPid: ''
    }
  },
  created () {
    this._getRuleList()
  },
  methods: {
    _getRuleList (pid) {
      let ruleParams = { pid: pid || '' }
      $post(ruleUrl, ruleParams).then(res => {
        if (res.data.status === 1) {
          this.tableData = res.data.data
          console.log(this.tableData)
        }
      })
    },
    handleCheckNext (pid) {
      this.pid = pid
      this._getRuleList(pid)
    },
    handleEdit (id, preName, pid) {
      let that = this
      // 编辑弹窗
      submitBox(that, {
        url: editUrl,
        editParams: {
          menuName: '',
          id: id
        },
        title: '编辑权限名称',
        inputValue: preName
      }).then(res => {
        if (res) {
          this._getRuleList(pid)
        }
      })
    },
    addRule (pid) {
      let that = this
      submitBox(that, {
        url: addUrl,
        editParams: {
          code: '',
          true_name: ''
        },
        title: '新增权限名称',
        inputValue: ''
      }).then(res => {
        console.log(res)
        if (res) {
          this._getRuleList(pid)
        }
      })
    },
    backWard () {
      this._getRuleList(this.lastPid)
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.rule {
  .rule-content {

    padding: 20px;
  }
}
</style>

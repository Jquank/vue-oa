<template>
  <div class="rule component-container media-padding">
    <div style="padding-bottom:5px;">
      <el-button @click.native="addRule" type="primary" icon="fa fa-plus"> 新 增</el-button>
      <el-button @click.native="backWard" type="warning" icon="fa fa-step-backward"> 返回上一级</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="权限名称" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button class="xsbtn" type="success" @click="handleCheckNext(scope.row.id)">查看下级权限</el-button>
          <el-button class="xsbtn" type="warning" icon="fa fa-pencil" @click="handleEdit(scope.row.id,scope.row.name,scope.row.pid)"> 编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import submitBox from 'base/submitBox/submitBox'
export default {
  data () {
    return {
      tableData: [],
      lastPid: ''
    }
  },
  created () {
    this._getRuleList()
  },
  methods: {
    _getRuleList (pid, url = '/Permission.do?get') {
      let params = {
        permission: pid
      }
      this.$post(url, pid ? params : {}).then(res => {
        if (res.data.success) {
          this.tableData = res.data.data
          this.lastPid = this.tableData[0].pid
        }
      })
    },
    handleCheckNext (pid) {
      this.lastPid = pid
      this._getRuleList(pid)
    },
    handleEdit (id, preName, pid) {
      let that = this
      // 编辑弹窗
      submitBox(that, {
        url: '/Permission.do?update',
        editParams: {
          name: '',
          id: id
        },
        title: '编辑权限名称',
        inputValue: preName
      }).then(res => {
        if (res) {
          this._getRuleList(this.lastPid)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addRule () {
      let that = this
      submitBox(that, {
        url: '/Permission.do?set',
        editParams: {
          name: '',
          permission: null
        },
        title: '新增权限名称',
        inputValue: ''
      }).then(res => {
        if (res) {
          this._getRuleList(this.lastPid)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    backWard () {
      if (!this.lastPid) {
        return
      }
      this._getRuleList(this.lastPid, '/Permission.do?back')
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
</style>

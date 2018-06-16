<template>
  <div class="rule">
    <p>
      <span>系统配置 / 权限设置</span>
    </p>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="name" label="权限名称" width="200"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleCheckNext(tableData[scope.$index].id)">查看下级权限</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(tableData[scope.$index].id,tableData[scope.$index].name)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { $post } from '@/api/http'
import { serverUrl } from '@/api/config'
import submitBox from '@/api/submitBox'
const ruleUrl = serverUrl + '/Permission.do?get'
const editUrl = serverUrl + '/Permission.do?update'
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this._getRuleList()
  },
  methods: {
    _getRuleList () {
      $post(ruleUrl).then((res) => {
        this.tableData = res.data.data
      })
    },
    handleCheckNext (pid) {
      let ruleParams = { permission: pid }
      $post(ruleUrl, ruleParams).then((res) => {
        this.tableData = res.data.data
      })
    },
    handleEdit (id, preName) {
      let that = this
      // 编辑弹窗
      submitBox(that, {
        url: editUrl,
        editParams: {
          name: '',
          id: id
        },
        title: '编辑权限名称',
        inputValue: preName
      })
    }
  },
  components: {}
}
</script>

<style scoped>
/* .rule { */
/* background: #E2E5EC; */
/* } */
</style>

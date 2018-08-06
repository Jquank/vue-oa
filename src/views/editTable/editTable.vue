<template>
  <div class="edit-table">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="" label="地址">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">
            <el-input v-model="scope.row.address" class="addr-input"></el-input>
            <el-button @click.native="cancel(scope.row)" type="warning" size="mini">cancel</el-button>
          </div>
          <span v-else>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <div slot-scope="scope">
          <el-button v-if="scope.row.isEdit" @click.native="edit(scope.row)" type="primary" size="mini" :icon="editIcon"></el-button>
          <el-button v-else @click.native="confirmEdit(scope.row)" type="success" size="mini" :icon="okIcon"></el-button>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { $post } from 'api/http'
export default {
  data () {
    return {
      count: 0,
      editIcon: 'el-icon-edit',
      okIcon: 'el-icon-success',
      tableData: [{}]
    }
  },
  created () {
    $post(this.serverUrl + '/editTable').then(res => {
      if (res.data.code === 0) {
        this.tableData = res.data.data
      }
    })
  },
  methods: {
    edit (row) {
      row.isEdit = false
    },
    confirmEdit (row) {
      row.isEdit = true
      $post(this.serverUrl + '/changeAddr', { addr: row.address }).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      })
    },
    cancel (row) {
      row.isEdit = true
    }
  },
  components: {}
}
</script>

<style lang="less">
.edit-table {
  background: #fff;
  padding: 15px 10px;
  .addr-input {
    width: calc(~'(100% - 75px)');
  }
}
</style>

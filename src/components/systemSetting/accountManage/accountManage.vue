<template>
  <div class="account-manage component-container media-apdding">
    <el-table border stripe :data="accountList" class="table-width">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="name" label="账户名称" align="center">
      </el-table-column>
      <el-table-column prop="" label="操作" align="center">
        <template slot-scope="scope">
          <el-switch @change="turnOff(scope.row)" v-model="scope.row.allocation" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
        </template>
      </el-table-column>
    </el-table>
    <page @updateList="updateList" :url="url" :sendParams="sendParams" class="page"></page>
  </div>
</template>

<script>
import Page from 'base/page/page'
export default {
  data () {
    return {
      accountList: [],
      url: '/Oper.do?SearchAlloc',
      sendParams: {

      }
    }
  },
  methods: {
    turnOff (val) {
      let params = {
        'uid': val.id,
        'allocation': val.allocation
      }
      this.$post('/Oper.do?EditAlloc', params).then(res => {
        if (res.data.success) {
          this.search()
        }
      })
    },
    search () {
      this.sendParams = {}
    },
    updateList (res) {
      this.accountList = res.data[0].data
    }
  },
  components: {
    Page
  }
}
</script>

<style>

</style>

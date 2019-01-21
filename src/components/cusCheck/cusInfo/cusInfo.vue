<template>
  <div class="cus-edit component-container media-padding">
    <div class="edit-search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="edit-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <auto-select :key="key_auto_select" :defaultValue="editStatus" title="审核状态" v-model="editStatus" class="edit-item item-width">
        <el-option label="待处理" value="0"></el-option>
        <el-option label="已处理" value="10"></el-option>
      </auto-select>
      <select-department :key="key_dept" title="提交部门" class="edit-item item-width" @upDeptId="upDeptId"></select-department>
      <el-date-picker v-model="subDate" value-format="yyyy/MM/dd HH:mm" format="yyyy/MM/dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="提交开始日期" :unlink-panels="true" end-placeholder="提交结束日期" class="edit-item" style="width:300px;"></el-date-picker>
      <div class="edit-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
    </div>

    <el-table stripe border :data="list" class="table-width">
      <el-table-column prop="companyname" label="客户名称" min-width="150">
      </el-table-column>
      <el-table-column prop="username" label="提交人" width="90">
      </el-table-column>
      <el-table-column prop="fullname" label="提交时间" width="150">
        <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="editcontent" label="备注" min-width="190">
      </el-table-column>
      <el-table-column prop="" label="操作" width="80px" align="center">
        <template slot-scope="scope">
          <el-button @click.native="view(scope.row)" type="success" class="xsbtn">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" @updateList="getList"></page>
    <router-view></router-view>
  </div>
</template>

<script>
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
export default {
  data () {
    return {
      editStatus: '0',
      cusName: '',
      subDate: [],
      dept: '',

      key_auto_select: '',
      key_dept: '1',
      list: [],
      url: '/Company.do?FindEditInfo',
      sendParams: {}
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (from.meta.text.indexOf('详情') > -1 && to.query.data === 'fromDetail') {
      this.search()
    }
    next()
  },
  methods: {
    view (data) {
      this.$router.push({
        path: `cusInfo/${data.editid}`,
        query: {data: data}
      })
    },
    search () {
      this.sendParams = {
        'companyname': this.cusName,
        'begintime': this.subDate[0],
        'endtime': this.subDate[1],
        'dept': this.dept,
        'type': this.editStatus
      }
    },
    reset () {
      this.cusName = ''
      this.subDate = []
      this.dept = ''
      this.key_dept = new Date() + '1'
      this.editStatus = '0'
      this.key_auto_select = new Date() + ''
    },
    getList (res) {
      this.list = res.data[0].data
    },
    upDeptId (id) {
      this.dept = id
    }
  },
  components: {
    Page,
    AutoSelect,
    SelectDepartment
  }
}
</script>

<style lang="less" scoped>
.cus-edit {
  position: relative;
  .edit-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .edit-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
  }
}
</style>

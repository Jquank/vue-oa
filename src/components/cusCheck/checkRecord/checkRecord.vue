<template>
  <div class="check-record  component-container media-padding">
    <div class="record-search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="record-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <auto-select title="审核状态" v-model="checkStatus" :key="key_auto_select" class="record-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option label="审核通过" :value="30"></el-option>
        <el-option label="审核不通过" :value="10"></el-option>
      </auto-select>
      <select-department @upDeptId="upDeptId" title="提交部门" :key="key_dept" class="record-item item-width"></select-department>
      <el-date-picker v-model="subDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="datetimerange" range-separator="至" start-placeholder="审核开始日期" end-placeholder="审核结束日期" class="record-item  item-width"></el-date-picker>
      <div class="record-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
    </div>

    <el-table stripe border :data="list" class="table-width">
        <el-table-column prop="companyname" label="客户名称" min-width="150">
        </el-table-column>
        <el-table-column prop="username" label="提交人" width="90">
        </el-table-column>
        <el-table-column prop="fullname" label="提交部门">
        </el-table-column>
        <el-table-column prop="auditorname" label="审核人">
        </el-table-column>
        <el-table-column prop="" label="审核时间" width="150">
          <span slot-scope="scope">{{scope.row.auditortime | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="productname" label="业务类型" min-width="80">
        </el-table-column>
        <el-table-column prop="" label="审核状态" width="80px" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status ===10" type="danger" plain class="xsbtn">
              未通过
            </el-button>
            <el-button v-if="scope.row.status ===30" type="success" plain class="xsbtn">
              通过
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <page class="page" :url="url" :sendParams="sendParams" @updateList="getList"></page>
  </div>
</template>

<script>
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
export default {
  data () {
    return {
      checkStatus: '',
      key_auto_select: '',
      cusName: '',
      subDate: [],
      dept: '',
      key_dept: '1',
      list: [],
      url: '/CheckOut.do?checkRecord',
      sendParams: {}
    }
  },
  methods: {
    search () {
      this.sendParams = {
        'type': this.checkStatus,
        'companyname': this.cusName,
        'begintime': this.subDate[0],
        'endtime': this.subDate[1],
        'dept': this.dept
      }
      console.log(this.sendParams)
    },
    reset () {
      this.cusName = ''
      this.checkStatus = ''
      this.key_auto_select = new Date() + ''
      this.dept = ''
      this.key_dept = new Date() + '1'
      this.subDate = []
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
.check-record {
  .record-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .record-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
  }
}
</style>

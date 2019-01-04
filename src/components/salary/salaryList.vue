<template>
  <div class="salary-list component-container media-padding">
    <div>
      <div class="salary-search mt-10px">
        <select-department
          :key="key_dept"
          :title="'部门'"
          @upDeptId="upDeptId"
          class="salary-item item-width"
          v-model="dept"
        ></select-department>
        <el-date-picker
          class="salary-item item-width"
          format="yyyy-MM"
          placeholder="选择日期"
          type="date"
          v-model="date"
          value-format="yyyy-MM"
        ></el-date-picker>
        <div class="salary-item export"  v-if="permissions.indexOf('4n') > -1">
          <up-file
            :isHiddenFileList="true"
            :otherParams="otherParams"
            :title="'导入'"
            :upIcon="'fa fa-cloud-download'"
            :uploadUrl="'/salary.do?import'"
            @fileUrl="search()"
          ></up-file>
          <el-button @click.native="exportExcell" class="ml10px" type="warning" icon="fa fa-cloud-upload">导 出</el-button>
        </div>
      </div>
      <div class="salary-search">
        <el-input class="salary-item item-width" placeholder="搜索员工姓名" v-model="workerName">
          <template slot="prepend">员工姓名:</template>
        </el-input>
        <div class="salary-item item-width">
          <el-button @click.native="search" type="primary">查 询</el-button>
          <el-button @click.native="reset" type="warning">重 置</el-button>
        </div>
        <div class="salary-item export">
          <el-button @click.native="clear" type="danger" v-if="permissions.indexOf('4n') > -1">清空数据</el-button>
        </div>
      </div>
    </div>

    <el-table :data="salaryList" border class="table-width" stripe>
      <el-table-column label="姓名" min-width="80" prop="EX_XM"></el-table-column>
      <el-table-column label="部门" min-width="120" prop="deptname"></el-table-column>
      <el-table-column label="招行卡号" min-width="120" prop="EX_ZHYHK"></el-table-column>
      <el-table-column label="中行卡号" min-width="120" prop="EX_ZGYHYHK"></el-table-column>
      <el-table-column label="应发工资" min-width="100" prop="EX_YFGZ">
        <span slot-scope="scope">{{scope.row.EX_YFGZ | currency}}</span>
      </el-table-column>
      <el-table-column label="实发工资" min-width="100" prop="EX_SFGZ">
        <span slot-scope="scope">{{scope.row.EX_SFGZ | currency}}</span>
      </el-table-column>
      <el-table-column align="center" label="状态" min-width="70" prop>
        <template slot="header" slot-scope="scope">
          <el-dropdown @command="command" trigger="click">
            <span>
              状态
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :disabled="!canSet" command="0">无</el-dropdown-item>
              <el-dropdown-item :disabled="!canSet" command="20">审核中</el-dropdown-item>
              <el-dropdown-item :disabled="!canSet" command="30">确认中</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <span slot-scope="scope">{{scope.row.status == 0 ? "空" :(scope.row.status == 20 ? '审核中' : '确认中')}}</span>
      </el-table-column>
      <el-table-column label="查看详情" prop width="80">
        <template slot-scope="scope">
          <el-button @click.native="view(scope.row)" class="xsbtn" type="success">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page :sendParams="sendParams" :url="salaryUrl" @updateList="updateSalaryList" class="page"></page>
    <router-view></router-view>
  </div>
</template>

<script>
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import Page from 'base/page/page'
import UpFile from 'base/upLoad/upFile'
import { timeFormat1 } from 'common/js/filters'
import { serverUrl } from 'api/http'
import cookie from 'js-cookie'
const nowDate = timeFormat1(
  new Date().setMonth(new Date().getMonth() - 1),
  false
)
export default {
  data() {
    return {
      tk: cookie.get('token'),
      serverUrl: serverUrl,
      permissions: cookie.getJSON('permissions'),
      canSet: true,
      key_dept: '',
      dept: '',
      workerName: '',
      date: nowDate,
      salaryList: [],
      salaryUrl: '/salary.do?search',
      sendParams: {
        month: nowDate
      },
      otherParams: {
        salarymonth: nowDate
      }
    }
  },
  created() {
    this.canSet = this.permissions.indexOf('4n') > -1
  },
  methods: {
    command(val) {
      if (!this.canSet) {
        return
      }
      let params = {
        month: this.date,
        status: val
      }
      this.$post('/salary.do?updateStatus', params).then(res => {
        if (res.data.success) {
          this.search()
        }
      })
    },
    clear() {
      this.$confirm('确定清除全部数据吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/salary.do?delete', { month: this.date }).then(res => {
            if (res.data.success) {
              this.search()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    exportExcell() {
      this.$export('/salary.do?export', this.sendParams)
    },
    view(data) {
      data.month = timeFormat1(this.date, false)
      this.$router.push({
        path: `salaryList/${data.name}`,
        query: { data: data }
      })
    },
    search() {
      this.sendParams = {
        dept: this.dept,
        name: this.workerName,
        month: timeFormat1(this.date, false)
      }
    },
    reset() {
      this.dept = ''
      this.key_dept = new Date() + ''
      this.workerName = ''
      this.date = nowDate
    },
    upDeptId(id) {
      this.dept = id
    },
    updateSalaryList(res) {
      this.salaryList = res.data[0].data
      this.salaryList.forEach(val => {
        if (val.deptname) {
          let arr = val.deptname.split('/')
          val.deptname = arr[arr.length - 1]
        }
      })
    }
  },
  components: {
    SelectDepartment,
    Page,
    UpFile
  }
}
</script>

<style lang="less" scoped>
.salary-list {
  position: relative;
  .salary-search {
    display: flex;
    flex-wrap: wrap;
    .salary-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
  .el-table th div {
    line-height: 20px;
    color: #909399;
  }
}
</style>

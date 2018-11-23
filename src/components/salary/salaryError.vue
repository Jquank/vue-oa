<template>
  <div class="salary-error component-container media-padding">
    <div class="salary-search">
      <el-date-picker v-model="date" format="yyyy-MM" type="date" placeholder="选择日期" class="salary-item item-width">
      </el-date-picker>
      <div class="salary-item item-width">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
    </div>

    <el-table stripe border :data="salaryError" class="table-width">
      <el-table-column prop="EX_XM" label="员工" min-width="80">
      </el-table-column>
      <el-table-column prop="EX_SFZ" label="身份证" min-width="120">
      </el-table-column>
      <el-table-column prop="month" label="日期" min-width="120">
        <span slot-scope="scope">{{scope.row.month | timeFormat1}}</span>
      </el-table-column>
      <el-table-column prop="EX_YFGZ" label="实发工资" min-width="120">
        <span slot-scope="scope">{{scope.row.EX_YFGZ | currency}}</span>
      </el-table-column>
    </el-table>
    <page class="page" :url="salaryUrl" :sendParams="sendParams" @updateList="updateSalaryList"></page>
    <router-view></router-view>
  </div>
</template>

<script>
import Page from 'base/page/page'
import { timeFormat1 } from 'common/js/filters'
const nowDate = timeFormat1(
  new Date().setMonth(new Date().getMonth() - 1),
  false
)
export default {
  data () {
    return {
      time: '',
      date: nowDate,
      salaryError: [],
      salaryUrl: '/salary.do?exceptionuser',
      sendParams: {
        beforetime: nowDate
      }
    }
  },
  methods: {
    search () {
      this.sendParams = {
        beforetime: timeFormat1(this.date, false)
      }
    },
    reset () {
      this.date = nowDate
    },
    updateSalaryList (res) {
      this.salaryError = res.data[0].data
    }
  },
  components: {
    Page
  }
}
</script>

<style lang="less" scoped>
.salary-error {
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
}
</style>

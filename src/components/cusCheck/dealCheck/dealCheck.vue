<template>
  <div class="deal-check component-container media-padding">
    <div class="check-status">
      <el-radio-group v-model="checkRadio" @change="radioChange">
        <el-radio-button label="100">全部</el-radio-button>
        <el-radio-button label="20">保A审核</el-radio-button>
        <el-radio-button label="15">公共库审核</el-radio-button>
      </el-radio-group>
    </div>
    <div class="check-search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="check-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <auto-select title="审核状态" :defaultValue="checkStatus" :key="key_auto_select" v-model="checkStatus" class="check-item item-width">
        <el-option label="待审核" value="20"></el-option>
        <el-option label="已审核" value="25"></el-option>
      </auto-select>
      <select-department :key="key_dept" @upDeptId="upDeptId" class="check-item item-width"></select-department>
      <el-date-picker v-model="subDate" type="datetimerange" range-separator="至" start-placeholder="提交开始日期" end-placeholder="提交结束日期" value-format="yyyy/MM/dd HH:mm" :unlink-panels="true" class="check-item item-width"></el-date-picker>
      <div class="check-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
    </div>

    <el-table stripe border :data="dealList" style="width: 100%;margin-top:10px;">
      <el-table-column prop="name" label="客户名称" min-width="150">
      </el-table-column>
      <el-table-column prop="" label="客户类型" width="90">
        <span slot-scope="scope">
          {{scope.row.producttype | cusState('cusType')}}{{scope.row.producttype!==0?scope.row.productnumber:''}}
        </span>
      </el-table-column>
      <el-table-column prop="pname" label="业务类型" width="90">
      </el-table-column>
      <el-table-column prop="" label="审核类型">
        <span slot-scope="scope">{{scope.row.cltype | cusState('checkType')}}</span>
      </el-table-column>
      <el-table-column prop="" label="提交时间" width="150px">
        <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="entername" label="录入人">
      </el-table-column>
      <el-table-column prop="username" label="提交人">
      </el-table-column>
      <el-table-column prop="auditorname" label="待处理人">
      </el-table-column>
      <el-table-column prop="" label="操作" width="130px" align="center">
        <template slot-scope="scope">
          <el-button @click.native="check(scope.row)" type="primary" class="xsbtn">审核</el-button>
          <el-button v-if="scope.row.cltype==20&&scope.row.clstatus==10&&scope.row.type==10&&scope.row.auditor_now_h!==null&&(scope.row.tb_field_name-scope.row.auditor_now_h>0)" @click.native="stopProtect(scope.row)" type="danger" class="xsbtn">终止保护</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="dealUrl" :sendParams="sendParams" @updateList="updateDealList"></page>
    <router-view></router-view>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import Page from 'base/page/page'
export default {
  data () {
    return {
      checkRadio: '100',
      checkStatus: '20',
      cusName: '',
      subDate: [],
      dept: '',
      key_auto_select: '',
      key_dept: '1',

      dealList: [],
      dealUrl: '/CustomerCheck.do?customget',
      sendParams: {
        'status': '20',
        'cltype': '100'
      }
    }
  },
  beforeRouteUpdate (to, from, next) { // vue会复用组件，所以从详情页返回时带上搜索条件搜索
    if (from.meta.text.indexOf('详情') > -1 && to.query.data === 'fromDetail') {
      this.search()
    }
    next()
  },
  methods: {
    stopProtect (data) {
      this.$confirm('请确认是否终止该客户的保护机制？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/Company.do?logStop', {
            'companyid': data.id,
            'companylogid': data.companylogid
          }).then(res => {})
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    check (data) {
      this.$router.push({
        path: `dealCheck/${data.id}`,
        query: { data: data }
      })
    },
    upDeptId (id) {
      this.dept = id
    },
    search () {
      this.sendParams = {
        'status': this.checkStatus,
        'cltype': this.checkRadio,
        'companyname': this.cusName || undefined,
        'begintime': this.subDate[0],
        'endtime': this.subDate[1],
        'dept': this.dept || undefined
      }
    },
    reset () {
      this.cusName = ''
      this.checkStatus = '20'
      this.key_auto_select = new Date() + ''
      this.dept = ''
      this.key_dept = new Date() + '1'
      this.subDate = []
    },
    radioChange () {
      this.search()
    },
    updateDealList (res) {
      this.dealList = res.data[0].data
    }
  },
  components: {
    AutoSelect,
    SelectDepartment,
    Page
  }
}
</script>

<style lang="less" scoped>
.deal-check {
  position: relative;
  .check-status {
    margin-left: 10px;
  }
  .check-search {
    display: flex;
    flex-wrap: wrap;
    .check-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
  }
}
</style>

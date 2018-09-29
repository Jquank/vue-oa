<template>
  <div class="cus-pool component-container media-padding">
    <div class="cus-status">
        <el-radio-group v-model="statusRadio" @change="radioChange">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="20">保A客户</el-radio-button>
          <el-radio-button label="0">公共库客户</el-radio-button>
          <el-radio-button label="30">签约客户</el-radio-button>
        </el-radio-group>
      </div>
    <div class="pool-search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="pool-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <el-input placeholder="提交人姓名" v-model="subName" class="pool-item item-width">
        <template slot="prepend">提交人:</template>
      </el-input>
      <select-department :key="key_dept" @upDeptId="upDeptId" title="提交部门" class="pool-item item-width"></select-department>
      <auto-select :key="key_auto_select"  :defaultValue="poolStatus" title="审核状态" v-model="poolStatus" class="pool-item item-width">
        <el-option label="全部" value="100"></el-option>
        <el-option label="待审核" value="20"></el-option>
        <el-option label="审核通过" value="30"></el-option>
        <el-option label="审核未通过" value="10"></el-option>
      </auto-select>
      <el-date-picker v-model="subDate" value-format="yyyy/MM/dd HH:mm" format="yyyy/MM/dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="审核开始日期" end-placeholder="审核结束日期" class="pool-item" style="width:300px;"></el-date-picker>
      <div class="pool-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
    </div>

    <el-table stripe border :data="poolList" style="width: 100%;margin-top:10px;">
      <el-table-column prop="cname" label="客户名称" min-width="150">
      </el-table-column>
      <el-table-column prop="" label="公司状态">
        <span :class="scope.row.ctype==-10?'red':''" slot-scope="scope">{{scope.row.ctype | cusState('cusStatus')}}</span>
      </el-table-column>
      <el-table-column prop="" label="客户类型" min-width="80">
        <span slot-scope="scope">
          {{scope.row.producttype | cusState('cusType')}}{{scope.row.producttype!==0?scope.row.productnumber:''}}
        </span>
      </el-table-column>
      <el-table-column prop="area" label="地区" min-width="80">
      </el-table-column>
      <el-table-column prop="cat" label="行业" min-width="80">
      </el-table-column>
      <el-table-column prop="pname" label="业务类型" min-width="80">
      </el-table-column>
      <el-table-column prop="pname" label="业务状态" min-width="80">
        <span slot-scope="scope">{{scope.row.cltype+''+scope.row.clstatus | businessStatus}}</span>
      </el-table-column>
      <el-table-column prop="submiter" label="所属商务" min-width="80">
      </el-table-column>
      <el-table-column prop="center" label="录入人" min-width="80">
      </el-table-column>
      <el-table-column prop="" label="降E时间">
        <span slot-scope="scope">{{scope.row.opt_time | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="120px">
        <template slot-scope="scope">
          <el-button @click.native="view(scope.row)" type="success" class="xsbtn">查看</el-button>
          <el-button type="danger" class="xsbtn">终止</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="poolUrl" :sendParams="sendParams" @updateList="updatePoolList"></page>
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
      statusRadio: '',
      poolStatus: '100',
      key_auto_select: '',
      cusName: '',
      subName: '',
      subDate: [],
      dept: '',
      key_dept: '1',

      poolList: [],
      poolUrl: '/All.do?company',
      sendParams: {
        'status': '100'
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (from.meta.text.indexOf('详情') > -1 && to.query.data === 'fromDetail') {
      this.search()
    }
    next()
  },
  methods: {
    radioChange (val) {
      this.sendParams = {
        'status': this.poolStatus,
        'type': this.statusRadio
      }
    },
    search () {
      this.sendParams = {
        'status': this.poolStatus,
        'type': this.statusRadio,
        'companyname': this.cusName,
        'begintime': this.subDate[0],
        'endtime': this.subDate[1],
        'dept': this.dept,
        'userName': this.subName
      }
    },
    reset () {
      this.cusName = ''
      this.subName = ''
      this.dept = ''
      this.key_dept = new Date() + '1'
      this.poolStatus = '100'
      this.key_auto_select = new Date() + ''
      this.subDate = []
    },
    view (data) {
      this.$router.push({
        path: `cusPoolManage/${data.cid}`,
        query: {data: data}
      })
    },
    updatePoolList (res) {
      this.poolList = res.data[0].data
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
.cus-pool {
  position: relative;
  .cus-status{
    margin-left: 10px;
  }
  .pool-search {
    display: flex;
    flex-wrap: wrap;
    .pool-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
  }
}
</style>

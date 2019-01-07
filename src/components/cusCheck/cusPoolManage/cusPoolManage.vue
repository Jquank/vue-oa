<template>
  <div class="cus-pool component-container media-padding">
    <div class="cus-status">
        <el-radio-group v-model="statusRadio" @change="radioChange">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="20">保A客户</el-radio-button>
          <el-radio-button label="0">公共库客户</el-radio-button>
          <el-radio-button label="30">签约客户</el-radio-button>
        </el-radio-group>
        <div class="throw-order export">
          <el-button v-if="permissions.indexOf('5y') > -1&&statusRadio==20" @click.native="throwOrder" type="warning">保A甩单</el-button>
        </div>
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

    <el-table :key="statusRadio" @selection-change="handleSelectionChange" stripe border :data="poolList" class="table-width">
      <el-table-column fixed="left" type="selection" width="40">
        </el-table-column>
      <el-table-column prop="cname" label="客户名称" min-width="220">
      </el-table-column>
      <el-table-column prop="" label="公司状态" min-width="80">
        <span :class="scope.row.ctype==-10?'red':''" slot-scope="scope">{{scope.row.ctype | cusState('cusStatus')}}</span>
      </el-table-column>
      <el-table-column prop="" label="客户类型" width="90">
        <span slot-scope="scope">
          {{scope.row.producttype | cusState('cusType')}}{{scope.row.producttype!==0?scope.row.productnumber:''}}
        </span>
      </el-table-column>
      <el-table-column prop="area" label="地区" min-width="170">
      </el-table-column>
      <el-table-column prop="cat" label="行业" min-width="150">
      </el-table-column>
      <el-table-column prop="pname" label="业务类型" min-width="80">
      </el-table-column>
      <el-table-column prop="pname" label="业务状态" min-width="100">
        <span slot-scope="scope">{{scope.row.cltype+''+scope.row.clstatus | businessStatus}}</span>
      </el-table-column>
      <el-table-column prop="submiter" label="所属商务" min-width="80">
      </el-table-column>
      <el-table-column prop="center" label="录入人" min-width="80">
      </el-table-column>
      <el-table-column prop="" label="降E时间" width="90">
        <span slot-scope="scope">{{scope.row.opt_time | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="" label="操作" width="120px" align="center">
        <template slot-scope="scope">
          <el-button @click.native="view(scope.row)" type="success" class="xsbtn">查看</el-button>
          <el-button @click.native="stopProtect(scope.row)" v-if="scope.row.cltype==20&&scope.row.clstatus==10&&scope.row.ctype==10&&scope.row.auditor_now_h!==null&&(scope.row.tb_field_name-scope.row.auditor_now_h>=0)" type="danger" class="xsbtn">终止</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="poolUrl" :sendParams="sendParams" @updateList="updatePoolList"></page>
    <router-view></router-view>

    <!-- 保A甩单弹窗 -->
    <el-dialog title="选择" :visible.sync="throwDialog" width="550px">
      <select-user @userId="getUserId"></select-user>
    </el-dialog>
  </div>
</template>

<script>
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import cookie from 'js-cookie'
import SelectUser from 'base/selectUser/selectUser'
export default {
  data () {
    return {
      permissions: cookie.getJSON('permissions'),
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
      },
      throwDialog: false,
      userId: '',
      rowData: {},
      multipleSelection: []
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (from.meta.text.indexOf('详情') > -1 && to.query.data === 'fromDetail') {
      this.search()
    }
    next()
  },
  methods: {
    // 甩单按钮
    throwOrder () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请勾选客户！'
        })
        return
      }
      this.throwDialog = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 获取用户id，完成甩单
    getUserId (id) {
      this.userId = id
      if (id) {
        this.$get('/Product.do?GetNumberById', {id: id}).then(res => {
          if (res.data[0].success) {
            let maxBaoA = res.data[0].data
            if (this.multipleSelection.length > maxBaoA) {
              this.$message({
                type: 'error',
                message: `已超出剩余保A配额数：${maxBaoA}`
              })
            } else {
              let selArr = []
              this.multipleSelection.forEach(val => {
                selArr.push({id: val.companylogid})
              })
              this.$post('/Project.do?ThrowA',
                {
                  receiveorderuid: id,
                  companylog: selArr
                }
              ).then(res => {
                if (res.data[0].data) {
                  this.$message({
                    type: 'success',
                    message: '甩单成功'
                  })
                  this.search()
                  this.throwDialog = false
                } else {
                  this.$message({
                    type: 'error',
                    message: '甩单失败'
                  })
                }
              })
            }
          }
        })
      }
    },
    stopProtect (data) {
      this.$confirm('请确认是否终止该客户的保护机制？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/Company.do?logStop', {
            'companyid': data.cid,
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
    radioChange (val) {
      this.sendParams = {
        'status': this.poolStatus,
        'type': this.statusRadio || undefined
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
    SelectDepartment,
    SelectUser
  }
}
</script>

<style lang="less" scoped>
.cus-pool {
  position: relative;
  .cus-status{
    display: flex;
    flex-wrap: wrap;
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

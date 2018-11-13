<template>
  <div class="my-flow component-container media-padding">
    <!-- 搜索 -->
    <div class="search">
      <el-date-picker v-model="businessDate" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="交易开始日期" end-placeholder="交易结束日期" class="search-item" :unlink-panels="true"></el-date-picker>
      <el-input v-model="receiveMan" class="search-item">
        <template slot="prepend">领用人:</template>
      </el-input>
      <el-input v-model="remark" class="search-item">
        <template slot="prepend">认领(分配)备注:</template>
      </el-input>
    </div>

    <div class="export">
      <div class="search">
        <select-department @upDeptId="upDeptId" :key="key_dept" class="search-item"></select-department>
        <div class="search-item">
          <el-button @click.native.prevent="search" type="primary">查 询</el-button>
          <el-button @click.native.prevent="reset" type="warning">重 置</el-button>
        </div>
      </div>
      <div class="search-item text-right">
        <el-button type="warning" icon="fa fa-cloud-upload"> 导出</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table :data="myFlowList" max-height="550" class="table-width" border>
      <!-- <el-table-column type="selection" width="35"></el-table-column> -->
      <el-table-column label="银行类型" prop="code_desc" width="80"></el-table-column>
      <el-table-column label="交易时间" prop="B_JYSJ" width="90">
        <span slot-scope="scope">{{scope.row.tm | timeFormat}}</span>
      </el-table-column>
      <el-table-column label="参考号" prop="no" width="90"></el-table-column>
      <el-table-column label="付款名" prop="fm_name" min-width="150"></el-table-column>
      <el-table-column label="付款账号" prop="fm_account" min-width="100"></el-table-column>
      <el-table-column label="现金收款人" prop="fm_uid" width="90"></el-table-column>
      <el-table-column label="付款公司名" prop="company_name" min-width="90"></el-table-column>
      <el-table-column label="摘要|备注" prop="remark"></el-table-column>
      <el-table-column label="总金额" prop="" min-width="100">
        <span slot-scope="scope">{{scope.row.split_amount | currency1}}</span>
      </el-table-column>
      <el-table-column label="认领时间" prop="" width="90">
        <span slot-scope="scope">{{scope.row.allocTime | timeFormat}}</span>
      </el-table-column>
      <el-table-column label="分配(认领)备注" prop="allocRemark" min-width="130"></el-table-column>
      <el-table-column label="所属人" prop="userName"></el-table-column>
      <el-table-column label="是否使用" prop="">
        <template slot-scope="scope">
          <el-button :type="scope.row.status===0?'success':'danger'" plain class="xsbtn">{{scope.row.status!== 0?'已使用':'未使用'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="">
        <template slot-scope="scope">
          <el-button  v-if="permissions.indexOf('6r')>-1&&scope.row.status===0" @click.native.prevent="goBack(scope.row)" type="warning" class="xsbtn">退回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" @updateList="updateFlowList"></page>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import Page from 'base/page/page'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
export default {
  data () {
    return {
      permissions: cookie.getJSON('permissions'),
      businessDate: [],
      remark: '',
      receiveMan: '',
      dept: '',
      key_dept: '',
      myFlowList: [],
      url: '/receipt.do?bankReceiveMine',
      sendParams: {}
    }
  },
  created () {},
  methods: {
    goBack (data) {
      this.$confirm('确定要退回吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$get('/receipt.do?receiptClaimBack', {brcId: this.data.id}).then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '退回成功'
            })
            this.search()
          } else {
            this.$message({
              type: 'error',
              message: '此笔流水不能退回'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    search () {
      this.sendParams = {
        'code': this.dept,
        'start_time': this.businessDate[0],
        'end_time': this.businessDate[1],
        'username': this.receiveMan,
        'allocremark': this.remark
      }
    },
    reset () {
      this.businessDate = []
      this.receiveMan = ''
      this.remark = ''
      this.dept = ''
      this.key_dept = new Date() + ''
    },
    updateFlowList (res) {
      this.myFlowList = res.data[0].data
    },
    upDeptId (id) {
      this.dept = id
    }
  },
  components: {
    Page,
    SelectDepartment
  }
}
</script>

<style>
.el-dropdown-menu--small .el-dropdown-menu__item {
  padding: 2px 15px;
}
</style>

<style lang="less">
.my-flow {
  .search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .search-item {
      margin-top: 10px;
      margin-left: 10px;
      width: 295px;
    }
  }

  .export {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10px;
    > .list-item {
      margin-left: 10px;
      margin-right: 20px;
      margin-top: 10px;
    }
  }
  .contact-phone {
    width: calc(~'(100% - 30px)');
  }
}
</style>

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
      <div v-if="permissions.indexOf('75') > -1" class="search-item text-right">
        <el-button @click.native="exportFlow" type="warning" icon="fa fa-cloud-upload"> 导出</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table :data="myFlowList" max-height="550" class="table-width" border stripe>
      <!-- <el-table-column type="selection" width="35"></el-table-column> -->
      <el-table-column label="银行类型" prop="code_desc" width="80"></el-table-column>
      <el-table-column label="交易时间" prop="B_JYSJ" width="100">
        <span slot-scope="scope">{{scope.row.tm | timeFormat}}</span>
      </el-table-column>
      <el-table-column label="参考号" prop="no" width="120"></el-table-column>
      <el-table-column label="付款名" prop="fm_name" min-width="160"></el-table-column>
      <el-table-column label="付款账号" prop="fm_account" min-width="110"></el-table-column>
      <el-table-column label="现金收款人" prop="fm_uid" width="90"></el-table-column>
      <el-table-column label="付款公司名" prop="company_name" min-width="150"></el-table-column>
      <el-table-column label="摘要|备注" prop="remark" min-width="120"></el-table-column>
      <el-table-column label="总金额" prop="" min-width="120">
        <span slot-scope="scope">{{scope.row.split_amount | currency1}}</span>
      </el-table-column>
      <el-table-column label="认领时间" prop="" width="100">
        <span slot-scope="scope">{{scope.row.allocTime | timeFormat}}</span>
      </el-table-column>
      <el-table-column label="分配(认领)备注" prop="allocRemark" min-width="150"></el-table-column>
      <el-table-column label="所属人" prop="userName" min-width="110"></el-table-column>
      <el-table-column label="是否使用" prop="">
        <template slot-scope="scope">
          <el-button :type="scope.row.bsaStatus===0?'success':'info'" plain class="xsbtn">{{scope.row.bsaStatus!== 0?'已使用':'未使用'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="" width="120" align="center">
        <template slot-scope="scope">
          <el-button v-if="permissions.indexOf('8q')>-1&&scope.row.bsaStatus<10"  @click.native.prevent="split(scope.row)" type="warning" class="xsbtn">拆分</el-button>
          <el-button v-if="permissions.indexOf('6r')>-1&&scope.row.bsaStatus===0" @click.native.prevent="goBack(scope.row)" type="danger" class="xsbtn">退回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" @updateList="updateFlowList"></page>

    <!-- 拆账弹窗 -->
    <el-dialog :modal-append-to-body="false" :visible.sync="splitDialog" title="拆账" width="500px">
      <el-form :model="splitForm" label-position="left" label-width="140px" class="weight-label">
        <el-form-item label="总金额 :">
          <span>{{splitForm.totalMoney | currency1}}</span>
        </el-form-item>
        <el-form-item label="已拆账金额 :">
          <span>{{splitedMoney | currency1}}</span>
        </el-form-item>
        <el-form-item label="剩余可拆账金额 :">
          <span>{{restMoney | currency1}}</span>
        </el-form-item>
        <div :key="index" class="mt10px" v-for="(item,index) in splitForm.splitItem">
          <el-input class="contact-phone" v-model="item.money"></el-input>
          <el-button
            :icon="index===0?'fa fa-plus':'fa fa-minus'"
            :type="index===0?'success':'danger'"
            @click.native.prevent="addContact(index)"
            circle
            class="circle-btn"
            size="mini"
          ></el-button>
        </div>
        <div class="text-center mt10px">
          <el-button @click.native.prevent="clearSplit" type="warning">清除</el-button>
          <el-button @click.native.prevent="confirmSplit" type="primary">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
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
      sendParams: {},

      splitDialog: false,
      splitForm: {
        totalMoney: 0,
        splitItem: [{ money: 0 }]
      }
    }
  },
  computed: {
    // 已拆账金额
    splitedMoney() {
      let sum = 0
      this.splitForm.splitItem.forEach(val => {
        sum += parseFloat(val.money || 0)
      })
      return sum
    },
    // 剩余可拆账金额
    restMoney() {
      return (
        parseFloat(this.splitForm.totalMoney) - parseFloat(this.splitedMoney)
      )
    }
  },
  methods: {
    split(data) {
      this.rowData = data
      this.splitForm.totalMoney = data.split_amount
      this.splitDialog = true
    },
    addContact(index) {
      if (index === 0) {
        this.splitForm.splitItem.push({
          money: 0
        })
      } else {
        this.splitForm.splitItem.splice(index, 1)
      }
    },
    confirmSplit() {
      let hasZero = this.splitForm.splitItem.some(val => {
        return val.money == 0 // eslint-disable-line
      })
      if (hasZero) {
        this.$message({
          type: 'warning',
          message: '拆账金额不能为0！'
        })
        return
      }
      if (this.restMoney !== 0) {
        this.$message({
          type: 'warning',
          message: '拆账金额不符，请重新拆账'
        })
        return
      }
      let arr = []
      this.splitForm.splitItem.forEach(val => {
        arr.push(val.money)
      })
      let params = {
        brId: this.rowData.id,
        moneyArr: arr
      }
      this.$post('/receipt.do?bankReceiveChai', params).then(res => {
        if (res.data.data) {
          this.$message({
            type: 'success',
            message: '拆账成功'
          })
        }
        this.splitDialog = false
        this.search()
      })
    },
    clearSplit() {
      this.splitForm.splitItem = [{ money: 0 }]
    },
    exportFlow () {
      this.$export('/receipt.do?exportBankReceiveMine', this.sendParams)
    },
    goBack (data) {
      this.$confirm('确定要退回吗？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/receipt.do?receiptClaimBack', {
            brcId: data.id
          }).then(res => {
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
        })
        .catch(() => {
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
      width: 310px;
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

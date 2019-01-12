<template>
  <div class="invoice-check component-container media-padding">
    <div>
      <div class="cus-status">
        <el-radio-group @change="search" v-model="checkStep" class="cus-status-radio">
          <el-radio-button :label="100">待审核</el-radio-button>
          <el-radio-button :label="300">已审核</el-radio-button>
          <el-radio-button :label="3000">全部</el-radio-button>
        </el-radio-group>
        <div class="throw-order">
          <el-button @click.native="check('1','mutil')" type="success">批量通过</el-button>
          <el-button @click.native="check('-1','mutil')" type="danger">批量退回</el-button>
        </div>
      </div>
      <div class="search-cus">
        <el-input placeholder="搜索公司名称" v-model="comName" class="cus-item item-width">
          <template slot="prepend">公司名称:</template>
        </el-input>
        <div class="cus-item">
          <el-button @click.native="search" type="primary">查 询</el-button>
          <el-button @click.native="reset" type="warning">重 置</el-button>
        </div>
      </div>

      <!-- 列表 -->
      <el-table @selection-change="handleSelectionChange" stripe border :data="makeInvoiceList" max-height="550" style="width: 100%;">
        <el-table-column fixed type="selection" width="45">
        </el-table-column>
        <el-table-column prop="" label="审核" min-width="90">
          <template slot-scope="scope">
            <span v-show="scope.row.is_advance==20">提前开发票</span>
            <span v-show="scope.row.companyname!=scope.row.comName">A开B</span>
            <span v-show="scope.row.invoicestatus==10">发票冲红</span>
            <span v-show="scope.row.invoicestatus==1">发票收回</span>
          </template>
        </el-table-column>
        <el-table-column prop="fullname" label="申请人部门" width="100">
        </el-table-column>
        <el-table-column prop="applyusername" label="申请人" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.applyusername}}</span>
            <span>{{scope.row.true_name != scope.row.applyusername?'('+scope.row.true_name+')':''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tnumber" label="单据号码" width="110">
        </el-table-column>
        <el-table-column prop="companyname" label="购方名称(发票公司名)" min-width="150">
        </el-table-column>
        <el-table-column prop="comName" label="保A公司名" min-width="150">
        </el-table-column>
        <el-table-column prop="chargetype" label="货物名称" width="100">
          <span slot-scope="scope">{{scope.row.chargetype+'' | invoiceState('invoiceMoneyType')}}</span>
        </el-table-column>
        <el-table-column prop="tmoney" label="总金额" width="120">
          <span slot-scope="scope">{{scope.row.tmoney | currency}}</span>
        </el-table-column>
        <el-table-column prop="inserttime" label="申请时间" width="150">
          <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="ttype" label="发票类型" width="80">
          <span slot-scope="scope">{{scope.row.ttype | invoiceState('invoiceKind')}}</span>
        </el-table-column>
        <el-table-column prop="ttype" label="状态" width="110">
          <template slot-scope="scope">
            <el-button plain class="xsbtn" :class="{'el-button--success':scope.row.step==300,'el-button--warning':scope.row.step<300&&scope.row.step>0,'el-button--danger':scope.row.step==0}">{{scope.row.stepName+''+scope.row.step}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="65">
          <template slot-scope="scope">
            <el-button @click.native.prevent="view(scope.row)" type="success" class="xsbtn">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page class="page" :url="makeInvoiceUrl" :sendParams="sendParams" @updateList="updateMakeInvoiceList"></page>
    </div>

    <!-- 发票信息弹窗 -->
    <el-dialog :key="key_invoice_dialog" title="发票信息" :visible.sync="invoiceDialog" width="850px">
      <invoice-info-dialog :form="form" :invoiceLogs="invoiceLogs">
        <div slot="invoiceCheck">
          <div class="title">
            <el-button class="title-btn" type="warning">审核处理</el-button>
            <div class="line"></div>
          </div>
          <div>
            <el-input type="textarea" :rows="3" placeholder="请填写退回理由"></el-input>
          </div>
          <div class="text-center mt10px">
            <el-button type="success" @click.native="check('1', 'single')">通过</el-button>
            <el-button type="danger" @click.native="check('-1', 'single')">退回</el-button>
          </div>
        </div>
      </invoice-info-dialog>
    </el-dialog>
  </div>
</template>

<script>
import InvoiceInfoDialog from 'components/invoiceManage/invoiceList/invoiceInfoDialog'
// import cookie from 'js-cookie'
import Page from '@/base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectUser from 'base/selectUser/selectUser'
export default {
  data () {
    return {
      checkStep: 100,
      comName: '',
      sendParams: {
        'step': 100
      },
      makeInvoiceUrl: '/Invoice.do?checkinvoicelist',
      makeInvoiceList: [],
      multipleSelection: [],
      rowData: {}, // 一行的数据

      invoiceDialog: false,
      form: {},
      invoiceLogs: [],
      key_invoice_dialog: '100'
    }
  },
  methods: {
    check (num, type) {
      let arr = []
      if (type === 'mutil') {
        if (!this.multipleSelection.length) {
          this.$message.warning('请进行勾选！')
          return
        }
        this.multipleSelection.forEach(val => {
          arr.push({
            id: val.id,
            step: val.step
          })
        })
      } else if (type === 'single') {
        arr = [{
          id: this.rowData.id,
          step: this.rowData.step,
          remark: ''
        }]
      }
      let params = {
        yn: num,
        idstep: arr
      }
      this.$confirm('确定' + (num === '1' ? '通过' : '退回') + '吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/Invoice.do?checkinvoice', params).then(res => {
            if (res.data.success) {
              let msg = num === '1' ? '已通过！' : '已退回！'
              this.$message.success(msg)
              this.invoiceDialog = false
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
    search () {
      this.sendParams = {
        step: this.checkStep,
        companyname: this.comName
      }
    },
    reset () {
      this.comName = ''
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 查看
    view (data) {
      this.rowData = data
      this.key_invoice_dialog = new Date() + '100'
      this.$get('/Invoice.do?invoicebyid', { invoiceid: data.id }).then(
        res => {
          if (res.data[0].success) {
            this.form = res.data[0].data[0]
            this.invoiceLogs = res.data[1].data
            setTimeout(() => {
              this.invoiceDialog = true
            }, 100)
          }
        }
      )
    },
    updateMakeInvoiceList (data) {
      this.makeInvoiceList = data.data[0].data
    }
  },
  components: {
    Page,
    AutoSelect,
    SelectUser,
    InvoiceInfoDialog
  }
}
</script>

<style scoped lang="less">
.invoice-check {
  position: relative;
  .cus-status {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: -10px;
    .cus-status-radio {
      margin-top: 10px;
    }
    .throw-order {
      margin: 10px 30px 0 0;
    }
  }
  .my-list {
    margin-top: 15px;
    .my-list-col {
      position: relative;
    }
  }
  .cus-status {
    padding-left: 10px;
  }
  .search-cus {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .cus-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 280px;
    }
  }
  .follow-btns {
    text-align: right;
  }
}
</style>

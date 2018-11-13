<template>
  <div class="cus-list component-container media-padding">
    <div class="allot-search">
      <el-input placeholder="搜索客户名称" v-model="cus_name" class="list-item item-width">
        <template slot="prepend">公司名称:</template>
      </el-input>
      <el-input placeholder="搜索百度账号" v-model="bdAccount" class="list-item item-width">
        <template slot="prepend">百度账号:</template>
      </el-input>
      <el-input placeholder="提单人" v-model="orderName" class="list-item item-width">
        <template slot="prepend">提单人:</template>
      </el-input>
      <auto-select :key="key_add_type" v-model="addType" title="加款类型" class="list-item item-width">
        <el-option value="" label="全部"></el-option>
        <el-option value="10" label="正常加款"></el-option>
        <el-option value="20" label="提前加款"></el-option>
        <el-option value="30" label="返款加款"></el-option>
      </auto-select>
      <auto-select :key="key_renew_status" v-model="renewStatus" title="续费状态" class="list-item item-width">
        <el-option value="" label="全部"></el-option>
        <el-option v-for="(item,index) in renewStatusList" :key="index" :value="item.code_val" :label="item.code_desc"></el-option>
      </auto-select>
      <el-button class="list-item" @click.native="search" type="primary">查 询</el-button>
      <el-button class="list-item" @click.native="reset" type="warning">重 置</el-button>
      <div class="list-item export">
        <el-button @click.native="changeUser" type="warning">更换责任人</el-button>
        <el-button @click.native="aheadMakeInvoice" type="primary">提前开票</el-button>
      </div>
    </div>

    <el-table @selection-change="handleSelectionChange" stripe border :data="list" max-height="550" class="table-width">
      <el-table-column type="selection" fixed width="45">
      </el-table-column>
      <el-table-column prop="companyname" label="公司名称" min-width="120">
      </el-table-column>
      <el-table-column prop="baidu_account" label="百度账号">
      </el-table-column>
      <el-table-column prop="" label="到账金额" width="110">
        <span slot-scope="scope">{{scope.row.receiptmoney | currency1}}</span>
      </el-table-column>
      <el-table-column prop="" label="提单金额" width="110">
        <span slot-scope="scope">{{scope.row.usemoney+scope.row.servicemoney+scope.row.usevoucher | currency1}}</span>
      </el-table-column>
      <el-table-column prop="" label="申请时间" width="90">
        <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="" label="提单人">
        <span slot-scope="scope">{{scope.row.username+((scope.row.true_name && scope.row.true_name!=scope.row.username)?('('+scope.row.true_name+')'):'')}}</span>
      </el-table-column>
      <el-table-column prop="" label="加款类型">
        <span slot-scope="scope">{{scope.row.addtype==10?'正常加款':scope.row.addtype==20?'提前加款':'返款加款'}}</span>
      </el-table-column>
      <el-table-column prop="" label="审核状态" width="120">
        <template slot-scope="scope">
          <el-button plain type="warning" class="xsbtn">{{scope.row.step >= 100 && scope.row.checkName ? (scope.row.checkBindName?(scope.row.checkBindName): ((scope.row.checkTrueName && scope.row.checkTrueName!=scope.row.checkName)?(scope.row.checkTrueName):scope.row.checkName)) : scope.row.code_desc}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="190">
        <template slot-scope="scope">
          <el-button @click.native="view(scope.row)" type="success" class="xsbtn">查看</el-button>
          <el-button v-if=" ( (scope.row.invoice=='0' || scope.row.invoice=='10' || (scope.row.invoice=='-1' && scope.row.invoiceCha =='1') ) && scope.row.receiptmoney > 0 && scope.row.invoiceTmoney < scope.row.receiptmoney)" @click.native="applyInvoice(scope.row)" type="primary" class="xsbtn">申请发票</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" @updateList="getList"></page>

    <!-- 人员选择弹窗 -->
    <el-dialog :modal-append-to-body="false" title="人员选择" :visible.sync="selUserDialog" width="550px">
      <select-user @userId="getUserId" @closeDialog="closeUserDialog"></select-user>
    </el-dialog>

    <!-- 确定选择弹窗 -->
    <el-dialog :title="'确定更换为：'+ selUserName + ' ?'" :visible.sync="confirmUserDialog" width="550px">
      <el-input v-model="remark" type="textarea" :rows="3"></el-input>
      <div class="text-center mt10px">
        <el-button type="primary" @click.native="confirmSel">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 开票弹窗 -->
    <el-dialog :modal-append-to-body="false" :title="makeInvoiceTitle" :visible.sync="makeInvoiceDialog" width="750px">
      <make-invoice-dialog @closeDialog="makeInvoiceDialog=false" :key="key_dialog" :echoData="echoData" :makeInvoiceStatus="makeInvoiceStatus">
        <el-button v-if="makeInvoiceStatus==20" slot="selBtn" @click.native="selCompanyDialog = true" type="primary">选择</el-button>
      </make-invoice-dialog>
    </el-dialog>
    <!-- 选择公司弹窗 -->
    <el-dialog title="选择公司" :visible.sync="selCompanyDialog" width="650px">
      <el-input placeholder="请输入公司名进行搜索" v-model="handleCompanyName">
        <el-button @click.native="searchCompany" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-table :data="myCompany" class="table-width" max-height="500">
        <el-table-column prop="companyname" label="公司名称" min-width="130"></el-table-column>
        <el-table-column prop="producttype" label="客户类型" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.producttype | cusStatus}}</span>
            <span>{{scope.row.producttype!=0?scope.row.productnumber:''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="baidu_account" label="百度账号" width="100">
        </el-table-column>
        <el-table-column prop="logUname" label="所属商务" width="80"></el-table-column>
        <el-table-column prop="kefuName" label="所属客服" width="80"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button @click.native="handleSelCompany(scope.row)" type="primary" class="xsbtn">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="comUrl" :sendParams="comParams" @updateList="updateMyCompanyList"></page>
    </el-dialog>
    <!-- 查看弹窗 -->
    <el-dialog :modal-append-to-body="false" title="续费详情" :visible.sync="renewDetailDialog" width="950px">
      <div class="title">
        <el-button class="title-btn" type="warning">续费信息</el-button>
        <div class="line"></div>
      </div>
      <el-form :model="baseInfo" label-width="80px">
        <el-row>
          <el-col :md="9">
            <el-form-item label="公司名称 :">
              <div>{{baseInfo.companyname}}</div>
            </el-form-item>
          </el-col>
          <el-col :md="5" class="maxwidth">
            <el-form-item label="续费类型 :">
              <div>{{baseInfo.addtype}}</div>
            </el-form-item>
          </el-col>
          <el-col :md="5" class="maxwidth">
            <el-form-item label="续费次数 :">
              <div>{{baseInfo.addcount}}</div>
            </el-form-item>
          </el-col>
          <el-col :md="5" class="maxwidth">
            <el-form-item label="百度账号 :">
              <div>{{baseInfo.baidu_account}}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectUser from 'base/selectUser/selectUser'
import MakeInvoiceDialog from './makeInvoiceDialog'
import { getByCode } from 'api/getOptions'
export default {
  data () {
    return {
      userId: cookie.get('userId'),
      permissions: cookie.getJSON('permissions'),
      cus_name: '',
      bdAccount: '',
      orderName: '',
      addType: '',
      renewStatus: '',
      key_add_type: '',
      key_renew_status: '1',
      renewStatusList: '',

      list: [],
      url: '/Renew.do?renewapplylist',
      sendParams: {},

      multipleSelection: [],
      selUserDialog: false,
      selUserId: '',
      selUserName: '',
      confirmUserDialog: false,
      remark: '',

      makeInvoiceDialog: false,
      key_dialog: '',
      makeInvoiceTitle: '',
      echoData: [],
      makeInvoiceStatus: 0, // 提前开票，申请发票
      rowData: {},

      selCompanyDialog: false,
      handleCompanyName: '',
      myCompany: [],
      comUrl: '/Project.do?kind',
      comParams: {
        type: '20',
        orderOrRenew: 'renew',
        companyname: ''
      },

      renewDetailDialog: false,
      baseInfo: {},
      moneyDetail: []
    }
  },
  created () {
    getByCode(54).then(res => {
      this.renewStatusList = res.data.data
    })
  },
  methods: {
    view (data) {
      this.$get('/Renew.do?renewdetail', { reid: data.id }).then(res => {
        this.baseInfo = res.data[0].data
        this.moneyDetail = res.data[1].data
        this.renewDetailDialog = true
      })
    },
    // 申请发票
    applyInvoice (data) {
      this.key_dialog = new Date() + ''
      this._getInvoiceData(data, data.id)
      this.makeInvoiceTitle = '申请发票'
      this.makeInvoiceStatus = 10
      setTimeout(() => {
        this.makeInvoiceDialog = true
      }, 100)
    },
    // 提前开票
    aheadMakeInvoice () {
      this.key_dialog = new Date() + ''
      this.makeInvoiceTitle = '提前发票'
      this.makeInvoiceStatus = 20
      setTimeout(() => {
        this.makeInvoiceDialog = true
      }, 200)
    },
    // 选择公司
    searchCompany () {
      this.comParams = {
        type: '20',
        orderOrRenew: 'renew',
        companyname: this.handleCompanyName
      }
    },
    handleSelCompany (data) {
      this._getInvoiceData(data)
      this.selCompanyDialog = false
    },
    _getInvoiceData (data, reid = null) {
      let params = {
        reid: reid,
        companylogid: data.companylogid
      }
      this.$post('/Invoice.do?getInvoiceInfo', params).then(res => {
        if (res.data.success) {
          this.echoData = res.data.data[0]
          let proArr = res.data.data[1]
          this.echoData[0].proArr = proArr
          if (!this.echoData[0].companyname) {
            this.echoData[0].companyname = this.echoData[0].comName
          }
        }
      })
    },
    updateMyCompanyList (res) {
      this.myCompany = res.data[0].data
    },
    // 更换责任人
    changeUser () {
      if (!this.multipleSelection.length) {
        this.$message({
          type: 'error',
          message: '请勾选客户'
        })
        return
      }
      this.selUserDialog = true
    },
    getUserId (id, name) {
      this.selUserId = id
      this.selUserName = name
    },
    closeUserDialog () {
      this.selUserDialog = false
      setTimeout(() => {
        this.confirmUserDialog = true
      }, 300)
    },
    confirmSel () {
      if (!this.remark) {
        this.$message({
          type: 'error',
          message: '请填写备注'
        })
        return
      }
      let params = {
        renewArr: this.multipleSelection,
        sendeeUid: this.selUserId,
        sendeeUname: this.selUserName,
        remark: this.remark
      }
      this.$post('/Renew.do?renewReplace', params).then(res => {
        if (res.data.success) {
          this.confirmUserDialog = false
          this.search()
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    search () {
      this.sendParams = {
        addtype: this.addType,
        step: this.renewStatus,
        baiduAccount: this.bdAccount,
        userName: this.orderName,
        companyName: this.cus_name
      }
    },
    reset () {
      this.addType = ''
      this.renewStatus = ''
      this.bdAccount = ''
      this.orderName = ''
      this.cus_name = ''
      this.key_add_type = new Date() + ''
      this.key_renew_status = new Date() + '1'
    },
    // todo
    cusOut () {},
    getList (res) {
      this.list = res.data[0].data
    }
  },
  components: {
    Page,
    AutoSelect,
    SelectUser,
    MakeInvoiceDialog
  }
}
</script>

<style lang="less" scoped>
.cus-list {
  .allot-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .list-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 280px;
    }
  }
}
</style>

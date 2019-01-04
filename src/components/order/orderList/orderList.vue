<template>
  <div class="order-list component-container media-padding">
    <el-tabs v-model="orderKind" type="card" @tab-click="search()">
      <el-tab-pane label="全部订单" name="500"></el-tab-pane>
      <el-tab-pane label="已处理订单" name="300">
        <el-radio-group v-model="tabStatus" @change="search()" class="mb10px ml10px">
          <el-radio-button label="0">全部</el-radio-button>
          <el-radio-button label="20">已通过</el-radio-button>
          <el-radio-button label="10">已驳回</el-radio-button>
        </el-radio-group>
      </el-tab-pane>
    </el-tabs>
    <div class="processed-content">
      <!-- 搜索 -->
      <div class="processed-search">
        <el-input placeholder="搜索客户名称" v-model="cusName" class="search-item item-width">
          <template slot="prepend">客户名称:</template>
        </el-input>
        <el-input placeholder="搜索订单编号" v-model="orderNumber" class="search-item item-width">
          <template slot="prepend">订单编号:</template>
        </el-input>
        <auto-select :key="key_pro_type" title="产品类型" v-model="productType" class="search-item item-width">
          <el-option v-for="item in productList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </auto-select>
        <el-input placeholder="搜索百度账号" v-model="bdAccount" class="search-item item-width">
          <template slot="prepend">百度账号:</template>
        </el-input>
        <el-input placeholder="搜索百度ID" v-model="bd_id" class="search-item item-width">
          <template slot="prepend">百度 ID:&nbsp;&nbsp;</template>
        </el-input>
        <auto-select :key="key_check_state" title="审核状态" v-model="checkState" class="search-item item-width">
          <el-option v-for="item in checkStateList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </auto-select>
        <el-input v-model="dept" class="search-item item-width">
          <template slot="prepend">提交部门:</template>
        </el-input>
        <el-input v-model="web" class="search-item item-width">
          <template slot="prepend">网址:</template>
        </el-input>
        <el-input v-model="phone" class="search-item item-width">
          <template slot="prepend">客户电话:</template>
        </el-input>
        <auto-select
          v-if="permissions.indexOf('4d')>-1"
          :key="key_achievement"
          title="选择业绩"
          v-model="achievement"
          class="search-item item-width"
        >
          <el-option v-for="item in achievements" :key="item.value" :label="item.label" :value="item.opentime"></el-option>
        </auto-select>
        <el-date-picker
          v-model="orderSubDate"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          type="datetimerange"
          range-separator="至"
          start-placeholder="订单提交时间"
          end-placeholder="订单提交时间"
          class="search-item item-width"
          :unlink-panels="true"
        ></el-date-picker>
        <el-date-picker
          v-model="addDate"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          type="datetimerange"
          range-separator="至"
          start-placeholder="加款时间"
          end-placeholder="加款时间"
          class="search-item item-width"
          :unlink-panels="true"
        ></el-date-picker>
        <div class="search-item">
          <el-button type="primary" @click.native="search">查询</el-button>
          <el-button type="warning" @click.native="reset">重置</el-button>
        </div>
        <div v-if="permissions.indexOf('6f')>-1" class="search-item export">
          <el-button @click.native="aheadMakeInvoice" type="primary">提前开票</el-button>
        </div>
      </div>
      <!-- 列表 -->
      <el-table
        size="mini"
        v-if="permissions.indexOf('5q')<0&&permissions.indexOf('6n')<0"
        border
        :data="orderListData"
        class="table-width"
        max-height="550"
      >
        <el-table-column prop="ordernum" label="订单ID" min-width="180"></el-table-column>
        <el-table-column prop="cname" label="订单名称" min-width="150"></el-table-column>
        <el-table-column prop label="提交时间" width="100">
          <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="username" label="下单人" min-width="80"></el-table-column>
        <el-table-column prop label="类型" width="95">
          <template slot-scope="scope">
            <span v-if="scope.row.pid=='WEBSITE' && scope.row.websitetype==20">WAP</span>
            <span v-if="scope.row.pid=='WEBSITE' && scope.row.websitetype!=20">PC/WAP</span>
            <span v-if="scope.row.pid!='WEBSITE'">{{scope.row.pname}}</span>
          </template>
        </el-table-column>
        <template v-if="permissions.indexOf('78') > -1">
          <el-table-column prop label="订单金额" width="110">
            <span slot-scope="scope">{{scope.row.amount_real | currency}}</span>
          </el-table-column>
          <el-table-column prop label="提单时间" width="100">
            <span slot-scope="scope">{{scope.row.bill_time | timeFormat}}</span>
          </el-table-column>
          <el-table-column prop label="业绩新开时间" width="100">
            <span slot-scope="scope">{{scope.row.opentime | timeFormat1}}</span>
          </el-table-column>
          <el-table-column prop label="业绩上线时间" width="100">
            <span slot-scope="scope">{{scope.row.onlinetime | timeFormat1}}</span>
          </el-table-column>
          <el-table-column prop="commision_num" label="提成单量" width="110"></el-table-column>
          <el-table-column prop label="提成合计" width="110">
            <span slot-scope="scope">{{scope.row.commision_count | currency}}</span>
          </el-table-column>
          <el-table-column prop label="发放日期" width="90">
            <span slot-scope="scope">{{scope.row.granttime | timeFormat1}}</span>
          </el-table-column>
        </template>
        <el-table-column prop label="审核状态" min-width="150">
          <span slot-scope="scope" class="check-status">
            <el-alert
              title
              type="warning"
              :closable="false"
              :description="(scope.row.currentname?scope.row.currentname:'订单完成')+
                    ((scope.row.checkBindName == '' && scope.row.ckName && scope.row.ckName != scope.row.currentname)?'('+scope.row.ckName+')':'')+
                    ((scope.row.checkBindName && scope.row.checkBindName != scope.row.currentname)?'('+scope.row.checkBindName+')':'')"
            ></el-alert>
            <!-- {{scope.row.currentname?scope.row.currentname:'订单完成'}}
              {{(scope.row.checkBindName == '' && scope.row.ckName && scope.row.ckName != scope.row.currentname)?'('+scope.row.ckName+')':''}}
            {{(scope.row.checkBindName && scope.row.checkBindName != scope.row.currentname)?'('+scope.row.checkBindName+')':''}}-->
          </span>
        </el-table-column>
        <el-table-column prop label="订单状态" width="120">
          <span slot-scope="scope">{{scope.row.audittype === 0 ? "仅降E":"降E并提单"}}</span>
        </el-table-column>
        <el-table-column prop label="最后操作时间" width="100">
          <span slot-scope="scope">{{scope.row.opt_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="deptname" label="商务大区部门" min-width="110"></el-table-column>
        <el-table-column prop label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-dropdown trigger="hover">
              <el-button type="primary" class="xsbtn">
                操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="text-center">
                <el-dropdown-item>
                  <el-button type="success" @click.native="viewOrder(scope.row)" class="xsbtn">查看</el-button>
                </el-dropdown-item>
                <template v-if="orderKind==500">
                  <el-dropdown-item
                    divided
                    v-if="(scope.row.invoice_type===0 ||scope.row.invoiceTmoney<scope.row.amount_real)&&permissions.indexOf('6g') > -1"
                  >
                    <el-button @click.native="applyInvoice(scope.row)" type="primary" class="xsbtn">申请发票</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item divided v-if="permissions.indexOf('6o') > -1">
                    <el-button @click.native="onlineStop(scope.row)" type="danger" class="xsbtn">线上终止</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item divided v-if="permissions.indexOf('6o') > -1">
                    <el-button @click.native="changeFlow(scope.row)" type="primary" class="xsbtn">变更流水</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item divided v-if="permissions.indexOf('6d') > -1">
                    <router-link
                      target="_blank"
                      :to="{path:`orderList/print/${scope.row.cpid}`,query: scope.row}"
                      class="printbtn xsbtn"
                    >打印</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item divided v-if="permissions.indexOf('83') > -1">
                    <el-button @click.native="changeShangWu(scope.row)" type="warning" class="xsbtn">更换商务</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item
                    divided
                    v-if="scope.row.hasinvoice && scope.row.hasinvoice >= 10 && permissions.indexOf('7d')>-1"
                  >
                    <el-button @click.native="applyInvoice(scope.row)" type="primary" class="xsbtn">发票开错冲红</el-button>
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <!-- 转户出纳列表 -->
      <el-table v-if="permissions.indexOf('5q') > -1" :data="orderListData" border stripe class="table-width" max-height="550">
        <el-table-column prop label="加款时间" min-width="100">
          <span slot-scope="scope">{{scope.row.addMoneyTime | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="cname" label="订单名称" min-width="150"></el-table-column>
        <el-table-column prop label="客户类型" min-width="90">
          <span slot-scope="scope">{{scope.row.producttype | cusState('cusType')}}{{scope.row.productnumber}}</span>
        </el-table-column>
        <el-table-column prop="pname" label="类型" min-width="80"></el-table-column>
        <el-table-column prop="username" label="商务" min-width="80"></el-table-column>
        <el-table-column prop="baiducount" label="用户名" min-width="80"></el-table-column>
        <el-table-column prop="baiduid" label="ID" min-width="80"></el-table-column>
        <el-table-column prop="proxyid" label="代理账号" min-width="80"></el-table-column>
        <el-table-column prop label="金额" min-width="100">
          <span slot-scope="scope">{{scope.row.amount_real || 0 | currency}}</span>
        </el-table-column>
        <el-table-column prop label="状态" min-width="140">
          <template slot-scope="scope">
            <el-button type="warning" plain class="xsbtn">{{scope.row.currentname?scope.row.currentname:'订单完成'}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop label="操作" min-width="80">
          <template slot-scope="scope">
            <template v-if="orderKind==500">
              <el-button type="success" @click.native="accountOutPass(scope.row)" class="xsbtn">通过</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <!-- 客服看到的列表 -->
      <el-table v-if="permissions.indexOf('6n') > -1" :data="orderListData" border stripe class="table-width" max-height="550">
        <el-table-column prop="ordernum" label="订单ID" min-width="150"></el-table-column>
        <el-table-column prop="cname" label="订单名称" min-width="150"></el-table-column>
        <el-table-column prop="baiducount" label="用户名" width="90"></el-table-column>
        <el-table-column prop="kefu" label="维护客服" min-width="80"></el-table-column>
        <el-table-column prop="webName" label="网站维护人员" width="105"></el-table-column>
        <el-table-column prop label="提交时间" min-width="100">
          <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="username" label="下单人" min-width="80"></el-table-column>
        <el-table-column prop label="类型" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.pid=='WEBSITE' && scope.row.websitetype==20">WAP</span>
            <span v-if="scope.row.pid=='WEBSITE' && scope.row.websitetype!=20">PC/WAP</span>
            <span v-if="scope.row.pid!='WEBSITE'">{{scope.row.pname}}</span>
          </template>
        </el-table-column>
        <el-table-column prop label="审核状态" min-width="80">
          <template slot-scope="scope">
            <el-button type="warning" plain class="xsbtn">{{scope.row.currentname?scope.row.currentname:'订单完成'}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop label="订单状态" width="90">
          <span slot-scope="scope">{{scope.row.audittype == 0 ? "仅降E":"降E并提单"}}</span>
        </el-table-column>
        <el-table-column prop="username" label="最后操作时间" width="150">
          <span slot-scope="scope">{{scope.row.opt_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="deptname" label="商务大区部门" width="105"></el-table-column>
        <el-table-column prop label="操作" min-width="148" align="center">
          <template slot-scope="scope">
            <el-button type="success" @click.native="viewOrder(scope.row)" class="xsbtn">查看</el-button>
            <template v-if="orderKind==500">
              <el-button
                v-if="scope.row.invoice==0&&permissions.indexOf('6g') > -1"
                @click.native="applyInvoice(scope.row)"
                type="primary"
                class="xsbtn"
              >申请发票</el-button>
              <el-button
                v-if="scope.row.hasinvoice && scope.row.hasinvoice >= 10 && permissions.indexOf('7d')>-1"
                @click.native="applyInvoice(scope.row)"
                type="primary"
                class="xsbtn"
              >发票开错冲红</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <page class="page" :url="orderListUrl" :sendParams="sendParams" @updateList="updateOrderListData" :key="key"></page>
    </div>
    <router-view></router-view>

    <!-- 开票弹窗 -->
    <el-dialog :modal-append-to-body="false" :title="makeInvoiceTitle" :visible.sync="makeInvoiceDialog" width="900px">
      <make-invoice-dialog
        @closeDialog="makeInvoiceDialog=false"
        :key="key_dialog"
        :echoData="echoData"
        :mark="'order'"
        :rowData="rowData"
        :makeInvoiceStatus="makeInvoiceStatus"
        :offset="offset"
      >
        <el-button v-if="makeInvoiceStatus==20" slot="selBtn" @click.native="selCompanyDialog = true" type="primary">选择</el-button>
      </make-invoice-dialog>
    </el-dialog>

    <!-- 选择公司弹窗 -->
    <el-dialog title="选择公司" :visible.sync="selCompanyDialog" width="750px">
      <el-input placeholder="请输入公司名进行搜索" v-model="handleCompanyName" @keyup.enter.native="searchCompany($event, 'enter')">
        <el-button @click.native="searchCompany($event)" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-table :data="myCompany" class="table-width" max-height="500">
        <el-table-column prop="companyname" label="公司名称" min-width="130"></el-table-column>
        <el-table-column prop="producttype" label="客户类型" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.producttype | cusStatus}}</span>
            <span>{{scope.row.producttype!=0?scope.row.productnumber:''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="baidu_account" label="百度账号" width="100"></el-table-column>
        <el-table-column prop="logUname" label="所属商务" width="80"></el-table-column>
        <el-table-column prop="kefuName" label="所属客服" width="80"></el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <el-button @click.native="handleSelCompany(scope.row)" type="primary" class="xsbtn">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page
        :simpleLayout="'total, prev, next, jumper'"
        class="page"
        :url="comUrl"
        :sendParams="comParams"
        @updateList="updateMyCompanyList"
      ></page>
    </el-dialog>

    <!-- 终止弹窗 -->
    <el-dialog :modal-append-to-body="false" title="终止" :visible.sync="stopDialog" width="400px">
      <el-input type="textarea" :rows="3" v-model="endRemark" placeholder="备注"></el-input>
      <div class="text-center mt10px">
        <el-button type="danger" @click.native="confirmStop">确认</el-button>
      </div>
    </el-dialog>

    <!-- 人员选择弹窗 -->
    <el-dialog :modal-append-to-body="false" title="人员选择" :visible.sync="selUserDialog" width="550px">
      <select-user @userId="getUserId" @closeDialog="closeUserDialog"></select-user>
    </el-dialog>
  </div>
</template>

<script>
import MakeInvoiceDialog from 'components/makeInvoice/makeInvoiceDialog'
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import cookie from 'js-cookie'
import SelectUser from 'base/selectUser/selectUser'
export default {
  data() {
    return {
      permissions: cookie.getJSON('permissions'),
      orderKind: '500',
      tabStatus: '0',
      key: '',
      cusName: '',
      orderNumber: '',
      productType: '',
      key_pro_type: '1',
      productList: [],
      bdAccount: '',
      bd_id: '',
      checkState: '',
      key_check_state: '2',
      checkStateList: [],
      dept: '',
      web: '',
      orderSubDate: [],
      addDate: [],
      phone: '',
      orderStatus: '',
      achievement: '',
      key_achievement: '3',
      // todo
      achievements: [
        {
          opentime: '-1',
          label: '全部'
        },
        {
          opentime: 'yes',
          label: '已记新开业绩'
        },
        {
          opentime: 'yes',
          label: '已记上线业绩'
        },
        {
          opentime: 'no',
          label: '未记新开业绩'
        },
        {
          opentime: 'no',
          label: '未记上线业绩'
        },
        {
          opentime: 'yes',
          label: '已记业绩'
        },
        {
          opentime: 'no',
          label: '未记业绩'
        }
      ],
      orderListData: [],
      orderListUrl: '/Check.do?pendding',
      sendParams: {
        status: 500
      },

      makeInvoiceDialog: false,
      key_dialog: '',
      makeInvoiceTitle: '',
      echoData: [],
      makeInvoiceStatus: 10, // 20提前开票，10申请发票
      offset: 0,

      selCompanyDialog: false,
      handleCompanyName: '',
      myCompany: [],
      comUrl: '/Project.do?kind',
      comParams: {
        type: '20',
        orderOrRenew: 'order',
        companyname: ''
      },

      stopDialog: false,
      endRemark: '',
      rowData: {},

      selUserDialog: false,
      selUserId: '',
      selUserName: ''
    }
  },
  watch: {
    productType() {
      this._getCheckStateList()
    }
  },
  mounted() {
    this._getProductTypeList()
  },
  methods: {
    // 变更商务
    changeShangWu(data) {
      this.rowData = data
      this.selUserDialog = true
    },
    getUserId(id, name) {
      this.selUserId = id
      this.selUserName = name
    },
    closeUserDialog() {
      this.selUserDialog = false
      let params = {
        orderid: this.rowData.orderid,
        cpid: this.rowData.cpid,
        newUid: this.selUserId,
        newUname: this.selUserName
      }
      this.$post('/Check.do?orderReplace', params).then(res => {
        if (res.data.success) {
          this.search()
        }
      })
    },
    // 变更流水
    changeFlow(data) {
      let params = {
        curid: data.curid,
        orderid: data.orderid,
        cpid: data.cpid
      }
      this.$confirm('确定变更流水吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/wf.do?reduceReceive', params).then(res => {
            if (res.data.success) {
              this.$message.success('变更成功！')
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
    // 线上终止
    onlineStop(data) {
      this.stopDialog = true
      this.rowData = data
    },
    confirmStop() {
      let params = {
        cpid: this.rowData.cpid,
        remark: this.endRemark
      }
      this.$post('/Check.do?orderStop', params).then(res => {
        if (res.data.success) {
          this.stopDialog = false
        }
      })
    },
    // 申请发票
    applyInvoice(data) {
      this.rowData = data
      this.key_dialog = new Date() + ''
      this._getInvoiceData(data, data.id)
      this.makeInvoiceTitle = '申请发票'
      this.makeInvoiceStatus = 10
      this.offset = 0
      setTimeout(() => {
        this.makeInvoiceDialog = true
      }, 100)
    },
    // 提前开票
    aheadMakeInvoice() {
      this.rowData = {}
      this.key_dialog = new Date() + ''
      this.makeInvoiceTitle = '提前开票'
      this.makeInvoiceStatus = 20
      this.offset = 0
      setTimeout(() => {
        this.makeInvoiceDialog = true
      }, 200)
    },
    // 选择公司
    searchCompany(e, type) {
      if (type === 'enter' || e.target.nodeName !== 'INPUT') {
        this.comParams = {
          type: '20',
          orderOrRenew: 'order',
          companyname: this.handleCompanyName
        }
      }
    },
    handleSelCompany(data) {
      this._getInvoiceData(data)
      this.selCompanyDialog = false
    },
    updateMyCompanyList(res) {
      this.myCompany = res.data[0].data
    },
    _getInvoiceData(data) {
      let params = {
        oid: data.orderid,
        companylogid: data.companylogid
      }
      this.$post('/Invoice.do?getInvoiceInfo', params).then(res => {
        if (res.data.success) {
          this.echoData = res.data.data[0]
          let productMoneyList = res.data.data[1]
          this.echoData[0].productMoneyList = productMoneyList
          if (!this.echoData[0].companyname) {
            this.echoData[0].companyname = this.echoData[0].comName
          }
        }
      })
    },
    viewOrder(data) {
      data._mark = 'from_orderList'
      this.$router.push({
        path: `orderPending/view/${data.cpid}`,
        query: { data: data }
      })
    },
    _getProductTypeList() {
      this.$get('/Product.do?proget', { parentid: 1 }).then(res => {
        if (res.data.success) {
          this.productList = res.data.data
        }
      })
    },
    _getCheckStateList() {
      this.$get('/order.do?pidStep', { pid: this.productType }).then(res => {
        if (res.data.success) {
          this.checkStateList = res.data.data
        }
      })
    },
    search() {
      this.sendParams = {
        opttype: this.tabStatus,
        status: this.orderKind,
        companyname: this.cusName,
        orderid: this.orderNumber,
        pid: this.productType,
        baiducount: this.bdAccount,
        baiduid: this.bd_id,
        orgcode: this.dept,
        sn: this.checkState,
        concatnumber: this.phone,
        addStart: this.addDate[0],
        addEnd: this.addDate[1],
        orderStart: this.orderSubDate[0],
        orderEnd: this.orderSubDate[1]
      }
    },
    reset() {
      this.cusName = ''
      this.orderNumber = ''
      this.productType = ''
      this.key_pro_type = new Date() + '1'
      this.bdAccount = ''
      this.bd_id = ''
      this.dept = ''
      this.checkState = ''
      this.key_check_state = new Date() + '2'
      this.phone = ''
      this.addDate = []
      this.orderSubDate = []
      this.key_achievement = new Date() + '3'
    },
    updateOrderListData(res) {
      this.orderListData = res.data[0].data
    }
  },
  components: {
    Page,
    AutoSelect,
    MakeInvoiceDialog,
    SelectUser
  }
}
</script>

<style lang="less">
.order-list {
  .el-button span {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .el-alert {
    padding: 0;
  }
}
.el-dropdown-menu .printbtn {
    display: inline-block;
    padding: 5px 8px;
    font-size: 12px;
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
    line-height: 1;
    border-radius: 3px;
    border: 1px solid #dcdfe6;
    margin: 0 5px;
  }
</style>

<style lang="less" scoped>
.order-list {
  // position: relative;
  .processed-content {
    .tab {
      margin-left: 10px;
    }
    .processed-search {
      display: flex;
      flex-wrap: wrap;
      margin-top: -10px;
      .search-item {
        margin-left: 10px;
        margin-top: 10px;
      }
      .item-width {
        width: 250px;
      }
    }
    .check-status {
      color: #e6a23c;
    }
  }
}
</style>

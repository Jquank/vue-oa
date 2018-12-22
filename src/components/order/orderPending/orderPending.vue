<template>
  <div class="order-pending component-container media-padding">
    <div class="pending-content">
      <div v-if="permissions.indexOf('59') > -1" class="tab">
        <el-radio-group v-model="tabStatus" @change="tab">
          <el-radio-button label="0">全部</el-radio-button>
          <el-radio-button label="100">未加款</el-radio-button>
          <el-radio-button label="300">已加款</el-radio-button>
        </el-radio-group>
      </div>
      <!-- 搜索 -->
      <div class="pending-search">
        <el-input placeholder="搜索客户名称" v-model="cusName" class="search-item item-width">
          <template slot="prepend">客户名称:</template>
        </el-input>
        <el-input placeholder="搜索订单编号" v-model="orderNumber" class="search-item item-width">
          <template slot="prepend">订单编号:</template>
        </el-input>
        <auto-select :key="key_pro" title="产品类型" v-model="productType" class="search-item item-width">
          <el-option label="全部" value=""></el-option>
          <el-option label="百度推广" value="BAITUI"></el-option>
          <el-option label="网建" value="WEBSITE"></el-option>
          <el-option label="直通车" value="ZTC"></el-option>
          <el-option label="信息流" value="XXL"></el-option>
        </auto-select>
        <auto-select :key="key_order" title="订单状态" v-model="orderStatus" class="search-item item-width">
          <el-option label="全部" value=""></el-option>
          <el-option label="仅降E" value="0"></el-option>
          <el-option label="降E并提单" value="10"></el-option>
        </auto-select>
        <el-input placeholder="搜索百度账号" v-model="bd_account" class="search-item item-width">
          <template slot="prepend">百度账号:</template>
        </el-input>
        <el-input placeholder="搜索百度ID" v-model="bd_id" class="search-item item-width">
          <template slot="prepend">百度 ID:&nbsp;&nbsp;</template>
        </el-input>
        <auto-select v-if="permissions.indexOf('4d') > -1" :key="key_achievement" title="选择业绩" v-model="achievement" class="search-item item-width">
          <el-option v-for="item in achievements" :key="item.value" :label="item.label" :value="item.opentime"></el-option>
        </auto-select>
        <div class="search-item">
          <el-button type="primary" @click.native="search">查询</el-button>
          <el-button type="warning" @click.native="reset">重置</el-button>
        </div>
      </div>
      <!-- 列表 -->
      <el-table size="mini" v-if="permissions.indexOf('5q')<0&&permissions.indexOf('6n')<0" :data="pendingList" class="table-width" stripe border max-height="550">
        <el-table-column prop="ordernum" label="订单ID" min-width="180">
        </el-table-column>
        <el-table-column prop="cname" label="订单名称" min-width="180">
        </el-table-column>
        <el-table-column prop="" label="提交时间" width="100">
          <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="username" label="下单人" min-width="80">
        </el-table-column>
        <el-table-column prop="" label="类型" width="95">
          <template slot-scope="scope">
            <span v-if="scope.row.pid=='WEBSITE' && scope.row.websitetype==20">WAP</span>
            <span v-if="scope.row.pid=='WEBSITE' && scope.row.websitetype!=20">PC/WAP</span>
            <span v-if="scope.row.pid!='WEBSITE'">{{scope.row.pname}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="审核状态" min-width="155">
          <span slot-scope="scope">
            <el-button type="warning" class="xsbtn" plain>{{scope.row.currentname?scope.row.currentname:'订单完成'}}</el-button>
          </span>
        </el-table-column>
        <el-table-column prop="" label="订单状态" width="120">
          <span slot-scope="scope">
            {{scope.row.audittype === 0 ? "仅降E":"降E并提单"}}
          </span>
        </el-table-column>
        <el-table-column prop="" label="最后操作时间" width="100">
          <span slot-scope="scope">{{scope.row.opt_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="deptname" label="商务大区部门" min-width="110">
        </el-table-column>
        <el-table-column prop="" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="success" @click.native="viewOrder(scope.row)" class="xsbtn">查看</el-button>
            <el-button v-if="permissions.indexOf('5a')>-1" type="warning" @click.native="updateOrder(scope.row)" class="xsbtn">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 转户出纳列表 -->
      <el-table v-if="permissions.indexOf('5q') > -1" :data="pendingList" class="table-width" max-height="550">
        <el-table-column prop="" label="加款时间" width="150">
          <span slot-scope="scope">{{scope.row.addMoneyTime | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="cname" label="订单名称" min-width="180">
        </el-table-column>
        <el-table-column prop="" label="客户类型" min-width="90">
          <span slot-scope="scope">{{scope.row.producttype | cusState('cusType')}}{{scope.row.productnumber}}</span>
        </el-table-column>
        <el-table-column prop="pname" label="类型" min-width="80">
        </el-table-column>
        <el-table-column prop="username" label="商务" min-width="80">
        </el-table-column>
        <el-table-column prop="baiducount" label="用户名" min-width="80">
        </el-table-column>
        <el-table-column prop="baiduid" label="ID" min-width="80">
        </el-table-column>
        <el-table-column prop="proxyid" label="代理账号" min-width="80">
        </el-table-column>
        <el-table-column prop="" label="金额" min-width="100">
          <span slot-scope="scope">{{scope.row.amount_real || 0 | currency}}</span>
        </el-table-column>
        <el-table-column prop="" label="状态" min-width="140">
          <template slot-scope="scope">
            <el-button type="warning" plain class="xsbtn">{{scope.row.currentname?scope.row.currentname:'订单完成'}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" min-width="80">
          <template slot-scope="scope">
            <el-button type="success" @click.native="accountOutPass(scope.row)" class="xsbtn">通过</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 客服看到的列表 -->
      <el-table v-if="permissions.indexOf('6n') > -1" :data="pendingList" class="table-width" max-height="550">
        <el-table-column prop="ordernum" label="订单ID" min-width="150">
        </el-table-column>
        <el-table-column prop="cname" label="订单名称" min-width="150">
        </el-table-column>
        <el-table-column prop="baiducount" label="用户名" min-width="80">
        </el-table-column>
        <el-table-column prop="kefu" label="维护客服" min-width="80">
        </el-table-column>
        <el-table-column prop="webName" label="网站维护人员" min-width="80">
        </el-table-column>
        <el-table-column prop="" label="提交时间" min-width="100">
          <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="username" label="下单人" min-width="80">
        </el-table-column>
        <el-table-column prop="currentname" label="类型" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.pid=='WEBSITE' && scope.row.websitetype==20">WAP</span>
            <span v-if="scope.row.pid=='WEBSITE' && scope.row.websitetype!=20">PC/WAP</span>
            <span v-if="scope.row.pid!='WEBSITE'">{{scope.row.pname}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="currentname" label="审核状态" width="140">
          <template slot-scope="scope">
            <el-button type="warning" plain class="xsbtn">{{scope.row.currentname?scope.row.currentname:'订单完成'}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="currentname" label="订单状态" min-width="80">
          <span slot-scope="scope">{{scope.row.audittype == 0 ? "仅降E":"降E并提单"}}</span>
        </el-table-column>
        <el-table-column prop="username" label="最后操作时间" width="100">
          <span slot-scope="scope">{{scope.row.opt_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="deptname" label="商务大区部门" min-width="80">
        </el-table-column>
        <el-table-column prop="" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click.native="viewOrder(scope.row)" class="xsbtn">查看</el-button>
            <el-button v-if="permissions.indexOf('5a')>-1" type="warning" @click.native="updateOrder(scope.row)" class="xsbtn">修改订单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page class="page" :url="pendingUrl" :sendParams="sendParams" @updateList="updatePendingList" :key="key">
      </page>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import cookie from 'js-cookie'
import { orderDeal } from 'common/js/mixin'
export default {
  mixins: [orderDeal],
  data () {
    return {
      permissions: cookie.getJSON('permissions'),
      key_pro: '',
      key_order: '1',
      key_achievement: '2',
      tabStatus: '0',
      key: '',
      permission: sessionStorage.getItem('permissions'),
      cusName: '',
      orderNumber: '',
      productType: '',
      orderStatus: '',
      achievement: '',
      bd_account: '',
      bd_id: '',
      achievements: [
        {
          opentime: '',
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
      pendingList: [],
      pendingUrl: '/Check.do?pendding',
      sendParams: {
        status: 100,
        addmoney: '0'
      },
      pid: 'BAITUI',
      sn: 308,
      tmark: ''
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.query.data === 'fromDetail') {
      this.search()
    }
    next()
  },
  methods: {
    accountOutPass (data) {
      this.tmark = '转户出纳'
      this.pid = data.pid
      this.sn = data.sn
      this._getUrl()
      this._getBasicInfo(data, this.pass)
    },
    // 获取订单基本信息
    _getBasicInfo (data, fn) {
      let baseUrl = '/wf.do?ndget'
      let baseParams = {
        sn: data.sn,
        cpid: data.cpid,
        uid: data.uid,
        orderid: data.orderid,
        pid: data.pid
      }
      this.$post(baseUrl, baseParams).then(res => {
        if (res.data.success === true) {
          this.templateInfo = res.data.data[0][0]
          this.contactInfoList = res.data.data[7]
          this.orderInfo = res.data.data[1]
          this.productInfo = res.data.data[4]
          this.originUser = res.data.data[3]
          this.cusAttrList = res.data.data[5]
          this.showQualify = res.data.data[5]
          this.moneyInfo = res.data.data[12]
          this.moneyRecord = res.data.data[8][0]
          this.orderFlowDatas = res.data.data[13]
          this.invoiceInfo = res.data.data[11]
          fn()
        }
      })
    },
    tab () {
      // 使用obj.key = value的方式，子组件无法监听到对象的变化
      this.sendParams = Object.assign({}, this.sendParams, {addmoney: this.tabStatus})
    },
    search () {
      this.sendParams = {
        status: 100,
        companyname: this.cusName || undefined, // 公司名称
        orderid: this.orderNumber || undefined, // 订单编号
        pid: this.productType || undefined, // 产品类型
        baiducount: this.bd_account || undefined, // 百度账号
        baiduid: this.bd_id || undefined, // 百度id
        opentime: this.achievement || undefined, // 业绩
        audittype: this.orderStatus || undefined // 订单类型
      }
    },
    reset () {
      this.cusName = ''
      this.orderNumber = ''
      this.productType = ''
      this.key_pro = new Date() + ''
      this.orderStatus = ''
      this.key_order = new Date() + '1'
      this.bd_account = ''
      this.bd_id = ''
      this.achievement = ''
      this.key_achievement = new Date() + '2'
    },
    updatePendingList (res) {
      this.pendingList = res.data[0].data
    },
    viewOrder (data) {
      this.$router.push({
        path: `orderPending/view/${data.cpid}`,
        query: {data: data}
      })
    },
    updateOrder (data) {
      this.$router.push({
        path: `orderPending/edit/${data.cpid}`,
        query: {data: data}
      })
    }
  },
  components: {
    Page, AutoSelect
  }
}
</script>

<style lang="less" scoped>
.order-pending {
  position: relative;
  .pending-content {
    .tab{
      margin-left: 10px;
    }
    .pending-search{
      display: flex;
      flex-wrap: wrap;
    .search-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
    }
    .pagination {
      padding-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>

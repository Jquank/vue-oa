<template>
  <div class="order-pending component-container media-padding">
    <div class="pending-content">
      <div class="tab">
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
        <auto-select :key="key_achievement" title="选择业绩" v-model="achievement" class="search-item item-width">
          <el-option v-for="item in achievements" :key="item.value" :label="item.label" :value="item.opentime"></el-option>
        </auto-select>
        <div class="search-item">
          <el-button type="primary" @click.native="search">查询</el-button>
          <el-button type="warning" @click.native="reset">重置</el-button>
        </div>
      </div>
      <!-- 列表 -->
      <el-table :data="pendingList" class="table-width" max-height="550">
        <el-table-column prop="ordernum" label="订单ID" width="180">
        </el-table-column>
        <el-table-column prop="cname" label="订单名称" min-width="160">
        </el-table-column>
        <el-table-column prop="" label="提交时间" min-width="140">
          <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="username" label="下单人" width="80">
        </el-table-column>
        <el-table-column prop="" label="类型" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.pid=='WEBSITE' && scope.row.websitetype==20">WAP</span>
            <span v-if="scope.row.pid=='WEBSITE' && scope.row.websitetype!=20">PC/WAP</span>
            <span v-if="scope.row.pid!='WEBSITE'">{{scope.row.pname}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="审核状态" width="120">
          <span slot-scope="scope">
            {{scope.row.currentname}}
          </span>
        </el-table-column>
        <el-table-column prop="" label="订单状态" width="120">
          <span slot-scope="scope">
            {{scope.row.audittype === 0 ? "仅降E":"降E并提单"}}
          </span>
        </el-table-column>
        <el-table-column prop="" label="最后操作时间" min-width="140">
          <span slot-scope="scope">{{scope.row.opt_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="deptname" label="商务大区部门" width="150">
        </el-table-column>
        <el-table-column prop="" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.native="viewOrder(scope.row)" class="xsbtn">查看</el-button>
            <el-button type="warning" size="mini" @click.native="updateOrder(scope.row)" class="xsbtn">修改订单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page class="page" :url="url" :sendParams="sendParams" @updateList="updatePendingList" :key="key">
      </page>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
export default {
  data () {
    return {
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
      url: '/Check.do?pendding',
      sendParams: {
        status: 100,
        addmoney: '0'
      }
    }
  },
  beforeRouteUpdate (to, from, next) { // vue会复用组件，所以从详情页返回时带上搜索条件搜索
    if (to.query.data === 'fromDetail') {
      this.search()
    }
    next()
  },
  methods: {
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

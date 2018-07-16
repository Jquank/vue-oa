<template>
  <div class="order-pending">
    <p v-if="showBread" class="bread-title">
      <span>订单管理 / 待处理订单</span>
    </p>
    <div class="pending-content">
      <div class="tab">
        <el-radio-group v-model="tabStatus" @change="tab(tabStatus)">
          <el-radio-button label="0">全部</el-radio-button>
          <el-radio-button label="100">未加款</el-radio-button>
          <el-radio-button label="300">已加款</el-radio-button>
        </el-radio-group>
      </div>
      <!-- 搜索 -->
      <div class="search" style="margin-top:15px;">
        <el-row :gutter="10">
          <el-col :sm="7">
            <el-input  placeholder="请输入客户名称搜索" v-model="cusName">
              <template slot="prepend">客户名称</template>
            </el-input>
          </el-col>
          <el-col :sm="7">
            <el-input  placeholder="请输入订单编号搜索" v-model="orderNumber">
              <template slot="prepend">订单编号</template>
            </el-input>
          </el-col>
          <el-col :sm="4">
            <el-select v-model="productType" placeholder="请选择产品类型" style="width:100%">
              <el-option label="全部" value="-1"></el-option>
              <el-option label="百度推广" value="BAITUI"></el-option>
              <el-option label="网建" value="WEBSITE"></el-option>
              <el-option label="信息流" value="XXL"></el-option>
            </el-select>
          </el-col>
          <el-col :sm="4">
            <el-select v-model="orderStatus" placeholder="请选择订单状态" style="width:100%">
              <el-option label="全部" value="-1"></el-option>
              <el-option label="仅降E" value="0"></el-option>
              <el-option label="降E并提单" value="10"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top:10px;">
          <el-col :sm="7">
            <el-input  placeholder="请输入百度账号搜索" v-model="bd_account">
              <template slot="prepend">百度账号</template>
            </el-input>
          </el-col>
          <el-col :sm="7">
            <el-input  placeholder="请输入百度ID搜索" v-model="bd_id">
              <template slot="prepend">百度 ID&nbsp;&nbsp;</template>
            </el-input>
          </el-col>
          <el-col :sm="4">
            <el-select v-model="achievement" placeholder="请选择业绩" style="width:100%">
              <el-option v-for="item in achievements" :key="item.value" :label="item.label"
                :value="item.opentime"></el-option>
            </el-select>
          </el-col>
          <el-col :sm="6">
            <el-button type="primary" @click.native="search">查询</el-button>
            <el-button type="warning" @click.native="reset">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 列表 -->
      <div class="content" style="margin-top:15px;">
        <el-row v-if="permission.indexOf('6n')<0 || permission.indexOf('5p')<0">
          <el-table
            :data="pendingList"
            style="width: 100%">
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
                <el-button type="primary" size="mini" @click.native="viewOrder(scope.row)">查看</el-button>
                <el-button v-if="scope.row.sn == 10" type="warning" size="mini" @click.native="updateOrder(scope.row)">修改订单</el-button>
              </template>
            </el-table-column>
          </el-table>
          <page class="pagination" :url="url" :sendparams="params"
            @updateList="updatePendingList"  :key="key">
          </page>
        </el-row>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Page from 'base/page/page'
import { serverUrl } from 'api/config'
export default {
  data () {
    return {
      showBread: true,
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
          opentime: '-1',
          label: '全部'
        }, {
          opentime: 'yes',
          label: '已记新开业绩'
        }, {
          opentime: 'yes',
          label: '已记上线业绩'
        }, {
          opentime: 'no',
          label: '未记新开业绩'
        }, {
          opentime: 'no',
          label: '未记上线业绩'
        }, {
          opentime: 'yes',
          label: '已记业绩'
        }, {
          opentime: 'no',
          label: '未记业绩'
        }
      ],
      pendingList: [],
      url: serverUrl + '/Check.do?pendding',
      params: {
        status: 100,
        addmoney: '0'
      }

    }
  },
  methods: {
    tab (tabStatus) {
      this.params.addmoney = tabStatus
      this.key = '' + new Date()
    },
    search () {
      this.params = {
        status: 100,
        companyname: this.cusName || undefined, // 公司名称
        orderid: this.orderNumber || undefined, // 订单编号
        pid: this.productType === '-1' || this.productType === '' ? undefined : this.productType, // 产品类型
        baiducount: this.bd_account || undefined, // 百度账号
        baiduid: this.bd_id || undefined, // 百度id
        opentime: this.achievement === '-1' || this.achievement === '' ? undefined : this.achievement, // 业绩
        audittype: this.orderStatus === '-1' || this.orderStatus === '' ? undefined : this.orderStatus // 订单类型
      }
      this.key = '' + new Date()
    },
    reset () {
      this.cusName = ''
      this.orderNumber = ''
      this.productType = ''
      this.bd_account = ''
      this.bd_id = ''
      this.achievement = ''
      this.orderStatus = ''
    },
    updatePendingList (data) {
      this.pendingList = data.data[0].data
    },
    viewOrder (data) {
      this.$router.push({
        path: `orderPending/view/${data.cpid}`,
        query: {data: data}
      })
      // this.showBread = false
    },
    updateOrder (data) {
      this.$router.push({
        path: `orderPending/edit/${data.cpid}`,
        query: {data: data}
      })
    }
  },
  components: {
    Page
  }
}
</script>

<style lang="less" scoped>
  .order-pending{
    position: relative;
    .pending-content{
      background: #fff;
      padding: 20px;
      .pagination{
        padding-top: 10px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }

</style>

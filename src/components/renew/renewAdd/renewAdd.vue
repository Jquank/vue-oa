<template>
  <div class="renew-add component-container media-padding">
    <el-tabs v-model="activeName" @tab-click="search()" type="card">
      <el-tab-pane label="大搜" name="DS"></el-tab-pane>
      <el-tab-pane label="直通车" name="ZTC"></el-tab-pane>
    </el-tabs>
    <el-radio-group v-model="stateRadio" @change="search()" class="ml10px">
      <el-radio-button label="100">待处理</el-radio-button>
      <el-radio-button label="300">已处理</el-radio-button>
    </el-radio-group>
    <div class="follow-search">
      <el-input v-model="comName" class="follow-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">公司名称:</template>
      </el-input>
      <el-input v-model="bdAccount" class="follow-item item-width" placeholder="搜索百度账号">
        <template slot="prepend">百度账号:</template>
      </el-input>
      <el-date-picker v-model="addTime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="审核开始日期" end-placeholder="审核结束日期" class="follow-item item-width"></el-date-picker>
      <div class="follow-item">
        <el-button type="primary" @click.native="search">查 询</el-button>
        <el-button type="warning" @click.native="reset">重 置</el-button>
      </div>
    </div>

    <el-table stripe border :data="myFollowList" class="table-width" max-height="500">
      <el-table-column prop="odre" label="ID" width="70">
      </el-table-column>
      <el-table-column prop="inserttime" label="日期" width="90">
        <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="companyname" label="公司名称" min-width="160">
      </el-table-column>
      <el-table-column prop="username" label="提交人">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
          <span>{{scope.row.bindName?('('+scope.row.bindName+')'): ((scope.row.true_name && scope.row.true_name!=scope.row.username)?('('+scope.row.true_name+')'):'')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="baidu_account" label="百度账号">
      </el-table-column>
      <el-table-column prop="baidu_id" label="用户ID">
      </el-table-column>
      <el-table-column prop="addtype" label="推广共享资金" width="110">
        <span slot-scope="scope">{{scope.row.tgbonus | currency}}</span>
      </el-table-column>
      <el-table-column prop="ggbonus" label="广告共享资金" width="110">
        <span slot-scope="scope">{{scope.row.ggbonus | currency}}</span>
      </el-table-column>
      <el-table-column prop="ysdltg" label="代理原生推广" width="110">
        <span slot-scope="scope">{{scope.row.ysdltg | currency}}</span>
      </el-table-column>
      <el-table-column prop="checktime" label="加款时间" width="90">
        <span slot-scope="scope">{{scope.row.checktime | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="" label="操作" width="75" align="center">
        <template slot-scope="scope">
          <el-button @click.native="view(scope.row)" type="success" class="xsbtn">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="myFollowUrl" :sendParams="sendParams" :isRememberStatus="false" @updateList="updateMyFollowList"></page>

    <!-- 查看弹窗-renew -->
    <el-dialog :key="key_renew_detail" :modal-append-to-body="false" title="续费详情" :visible.sync="renewDetailDialog" width="90%">
      <renew-detail :rowData="rowData" @closeRenewDetailDialog="closeRenewDetailDialog" :toMark="'renewAdd'"></renew-detail>
    </el-dialog>
    <!-- 查看弹窗-order -->
    <el-dialog :key="key_order_detail" :modal-append-to-body="false" title="客户详情" :visible.sync="orderDetailDialog" width="90%">
      <!-- 续费信息 -->
      <div>
        <div class="title">
          <el-button class="title-btn" type="warning">续费信息</el-button>
          <div class="line"></div>
        </div>
        <el-form label-width="110px" class="weight-label">
          <el-row>
            <el-col :md="8">
              <el-form-item label="客户名称 :">
                <div>{{baseInfo7.name}}</div>
              </el-form-item>
            </el-col>
            <el-col :md="6" class="maxwidth">
              <el-form-item label="百度账号 :">
                <div>{{baseInfo1.baiducount}}</div>
              </el-form-item>
            </el-col>
            <el-col :md="5" class="maxwidth">
              <el-form-item label="用户ID :">
                <div>{{baseInfo1.baiduid}}</div>
              </el-form-item>
            </el-col>
            <el-col :md="5">
              <el-form-item label="是否需要发票 :">
                <div>{{baseInfo1.invoice_type+'' | invoiceState('needInvoice')}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24" v-if="!baseInfo1.order3number">
              <el-form-item label="百度推广服务合同 :" label-width="140px">
                <div>{{baseInfo1.ordernumber}}</div>
              </el-form-item>
            </el-col>
            <template v-else>
              <el-col :md="8">
                <el-form-item label="百度推广服务订单编号 :" label-width="160px">
                  <div>{{baseInfo1.ordernumber}}</div>
                </el-form-item>
              </el-col>
              <el-col :md="6" class="maxwidth">
                <el-form-item label="百度推广首消授权书 :" label-width="140px">
                  <div>{{baseInfo1.order2number}}</div>
                </el-form-item>
              </el-col>
              <el-col :md="5" class="maxwidth">
                <el-form-item label="百度推广服务协议 :" label-width="140px">
                  <div>{{baseInfo1.order3number}}</div>
                </el-form-item>
              </el-col>
            </template>
          </el-row>
        </el-form>
      </div>
      <!-- 到款信息 -->
      <div>
        <div class="title">
          <el-button class="title-btn" type="warning">到款信息</el-button>
          <div class="line"></div>
        </div>
        <el-table :data="moneyDetail" border>
          <el-table-column prop="" label="实际到款" min-width="150">
            <template slot-scope="scope">
              <span v-if="!scope.row.mark">
                <b>{{scope.row.type | productType}}</b>&nbsp;:&nbsp;
                <span>{{scope.row.count | currency}}</span>
              </span>
              <span v-else>
                <b>{{scope.row._type}}</b>&nbsp;:&nbsp;
                <span>{{scope.row.total1 | currency}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="代金券" min-width="150">
            <template slot-scope="scope">
              <span v-if="!scope.row.mark" v-show="scope.row.type<500">
                <b>{{scope.row.type | productType}}</b>&nbsp;:&nbsp;
                <span>{{scope.row.voucher | currency1}}</span>
              </span>
              <span v-else>
                <b>{{scope.row._type}}</b>&nbsp;:&nbsp;
                <span>{{scope.row.total2 | currency1}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="现金券" min-width="150">
            <template slot-scope="scope">
              <span v-if="!scope.row.mark" v-show="scope.row.type<500">
                <b>{{scope.row.type | productType}}</b>&nbsp;:&nbsp;
                <span>{{scope.row.xjq | currency1}}</span>
              </span>
              <span v-else>
                <b>{{scope.row._type}}</b>&nbsp;:&nbsp;
                <span>{{scope.row.total3 | currency1}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="申请加款" min-width="150">
            <template slot-scope="scope">
              <span v-if="!scope.row.mark" v-show="scope.row.type<500">
                <b>{{scope.row.type | productType}}</b>&nbsp;:&nbsp;
                <span>{{scope.row.add_money | currency1}}</span>
              </span>
              <span v-else>
                <b>{{scope.row._type}}</b>&nbsp;:&nbsp;
                <span>{{scope.row.total4 | currency1}}</span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 操作 -->
      <div v-if="stateRadio==100">
        <div class="title">
          <el-button class="title-btn mt10px" type="warning">操作</el-button>
          <div class="line"></div>
        </div>
        <el-form label-width="80px" class="mt10px">
          <el-row>
            <el-col :md="24" class="maxwidth">
              <el-form-item label="备注 :">
                <el-input v-model="subRemark" type="textarea" placeholder="备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="text-center">
          <el-button @click.native="check(1)" type="success">通 过</el-button>
          <el-button @click.native="check(6)" type="danger">驳 回</el-button>
        </div>
      </div>
      <!-- 操作记录 -->
      <div>
        <div class="title">
          <el-button class="title-btn mt10px" type="warning">操作记录</el-button>
          <div class="line"></div>
        </div>
        <el-table :data="recordList" class="table-width" max-height="400">
          <el-table-column prop="inserttime" label="操作时间" width="150">
            <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
          </el-table-column>
          <el-table-column prop="name" label="操作人">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
              <span>{{scope.row.bindName?('('+scope.row.bindName+')'): ((scope.row.true_name && scope.row.true_name!=scope.row.name)?('('+scope.row.true_name+')'):'')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="record" label="操作记录" min-width="140">
          </el-table-column>
          <el-table-column prop="remark" label="处理备注"></el-table-column>
        </el-table>
        <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="recordUrl" :sendParams="recordParams" @updateList="updateRecordList"></page>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Page from 'base/page/page'
import RenewDetail from 'components/renew/renewList/renewDetail'
import { groupBy } from 'common/js/utils'
import { productType } from 'common/js/filters'
const STEP = 140
export default {
  data () {
    return {
      activeName: 'DS',
      stateRadio: '100',
      comName: '',
      bdAccount: '',
      addTime: [],

      myFollowList: [],
      myFollowUrl: '/Renew.do?renewlistcw',
      sendParams: {
        check: 100,
        step: STEP,
        pid: 'DS'
      },
      rowData: {},
      renewDetailDialog: false,
      key_renew_detail: '',
      orderDetailDialog: false,
      key_order_detail: '1',
      recordList: [],
      recordUrl: '/order.do?orderRecord',
      recordParams: {},
      baseInfo1: {},
      baseInfo7: {},
      baseInfo8: {},
      moneyDetail: [],
      subRemark: '',
      total1: 0,
      total2: 0,
      total3: 0,
      total4: 0
    }
  },
  methods: {
    check (type) {
      if (type === 6 && !this.subRemark) {
        this.$message.warning('请填写驳回理由！')
        return
      }
      let params = {
        cpid: this.rowData.cpid,
        yn: type,
        sn: 310,
        companylogid: this.rowData.companylogid,
        order_id: this.rowData.orderid, // 订单id
        remark: this.subRemark,
        go_sn: 10,
        order_log: this.subRemark
      }
      this.$post('/wf.do?go', params).then(res => {
        this.orderDetailDialog = false
        this.search()
      })
    },
    // 查看
    view (data) {
      this.rowData = data
      if (data.odre === 'renew') {
        this.key_renew_detail = new Date() + ''
        setTimeout(() => {
          this.renewDetailDialog = true
        }, 300)
      } else if (data.odre === 'order') {
        this.moneyDetail = []
        this.recordParams = {
          reid: data.reid,
          cpid: data.cpid
        }
        let params = {
          cpid: data.cpid,
          orderid: data.orderid,
          pid: data.pid,
          sn: 310,
          uid: data.uid
        }
        this.$get('/wf.do?ndget', params).then(res => {
          this.subRemark = ''
          this.baseInfo1 = res.data.data[1]
          this.baseInfo7 = res.data.data[7][0]
          this.baseInfo8 = res.data.data[8][0]
          let _moneyDetail = res.data.data[12]
          let groupedArr = []
          let xxx = groupBy(_moneyDetail, function (item) {
            return [item.type]
          })
          xxx.forEach(val => {
            let sumValue = 0
            let sumCount = 0
            let sumProfit = 0
            val.forEach(item => {
              sumValue += parseFloat(item.value)
              sumCount += parseFloat(item.count)
              sumProfit += parseFloat(item.profit)
              val[0].count = sumCount.toFixed(2)
              val[0].value = sumValue.toFixed(2)
              val[0].profit = sumProfit.toFixed(2)
              val[0].add_money = parseFloat(item.add_money || 0).toFixed(2)
              val[0].true_value = parseFloat(item.true_value || 0).toFixed(2)
            })
            groupedArr.push(val[0])
          })
          groupedArr.forEach(val => {
            if (val.type === 1) {
              val.voucher = this.baseInfo8.dsvoucher || 0
              val.xjq = this.baseInfo8.dsxjq || 0
            } else if (val.type === 2) {
              val.voucher = this.baseInfo8.xxlvoucher || 0
              val.xjq = this.baseInfo8.xxlxjq || 0
            } else if (val.type === 51) {
              val.voucher = this.baseInfo8.ztcvoucher || 0
              val.xjq = this.baseInfo8.ztcxjq || 0
            } else {
              val.voucher = 0
              val.xjq = 0
            }
            this.moneyDetail.push(val)
            this.total1 += parseFloat(val.count || 0)
            this.total2 += parseFloat(val.voucher || 0)
            this.total3 += parseFloat(val.xjq || 0)
            this.total4 += parseFloat(val.add_money || 0)
          })
          this.moneyDetail.push({ mark: 'last' })
          this.moneyDetail.forEach((val, index) => {
            val._type = '总计'
            val.total1 = this.total1
            val.total2 = this.total2
            val.total3 = this.total3
            val.total4 = this.total4
            if (val.type < 500) {
              this.subRemark += productType(val.type) + '加款金额：' + val.add_money + '，'
            }
          })
          this.key_order_detail = new Date() + '1'
          setTimeout(() => {
            this.orderDetailDialog = true
          }, 300)
        })
      }
    },
    updateRecordList (res) {
      this.recordList = res.data[0].data
    },
    closeRenewDetailDialog () {
      this.renewDetailDialog = false
      this.search()
    },
    search () {
      this.sendParams = {
        companyname: this.comName,
        baiduAccount: this.bdAccount,
        starttime: this.addTime[0],
        endtime: this.addTime[1],
        check: this.stateRadio,
        pid: this.activeName,
        step: STEP
      }
    },
    reset () {
      this.comName = ''
      this.bdAccount = ''
      this.addTime = []
    },
    updateMyFollowList (res) {
      this.myFollowList = res.data[0].data
    }
  },
  components: {
    Page,
    RenewDetail
  }
}
</script>

<style lang="less" scoped>
.renew-add {
  .follow-search {
    display: flex;
    flex-wrap: wrap;
    .follow-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 310px;
    }
  }
}
</style>

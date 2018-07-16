<template>
  <div class="view-detail">
    <p class="bread-title">
      <span>待处理订单 / 查看订单详情</span>
    </p>
    <div class="detail-content">
      <el-tabs type="border-card">
        <el-tab-pane label="百度订单基本信息">
          <el-table :data="basicInfo" border style="width: 100%">
            <el-table-column prop="type" label="信息分类" width="150">
            </el-table-column>
            <el-table-column prop="" label="详细信息">
              <div slot-scope="scope">
                <div v-if="scope.$index===0">
                  <el-row>
                    <el-col :sm="6">
                      <b>公司名称：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                    <el-col :sm="6">
                      <b>PC网址：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                    <el-col :sm="6">
                      <b>手机网址：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                  </el-row>
                  <el-row class="mt10px">
                    <el-col :sm="6">
                      <b>联系人信息：姓名：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                    <el-col :sm="6">
                      <b>手机：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                    <el-col :sm="6">
                      <b>座机：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                    <el-col :sm="6">
                      <b>邮箱：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                  </el-row>
                  <el-row class="mt10px">
                    <el-col :sm="6">
                      <b>客户类型：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                    <el-col :sm="6">
                      <b>对公账号：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                    <el-col :sm="6">
                      <b>开户行：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                  </el-row>
                  <el-row class="mt10px">
                    <el-col>
                      <b>公司地址：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                  </el-row>
                </div>
                <div v-if="scope.$index===1">
                  <el-row>
                    <el-col>
                      <b>网建类型：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                  </el-row>
                </div>
                <div v-if="scope.$index===2">
                  <el-row>
                    <el-col>
                      <b>百度订单金额：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                  </el-row>
                </div>
                <div v-if="scope.$index===3">
                  <el-row>
                    <el-col>
                      <b>商务信息：</b>
                      <span>{{scope.row.data.cName}}</span>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>

        <el-tab-pane label="审核记录">
          <el-steps :active="isChecked" space="14%" finish-status="success">
            <el-step v-for="step in stepList.slice(0,8)" :key="step.id" :title="step.name" style="margin-top:15px">
              <span v-if="step.status>0" slot="description">{{step.opt_time | timeFormat}}</span>
            </el-step>
          </el-steps>
          <el-steps :active="isNextChecked" space="12.5%" finish-status="success">
            <el-step v-for="(step,index) in stepList.slice(8)" :key="step.id" :title="step.name" style="margin-top:15px">
              <span slot="icon">{{9+index}}</span>
              <span v-if="step.status>0" slot="description">{{step.opt_time | timeFormat}}</span>
            </el-step>
          </el-steps>
          <el-table :data="checkRecord" stripe style="width: 100%;margin-top:25px;">
            <el-table-column prop="" label="时间" width="160">
              <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
            </el-table-column>
            <el-table-column prop="username" label="操作人" width="100">
            </el-table-column>
            <el-table-column prop="remark" label="审核内容">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { serverUrl } from 'api/config'
import { $get } from 'api/http'
export default {
  data () {
    return {
      stepList: [],
      isChecked: 0,
      isNextChecked: -1,
      checkRecord: [],
      basicInfo: [
        { type: '客户基本信息', data: { cName: '0704test02' } },
        { type: '网建信息', data: { cName: '0704test02' } },
        { type: '订单/金额', data: { cName: '0704test02' } },
        { type: '商务信息', data: { cName: '0704test02' } }
      ]
    }
  },
  created () {
    this._getDetailData()
  },
  methods: {
    _getDetailData () {
      let lastIndex = 0
      let receiveData = this.$route.query.data
      if (!receiveData.cpid) {
        this.$router.push({
          path: '/indexPage/orderPending'
        })
        return
      }
      let progressUrl = serverUrl + '/wf/order.do?Schedule'
      let progressParam = {
        cpid: receiveData.cpid
      }
      $get(progressUrl, progressParam).then(res => {
        if (res.data[0].success === true) {
          this.stepList = res.data[0].data
          this.checkRecord = res.data[1].data
          this.stepList.forEach((val, index) => {
            if (val.status === 100) {
              lastIndex = index
            }
          })
          this.isChecked = lastIndex
          if (this.isChecked > 7) {
            this.isNextChecked = this.isChecked - 7
          }
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.view-detail {
  width: 100%;
  height: 100%;
  background: #e2e5ec;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  .detail-content {
    background: #fff;
    padding: 20px;
  }
}
</style>

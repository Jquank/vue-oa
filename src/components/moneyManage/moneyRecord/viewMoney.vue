<template>
  <div class="money-detail child-component-container media-padding">
    <div class="maxwidth">
      <el-form ref="form" :model="receipt" :label-width="labelWidth" :label-position="labelPosition" size="small">
        <el-row>
          <el-col :md="24">
            <el-form-item label="公司名称/法人 :">
              <el-input v-model="receipt.companyname" disabled  class="input-btn"></el-input>
              <el-button @click.native="$router.go(-1)" type="warning">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row v-for="(item,index) in productMoneyList" :key="index">
          <el-col :md="24" v-if="item.type<100">
            <el-form-item :label="item.type | productType(' :')" class="product-name">
              <el-input v-model="item.value" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="服务费 :">
              <el-input v-model="receipt.service" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="服务年限 :" required>
              <el-input v-model="receipt.serviceyear" disabled>
                <span slot="append">年</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 百推 -->
        <template v-if="businessType==='DS'">
          <el-row>
            <el-col :md="24">
              <el-form-item label="大搜现金券 :">
                <el-input v-model="receipt.dsxjq" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="信息流现金券 :">
                <el-input v-model="receipt.xxlxjq" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="大搜代金券 :">
                <el-input v-model="receipt.dsvoucher" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="信息流代金券 :">
                <el-input v-model="receipt.xxlvoucher" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <!-- 直通车 -->
        <template v-if="businessType==='ZTC2'">
          <el-row>
            <el-col :md="24">
              <el-form-item label="代金券 :">
                <el-input v-model="receipt.ztcvoucher" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="现金券 :">
                <el-input v-model="receipt.ztcxjq" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <el-row>
          <el-col :md="24">
            <el-form-item label="总到款金额 :">
              <span>{{receipt.sum}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="备注 :">
              <el-input v-model="receipt.remark" disabled type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="操作记录 :">
              <el-table stripe border :data="logs" class="table-width">
                <el-table-column prop="" label="操作日期">
                  <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
                </el-table-column>
                <el-table-column prop="remark" label="操作记录" min-width="120">
                </el-table-column>
                <el-table-column prop="name" label="操作人">
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { appMark } from 'common/js/utils'
export default {
  data () {
    return {
      labelWidth: '160px',
      labelPosition: 'right',

      businessType: '',
      productMoneyList: [],

      receiveData: {},
      logs: [],
      receipt: {}
    }
  },
  created () {
    if (appMark()) {
      this.labelPosition = 'top'
    }
    this.businessType = this.$route.query.data.pid
    this.receiveData = this.$route.query.data
    if (!this.receiveData.id) {
      this.$router.push('/indexPage/moneyRecord')
      return
    }
    this._getLogs(this.receiveData.id)
  },
  methods: {
    _getLogs (id) {
      this.$get('/receipt.do?companyreceiptdetail', { id: id }).then(res => {
        this.logs = res.data[2].data
        this.receipt = res.data[0].data[0]
        this.productMoneyList = res.data[1].data
      })
    }
  },
  components: {}
}
</script>

<style>
.product-name .el-form-item__label {
  color: #409eff;
}
</style>

<style lang="less" scoped>
.money-detail {
  .maxwidth {
    max-width: 900px;
  }
}
</style>

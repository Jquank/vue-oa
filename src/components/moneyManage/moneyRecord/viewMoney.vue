<template>
  <div class="money-detail child-component-container media-padding">
    <div class="maxwidth">
      <el-form ref="form" :model="receipt" :label-width="labelWidth" size="small">
        <el-row>
          <el-col :md="24">
            <el-form-item label="公司名称/法人 :">
              <el-input v-model="receipt.companyname" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-for="(item,index) in productMoneyList" :key="index">
          <el-col :md="24">
            <el-form-item :label="item.code_desc+' :'" class="product-name">
              <el-input v-model="item.value"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="服务费 :">
              <el-input v-model="receipt.service"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="服务年限 :" required>
              <el-input v-model="receipt.serviceyear">
                <span slot="append">年</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 百推 -->
        <template v-if="businessType!=='ztc'">
          <el-row>
            <el-col :md="24">
              <el-form-item label="大搜现金券 :">
                <el-input v-model="receipt.dsxjq"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="信息流现金券 :">
                <el-input v-model="receipt.xxlxjq"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="大搜代金券 :">
                <el-input v-model="receipt.dsvoucher"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="信息流代金券 :">
                <el-input v-model="receipt.xxlvoucher"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <!-- 直通车 -->
        <template v-if="businessType==='ztc'">
          <el-row>
            <el-col :md="24">
              <el-form-item label="直通车代金券 :">
                <el-input v-model="receipt.ztcvoucher"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <el-row>
          <el-col :md="24">
            <el-form-item label="总到款金额 :">
              <span>{{form.receiveMoneyTotal}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="备注 :">
              <el-input v-model="receipt.remark" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-table stripe border :data="logs" class="maxwidth" style="width: 100%;margin-top:10px;">
      <el-table-column prop="" label="操作日期">
        <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="remark" label="操作记录">
      </el-table-column>
      <el-table-column prop="name" label="操作人">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getByCode } from 'api/getOptions'
export default {
  data () {
    return {
      labelWidth: '160px',
      form: {
        cusName: '',
        productList: [],
        selProList: [],
        bdService: 2400,
        ztcService: 2400,
        serviceYear: 1,
        ds_xjq: 0,
        ds_djq: 0,
        xxl_xjq: 0,
        xxl_djq: 0,
        ztc_djq: 0,
        remark: '',
        receiveMoneyTotal: 0
      },

      selFlowList: [],
      checkedFlowIds: [],

      businessType: '',
      handleSelFlow: [],
      productMoneyList: [],

      receiveData: {},
      logs: [],
      receipt: {}
    }
  },
  computed: {
    proMoneyTotal () {
      let sum = 0
      this.productMoneyList.forEach(val => {
        sum += parseFloat(val.value || 0)
      })
      return sum + parseFloat(this.form.bdService || 0)
    }
  },
  created () {
    let viewWidth = document.documentElement.clientWidth
    if (viewWidth < 768) {
      this.labelWidth = '90px'
    }

    this.businessType = this.$route.query.data
    getByCode(this.businessType === 'ztc' ? 18 : 38).then(res => {
      this.form.productList = res.data.data
    })

    this.receiveData = this.$route.query.data
    if (!this.receiveData.id) {
      this.$router.go(-1)
      return
    }
    this._getLogs(this.receiveData.id)
  },
  mounted () {
  },
  methods: {
    _getLogs (id) {
      this.$get('/receipt.do?companyreceiptdetail', {id: id}).then(res => {
        this.logs = res.data[2].data
        this.receipt = res.data[0].data[0]
      })
    }
  },
  components: {
  }
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

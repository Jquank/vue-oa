<template>
  <div class="money-detail child-component-container media-padding">
    <div class="maxwidth">
      <el-form ref="form" :model="form" :label-width="labelWidth" size="small">
        <el-row>
          <el-col :md="24">
            <el-form-item label="公司名称/法人 :" prop="cusName">
              <el-input v-model="form.cusName" placeholder="公司名称/法人" class="input-btn"></el-input>
              <el-button @click.native="$router.go(-1)" type="warning">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="产品类型 :" prop="selProList">
              <el-checkbox-group @change="handleProChange" v-model="form.selProList">
                <el-checkbox v-for="(item,index) in form.productList" :key="index" :label="item">
                  {{item.code_desc}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="选择流水 :" required>
              <el-button @click.native="selFlowDialog = true" type="primary">选 择</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="流水信息 :">
              <el-table v-if="handleSelFlow.length" border :data="handleSelFlow" style="max-width: 400px;">
                <el-table-column prop="code_desc" label="银行类型">
                </el-table-column>
                <el-table-column prop="" label="金额">
                  <span slot-scope="scope">{{scope.row.split_amount | currency1}}</span>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-for="(item,index) in form.productMoneyList" :key="index">
          <el-col :md="24">
            <el-form-item :label="item.code_desc+' :'" class="product-name">
              <el-input v-model="item.value"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="服务费 :">
              <el-input v-model="form.serviceMoney"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="服务年限 :" required>
              <el-input v-model="form.serviceYear">
                <span slot="append">年</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 百推 -->
        <template v-if="businessType=='BT'">
          <el-row>
            <el-col :md="24">
              <el-form-item label="大搜现金券 :">
                <el-input v-model="form.ds_xjq"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="信息流现金券 :">
                <el-input v-model="form.xxl_xjq"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="大搜代金券 :">
                <el-input v-model="form.ds_djq"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="信息流代金券 :">
                <el-input v-model="form.xxl_djq"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="客户行业 :" required>
                <select-trade v-model="form.trade"></select-trade>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="核心业务 :" required>
                <el-input type="textarea" v-model="form.mainBusiness"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="网建类型 :">
                <el-radio-group v-model="form.websiteType">
                  <el-radio v-for="(item,index) in form.websiteTypeList" :key="index" :label="item.code_val+''">{{item.code_desc}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <!-- 直通车 -->
        <template v-if="businessType==='ZTC'">
          <el-row>
            <el-col :md="24">
              <el-form-item label="代金券 :">
                <el-input v-model="form.ztc_djq"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="现金券 :">
                <el-input v-model="form.ztc_xjq"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <el-row>
          <el-col :md="24">
            <el-form-item label="产品总金额 :">
              <span>{{proMoneyTotal}}</span>
            </el-form-item>
          </el-col>
        </el-row>
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
              <el-input v-model="form.remark" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="text-center">
          <el-button @click.native="subMoneyRecord" type="primary">提交</el-button>
        </div>
      </el-form>
    </div>

    <!-- 选择流水弹窗 -->
    <el-dialog :modal-append-to-body="false" title="选择流水" :visible.sync="selFlowDialog" width="650px">
      <el-table @selection-change="handleSelectionChange" stripe border :data="selFlowList" style="width: 100%;margin-top:10px;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="" label="金额">
          <span slot-scope="scope">{{scope.row.split_amount | currency1}}</span>
        </el-table-column>
        <el-table-column prop="code_desc" label="银行类型">
        </el-table-column>
        <el-table-column prop="" label="交易时间" width="150">
          <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="allocRemark" label="预留信息">
        </el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="url" :sendParams="sendParams" @updateList="getFlowList"></page>
      <div style="text-align:right;margin-top:10px;">
        <el-button @click.native="selFlowDialog = false" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Page from 'base/page/page'
import { getByCode } from 'api/getOptions'
import SelectTrade from 'base/selectTrade/selectTrade'
export default {
  data () {
    return {
      labelWidth: '160px',
      form: {
        cusName: '',
        productList: [],
        selProList: [],
        serviceMoney: 2400,
        serviceYear: 1,
        ds_xjq: 0,
        ds_djq: 0,
        xxl_xjq: 0,
        xxl_djq: 0,
        ztc_djq: 0,
        ztc_xjq: 0,
        remark: '',
        receiveMoneyTotal: 0,
        trade: [],
        mainBusiness: '',
        websiteType: '0',
        websiteTypeList: [],
        productMoneyList: []
      },

      selFlowDialog: false,
      selFlowList: [],
      checkedFlowIds: [],
      url: '/receipt.do?searchbankreceipt',
      sendParams: {},

      businessType: '',
      handleSelFlow: []
    }
  },
  computed: {
    proMoneyTotal () {
      let sum = 0
      this.form.productMoneyList.forEach(val => {
        sum += parseFloat(val.value || 0)
      })
      return sum + parseFloat(this.form.serviceMoney || 0)
    }
  },
  created () {
    let viewWidth = document.documentElement.clientWidth
    if (viewWidth < 768) {
      this.labelWidth = '90px'
    }

    this.businessType = this.$route.query.data.type
    if (!this.businessType) {
      this.$router.push('/indexPage/moneyRecord')
      return
    }
    let code = 38
    if (this.businessType === 'ZTC') {
      code = 18
    } else if (this.businessType === 'KA') {
      code = 98
    }
    getByCode(code).then(res => {
      this.form.productList = res.data.data
    })
    getByCode(28).then(res => {
      this.form.websiteTypeList = res.data.data
    })
  },
  methods: {
    // 提交
    _getMessage (num) {
      this.form.productMoneyList.forEach(val => {
        if (val.type !== num && (!val.value || val.value === '0')) {
          this.$message({
            type: 'warning',
            message: '请填写 ' + val.code_desc + ' 金额'
          })
          throw new Error('ignore')
        }
        if (val.type === num && val.value === '') {
          this.$message({
            type: 'warning',
            message: '请填写 ' + val.code_desc + ' 金额'
          })
          throw new Error('ignore')
        }
      })
    },
    subMoneyRecord () {
      if (this.businessType === 'BT') {
        this._getMessage(8)
      } else if (this.businessType === 'ZTC') {
        this._getMessage(58)
      }
      let params = {
        name: this.form.cusName,
        service: this.form.serviceMoney || 0,
        serviceyear: this.form.serviceYear || 0,
        xxlvoucher: this.form.xxl_djq || 0, // 信息流代金券
        dsvoucher: this.form.ds_djq || 0,
        xxlxjq: this.form.xxl_xjq || 0, // 信息流现金券
        dsxjq: this.form.ds_xjq || 0,
        ztcvoucher: this.form.ztc_djq || 0,
        ztcxjq: this.form.ztc_xjq || 0,
        detail: this.form.productMoneyList,
        sum: this.form.receiveMoneyTotal, // 勾选总金额
        receiveid: this.checkedFlowIds, // 到款id
        remark: this.form.remark, // 到款备注
        business: this.form.mainBusiness,
        websitetype: this.form.websiteType,
        cat: this.form.trade[1],
        receiveArr: this.handleSelFlow
      }
      if (!params.name || !params.receiveid.length === 0) {
        this.$message({
          type: 'warning',
          message: '请完善必填项或必选项'
        })
        return
      }
      if (this.form.receiveMoneyTotal.toFixed(2) !== this.proMoneyTotal.toFixed(2)) {
        this.$message({
          type: 'warning',
          message: '请保持产品总金额与到款金额一致！'
        })
        return
      }
      this.$post('/receipt.do?companyReceive2', params).then(res => {
        if (res.data.success || res.data[0].data) {
          this.$message({
            type: 'success',
            message: '添加到款成功'
          })
          this.$router.push({
            path: '/indexPage/moneyRecord',
            query: {data: 'fromDetail'}
          })
        }
      })
    },
    // 勾选产品
    handleProChange (val) {
      this.form.productMoneyList = []
      val.forEach(item => {
        this.form.productMoneyList.push({
          id: null,
          code_desc: item.code_desc,
          type: item.code_val,
          value: 0
        })
      })
    },
    // 勾选流水
    handleSelectionChange (val) {
      this.handleSelFlow = val
      this.form.receiveMoneyTotal = 0
      this.checkedFlowIds = []
      this.handleSelFlow.forEach(val => {
        this.form.receiveMoneyTotal += parseFloat(val.split_amount || 0)
        this.checkedFlowIds.push(val.id)
      })
      this.handleSelFlow.sort(function (a, b) {
        var value1 = a.insert_time
        var value2 = b.insert_time
        if (value1 > value2) {
          return 1
        } else if (value1 < value2) {
          return -1
        } else {
          return -1
        }
      })
    },
    getFlowList (res) {
      this.selFlowList = res.data[0].data
    }
  },
  components: {
    Page,
    SelectTrade
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

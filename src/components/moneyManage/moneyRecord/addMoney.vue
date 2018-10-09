<template>
  <div class="money-detail child-component-container media-padding">
    <div class="maxwidth">
      <el-form ref="form" :model="form" :label-width="labelWidth" size="small">
        <el-row>
          <el-col :md="24">
            <el-form-item label="公司名称/法人 :" required>
              <el-input v-model="form.cusName" placeholder="公司名称/法人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="产品类型 :" required>
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
              <el-button @click.native="selFlowDialog = true" type="warning">选 择</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="流水信息 :" required>
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
        <el-row v-for="(item,index) in productMoneyList" :key="index">
          <el-col :md="24">
            <el-form-item :label="item.code_desc+' :'" class="product-name">
              <el-input v-model="item.value"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 百推 -->
        <template v-if="businessType!=='ztc'">
          <el-row>
            <el-col :md="24">
              <el-form-item label="百度服务费 :">
                <el-input v-model="form.bdService"></el-input>
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
              <el-form-item label="产品总金额 :">
                <span>{{proMoneyTotal}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <!-- 直通车 -->
        <template v-if="businessType==='ztc'">
          <el-row>
            <el-col :md="24">
              <el-form-item label="直通车服务费 :">
                <el-input v-model="form.ztcService"></el-input>
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
          <el-row>
            <el-col :md="24">
              <el-form-item label="直通车代金券 :">
                <el-input v-model="form.ztc_djq"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="产品总金额 :">
                <span>{{proMoneyTotal}}</span>
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
    <el-dialog :modal-append-to-body="false" title="分配合同" :visible.sync="selFlowDialog" width="600px">
      <el-table @selection-change="handleSelectionChange" stripe border :data="selFlowList" style="width: 100%;margin-top:10px;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="" label="金额">
          <span slot-scope="scope">{{scope.row.split_amount | currency1}}</span>
        </el-table-column>
        <el-table-column prop="code_desc" label="银行类型">
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

      selFlowDialog: false,
      selFlowList: [],
      checkedFlowIds: [],
      url: '/receipt.do?searchbankreceipt',
      sendParams: {},

      businessType: '',
      handleSelFlow: [],
      productMoneyList: []
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

    this.businessType = this.$route.query.data.type
    getByCode(this.businessType === 'ztc' ? 18 : 38).then(res => {
      this.form.productList = res.data.data
    })
  },
  mounted () {
    this._getNum()
  },
  methods: {
    // 提交
    subMoneyRecord () {
      let proMoneySum = 0
      this.productMoneyList.forEach(val => {
        proMoneySum += parseFloat(val.value || 0)
        if (val.type !== 8 && (!val.value || val.value === '0')) {
          this.$message({
            type: 'warning',
            message: '请填写 ' + val.code_desc + ' 金额'
          })
          throw new Error('ignore')
        }
        if (val.type === 8 && val.value === '') {
          this.$message({
            type: 'warning',
            message: '请填写 ' + val.code_desc + ' 金额'
          })
          throw new Error('ignore')
        }
      })
      let params = {
        name: this.form.cusName,
        service: this.form.bdService || 0,
        serviceyear: this.form.serviceYear || 0,
        xxlvoucher: this.form.xxl_djq || 0, // 信息流代金券
        dsvoucher: this.form.ds_djq || 0,
        xxlxjq: this.form.xxl_xjq || 0, // 信息流现金券
        dsxjq: this.form.ds_xjq || 0,
        detail: this.productMoneyList,
        sum: proMoneySum, // 勾选总金额
        receiveid: this.checkedFlowIds, // 到款id
        remark: this.form.remark // 到款备注
      }
      let ztcParams = {
        name: this.form.cusName,
        service: this.form.bdService || 0,
        serviceyear: this.form.serviceYear || 0,
        ztcvoucher: this.form.ztc_djq || 0,
        ztcxjq: 0,
        detail: this.productMoneyList,
        sum: proMoneySum,
        receiveid: this.checkedFlowIds,
        remark: this.form.remark
      }
      if (!params.name || !params.receiveid.length === 0) {
        this.$message({
          type: 'warning',
          message: '请完善必填项或必选项'
        })
        return
      }
      if (this.form.receiveMoneyTotal !== this.proMoneyTotal) {
        this.$message({
          type: 'warning',
          message: '请保持产品总金额与到款金额一致！'
        })
        return
      }
      console.log(params)
      return
      this.$post('/receipt.do?companyreceipt', this.businessType === 'ztc' ? ztcParams : params).then(res => {
        if (res.data[0].data) {
          this.$message({
            type: 'success',
            message: '添加到款成功'
          })
          this.$router.go(-1)
        }
      })
    },
    // 勾选产品
    handleProChange (val) {
      this.productMoneyList = []
      val.forEach(item => {
        this.productMoneyList.push({
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
    },
    getFlowList (res) {
      this.selFlowList = res.data[0].data
    }
  },
  components: {
    Page
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

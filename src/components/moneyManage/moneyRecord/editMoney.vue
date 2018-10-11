<template>
  <div class="money-detail child-component-container media-padding">
    <div class="maxwidth">
      <el-form ref="form" :model="receipt" :label-width="labelWidth" size="small">
        <el-row>
          <el-col :md="24">
            <el-form-item label="公司名称/法人 :" required>
              <el-input v-model="receipt.companyname" placeholder="公司名称/法人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="产品类型 :" required>
              <el-checkbox-group @change="handleProChange" v-model="selProList">
                <el-checkbox v-for="(item,index) in productList" :key="index" :label="item.code_val">
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
        <el-row>
          <el-col :md="24">
            <el-form-item label="服务费 :">
              <el-input v-model="receipt.service"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="服务年限 :">
              <el-input v-model="receipt.serviceyear">
                <span slot="append">年</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 百推 -->
        <template v-if="businessType!=='ztc'">
          <el-row v-for="(item,index) in productMoneyList" :key="index">
            <el-col :md="24" v-if="item.type<100">
              <el-form-item :label="item.type | productType(' :')" class="product-name">
                <el-input v-model="item.value"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
          <el-row v-for="(item,index) in productMoneyList" :key="index">
            <el-col :md="24" v-if="item.type<100">
              <el-form-item :label="item.type | productType18(' :')" class="product-name">
                <el-input v-model="item.value"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
            <el-form-item label="产品总金额 :">
              <span>{{proMoneyTotal}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <el-form-item label="总到款金额 :">
              <span>{{receiveMoneyTotal}}</span>
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
      selFlowDialog: false,
      selFlowList: [],
      checkedFlowIds: [],
      url: '/receipt.do?searchbankreceipt',
      sendParams: {},

      businessType: '',
      handleSelFlow: [],
      echoProductMoneyList: [],
      productMoneyList: [],

      receiveData: {},
      receipt: {},
      productList: [],
      selProList: [],
      echoFlowList: [],
      receiveMoneyTotal: 0,
      userReceiveCid: ''
    }
  },
  computed: {
    proMoneyTotal () {
      let sum = 0
      this.productMoneyList.forEach(val => {
        if (val.type < 100) {
          sum += parseFloat(val.value || 0)
        }
      })
      return sum + parseFloat(this.receipt.service || 0)
    }
  },
  created () {
    let viewWidth = document.documentElement.clientWidth
    if (viewWidth < 768) {
      this.labelWidth = '90px'
    }

    this.businessType = this.$route.query.type
    this.receiveData = this.$route.query.data
    if (!this.receiveData.id) {
      this.$router.go(-1)
      return
    }
    getByCode(this.businessType === 'ztc' ? 18 : 38).then(res => {
      this.productList = res.data.data
    })
    this._getLogs(this.receiveData.id)
  },
  methods: {
    _getLogs (id) {
      this.$get('/receipt.do?companyreceiptdetail', { id: id }).then(res => {
        this.receipt = res.data[0].data[0]
        this.echoProductMoneyList = res.data[1].data
        this.productMoneyList = this.productMoneyList.concat(
          this.echoProductMoneyList
        )
        this.echoFlowList = res.data[3].data
        this.handleSelFlow = this.handleSelFlow.concat(this.echoFlowList)
        this.checkedFlowIds = []
        this.handleSelFlow.forEach(val => {
          this.receiveMoneyTotal += parseFloat(val.split_amount || 0)
          if (val.cid) {
            this.userReceiveCid = val.cid
          }
          this.checkedFlowIds.push(val.id)
        })
        this.productMoneyList.forEach(val => {
          this.selProList.push(+val.type)
        })
      })
    },
    // 勾选产品
    handleProChange (val) {
      console.log(val)
      console.log(this.echoProductMoneyList)
      this.productMoneyList = []
      val.forEach(item => {
        this.productMoneyList.push({
          id: null,
          code_desc: '',
          code_val: item,
          type: item + '',
          value: 0,
          price: 0
        })
      })
      this.echoProductMoneyList.forEach(li => {
        this.productMoneyList.forEach((item, key) => {
          // 保留回显数组
          if (li.type == item.type) { //eslint-disable-line
            this.productMoneyList.splice(key, 1)
            this.productMoneyList.push(li)
          }
        })
      })

      console.log(this.productMoneyList)
    },
    // 勾选流水
    handleSelectionChange (val) {
      this.handleSelFlow = this.echoFlowList
      this.handleSelFlow = this.handleSelFlow.concat(val)
      this.receiveMoneyTotal = 0
      this.checkedFlowIds = []
      this.handleSelFlow.forEach(val => {
        this.receiveMoneyTotal += parseFloat(val.split_amount || 0)
        this.checkedFlowIds.push(val.id)
      })
      console.log(this.checkedFlowIds)
    },
    // todo 编辑有问题
    // 提交
    subMoneyRecord () {
      console.log(this.productMoneyList)
      this.productMoneyList.forEach(val => {
        if (val.type != 8 && (!val.value || val.value === '0')) { //eslint-disable-line
          this.$message({
            type: 'warning',
            message: '请填写 ' + val.code_desc + ' 金额'
          })
          throw new Error('ignore')
        }
        if (val.type == 8 && val.value === '') { //eslint-disable-line
          this.$message({
            type: 'warning',
            message: '请填写 ' + val.code_desc + ' 金额'
          })
          throw new Error('ignore')
        }
      })
      let params = {
        id: this.receiveData.id,
        name: this.receipt.companyname,
        service: this.receipt.service || 0,
        serviceyear: this.receipt.serviceyear || 0,
        xxlvoucher: this.receipt.xxlvoucher || 0, // 信息流代金券
        dsvoucher: this.receipt.dsvoucher || 0,
        xxlxjq: this.receipt.xxlxjq || 0, // 信息流现金券
        dsxjq: this.receipt.dsxjq || 0,
        detail: this.productMoneyList,
        sum: this.receiveMoneyTotal, // 总到款金额
        receiveid: this.checkedFlowIds, // 到款id
        remark: this.receipt.remark, // 到款备注
        userReceiveCid: this.userReceiveCid,
        companylogid: this.receipt.companylogid || ''
      }
      let ztcParams = {
        id: this.receiveData.id,
        name: this.receipt.companyname,
        service: this.receipt.service || 0,
        serviceyear: this.receipt.serviceyear || 0,
        ztcvoucher: this.receipt.ztcvoucher || 0,
        ztcxjq: 0,
        detail: this.productMoneyList,
        sum: this.receiveMoneyTotal,
        receiveid: this.checkedFlowIds,
        remark: this.receipt.remark,
        userReceiveCid: this.userReceiveCid,
        companylogid: this.receipt.companylogid || ''
      }
      if (!params.name || !params.receiveid.length === 0) {
        this.$message({
          type: 'warning',
          message: '请完善必填项或必选项'
        })
        return
      }
      if (this.receiveMoneyTotal !== this.proMoneyTotal) {
        this.$message({
          type: 'warning',
          message: '请保持产品总金额与到款金额一致！'
        })
        return
      }
      console.log(params)
      this.$post(
        '/receipt.do?companyreceipt',
        this.businessType === 'ztc' ? ztcParams : params
      ).then(res => {
        if (res.data[0].data) {
          this.$message({
            type: 'success',
            message: '修改到款成功'
          })
          this.$router.push('/moneyRecord')
        }
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

<template>
  <div class="renew-apply component-container media-padding">
    <el-form :model="form" :label-width="leftLabelWidth">
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="公司名称 :" required>
            <el-input v-model="form.comName" disabled placeholder="公司名称" class="input-btn"></el-input>
            <el-button @click.native="selCompanyDialog = true" type="primary">选 择</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="流水 :" required>
            <el-button @click.native="selFlow" type="primary">选 择</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24">
          <el-form-item label="流水信息 :" required>
            <el-table border :data="handleSelFlow" style="max-width: 400px;">
              <el-table-column prop="code_desc" label="到款方式">
              </el-table-column>
              <el-table-column prop="" label="到款时间" width="135">
                <span slot-scope="scope">{{scope.row.tm | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="" label="金额">
                <span slot-scope="scope">{{scope.row.split_amount | currency1}}</span>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 新旧合同 -->
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="合同编号:">
            <el-tabs v-model="contractTab" @tab-click="handleTabClick">
              <el-tab-pane label="新合同" name="new">
                <el-row :gutter="5" type="flex" style="flex-wrap:wrap;">
                  <el-col :md="8">
                    <el-select v-model="form.bdOrderNumber" placeholder="百度推广服务订单编号">
                      <el-option label="百度推广服务合同" value="0"></el-option>
                      <el-option v-for="(contract0,index) in contract.newBdOrderNumber" :key="index" :label="contract0.number" :value="contract0.id"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="旧合同" name="old">
                <el-row :gutter="5" type="flex" style="flex-wrap:wrap;">
                  <el-col :md="8">
                    <el-select v-model="form.bdOrderNumber" placeholder="百度推广服务订单编号">
                      <el-option label="百度推广服务订单编号" value="0"></el-option>
                      <el-option v-for="(contract1,index) in contract.bdOrderNumber" :key="index" :label="contract1.number" :value="contract1.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :md="8">
                    <el-select v-model="form.bdProxy" @change="selProxy(form.bdProxy)" placeholder="百度推广首消授权书">
                      <el-option label="百度推广首消授权书" value="0"></el-option>
                      <el-option label="无首消授权书" value="no_proxy20180625160112"></el-option>
                      <el-option v-for="(contract2,index) in contract.bdProxy" :key="index" :label="contract2.number" :value="contract2.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :md="8">
                    <el-select v-model="form.bdServiceProtocol" placeholder="百度推广服务协议">
                      <el-option label="百度推广服务协议" value="0"></el-option>
                      <el-option v-for="(contract3,index) in contract.bdServiceProtocol" :key="index" :label="contract3.number" :value="contract3.id"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="值班加款 :" required>
            <el-radio v-model="form.holiday" label="10">是</el-radio>
            <el-radio v-model="form.holiday" label="0">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="加款类型 :" required>
            <el-radio v-model="form.addType" label="10">正常加款</el-radio>
            <el-radio v-model="form.addType" label="20">提前加款</el-radio>
            <el-radio v-model="form.addType" label="30">返款加款</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="特殊情况 :" required>
            <el-radio v-model="form.activityType" label="20">渠道</el-radio>
            <el-radio v-model="form.activityType" label="30">分公司</el-radio>
            <span class="red ml10px">( 请慎重选择此项！)</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="是否需要发票 :" required>
            <el-radio v-model="form.isNeedInvoice" label="-10">不再需要</el-radio>
            <el-radio v-model="form.isNeedInvoice" label="-1">本月暂不需要</el-radio>
            <el-radio v-model="form.isNeedInvoice" label="0">需要(有效期3个月)</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="百度账号 :" required>
            <el-input v-model="form.bdAccount" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="用户ID :">
            <el-input v-model="form.userID" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="SF账号 :">
            <el-input v-model="form.sfAccount" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="产品类型 :" required>
            <el-checkbox-group @change="handleProChange" v-model="form.selProList">
              <el-checkbox v-for="(item,index) in form.productList" :key="index" :label="item">
                {{item.code_desc}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="大搜服务费 :" required>
            <el-input v-model="form.dsService" placeholder="大搜服务费"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="服务费期限 :" required>
            <el-input v-model="form.serviceYear" placeholder="服务费期限">
              <template slot="append">年</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="到款总金额 :">
            <span>{{form.receiveTotal | currency1}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="加款总金额 :">
            <span>{{form.addTotal | currency1}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth">
          <el-form-item label="填写备注 :">
            <el-input v-model="form.remark" rows="3" type="textarea" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" class="maxwidth" style="text-align:right">
          <el-form-item>
            <el-button type="primary" @click="submit">提 交</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 选择公司弹窗 -->
    <el-dialog title="选择公司" :visible.sync="selCompanyDialog" width="550px">
      <el-input @click.native="searchService($event)" @keyup.enter.native="searchService($event,'enter')" v-model="companyName" placeholder="搜索公司名">
        <span slot="append" class="search-service">搜索</span>
      </el-input>
      <el-table id="cus-out-table" :data="companyList" class="table-width">
        <el-table-column prop="name" label="公司名称" min-width="140">
        </el-table-column>
        <el-table-column prop="baiducount" label="百度账号">
        </el-table-column>
        <el-table-column prop="" label="操作" width="60">
          <template slot-scope="scope">
            <el-button @click.native="selCompany(scope.row)" type="primary" class="xsbtn">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="companyUrl" :sendParams="companyParams" @updateList="getCompanyList"></page>
    </el-dialog>

    <!-- 选择流水弹窗 -->
    <el-dialog :modal-append-to-body="false" title="分配合同" :visible.sync="selFlowDialog" width="600px">
      <el-table @selection-change="handleSelectionChange" stripe border :data="selFlowList">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="code_desc" label="银行类型">
        </el-table-column>
        <el-table-column prop="" label="时间">
          <span slot-scope="scope">{{scope.row.tm | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="allocRemark" label="预留信息">
        </el-table-column>
        <el-table-column prop="" label="金额">
          <span slot-scope="scope">{{scope.row.split_amount | currency1}}</span>
        </el-table-column>
        <el-table-column prop="alloc_remark" label="备注">
        </el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="selFlowUrl" :sendParams="selFlowParams" @updateList="getFlowList"></page>
      <div class="text-right mt10px">
        <el-button @click.native="selFlowDialog = false" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Page from 'base/page/page'
import { getByCode, getMyContract } from 'api/getOptions'
import cookie from 'js-cookie'
export default {
  data () {
    return {
      USER_ID: cookie.get('userId'),
      leftLabelWidth: '120px',
      form: {
        comName: '',
        addType: '10',
        activityType: '',
        isNeedInvoice: '',
        bdAccount: '',
        userID: '',
        sfAccount: '',
        productType: [],
        dsService: '',
        serviceYear: '',
        receiveTotal: 0,
        addTotal: '',
        remark: '',
        holiday: '0',
        productList: []
      },
      selCompanyDialog: false,
      companyName: '',
      companyList: [],
      companyUrl: '/Renew.do?get',
      companyParams: {},
      companyid: '',
      selFlowDialog: false,
      selFlowList: [],
      selFlowUrl: '/receipt.do?searchbankclaim',
      selFlowParams: {
        companyid: ''
      },
      handleSelFlow: [],

      contractTab: 'new',
      contract: {
        newBdOrderNumber: [],
        bdOrderNumber: [],
        bdProxy: [],
        bdServiceProtocol: [],
        bdXXLProtocol: [],
        wjContract: []
      }
    }
  },
  created () {
    let viewWidth = document.documentElement.clientWidth
    if (viewWidth && viewWidth < 768) {
      this.leftLabelWidth = '50px'
    }
    getByCode(38).then(res => {
      this.form.productList = res.data.data
    })
  },
  mounted () {
    this._getMyContract()
  },
  methods: {
    // 勾选产品
    handleProChange (val) {
      // this.productMoneyList = []
      // val.forEach(item => {
      //   this.productMoneyList.push({
      //     id: null,
      //     code_desc: item.code_desc,
      //     type: item.code_val,
      //     value: 0
      //   })
      // })
    },
    // 勾选流水
    handleSelectionChange (val) {
      this.handleSelFlow = val
      // this.form.receiveMoneyTotal = 0
      // this.checkedFlowIds = []
      // this.handleSelFlow.forEach(val => {
      //   this.form.receiveMoneyTotal += parseFloat(val.split_amount || 0)
      //   this.checkedFlowIds.push(val.id)
      // })
    },
    selFlow () {
      this.selFlowDialog = true
      this.selFlowParams = {
        companyid: this.companyid
      }
    },
    selCompany (val) {
      this.selCompanyDialog = false
      this.form.comName = val.name
      this.companyid = val.companyid
    },
    searchService (e, type) {
      if (type === 'enter' || e.target.nodeName !== 'INPUT') {
        this.companyParams = {
          companyname: this.companyName
        }
      }
    },
    submit () {},
    // 新旧合同切换
    handleTabClick (val) {
      console.log(val)
    },
    _getMyContract () {
      getMyContract('CONTRACT_BJHT', this.USER_ID).then(res => {
        this.contract.newBdOrderNumber = res.data[0].data
      })
      getMyContract('CONTRACT_BTDD', this.USER_ID).then(res => {
        this.contract.bdOrderNumber = res.data[0].data
      })
      getMyContract('CONTRACT_BTSQ', this.USER_ID).then(res => {
        this.contract.bdProxy = res.data[0].data
      })
      getMyContract('CONTRACT_BTXY', this.USER_ID).then(res => {
        this.contract.bdServiceProtocol = res.data[0].data
      })
    },
    getCompanyList (res) {
      this.companyList = res.data[0].data
    },
    getFlowList (res) {
      this.selFlowList = res.data[0].data
    }
  },
  components: { Page }
}
</script>

<style lang="less" scoped>
.renew-apply {
  .maxwidth {
    max-width: 800px;
  }
  .input-btn {
    width: calc(~'(100% - 70px)');
  }
  .search-service {
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
</style>

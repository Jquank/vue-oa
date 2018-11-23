<template>
  <div class="addbaidu-order component-container media-padding">
    <div class="order-content">
      <el-form ref="form" :model="form" :label-width="labelWidth">
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="公司名称:" required>
              <el-input v-model="form.cName" class="input-btn" disabled placeholder="点击选择按钮选择公司"></el-input>
              <el-button type="primary" @click.native="selCompany" v-if="showEditKA">选择</el-button>
              <el-button type="warning" @click.native="$router.go(-1)" v-else>返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="到款记录:" required v-if="showEditKA">
              <el-select v-model="form.record" value-key="id" placeholder="请选择到款记录">
                <el-option v-for="(r,index) in moneyRecord.recordList" :key="index" :label="r[0].companyname" :value="r"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="客户网站信息:" class="web-info">
              <el-row :gutter="5" type="flex" style="flex-wrap:wrap;">
                <el-col :md="12">
                  <el-input v-model="form.pcWeb" placeholder="pc端网址"></el-input>
                </el-col>
                <el-col :md="12">
                  <el-input v-model="form.phoneWeb" placeholder="手机端网址"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="联系人信息:" required>
              <el-row v-for="(item,index) in form.contactList" :key="index" :class="{'mt10px':index!==0}" :gutter="5" type="flex" style="flex-wrap:wrap;">
                <el-col :md="5">
                  <el-input v-model="item.name" placeholder="联系人"></el-input>
                </el-col>
                <el-col :md="7">
                  <el-input v-model="item.contact" placeholder="手机号码"></el-input>
                </el-col>
                <el-col :md="5">
                  <el-input v-model="item.fixedNumber" placeholder="座机号码"></el-input>
                </el-col>
                <el-col :md="5">
                  <el-input v-model="item.email" placeholder="邮箱"></el-input>
                </el-col>
                <el-col :md="2">
                  <el-button :type="index===0?'success':'danger'" size="mini" circle class="ml10px" :icon="index===0?isPlusIcon:isMinusIcon" @click.native="addContact(index)"></el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="showEditKA">
          <el-col :md="24" class="maxwidth">
            <el-form-item label="客户地址:" required>
              <el-input v-model="form.cusAddress" placeholder="客户地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="客户类型:" required>
              <el-radio-group v-model="form.cusType">
                <el-radio label="0">新客户</el-radio>
                <el-radio label="1">老客户</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="是否需要发票:" required>
              <el-radio-group v-model="form.isInvoice">
                <el-radio label="-10">不再需要</el-radio>
                <el-radio label="-1">本月暂不需要</el-radio>
                <el-radio label="0">需要(有效期3个月)</el-radio>
                <el-radio label="10">已开发票</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="合同信息:">
              <el-input v-model="form.contractRemark" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="商务信息:">
              <el-input v-model="form.shangWuName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <!-- 百度订单详情   -->
            <el-form-item label="订单详情:" required>
              <el-tabs type="border-card">
                <!-- 到款记录 -->
                <el-tab-pane label="到款记录">
                  <el-card shadow="always" class="card-tips" v-if="!form.record.length && showEditKA">
                    [说明]：请选择到款记录。
                  </el-card>
                  <el-card shadow="always" class="card-money-record" v-if="form.record.length">
                    <el-row>
                      <b>公司名称（法人）：</b>
                      <span>{{form.record[0].companyname}}</span>
                    </el-row>
                    <el-row>
                      <b>到款金额 ：</b>
                      <span>{{form.record[0].sum | currency1}}</span>
                    </el-row>
                    <el-row>
                      <b>服务费 ：</b>
                      <span>{{form.record[0].service | currency1}}</span>
                    </el-row>
                    <el-row>
                      <b>到款时间 ：</b>
                      <span>{{form.record[0].inserttime | timeFormat}}</span>
                    </el-row>
                    <!-- <el-row><b>到款时间 ：</b><span>{{222}}</span></el-row> -->
                    <el-row v-for="(rec,index) in recordDetail" :key="index">
                      <template v-if="rec.type<500 && rec.type!=8">
                        <b>{{rec.type | productType}} ：</b>
                        <span>{{rec.value | currency1}}</span>
                      </template>
                    </el-row>
                  </el-card>
                </el-tab-pane>
              </el-tabs>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="">
              <el-row style="text-align:right;">
                <!-- <el-button type="warning" @click.native="subOrder('0')">仅降E</el-button> -->
                <el-button type="primary" @click.native="subOrder('10')">降E并提单</el-button>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 选择公司弹窗 -->
      <el-dialog title="选择下单客户" :visible.sync="comDialog.selCompanyDialog" width="650px">
        <el-input placeholder="请输入公司名进行搜索" v-model="comDialog.handleCompanyName">
          <el-button @click.native="searchCompany(comDialog.handleCompanyName)" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-table :data=comDialog.myCompany class="mt10px">
          <el-table-column property="name" label="客户名称" min-width="200"></el-table-column>
          <el-table-column property="" label="客户类型" width="100">
            <span slot-scope="scope">{{scope.row.producttype | cusStatus}}</span>
          </el-table-column>
          <el-table-column property="username" label="所属商务" width="80"></el-table-column>
          <el-table-column property="pid" label="产品类型" width="80"></el-table-column>
          <el-table-column property="" label="操作">
            <template slot-scope="scope">
              <el-button @click.native="handleSelCompany(scope.row)" type="primary" class="xsbtn">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <page class="pagination" :url="comDialog.url" :sendParams="comDialog.params" @updateList="updateMyCompanyList" :key="comDialog.key">
        </page>
      </el-dialog>

    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Page from 'base/page/page'
import { getByCode } from 'api/getOptions' //eslint-disable-line
import cookie from 'js-cookie'
import { orderMixin, mobileFit } from 'common/js/mixin'

const ORDER_TYPE = 'KA'

export default {
  mixins: [orderMixin, mobileFit],
  props: {
    showEditKA: {
      // false表示跳转编辑订单页
      type: Boolean,
      default: true
    },
    editData: {
      // 编辑页传过来的回显数据
      type: Object,
      default: function () {
        return {}
      }
    },
    showQualify: { // 获取回显时原有的资质
      type: Array,
      default: function () {
        return []
      }
    },
    deledQualify: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      labelWidth: '110px',
      record_detail: [], // 回显到款记录
      ONLY_E: true,
      headers: '',
      fileList: [],
      USER_ID: cookie.get('userId'),
      qualifyType: [],
      form: {
        contractRemark: '',
        cName: '',
        record: [{}],
        pcWeb: '',
        phoneWeb: '',
        contactList: [
          {
            contactid: '',
            name: '',
            contact: '',
            fixedNumber: '',
            email: ''
          }
        ],
        cusAddress: '',
        cusType: '0',
        isInvoice: '0',
        shangWuName: '',
        zizhiName: '',
        zizhiList: []
      },
      // qualifyUploaded: [], // 上传的资质照
      isPlusIcon: 'el-icon-plus',
      isMinusIcon: 'el-icon-minus',
      comDialog: {
        selCompanyDialog: false,
        handleCompanyName: '',
        myCompany: [],
        url: '/order.do?Add',
        params: { pid: ORDER_TYPE },
        key: ''
      },
      moneyRecord: {
        cid: '',
        companylogid: '',
        uid: '',
        recordList: []
      },
      contract: {
        wjContract: []
      },
      cpid: '',
      companyData: {},
      rowData: {}, // 资质表格一行的数据
      selectedQualify: {},
      sPid: 'GD'
    }
  },
  computed: {
    qualifyUploaded () { // 存放已上传的资质list
      return this.showQualify // 默认资质list
    },
    recordDetail () {
      if (this.showEditKA) {
        let x = this.form.record.slice(1)
        return x
      } else {
        return this.record_detail
      }
    }
    // ...mapGetters([
    //   'productType'
    // ])
  },
  watch: {
    editData (newval) {
      if (!this.showEditKA) {
        console.log(newval)
        this.form.contractRemark = newval.remark
        this.form.cName = newval.cusName
        this.form.pcWeb = newval.pcsite
        this.form.phoneWeb = newval.wapsite
        this.form.cusAddress = newval.addr
        this.form.cusType = newval.cusType + ''
        this.form.isInvoice = newval.isInvoice + ''
        this.form.shangWuName = newval.user_name
        this.form.zizhiList = [] // 清空默认资质列表
        this.form.record = newval.record
        this.record_detail = newval.recordDetail
        this.form.contactList = JSON.parse(JSON.stringify(newval.contacts))
        // 更改contactList中对象的key
        let keyMap = {
          companylogid: 'contactid',
          contactname: 'name',
          contactnumber: 'contact',
          telphone: 'fixedNumber',
          mailnumber: 'email'
        }
        this.form.contactList.forEach(val => {
          for (let key in val) {
            if (keyMap[key]) {
              val[keyMap[key]] = val[key] || ''
              delete val[key]
            }
          }
        })
        console.log(newval)
      }
    }
  },
  created () {
    this._labelWidth(50) // 移动端labelWidth 50px
    this._getwjType(28) // 获取网建产品类型
  },
  mounted () {
    this._getMyContract('CONTRACT_BJHT', 'CONTRACT_BTDD', 'CONTRACT_BTSQ', 'CONTRACT_BTXY')
    this._getQualifyType(32) // 执照list

    // console.log(this.productType)
  },
  methods: {
    // 提交订单
    subOrder (subType) {
      if (!this.form.record) {
        this.$message({
          type: 'error',
          message: '请选择到款'
        })
        return
      }
      this.form.contactList.forEach(val => {
        val.companylogid = this.showEditKA ? this.companyData.companylogid : this.editData.rowData.companylogid
        val.contactname = val.name
        val.contactnumber = val.contact
        val.mailnumber = val.email
        val.telphone = val.fixedNumber
      })
      let _params = {
        cid: this.companyData.id || this.editData.cid,
        uid: this.showEditKA ? this.USER_ID : this.editData.uid, // 新增和编辑订单都取下单人id
        pcsite: this.form.pcWeb,
        wapsite: this.form.phoneWeb,
        cusName: this.companyData.name || this.editData.cusName, // 公司名
        addr: this.form.cusAddress,
        contacts: this.form.contactList,
        order_status: '',
        user_name: this.companyData.username || this.editData.user_name// 下单人
      }
      let params = {
        cpid: this.cpid || this.editData.rowData.cpid,
        order_id: this.editData.order_id || '',
        companyid: this.companyData.id || this.editData.rowData.companyid,
        companylogid: this.showEditKA ? this.companyData.companylogid : this.editData.rowData.companylogid,
        yn: 1,
        sn: 10,
        pid: this.sPid,
        curId: this.showEditKA ? this.form.record[0].id : this.editData.record[0].id, // 到款id
        companycontact: this.form.contactList, // 联系人
        con_id: '', // 合同
        con_id2: '',
        con_id3: '',
        custom_type: this.form.cusType, // 客户类型
        invoice_status: this.form.isInvoice, // 发票
        amount: this.showEditKA ? this.form.record[0].service : this.editData.record[0].service,
        amount_real: this.showEditKA ? this.form.record[0].sum : this.editData.record[0].sum,
        audittype: subType, // 0:仅降E 10：降E并提单
        pcwebsite: this.form.pcWeb, // PC站
        mobilewebsite: this.form.phoneWeb, // 手机站
        companyaddress: this.showEditKA ? this.form.cusAddress : this.editData.addr, // 公司地址
        company_attr: this.qualifyUploaded.concat(this.deledQualify), // 公司属性(已上传资质)
        remark: '',
        order_attr: [], // 订单属性
        from_val: _params, // what?
        baitui_remark: '',
        voucher: '0', // 代金券
        receiveaccount: '', // 对公账户,
        receivebank: '', // 对公账户开户行
        remark_order: this.contractRemark
      }
      if (!params.companyid || !params.curId || !params.companyaddress) {
        this.$message({
          type: 'error',
          message: '请完善带*号必填项'
        })
        return
      }
      this.form.contactList.forEach(val => {
        if (!val.contactname || !val.contactnumber) {
          this.$message({
            type: 'error',
            message: '请完善联系人信息'
          })
          throw new Error('ignore')
        }
      })
      console.log(params)
      this.$post('/wf.do?go', params).then(res => {
        if (res.data[0].success) {
          this.$router.push({
            path: '/indexPage/orderPending',
            query: { data: 'fromDetail' }
          })
        }
      })
    },
    // 选择公司弹窗
    selCompany () {
      this.comDialog.selCompanyDialog = true
      this.comDialog.key = '' + new Date()
    },
    // 选择具体公司
    handleSelCompany (company) {
      this.companyData = company
      this.sPid = company.pid
      this.form.shangWuName = company.username
      this.moneyRecord.cid = company.id
      this.moneyRecord.companylogid = company.companylogid
      // this.moneyRecord.uid = company.userid
      this.moneyRecord.uid = this.USER_ID
      this.form.cName = company.name
      this.comDialog.selCompanyDialog = false
      this.$message({
        message: `成功选择：${company.name}`,
        type: 'success'
      })
      this._getMoneyRecord()
      this._getContactName()
    },
    // 获取到款记录 和 客户地址 cpid
    _getMoneyRecord () {
      let moneyRecordUrl = '/wf.do?set'
      let moneyRecordParams = {
        cid: this.moneyRecord.cid,
        companylogid: this.moneyRecord.companylogid,
        uid: this.moneyRecord.uid,
        pid: this.sPid
      }
      this.$post(moneyRecordUrl, moneyRecordParams).then(res => {
        let _record = res.data[2].data
        this.cpid = res.data[0].data[1]
        this.moneyRecord.recordList = _record
        // this.moneyRecord.recordDetail = _record.splice(1)
        // console.log(this.moneyRecord.recordDetail)
        this.form.cusAddress = res.data[1].data[0].address
      })
    },
    // 获取联系人信息
    _getContactName () {
      let contactUrl = '/CustomerCheck.do?customlist'
      let contactParams = {
        cid: this.moneyRecord.cid,
        companylogid: this.moneyRecord.companylogid
      }
      this.$post(contactUrl, contactParams).then(res => {
        this.form.contactList = res.data[1].data
      })
    },
    // 搜索公司
    searchCompany (companyName) {
      this.comDialog.params.companyname = companyName
      this.comDialog.key = '' + new Date()
    },
    qualifySelectChange (val) {
      this.selectedQualify = val
    },
    updateMyCompanyList (data) {
      this.comDialog.myCompany = data.data[0].data
    }
  },
  components: { Page }
}
</script>

<style lang="less" scoped>
.order-content {
  .card-tips {
    color: red;
    background: wheat;
  }
  .card-money-record {
    color: #1198db;
    background: #d9edf7;
  }
  .pagination {
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .input-btn {
    width: calc(~'(100% - 72px)');
  }
  .maxwidth {
    max-width: 800px;
  }
}
</style>

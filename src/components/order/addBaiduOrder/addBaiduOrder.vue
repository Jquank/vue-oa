<template>
  <div class="addbaidu-order component-container media-padding">
    <div class="order-content">
      <el-form ref="form" :model="form" :label-width="labelWidth">
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="公司名称:" required>
              <el-input v-model="form.cName" class="input-btn" disabled placeholder="点击选择按钮选择公司"></el-input>
              <el-button type="primary" @click.native="selCompany" v-if="showEditBD">选择</el-button>
              <el-button type="warning" @click.native="$router.go(-1)" v-else>返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="到款记录:" required v-if="showEditBD">
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
        <el-row v-if="showEditBD">
          <el-col :md="24" class="maxwidth">
            <el-form-item label="客户地址:" required>
              <el-input v-model="form.cusAddress" placeholder="客户地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="网建类型:" required>
              <el-radio-group v-model="form.wjType">
                <el-radio v-for="(type,index) in form.wjTypeList" :key="index" :label="type.code_val+''">{{type.code_desc}}</el-radio>
              </el-radio-group>
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
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 新旧合同 -->
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="合同编号:">
              <el-tabs v-model="contractTab">
                <el-tab-pane label="新合同" name="new">
                  <el-row :gutter="5" type="flex" style="flex-wrap:wrap;">
                    <el-col :md="8">
                      <el-select v-model="form.newBdOrderNumber" placeholder="百度推广服务合同">
                        <el-option v-for="(contract0,index) in contract.newBdOrderNumber" :key="index" :label="contract0.number" :value="contract0.id"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="旧合同" name="old">
                  <el-row :gutter="5" type="flex" style="flex-wrap:wrap;">
                    <el-col :md="8">
                      <el-select v-model="form.bdOrderNumber" placeholder="百度推广服务订单编号">
                        <el-option v-for="(contract1,index) in contract.bdOrderNumber" :key="index" :label="contract1.number" :value="contract1.id"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :md="8">
                      <el-select v-model="form.bdProxy" @change="selProxy(form.bdProxy)" placeholder="百度推广首消授权书">
                        <el-option label="无首消授权书" value="no_proxy20180625160112"></el-option>
                        <el-option v-for="(contract2,index) in contract.bdProxy" :key="index" :label="contract2.number" :value="contract2.id"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :md="8">
                      <el-select v-model="form.bdServiceProtocol" placeholder="百度推广服务协议">
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
                <!-- 企业资质 -->
                <el-tab-pane label="企业资质">
                  <el-card v-if="showEditBD" shadow="always" class="card-tips">
                    [说明]：根据订单业务类型，上传需要的资质，图片格式为：jpg、png、jpeg，图片大小在3M以下。
                  </el-card>
                  <el-card v-if="!showEditBD" shadow="always" class="card-tips">
                    [说明]：点击删除可移除不符合要求的资质，在下方重新添加并上传正确的资质。
                  </el-card>
                  <!-- 编辑页回显企业资质照片 -->
                  <slot name="echoQualify"></slot>
                  <el-row  v-if="showEditBD" class="mt10px" :gutter="10">
                    <el-col :md="16">
                      <el-input placeholder="对公账户" v-model="form.receiveAccount" style="width:100%">
                        <template slot="prepend">对公账户 :</template>
                      </el-input>
                    </el-col>
                    <el-col :md="8">
                      <el-input v-model="form.receiveBank" placeholder="开户行">
                        <el-select slot="append" v-model="form.receiveBank">
                          <el-option v-for="(bank,index) in form.receiveBanks" :key="index" :label="bank.code_desc" :value="bank.code_desc">
                          </el-option>
                        </el-select>
                      </el-input>
                    </el-col>
                  </el-row>
                  <el-row class="mt10px" :gutter="10">
                    <el-col :sm="16">
                      <el-select  value-key="id" @change="qualifySelectChange" v-model="form.zizhiName" placeholder="请选择上传资质类型" style="width:100%">
                        <el-option v-for="(qualify,index) in qualifyType" :key="index" :label="qualify.code_desc" :value="qualify"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :sm="8">
                      <el-button type="primary" @click.native="addQualify">添加资质</el-button>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-table border :data="form.zizhiList" :key="form.zizhiList.id" id="uploadImgs" class="table-width">
                      <el-table-column prop="code_desc" label="资质类型" width="130">
                      </el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-upload :on-change="(()=>upChange('uploadImgs'))"
                          class="upload-demo" :ref="'upload'+scope.$index" :action="uploadUrl" :on-exceed="handleExceed" :before-upload="uploadBefore" :on-success="uploadSuccess" :file-list="fileList" :auto-upload="false" :multiple="false" list-type="picture">
                            <el-button slot="trigger" type="primary" class="xsbtn">选取文件</el-button>
                            <el-button type="success" @click.native="submitUpload(scope.row,scope.$index)" class="ml10px xsbtn">上传到服务器</el-button>
                            <el-button v-if="!showEditBD || scope.$index!==0" style="margin-left: 30px;" circle :icon="isMinusIcon" size="mini" type="danger" @click.native="removeQualify(scope.$index)"></el-button>
                          </el-upload>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-row>
                </el-tab-pane>
                <!-- 到款记录 -->
                <el-tab-pane label="到款记录">
                  <el-card shadow="always" class="card-tips" v-if="!form.record.length && showEditBD">
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
                <el-button type="warning" @click.native="subOrder('0')">仅降E</el-button>
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
          <el-table-column property="name" label="客户名称" width="300"></el-table-column>
          <el-table-column property="" label="客户类型" width="100">
            <span slot-scope="scope">{{scope.row.producttype | cusStatus}}</span>
          </el-table-column>
          <el-table-column property="username" label="所属商务" width="100"></el-table-column>
          <el-table-column property="" label="操作">
            <template slot-scope="scope">
              <el-button @click.native="handleSelCompany(scope.row)" type="primary" size="mini">选择</el-button>
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
import { uploadUrl } from 'api/http' //eslint-disable-line
import Page from 'base/page/page'
import { getByCode } from 'api/getOptions' //eslint-disable-line
import cookie from 'js-cookie'
import { orderMixin, mobileFit } from 'common/js/mixin'
const ORDER_TYPE = 'BAITUI'

export default {
  mixins: [orderMixin, mobileFit],
  props: {
    showEditBD: {
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
      uploadUrl: uploadUrl,
      headers: '',
      fileList: [],
      USER_ID: cookie.get('userId'),
      qualifyType: [],
      contractTab: 'new', // 合同tab
      form: {
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
        wjType: '0',
        wjTypeList: [],
        cusType: '0',
        isInvoice: '0',
        newBdOrderNumber: '',
        bdProxy: '',
        bdServiceProtocol: '',
        shangWuName: '',
        receiveAccount: '', // 对公账户
        receiveBank: '', // 开户行
        receiveBanks: '',
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
        newBdOrderNumber: [],
        bdOrderNumber: [],
        bdProxy: [],
        bdServiceProtocol: [],
        bdXXLProtocol: [],
        wjContract: []
      },
      cpid: '',
      companyData: {},
      rowData: {}, // 资质表格一行的数据
      selectedQualify: {},
      viewer: null
    }
  },
  computed: {
    qualifyUploaded () { // 存放已上传的资质list
      return this.showQualify // 默认资质list
    },
    recordDetail () {
      if (this.showEditBD) {
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
      if (!this.showEditBD) {
        console.log(newval)
        this.form.cName = newval.cusName
        this.form.pcWeb = newval.pcsite
        this.form.phoneWeb = newval.wapsite
        this.form.cusAddress = newval.addr
        this.form.wjType = newval.wjType + ''
        this.form.cusType = newval.cusType + ''
        this.form.isInvoice = newval.isInvoice + ''
        this.contractTab = newval.contractTab
        if (newval.bdServiceProtocol) {
          this.contractTab = 'old'
          this.form.bdOrderNumber = newval.bdOrderNumber || ''
          this.form.bdProxy = newval.bdProxy || ''
          this.form.bdServiceProtocol = newval.bdServiceProtocol || ''
        } else {
          this.contractTab = 'new'
          this.form.newBdOrderNumber = newval.bdOrderNumber || ''
        }
        this.form.shangWuName = newval.user_name
        this.form.zizhiList = [] // 清空默认资质列表
        this.form.receiveAccount = newval.receiveAccount
        this.form.receiveBank = newval.receiveBank
        this.form.record = newval.record
        this.record_detail = newval.recordDetail
        this.form.contactList = JSON.parse(JSON.stringify(newval.contacts))
        // 编辑页默认触发一次change事件，检查是否是无首消授权书
        // this.selProxy(this.form.bdProxy)
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
    this._getReceiveBanks()

    // console.log(this.productType)
  },
  methods: {
    // 提交订单
    subOrder (subType) {
      console.log(this.qualifyUploaded)
      if (!this.form.record) {
        this.$message({
          type: 'error',
          message: '请选择到款'
        })
        return
      }
      this.form.contactList.forEach(val => {
        val.companylogid = this.showEditBD ? this.companyData.companylogid : this.editData.rowData.companylogid
        val.contactname = val.name
        val.contactnumber = val.contact
        val.mailnumber = val.email
        val.telphone = val.fixedNumber
      })
      let _params = {
        cid: this.companyData.id || this.editData.cid,
        uid: this.showEditBD ? this.USER_ID : this.editData.uid, // 新增和编辑订单都取下单人id
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
        companylogid: this.showEditBD ? this.companyData.companylogid : this.editData.rowData.companylogid,
        yn: 1,
        sn: 10,
        pid: ORDER_TYPE,
        curId: this.showEditBD ? this.form.record[0].id : this.editData.record[0].id, // 到款id
        companycontact: this.form.contactList, // 联系人
        con_id: this.contractTab === 'old' ? this.form.bdOrderNumber : this.form.newBdOrderNumber, // 合同
        con_id2: this.form.bdProxy,
        con_id3: this.form.bdServiceProtocol,
        custom_type: this.form.cusType, // 客户类型
        invoice_status: this.form.isInvoice, // 发票
        amount: this.showEditBD ? this.form.record[0].service : this.editData.record[0].service,
        amount_real: this.showEditBD ? this.form.record[0].sum : this.editData.record[0].sum,
        audittype: subType, // 0:仅降E 10：降E并提单
        pcwebsite: this.form.pcWeb, // PC站
        mobilewebsite: this.form.phoneWeb, // 手机站
        companyaddress: this.showEditBD ? this.form.cusAddress : this.editData.addr, // 公司地址
        remark_order: '', // 备注
        company_attr: this.qualifyUploaded, // 公司属性(已上传资质)
        del_company_attr: this.deledQualify,
        remark: '',
        order_attr: [], // 订单属性
        from_val: _params, // what?
        baitui_remark: '',
        websitetype: this.form.wjType + '', // 网建类型
        voucher: '0', // 代金券
        receiveaccount: this.form.receiveAccount, // 对公账户,
        receivebank: this.form.receiveBank // 对公账户开户行
      }
      console.log(params)
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
      if (subType === '10') {
        if (!this.qualifyUploaded.length) {
          this.$message({
            type: 'error',
            message: '请上传资质照'
          })
          return
        }
      }
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
        pid: ORDER_TYPE
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
    // 新旧合同切换

    // 判断是否选择无首消授权书
    selProxy (value) {
      // let indexArr = []
      // let isProxy = false
      // this.form.zizhiList.forEach((val, key) => {
      //   if (val.zizhiType === '百度推广首消授权书') {
      //     indexArr.push(key)
      //     isProxy = true
      //   }
      // })
      // if (value === 'no_proxy20180625160112') {
      //   let len = this.form.zizhiList.length - 1
      //   for (let i = len; i >= 0; i--) {
      //     if (indexArr.indexOf(i) > -1) {
      //       this.form.zizhiList.splice(i, 1)
      //     }
      //   }
      // } else {
      //   if (!isProxy) {
      //     this.form.zizhiList.push({
      //       zizhiType: '百度推广首消授权书'
      //     })
      //   }
      // }
    },
    qualifySelectChange (val) {
      this.selectedQualify = val
    },
    removeQualify (index) {
      this.form.zizhiList.splice(index, 1)
    },
    submitUpload (data, index) {
      this.$refs['upload' + index].submit()
      this.rowData = data
    },
    uploadSuccess (res, file, fileList) {
      console.log(this.rowData)
      this.qualifyUploaded.push({
        id: null,
        label: this.rowData.tb_field_name,
        val: res.url + '#' + this.rowData.code_desc
      })
    },
    updateMyCompanyList (data) {
      this.comDialog.myCompany = data.data[0].data
    },
    _getReceiveBanks () {
      getByCode(60).then(res => {
        this.form.receiveBanks = res.data.data
      })
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

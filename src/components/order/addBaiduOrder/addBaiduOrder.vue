<template>
  <div class="addbaidu-order">
    <!-- TODO: 此处v-if未起作用 -->
    <p v-if="isShow">
      <span>订单管理 / 新增百度订单</span>
    </p>
    <div class="order-content">
      <el-form ref="form" :model="form" label-width="180px" >
        <el-form-item label="公司名称" required>
          <el-input v-model="form.cName" readonly style="width:300px" placeholder="点击选择按钮选择公司"></el-input>
          <el-button type="primary" @click.native="selCompany" v-if="isShow">选择</el-button>
        </el-form-item>

        <el-form-item label="到款记录" required v-if="isShow">
          <el-select v-model="form.record" placeholder="请选择到款记录" style="width:300px;">
            <el-option v-for="record in moneyRecord.recordList" :key="record[0].id"
              :label="record[0].companyname" :value="record"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="客户网站信息" required>
          <el-input v-model="form.pcWeb" style="width:300px;" placeholder="pc端网址"></el-input>
          <el-input v-model="form.phoneWeb" style="width:300px;" placeholder="手机端网址"></el-input>
        </el-form-item>

        <el-form-item label="联系人信息" required>
          <el-row v-for="(item,index) in form.contactList" :key="index" :class="{'mt10px':index!==0}">
            <el-input v-model="item.name" placeholder="联系人" style="width:145px;">
              <!-- <el-select v-model="item.contact" slot="append">
                <el-option v-for="(c,index) in contactName" :key="index"
                  :label="c.name" :value="c.name">
                </el-option>
              </el-select> -->
            </el-input>
            <el-input v-model="item.contact" style="width:150px;" placeholder="手机号码"></el-input>
            <el-input v-model="item.fixedNumber" style="width:150px;" placeholder="座机号码"></el-input>
            <el-input v-model="item.email" style="width:145px;" placeholder="邮箱"></el-input>
            <el-button :type="index===0?'success':'danger'" size="mini" circle class="ml10px"
              :icon="index===0?isPlusIcon:isMinusIcon" @click.native="addContact(index)"></el-button>
          </el-row>
        </el-form-item>

        <el-form-item label="客户地址" required>
          <el-input v-model="form.cusAddress" style="width:600px;" placeholder="客户地址"></el-input>
        </el-form-item>

        <!-- <el-form-item label="PC站订单金额" required v-if="!isShow">
          <el-input v-model="form.pcMoney" style="width:300px;"></el-input>
        </el-form-item> -->

        <!-- <el-form-item label="手机站订单金额" required v-if="!isShow">
          <el-input v-model="form.mobileMoney" style="width:300px;"></el-input>
        </el-form-item> -->

        <el-form-item label="网建类型" required>
          <el-radio-group v-model="form.wjType">
            <el-radio v-for="type in form.wjTypeList" :key="type.id" :label="type.code_val">{{type.code_desc}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="客户类型" required>
          <el-radio-group v-model="form.cusType">
            <el-radio label="0">新客户</el-radio>
            <el-radio label="1">老客户</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否需要发票" required>
          <el-radio-group v-model="form.isInvoice">
            <el-radio label="10">不需要</el-radio>
            <el-radio label="20">暂不需要</el-radio>
            <el-radio label="30">需要</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="合同编号">
          <el-select v-model="form.bdOrderNumber" placeholder="百度推广服务订单编号" style="width:198px;">
            <el-option label="百度推广服务订单编号" value="0"></el-option>
            <el-option v-for="contract1 in contract.bdOrderNumber" :key="contract1.id"
              :label="contract1.number" :value="contract1.id"></el-option>
          </el-select>
          <el-select v-model="form.bdProxy"  @change="selProxy(form.bdProxy)"
              placeholder="百度推广首消授权书" style="width:198px;">
            <el-option label="百度推广首消授权书" value="0"></el-option>
            <el-option label="无首消授权书" value="no_proxy20180625160112"></el-option>
            <el-option  v-for="contract2 in contract.bdProxy" :key="contract2.id"
              :label="contract2.number" :value="contract2.id"></el-option>
          </el-select>
          <el-select v-model="form.bdServiceProtocol" placeholder="百度推广服务协议" style="width:198px;">
            <el-option label="百度推广服务协议" value="0"></el-option>
            <el-option  v-for="contract3 in contract.bdServiceProtocol" :key="contract3.id"
              :label="contract3.number" :value="contract3.id"></el-option>
          </el-select>
          <!-- <el-select v-model="form.bdXXLProtocol" placeholder="百度信息流服务协议" style="width:198px;">
            <el-option  v-for="contract4 in contract.bdXXLProtocol" :key="contract4.id"
              :label="contract4.number" :value="contract4.id"></el-option>
          </el-select> -->
        </el-form-item>

        <el-form-item label="商务信息" required>
          <el-input v-model="form.shangWuName" readonly style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="订单详情" required>
          <el-tabs type="border-card" style="max-width:750px;">
            <!-- 企业资质 -->
            <el-tab-pane label="企业资质">
              <!-- 编辑页回显企业资质照片 -->
              <el-row v-if="!isShow" :gutter="10">
                <el-col :md="6" v-for="(s,index) in showQualify" :key="s.id">
                  <dl>
                    <dt>&nbsp;{{s.val.split('#')[1]}}</dt>
                    <dd style="margin:0 auto">
                      <img style="width:150px;height:auto" @click="imgClick(s.val)" :src="s.val.split('#')[0]">
                    </dd>
                    <dd>
                      <el-button type="danger" size="mini" @click="delImg(index)">删除</el-button>
                    </dd>
                  </dl>
                </el-col>
              </el-row>
              <el-card v-if="isShow" shadow="always" class="card-tips">
                [说明]：根据订单业务类型，上传需要的资质，图片格式为：jpg、png、jpeg，图片大小在3M以下。
              </el-card>
              <el-card v-if="!isShow" shadow="always" class="card-tips">
                [说明]：点击删除可移除不符合要求的资质，在下方重新添加并上传正确的资质。
              </el-card>
              <el-row style="margin-top:10px;" :gutter="15">
                <el-col :sm="16">
                  <el-input placeholder="对公账户" v-model="form.receiveAccount" style="width:100%">
                    <template slot="prepend">对公账户 :</template>
                  </el-input>
                </el-col>
                <el-col :sm="8">
                  <el-input v-model="form.receiveBank" placeholder="开户行" style="width:100%">
                    <el-select slot="append" v-model="form.receiveBank">
                      <el-option v-for="bank in form.receiveBanks" :key="bank.id"
                        :label="bank.code_desc" :value="bank.code_desc">
                      </el-option>
                    </el-select>
                  </el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;" :gutter="15">
                <el-col :sm="20">
                  <el-select v-model="form.zizhiName" placeholder="请选择上传资质类型" style="width:100%">
                    <el-option v-for="qualify in qualifyType" :key="qualify.id"
                      :label="qualify.code_desc" :value="qualify.code_desc"></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="4">
                  <el-button type="primary" @click.native="addQualify(form.zizhiName)">添加资质</el-button>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-table border :data="form.zizhiList" :key="form.zizhiList.zizhiType" style="width: 100%;min-height:200px;">
                  <el-table-column prop="zizhiType" label="资质类型">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <!-- <el-button type="primary">上传</el-button> -->
                      <el-upload class="upload-demo" ref="upload" :action="uploadUrl" :before-upload="beforeUpload"
                        :on-change="aaa"
                        :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                        <el-button slot="trigger"  type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>
                        <el-button style="margin-left: 30px;" circle :icon="isMinusIcon" size="mini"
                          type="danger" @click.native="removeQualify(scope.$index)"></el-button>
                      </el-upload>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-tab-pane>
            <!-- 到款记录 -->
            <el-tab-pane label="到款记录">
              <el-card shadow="always" class="card-tips" v-if="form.record.length===0 && isShow">
                [说明]：请选择到款记录。
              </el-card>
              <el-card shadow="always" class="card-money-record" v-if="form.record.length!==0">
                <el-row><b>公司名称（法人）：</b><span>{{form.record[0].companyname}}</span></el-row>
                <el-row><b>到款金额 ：</b><span>{{form.record[0].sum | currency1}}</span></el-row>
                <el-row><b>服务费 ：</b><span>{{form.record[0].service | currency1}}</span></el-row>
                <!-- <el-row><b>到款时间 ：</b><span>{{222}}</span></el-row> -->
                <el-row v-for="rec in recordDetail" :key="rec.type">
                  <template v-if="rec.type!=500">
                    <b>{{rec.type | productType}} ：</b><span>{{rec.value | currency1}}</span>
                  </template>
                </el-row>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>

        <el-form-item label="">
          <el-row style="max-width:750px;text-align:right;">
            <el-button type="warning" @click.native="subOrder(ONLY_E)">仅降E</el-button>
            <el-button type="primary" @click.native="subOrder(!ONLY_E)">降E并提单</el-button>
          </el-row>
        </el-form-item>
      </el-form>

      <!-- 选择公司弹窗 -->
      <el-dialog title="选择下单客户" :visible.sync="comDialog.selCompanyDialog" width="650px">
        <el-input placeholder="请输入公司名进行搜索" v-model="comDialog.handleCompanyName">
          <el-button @click.native="searchCompany(comDialog.handleCompanyName)"
            slot="append" icon="el-icon-search"></el-button>
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
        <page class="pagination" :url="comDialog.url" :sendparams="comDialog.params"
          @updateList="updateMyCompanyList" :key="comDialog.key">
        </page>
      </el-dialog>

      <!-- 点击图片查看大图 -->
      <el-dialog :title="bigImgUrl.split('#')[1]" :visible.sync="isBigImg" :modal-append-to-body="false" top="5px" width="750px">
        <img :src="bigImgUrl.split('#')[0]" style="width:100%;">
      </el-dialog>

    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { serverUrl, uploadUrl } from 'api/config' //eslint-disable-line
import Page from 'base/page/page'
import { $post } from 'api/http'
import { getCode, getMyContract } from 'api/getOptions'

const ORDER_TYPE = 'BAITUI'

export default {
  props: {
    isShow: { // false表示跳转编辑订单页
      type: Boolean,
      default: true
    },
    editData: { // 编辑页传过来的回显数据
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  watch: {
    editData (newval) {
      if (!this.isShow) {
        this.form.zizhiList = []
        this.form.cName = newval.cusName
        this.form.pcWeb = newval.pcsite
        this.form.phoneWeb = newval.wapsite
        this.form.cusAddress = newval.addr
        this.form.wjType = newval.wjType
        this.form.cusType = newval.cusType.toString()
        this.form.isInvoice = newval.isInvoice.toString()
        this.form.bdOrderNumber = newval.bdOrderNumber || '0'
        this.form.bdProxy = newval.bdProxy || '0'
        this.form.bdServiceProtocol = newval.bdServiceProtocol || '0'
        this.form.shangWuName = newval.user_name
        this.showQualify = newval.qualifyList
        this.form.receiveAccount = newval.receiveAccount
        this.form.receiveBank = newval.receiveBank
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
            val[keyMap[key]] = val[key] || ''
            delete val[key]
          }
        })
        console.log(newval)
      }
    }
  },
  data () {
    return {
      record_detail: [], // 回显到款记录
      bigImgUrl: '',
      isBigImg: false,
      showQualify: [],
      ONLY_E: true,
      uploadUrl: uploadUrl,
      headers: '',
      fileList: [],
      USER_ID: '',
      qualifyType: [],
      form: {
        pcMoney: 0,
        mobileMoney: 0,
        cName: '',
        record: [],
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
        wjType: -1,
        wjTypeList: [],
        cusType: '',
        isInvoice: '',
        bdOrderNumber: '0',
        bdProxy: '0',
        bdServiceProtocol: '0',
        shangWuName: '',
        receiveAccount: '', // 对公账户
        receiveBank: '', // 开户行
        receiveBanks: '',
        zizhiName: '',
        zizhiList: [
          {
            zizhiType: '企业营业执照原件'
          },
          {
            zizhiType: '百度推广服务协议'
          },
          {
            zizhiType: '百度推广服务订单'
          },
          {
            zizhiType: '百度推广首消授权书'
          }
        ]
      },
      isPlusIcon: 'el-icon-plus',
      isMinusIcon: 'el-icon-minus',
      comDialog: {
        selCompanyDialog: false,
        handleCompanyName: '',
        myCompany: [],
        url: serverUrl + '/order.do?Add',
        params: {pid: ORDER_TYPE},
        key: ''
      },
      moneyRecord: {
        cid: '',
        companylogid: '',
        uid: '',
        recordList: []
      },
      contract: {
        bdOrderNumber: [],
        bdProxy: [],
        bdServiceProtocol: [],
        bdXXLProtocol: []
      }
    }
  },
  computed: {
    recordDetail () {
      if (this.isShow) {
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
  created () {
    this.USER_ID = sessionStorage.getItem('userId')
    this._getwjType()
  },
  mounted () {
    this._getMyContract()
    this._getQualifyType()
    this._getReceiveBanks()
    // console.log(this.productType)
  },
  methods: {
    subOrder (onlyE) {
      // let params = {
      //   cpid: 123,
      //   companyid: 123,
      //   companylogid: 123,
      //   yn: 123,
      //   sn: 123,
      //   pid: ORDER_TYPE,
      //   receiptid: 123,
      //   companycontact: 123,
      //   con_id: 123
      // }
    },
    // 选择公司
    selCompany () {
      this.comDialog.selCompanyDialog = true
      this.comDialog.key = '' + new Date()
    },
    handleSelCompany (company) {
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
    imgClick (url) {
      this.isBigImg = true
      // this.bigImgUrl = 'http://bg.baijiegroup.com/upload//70/03/700303f2843e44f68b08cf2e1b4d64c7.jpg#123456'
      this.bigImgUrl = url
    },
    delImg (index) {
      this.showQualify.splice(index, 1)
    },
    // 获取到款记录 和 客户地址
    _getMoneyRecord () {
      let moneyRecordUrl = serverUrl + '/wf.do?set'
      let moneyRecordParams = {
        cid: this.moneyRecord.cid,
        companylogid: this.moneyRecord.companylogid,
        uid: this.moneyRecord.uid,
        pid: ORDER_TYPE
      }
      $post(moneyRecordUrl, moneyRecordParams).then(res => {
        let _record = res.data[2].data
        this.moneyRecord.recordList = _record
        // this.moneyRecord.recordDetail = _record.splice(1)
        // console.log(this.moneyRecord.recordDetail)
        this.form.cusAddress = res.data[1].data[0].address
      })
    },
    // 获取联系人信息
    _getContactName () {
      let contactUrl = serverUrl + '/CustomerCheck.do?customlist'
      let contactParams = {
        cid: this.moneyRecord.cid,
        companylogid: this.moneyRecord.companylogid
      }
      $post(contactUrl, contactParams).then(res => {
        this.form.contactList = res.data[1].data
      })
    },
    // 搜索公司
    searchCompany (companyName) {
      this.comDialog.params.companyname = companyName
      this.comDialog.key = '' + new Date()
    },
    // 添加联系人
    addContact (index) {
      if (index === 0) {
        this.form.contactList.push({})
      } else {
        this.form.contactList.splice(index, 1)
      }
    },
    // 判断是否选择无首消授权书
    selProxy (value) {
      let indexArr = []
      let isProxy = false
      this.form.zizhiList.forEach((val, key) => {
        if (val.zizhiType === '百度推广首消授权书') {
          indexArr.push(key)
          isProxy = true
        }
      })
      if (value === 'no_proxy20180625160112') {
        let len = this.form.zizhiList.length - 1
        for (let i = len; i >= 0; i--) {
          if (indexArr.indexOf(i) > -1) {
            this.form.zizhiList.splice(i, 1)
          }
        }
      } else {
        if (!isProxy) {
          this.form.zizhiList.push({
            zizhiType: '百度推广首消授权书'
          })
        }
      }
    },
    // 添加资质
    addQualify (type) {
      if (this.form.zizhiName === '') {
        this.$message({
          message: '请选择资质类型',
          type: 'error'
        })
        return
      }
      this.form.zizhiList.push({
        zizhiType: type
      })
    },
    removeQualify (index) {
      this.form.zizhiList.splice(index, 1)
    },
    submitUpload () {
      console.log(888)
      this.$refs.upload.submit()
    },
    aaa (file) {
      console.log(file)
    },
    beforeUpload (file) {
      console.log(file)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    updateMyCompanyList (data) {
      this.comDialog.myCompany = data.data[0].data
    },
    _getwjType () {
      getCode(28).then(res => {
        this.form.wjTypeList = res.data.data
      })
    },
    _getMyContract () {
      getMyContract('CONTRACT_BTDD', this.USER_ID).then(res => {
        this.contract.bdOrderNumber = res.data[0].data
      })
      getMyContract('CONTRACT_BTSQ', this.USER_ID).then(res => {
        this.contract.bdProxy = res.data[0].data
      })
      getMyContract('CONTRACT_BTXY', this.USER_ID).then(res => {
        this.contract.bdServiceProtocol = res.data[0].data
      })
      getMyContract('CONTRACT_BDXXL', this.USER_ID).then(res => {
        this.contract.bdXXLProtocol = res.data[0].data
      })
    },
    _getQualifyType () {
      getCode(32).then(res => {
        this.qualifyType = res.data.data
      })
    },
    _getReceiveBanks () {
      getCode(60).then(res => {
        this.form.receiveBanks = res.data.data
      })
    }
  },
  components: {Page}
}
</script>

<style lang="less" scoped>
.order-content {
  background: #fff;
  padding: 20px;
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
}
</style>

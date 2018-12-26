<template>
  <div class="addbaidu-order component-container media-padding">
    <div class="order-content">
      <el-form ref="form" :model="form" :label-width="labelWidth">
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="公司名称:" required>
              <el-input v-model="form.cName" class="input-btn" disabled placeholder="点击选择按钮选择公司"></el-input>
              <el-button type="primary" @click.native="selCompany" v-if="showEditWJ">选择</el-button>
              <el-button type="warning" @click.native="$router.go(-1)" v-else>返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :md="24" class="maxwidth">
            <el-form-item label="到款记录:" required v-if="showEditWJ">
              <el-col :md="10">
                <el-select v-model="form.record" value-key="id" placeholder="请选择到款记录" style="width:100%;">
                  <el-option v-for="r in moneyRecord.recordList" :key="r.id" :label="r[0].companyname" :value="r"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :md="24" class="maxwidth">
            <el-form-item label="客户网站信息:" class="web-info">
                <el-col :md="10">
                  <el-input v-model="form.pcWeb" placeholder="pc端网址"></el-input>
                </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :md="24" class="maxwidth">
            <el-form-item label="联系人信息:" required>
              <el-col v-for="(item,index) in form.contactList" :key="index" :class="{'mt10px':index!==0}">
                <el-col :md="4">
                  <el-input v-model="item.name" placeholder="联系人"></el-input>
                </el-col>
                <el-col :md="6">
                  <el-input v-model="item.contact" placeholder="手机号码"></el-input>
                </el-col>
                <el-col :md="6">
                  <el-input v-model="item.fixedNumber" placeholder="座机号码"></el-input>
                </el-col>
                <el-col :md="8">
                  <el-input v-model="item.email" placeholder="邮箱" class="contact-phone"></el-input>
                  <el-button :type="index===0?'success':'danger'" circle class="xsbtn" :icon="index===0?isPlusIcon:isMinusIcon" @click.native="addContact(index)"></el-button>
                </el-col>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="客户地址:" required>
              <el-input v-model="form.cusAddress" placeholder="客户地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :md="24" class="maxwidth">
            <el-form-item label="PC站订单金额:" required>
              <el-col :md="10">
                <el-input v-model="form.pcMoney" placeholder="PC站订单金额"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :md="24" class="maxwidth">
            <el-form-item label="手机站订单金额:" required>
              <el-col :md="10">
                <el-input v-model="form.appMoney" placeholder="手机站订单金额"></el-input>
              </el-col>
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
        <!-- 合同 -->
        <el-row :gutter="5">
          <el-col :md="24" class="maxwidth">
            <el-form-item label="合同编号:">
                <el-col :md="10">
                  <el-select v-model="form.bdOrderNumber" placeholder="网站商务合同书" style="width: 100%;">
                    <el-option v-for="(contract0,index) in contract.bdOrderNumber" :key="index" :label="contract0.number" :value="contract0.id"></el-option>
                  </el-select>
                </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <!-- 订单详情   -->
            <el-form-item label="订单详情:">
              <el-tabs type="border-card" @tab-click="handleTabClick" style="min-height: 300px;">
                <!-- 网建基本信息 -->
                <el-tab-pane label="网建基本信息">
                  <el-card shadow="always" class="card-tips">
                    [备案资料]：提交给网建外审人员，备案资料必须齐全后，订单才会快速上线。
                  </el-card>
                  <el-form :model="wjForm" :label-width="labelWidth1" class="mt10px">
                    <el-row>
                      <el-col :md="24" class="maxwidth">
                        <el-form-item label="网站名称:" required>
                          <el-input v-model="wjForm.webName"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="5">
                      <el-form-item label="网站负责人:" required>
                        <el-col :md="12" class="maxwidth">
                          <el-input v-model="wjForm.webManager" placeholder="姓名(不填默认为经办人)"></el-input>
                        </el-col>
                        <el-col :md="12" class="maxwidth">
                          <el-input v-model="wjForm.phone" placeholder="电话"></el-input>
                        </el-col>
                        <el-col :md="12" class="maxwidth mt10px">
                          <el-input v-model="wjForm.mail" placeholder="邮箱"></el-input>
                        </el-col>
                        <el-col :md="12" class="maxwidth mt10px">
                          <el-input v-model="wjForm.tel" placeholder="座机电话"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-row>
                    <el-row>
                      <el-col :md="24" class="maxwidth">
                        <el-form-item label="空间服务商类型:" required>
                          <el-radio-group v-model="wjForm.serviceType">
                            <el-radio v-for="(ser,index) in wjForm.serviceTypeList" :key="index" :label="ser.code_val+''">{{ser.code_desc}}</el-radio>
                            <el-radio label="0">自备</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :md="12" class="maxwidth">
                        <el-form-item label="地域:" required>
                          <el-radio v-model="wjForm.area" label="0">国内</el-radio>
                          <el-radio v-model="wjForm.area" label="10">海外</el-radio>
                        </el-form-item>
                      </el-col>
                      <el-col :md="12" class="maxwidth">
                        <el-form-item label="空间大小:" required>
                          <el-input v-model="wjForm.size">
                            <span slot="append">MB</span>
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :md="24" class="maxwidth">
                        <el-form-item label="域名服务商类型:" required>
                          <el-radio-group v-model="wjForm.domainType">
                            <el-radio v-for="(ser,index) in wjForm.serviceTypeList" :key="index" :label="ser.code_val+''">{{ser.code_desc}}</el-radio>
                            <el-radio label="0">自备</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :md="24" class="maxwidth">
                        <el-form-item label="域名信息:" required>
                          <el-input v-model="wjForm.info"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <!-- 网站流程表 -->
                <el-tab-pane :label="tabLabel">
                  <el-form v-if="form.wjType!=30" :model="processForm" :label-width="labelWidth1" class="mt10px">
                    <template v-if="form.wjType!=40">
                      <el-row v-if="form.wjType==='0' || form.wjType==='20'">
                        <el-col :md="24" class="maxwidth">
                          <el-form-item label="模板编号:" required>
                            <el-input v-model="processForm.pcModelNumber"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-if="form.wjType==='10'">
                        <el-col :md="24" class="maxwidth">
                          <el-form-item label="参考网站:" required>
                            <el-input v-model="processForm.pcModelNumber"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </template>
                    <el-row :gutter="10">
                      <el-form-item :label="'栏目'+(index+1)+':'" v-for="(c,index) in columns" :key="index">
                        <el-col :md="8" class="maxwidth">
                          <el-input v-model="c.webcolumn_name">
                            <el-select v-model="c.webcolumn_name" slot="append" placeholder="请选择" style="padding:0 15px;">
                              <el-option v-for="(name,index) in column_names" :key="index" :label="name.code_desc" :value="name.code_desc"></el-option>
                            </el-select>
                          </el-input>
                        </el-col>
                        <el-col :md="8" class="maxwidth">
                          <el-input v-model="c.webcolumn_type">
                            <el-select v-model="c.webcolumn_type" slot="append" placeholder="请选择" style="padding:0 15px;">
                              <el-option v-for="(type,index) in column_types" :key="index" :label="type.code_desc" :value="type.code_desc"></el-option>
                            </el-select>
                          </el-input>
                        </el-col>
                        <el-col :md="8" class="maxwidth">
                          <el-button :type="index?'danger':'success'" :icon="index?'el-icon-minus':'el-icon-plus'" circle size="mini" @click.native="addContact(index,'webItem')"></el-button>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="网站颜色及功能:">
                        <el-input v-model="processForm.webRemark" type="textarea" :rows="4"></el-input>
                      </el-form-item>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <!-- 企业资质 -->
                <el-tab-pane label="企业资质">
                  <el-card v-if="showEditWJ" shadow="always" class="card-tips">
                    [说明]：根据订单业务类型，上传需要的资质，图片格式为：jpg、png、jpeg，图片大小在3M以下。<br />
                    [注]：1.若为授权人备案，请再提供授权书及经办人身份证正反面。<br />
                    2.若域名由客户提供，需提供域名证书。
                  </el-card>
                  <el-card v-if="!showEditWJ" shadow="always" class="card-tips">
                    [说明]：点击删除可移除不符合要求的资质，在下方重新添加并上传正确的资质。
                  </el-card>

                  <show-qualify v-if="showQualify_add.length" :showQualify="showQualify_add" @getQualifyList="getQualifyList"></show-qualify>

                  <el-row :gutter="10" class="mt10px">
                    <el-col :sm="16">
                      <el-select value-key="id" @change="qualifySelectChange" v-model="form.zizhiName" placeholder="请选择上传资质类型" style="width:100%">
                        <el-option v-for="(qualify,index) in qualifyType" :key="index" :label="qualify.code_desc" :value="qualify"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :sm="8">
                      <el-button type="primary" @click.native="addQualify">添加资质</el-button>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-table id="uploadImgs" border :data="form.zizhiList" :key="form.zizhiList.id" class="table-width">
                      <el-table-column prop="code_desc" label="资质类型" width="130">
                      </el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-upload :on-change="(()=>{upChange('uploadImgs')})"
                           :ref="'upload'+scope.$index" :action="uploadUrl" :on-exceed="handleExceed" :before-upload="uploadBefore" :on-success="uploadSuccess" :file-list="fileList" :auto-upload="false" :multiple="false" list-type="picture">
                            <el-button slot="trigger" type="primary" class="xsbtn">选取文件</el-button>
                            <el-button type="success" @click.native="submitUpload(scope.row,scope.$index)" class="ml10px xsbtn">上传到服务器</el-button>
                            <el-button v-if="scope.$index!==0" style="margin-left: 30px;" circle :icon="isMinusIcon" size="mini" type="danger" @click.native="removeQualify(scope.$index)"></el-button>
                          </el-upload>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-row>
                </el-tab-pane>
                <!-- 到款记录 -->
                <el-tab-pane label="到款记录">
                  <el-card shadow="always" class="card-tips" v-if="!form.record.length">
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
                    <el-row v-for="(rec,index) in recordDetail" :key="index">
                      <template v-if="rec.type==8 || rec.type==58">
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
import ShowQualify from 'base/showQualify/showQualify'
const ORDER_TYPE = 'WEBSITE'
const ORDER_TYPE_ZTC = 'ZTC_WEBSITE'
const CONTRACT_TYPE = 'CONTRACT_WZ'
const CONTRACT_TYPE_ZTC = 'CONTRACT_ZTCWEB'
export default {
  mixins: [orderMixin, mobileFit],
  props: {
    showEditWJ: {
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
    showQualify: {
      // 获取回显时原有的资质
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      showQualify_add: [],
      qualifyUploaded_add: [],
      deledQualify: [],
      labelWidth: '130px',
      record_detail: [], // 回显到款记录
      ONLY_E: true,
      uploadUrl: uploadUrl,
      headers: '',
      fileList: [],
      USER_ID: cookie.get('userId'),
      qualifyType: [],
      form: {
        cName: '',
        record: [{}],
        pcWeb: '',
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
        pcMoney: '',
        appMoney: '',
        wjType: '0',
        wjTypeList: [],
        receiveBanks: '',
        zizhiName: '',
        zizhiList: []
      },
      isPlusIcon: 'fa fa-plus',
      isMinusIcon: 'fa fa-minus',
      comDialog: {
        selCompanyDialog: false,
        handleCompanyName: '',
        myCompany: [],
        url: '/order.do?Add',
        params: {},
        key: ''
      },
      moneyRecord: {
        cid: '',
        companylogid: '',
        uid: '',
        recordList: []
      },
      contract: {
        bdOrderNumber: []
      },
      cpid: '',
      companyData: {},
      rowData: {}, // 资质表格一行的数据
      selectedQualify: {},
      labelWidth1: '130px',
      wjForm: {
        webName: '',
        phone: '',
        mail: '',
        tel: '',
        serviceType: '1',
        serviceTypeList: '',
        area: '0',
        size: '200',
        domainType: '1',
        info: ''
      },
      processForm: {
        pcModelNumber: '',
        webRemark: ''
      },
      columns: [
        {
          webcolumn_name: '网站首页',
          webcolumn_type: '功能'
        },
        {
          webcolumn_name: '关于我们',
          webcolumn_type: '单页'
        },
        {
          webcolumn_name: '新闻资讯',
          webcolumn_type: '信息'
        },
        {
          webcolumn_name: '产品展示',
          webcolumn_type: '产品'
        },
        {
          webcolumn_name: '案例展示',
          webcolumn_type: '产品'
        },
        {
          webcolumn_name: '在线留言',
          webcolumn_type: '审开'
        },
        {
          webcolumn_name: '联系我们',
          webcolumn_type: '单页'
        }
      ],
      column_names: [],
      column_types: [],
      tabLabel: '网站流程表',
      viewer: null,
      pid: 'ZTC'
    }
  },
  computed: {
    recordDetail () {
      if (this.showEditWJ) {
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
      if (!this.showEditWJ) {
        console.log(newval)
        this.showQualify_add = this.showQualify
        this.qualifyUploaded_add = JSON.parse(JSON.stringify(this.showQualify_add))
        this._getMyContract('', newval.pid === 'ZTC' ? CONTRACT_TYPE_ZTC : CONTRACT_TYPE)
        this.form.cName = newval.cusName
        this.form.pcWeb = newval.pcsite
        this.form.cusAddress = newval.addr
        this.form.pcMoney = newval.productInfo.pcmoney + ''
        this.form.appMoney = newval.productInfo.appmoney + ''
        this.form.wjType = newval.wjType + ''
        this.form.bdOrderNumber = newval.bdOrderNumber || ''
        this.form.zizhiList = [] // 清空默认资质列表
        this.form.record = newval.record
        this.record_detail = newval.recordDetail
        this.form.contactList = JSON.parse(JSON.stringify(newval.contacts))
        this.wjForm.webName = newval.productInfo.webname
        this.wjForm.webManager = newval.productInfo.webcontact
        this.wjForm.phone = newval.productInfo.webcontactphone
        this.wjForm.mail = newval.productInfo.webcontactemail
        this.wjForm.tel = newval.productInfo.webfixphone
        this.wjForm.serviceType = newval.productInfo.spacefacilitator + ''
        this.wjForm.domainType = newval.productInfo.domainfacilitator + ''
        this.wjForm.area = newval.productInfo.area + ''
        this.wjForm.size = newval.productInfo.size
        this.wjForm.info = newval.productInfo.domain
        this.processForm.pcModelNumber = newval.productInfo.modelnumber
        this.processForm.webRemark = newval.productInfo.remark
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
    this._getwjType(88)
  },
  mounted () {
    this._getQualifyType(32)
    this._getServiceType() // 空间服务商类型
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
      if (this.showEditWJ) {
        this.qualifyUploaded_add.forEach(val => {
          val.id = null
        })
      }
      this.form.contactList.forEach(val => {
        val.companylogid = this.showEditWJ
          ? this.companyData.companylogid
          : this.editData.rowData.companylogid
        val.contactname = val.name
        val.contactnumber = val.contact
        val.mailnumber = val.email
        val.telphone = val.fixedNumber
      })
      let _params = {
        cid: this.companyData.id || this.editData.cid,
        uid: this.showEditWJ ? this.USER_ID : this.editData.uid, // 新增和编辑订单都取下单人id
        pcsite: this.form.pcWeb,
        cusName: this.companyData.name || this.editData.cusName, // 公司名
        addr: this.form.cusAddress,
        contacts: this.form.contactList,
        user_name: this.companyData.username || this.editData.user_name // 下单人
      }
      let params = {
        cpid: this.cpid || this.editData.rowData.cpid,
        order_id: this.editData.order_id || '',
        companyid: this.companyData.id || this.editData.rowData.companyid,
        companylogid: this.showEditWJ
          ? this.companyData.companylogid
          : this.editData.rowData.companylogid,
        yn: 1,
        sn: 10,
        pid: this.pid,
        curId: this.showEditWJ
          ? this.form.record[0].id
          : this.editData.record[0].id, // 到款id
        companycontact: this.form.contactList, // 联系人
        con_id: this.form.bdOrderNumber, // 合同
        amount: this.showEditWJ
          ? this.form.record[0].service
          : this.editData.record[0].service,
        amount_real: this.showEditWJ
          ? this.form.record[0].sum
          : this.editData.record[0].sum,
        audittype: subType, // 0:仅降E 10：降E并提单
        pcwebsite: this.form.pcWeb, // PC站
        companyaddress: this.form.cusAddress || this.editData.addr, // 公司地址
        remark_order: '', // 备注
        company_attr: this.qualifyUploaded_add, // 公司属性(已上传资质)
        del_company_attr: this.deledQualify,
        remark: '',
        order_attr: [], // 订单属性
        from_val: _params, // what?
        baitui_remark: '',
        websitetype: this.form.wjType + '', // 网建类型
        voucher: '0', // 代金券
        pcmoney: this.form.pcMoney, // PC站金额
        appmoney: this.form.appMoney, // 手机站金额
        spacefacilitator: this.wjForm.serviceType, // 空间服务商类型 -code_name-
        domainfacilitator: this.wjForm.domainType // 域名服务商类型 -code_name-
      }
      let webBasicParams = {
        webname: this.wjForm.webName, // 网站名称
        webcontactname: this.wjForm.webManager, // 客户网站负责人
        webcontactphone: this.wjForm.phone, // 客户网站负责人联系电话
        webcontactemail: this.wjForm.mail, // 客户网站负责人邮箱
        webfixphone: this.wjForm.tel, // 座机电话
        websitetype: this.form.wjType + '', // 网建类型
        column: this.columns // 网站栏目
      }
      let defaultWebManagerInfo = this.wjForm.webManager ? {} : { // 客户网站负责人默认信息
        webcontactname: this.form.contactList[0].contactname, // 客户网站负责人
        webcontactphone: this.form.contactList[0].contactnumber, // 客户网站负责人联系电话
        webcontactemail: this.form.contactList[0].mailnumber, // 客户网站负责人邮箱
        webfixphone: this.form.contactList[0].telphone // 座机电话
      }
      let webInfo = { // 网站信息
        type: 10,
        modelnumber: this.processForm.pcModelNumber, // PC站模板编号 或者 参考网站
        newdomain: '0', // 是否新开域名 0：新开 10：自备
        newzone: '0', // 是否新开空间 0：新开 10：自备
        domain: this.wjForm.info, // 网站域名
        area: this.wjForm.area, // PC站域名国内0/海外10
        size: this.wjForm.size, // PC空间大小
        pcmoney: this.form.pcMoney, // PC站金额
        appmoney: this.form.appMoney, // 手机站金额
        websitetype: this.form.wjType + '', // 网建类型
        websiteremark: this.processForm.webRemark // 网站功能备注
      }
      params = Object.assign({}, params, webBasicParams, defaultWebManagerInfo)
      params.websiteinfo = [webInfo]

      console.log(params)
      if (
        !params.companyid ||
        !params.curId ||
        !params.companyaddress ||
        !params.pcmoney ||
        !params.appmoney ||
        !params.webname ||
        !webInfo.size ||
        !webInfo.domain
      ) {
        this.$message({
          type: 'error',
          message: '请完善带*号必填项'
        })
        return
      }
      if (this.form.wjType === '0' || this.form.wjType === '10' || this.form.wjType === '20') {
        if (!webInfo.modelnumber) {
          this.$message({
            type: 'error',
            message: '请填写模板编号或参考网站'
          })
          return
        }
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
      this.$post('/wf.do?WebSite', params).then(res => {
        if (res.data[0].success) {
          this.$message.success('提交成功！')
          if (!this.showEditWJ) {
            this.$router.push({
              path: '/indexPage/orderPending',
              query: { data: 'fromDetail' }
            })
            return
          }
          this.$router.push({
            path: '/indexPage/orderList'
          })
        }
      })
    },
    // 选择公司弹窗
    selCompany () {
      this.comDialog.params = {
        pid: ORDER_TYPE
      }
      this.comDialog.selCompanyDialog = true
      this.comDialog.key = '' + new Date()
    },
    // 选择具体公司
    handleSelCompany (company) {
      this.companyData = company
      this.pid = company.pid === 'DS' ? ORDER_TYPE : ORDER_TYPE_ZTC
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
      this._getMyContract('', this.pid === ORDER_TYPE ? CONTRACT_TYPE : CONTRACT_TYPE_ZTC)
    },
    // 获取到款记录 和 客户地址 cpid
    _getMoneyRecord () {
      let moneyRecordParams = {
        cid: this.moneyRecord.cid,
        companylogid: this.moneyRecord.companylogid,
        uid: this.moneyRecord.uid,
        pid: this.pid
      }
      this.$post('/wf.do?set', moneyRecordParams).then(res => {
        let _record = res.data[2].data
        this.cpid = res.data[0].data[1]
        this.moneyRecord.recordList = _record
        // this.moneyRecord.recordDetail = _record.splice(1)
        // console.log(this.moneyRecord.recordDetail)
        this.form.cusAddress = res.data[1].data[0].address
        if (this.showEditWJ) {
          this.showQualify_add = res.data[3].data
          this.qualifyUploaded_add = JSON.parse(JSON.stringify(this.showQualify_add))
        }
      })
    },
    getQualifyList (newArr, delArr) { // 获取删除的资质
      this.deledQualify = this.deledQualify.concat(delArr)
      this.qualifyUploaded_add = this.qualifyUploaded_add.filter(val => val.val !== delArr[0].val)
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
    removeQualify (index) {
      this.form.zizhiList.splice(index, 1)
    },
    submitUpload (data, index) {
      this.$refs['upload' + index].submit()
      this.rowData = data
    },
    uploadSuccess (res, file, fileList) {
      console.log(this.rowData)
      this.qualifyUploaded_add.push({
        id: null,
        label: this.rowData.tb_field_name,
        val: res.url + '#' + this.rowData.code_desc
      })
    },
    updateMyCompanyList (data) {
      this.comDialog.myCompany = data.data[0].data
    },
    _getServiceType () {
      getByCode(59).then(res => {
        this.wjForm.serviceTypeList = res.data.data
      })
    },
    handleTabClick (val) {
      if (val.label === this.tabLabel) {
        getByCode(33).then(res => {
          this.column_names = res.data.data
        })
        getByCode(34).then(res => {
          this.column_types = res.data.data
        })
      }
    }
  },
  components: { Page, ShowQualify }
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

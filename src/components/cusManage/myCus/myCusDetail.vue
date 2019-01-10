<template>
  <div class="mycus-detail child-component-container media-padding">
    <div class="detail-main">
      <div class="cus-info">
        <div class="title">
          <el-button class="title-btn" type="primary">客户信息</el-button>
          <el-button @click.native="backRouter" class="back" type="warning">返回</el-button>
        </div>
        <div class="line" style="max-width:980px;"></div>
        <el-form ref="form" :model="form" label-width="98px" :label-position="labelPosition">
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户名称 :">
                <el-input v-model="cusDetail.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="所属行业 :" required>
                <select-trade :echoTrade="form.trade" v-model="form.trade" style="width:100%"></select-trade>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户法人 :">
                <el-input v-model="cusDetail.legal_person" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户地址 :">
                <el-input v-model="cusDetail.address" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="成立日期 :">
                <el-date-picker v-model="cusDetail.establishment_date" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd" :disabled="disabled" type="date" style="width:100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="所属地区 :" required>
                <select-area :echoArea="form.area" v-model="form.area" :areaDisabled="disabled" style="width:100%"></select-area>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户网址 :">
                <el-input v-model="cusDetail.website"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户来源 :">
                <el-select v-model="cusDetail.fm" :disabled="disabled" style="width:100%;">
                  <el-option v-for="(item,index) in fmList" :key="index" :value="item.id" :label="item.code_desc"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="(item,index) in form.contactList" :key="index" :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="联系人 :" required>
                <el-input v-model="item.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item required>
                <span slot="label">
                  <el-button @click.native="callPhone(item.contact)" type="success" icon="fa fa-phone fa-lg" circle size="mini"></el-button>
                  电话 :
                </span>
                <el-input v-model="item.contact" class="input-btn"></el-input>
                <el-button @click.native="addContact(index)" class="circle-btn" :type="index===0?'success':'danger'" size="mini" :icon="index===0?'fa fa-plus':'fa fa-minus'" circle></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="24" style="max-width:1000px;">
              <el-form-item label="经营范围 :" required>
                <el-input v-model="cusDetail.business_scope" :disabled="disabled" type="textarea" :rows="4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
          <el-col :md="24">
            <el-form-item label="产品类型 :">
              <el-radio-group @change="changeProType" v-model="proType">
                <el-radio  v-for="item in proTypeList" :key="item.id" :label="item.id">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="客户类型 :">
              <el-select v-model="cusType" style="width:100%;">
                <el-option v-for="(item,index) in cusTypeList" :key="index" :value="item.producttype" :label="item.productname"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="24" style="max-width:1000px;">
            <el-form-item label="备注 :">
              <el-input v-model="viewRemark" type="textarea" :rows="3" placeholder="请填写详细修改备注;如新行业: 增加新联系人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

          <div class="btns mt10px" style="max-width:1000px;text-align:center;">
            <el-button type="success" @click.native="subBaoA">申请保A</el-button>

            <el-button type="primary" @click.native="applyEditDialog=true"
            v-if="((cusDetail.cltype==20&&cusDetail.clstatus>20&&cusDetail.uid==userId)||(cusDetail.cltype<20&&cusDetail.clstatus>20)||(cusDetail.cltype==20&&cusDetail.clstatus==0))"
            >申请修改</el-button>

            <!-- <el-button  type="success" @click.native="aaa"
            v-if="cusDetail.ctype==-10&&cusDetail.clstatus!=20">修改并申请重审</el-button> -->

            <el-button type="warning" @click.native="stopFollow"
            v-if="(cusDetail.traceId!=null&&cusDetail.traceUid==userId)"
            >放弃跟踪</el-button>

            <el-button type="danger" @click.native="stopBaoA"
            v-if="(myKind==30&&cusDetail.cltype==20&&cusDetail.clstatus>=20&&cusDetail.uid==userId)"
            >放弃保A</el-button>

          </div>
        </el-form>
      </div>
      <div class="follow-record mt10px">
        <div class="title">
          <el-button class="title-btn" type="primary">日志记录</el-button>
        </div>
        <!-- <div class="line" style="max-width:980px;"></div> -->
        <el-tabs v-model="activeName" style="width:100%;" type="card" @tab-click="handleClick">
          <el-tab-pane label="跟进记录" name="1">
            <el-table :data="followLogs" style="width: 100%;">
              <el-table-column prop="" label="跟进日期">
                <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="remark" label="跟进备注">
              </el-table-column>
              <el-table-column prop="username" label="跟进人">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="审核记录" name="2">
            <el-table :data="checkLogs" style="width: 100%;">
              <el-table-column prop="pname" label="业务类型" width="80">
              </el-table-column>
              <el-table-column prop="" label="处理类型" width="120">
                <span slot-scope="scope">{{scope.row.type | cusState('checkType')}}</span>
              </el-table-column>
              <el-table-column prop="" label="处理状态" width="120">
                <span slot-scope="scope">{{scope.row.status | cusState('checkStatus')}}</span>
              </el-table-column>
              <el-table-column prop="username" label="提交人" width="100">
              </el-table-column>
              <el-table-column prop="insert_time" label="提交时间" width="95">
                <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="cremark" label="提交备注">
              </el-table-column>
              <el-table-column prop="auditor" label="处理人" width="100">
              </el-table-column>
              <el-table-column prop="" label="处理时间" width="95">
                <span slot-scope="scope">{{scope.row.auditor_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="reason" label="被拒原因">
              </el-table-column>
              <el-table-column prop="clremark" label="处理备注">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="出访记录" name="3">
            <el-table :data="visitLogs" style="width: 100%;">
              <el-table-column prop="" label="出访时间">
                <span slot-scope="scope">{{scope.row.begin_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="name" label="拜访对象">
              </el-table-column>
              <el-table-column prop="contact" label="拜访电话">
              </el-table-column>
              <el-table-column prop="" label="客户意向">
                <span slot-scope="scope">{{scope.row.result + "%"}}</span>
              </el-table-column>
              <el-table-column prop="" label="拜访结果">
                <span slot-scope="scope">{{scope.row.end_result | cusState('end_result')}}</span>
              </el-table-column>
              <el-table-column prop="" label="拜访结束时间">
                <span slot-scope="scope">{{scope.row.end_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="username" label="出访人">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="修改记录" name="4">
            <el-table :data="changeLogs" style="width: 100%;">
              <el-table-column prop="name" label="操作人">
              </el-table-column>
              <el-table-column prop="" label="操作时间">
                <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="remark" label="操作内容">
              </el-table-column>
            </el-table>
            <page class="page" :url="changeUrl" :sendParams="changeParams" @updateList="getChangeLogs"></page>
          </el-tab-pane>
          <el-tab-pane label="申请修改记录" name="5">
            <el-table :data="applyChangeLogs" style="width: 100%;">
              <el-table-column prop="applyName" label="提交人">
              </el-table-column>
              <el-table-column prop="" label="提交时间">
                <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="remark" label="提交备注">
              </el-table-column>
              <el-table-column prop="auditorName" label="处理人">
              </el-table-column>
              <el-table-column prop="" label="处理状态">
                <span slot-scope="scope">{{scope.row.type | cusState('checkStatus')}}</span>
              </el-table-column>
              <el-table-column prop="" label="处理时间">
                <span slot-scope="scope">{{scope.row.auditor_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="refuseremark" label="被拒原因">
              </el-table-column>
            </el-table>
            <page class="page" :url="applyChangeUrl" :sendParams="applyChangeParams" @updateList="getApplyChangeLogs"></page>
          </el-tab-pane>
          <el-tab-pane label="放弃保A日志" name="6">
            <el-table :data="stopBaoALogs" style="width: 100%;">
              <el-table-column prop="companyname" label="客户名称">
              </el-table-column>
              <el-table-column prop="" label="操作时间">
                <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="username" label="操作人">
              </el-table-column>
              <el-table-column prop="remark" label="备注">
              </el-table-column>
            </el-table>
            <page class="page" :url="stopUrl" :sendParams="stopParams" @updateList="getStopBaoALogs"></page>
          </el-tab-pane>
          <el-tab-pane label="续费记录" name="7">
            <el-table :data="renewLogs" style="width: 100%;">
              <el-table-column prop="companyname" label="客户名称">
              </el-table-column>
              <el-table-column prop="baiducount" label="用户名">
              </el-table-column>
              <el-table-column prop="" label="实际到款金额">
                <span slot-scope="scope">{{scope.row.receiptmoney | currency}}</span>
              </el-table-column>
              <el-table-column prop="" label="实际加款金额">
                <span slot-scope="scope">{{(scope.row.tgbonus+ scope.row.ggbonus+ scope.row.ysdltg) | currency}}</span>
              </el-table-column>
              <el-table-column prop="" label="续费时间">
                <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="username" label="维护客服">
              </el-table-column>
            </el-table>
            <page class="page" :url="renewUrl" :sendParams="renewParams" @updateList="getRenewLogs"></page>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 申请保A弹窗 -->
    <el-dialog :modal-append-to-body="false" title="申请保A" :visible.sync="applyBaoADialog" width="400px">
      <p>客户类型：</p>
      <el-select v-model="productType" style="width:100%;">
        <el-option value="" label="请选择客户类型"></el-option>
        <el-option v-if="!(cusDetail.cltype>=20&&cusDetail.clstatus>=20)" value="0" label="新开"></el-option>
        <template v-if="cusDetail.cltype==30">
          <el-option value="10" label="一户多开"></el-option>
          <el-option value="20" label="老户重开"></el-option>
          <el-option value="30" label="多项目"></el-option>
          <el-option value="40" label="(新)"></el-option>
          <el-option value="50" label="信息流"></el-option>
        </template>
      </el-select>
      <p>修改备注：</p>
      <el-input v-model="remark" type="textarea" :rows="4"></el-input>
      <div style="margin-top:10px;text-align:center;">
        <el-button type="primary" @click.native="subBaoA">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 申请修改弹窗 -->
    <el-dialog :modal-append-to-body="false" title="申请修改客户信息" :visible.sync="applyEditDialog" width="400px">
      <p>修改备注：</p>
      <el-input v-model="applyEditRemark" type="textarea" :rows="5" placeholder="请填写详细的修改备注"></el-input>
      <div style="margin-top:10px;text-align:center;">
        <el-button type="primary" @click.native="subApplyEdit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import Page from 'base/page/page'
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import { getByCode } from 'api/getOptions'
import { appMark } from 'common/js/utils'
export default {
  data () {
    return {
      labelPosition: 'right',
      userId: cookie.get('userId'),
      form: {
        trade: [],
        area: [],
        oldContactList: [],
        contactList: [
          {
            contact: '',
            phone: ''
          }
        ]
      },
      fmList: [],
      disabled: true,
      followRecordData: [],
      activeName: '1',
      receiveData: {},
      cusDetail: {},
      followLogs: [], // 跟进记录
      checkLogs: [], // 审核记录
      visitLogs: [], // 出访记录
      changeLogs: [], // 修改记录
      changeUrl: '/Company.do?EditCompanyRecord',
      changeParams: {},
      applyChangeLogs: [], // 申请修改记录
      applyChangeUrl: '/Company.do?applyEditInfoRecord',
      applyChangeParams: {},
      stopBaoALogs: [], // 放弃保A记录
      stopUrl: '/Company.do?userCompanylogRecord',
      stopParams: {},
      renewLogs: [], // 续费记录
      renewUrl: '/Renew.do?renewapplylist',
      renewParams: {},

      applyBaoADialog: false, // 保A弹窗
      productType: '',
      remark: '',
      myKind: '',

      applyEditDialog: false, // 申请修改弹窗
      applyEditRemark: '',

      rowData: {},
      proType: 'DS',
      proTypeList: [],
      cusType: '',
      cusTypeList: [],
      viewRemark: ''
    }
  },
  created () {
    if (appMark()) {
      this.labelPosition = 'top'
    }
    console.log(this.$route.query.data)
    this.myKind = this.$route.query.myKind
    this.receiveData = this.$route.query.data
    if (!this.receiveData.id) {
      this.$router.go(-1)
      return
    }
    this.renewParams = { companyId: this.receiveData.id }
    this.applyChangeParams = this.stopParams = {
      companyid: this.receiveData.id,
      companylogid: this.receiveData.companylogid
    }
    this.changeParams = {
      companyid: this.receiveData.id,
      companylogid: this.receiveData.companylogid,
      companylogtype: this.cusDetail.cltype,
      companylogstatus: this.cusDetail.clstatus
    }
    // todo
    this.cusType = ''
    this.proType = this.receiveData.productid
    this._getProTypeList()
    this._getMyCusDetail(this._getCusTypeList)
  },
  mounted () {
    getByCode(27).then(res => {
      this.fmList = res.data.data
    })
  },
  methods: {
    changeProType (val) {
      this.cusType = ''
      this._getCusTypeList(val)
    },
    _getCusTypeList (pid) {
      let params = {
        cid: this.cusDetail.id,
        pid: this.proType,
        producttype: this.cusDetail.producttype
      }
      this.$get('/Company.do?checkComProtectA', params).then(res => {
        if (res.data.success) {
          this.cusTypeList = res.data.data
        } else {
          this.cusTypeList = []
          this.$message.error(res.data.msg + '')
        }
      })
    },
    _getProTypeList () {
      this.$get('/Product.do?proget', {parentid: 0}).then(res => {
        if (res.data.success) {
          this.proTypeList = res.data.data
        }
      })
    },
    // 放弃保A
    stopBaoA () {
      this.$confirm('请确认是否放弃保A?', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$post('/Project.do?AbandonA', {
            companylogid: this.receiveData.companylogid
          }).then(res => {
            this.$message({
              type: 'success',
              message: '已放弃保A!'
            })
            this.$router.push({
              path: '/indexPage/myCus',
              query: { data: 'fromDetail' }
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 放弃跟踪
    stopFollow () {
      this.$confirm('是否放弃跟踪?', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$post('/Project.do?AbandonB', {
            companylogid: this.receiveData.companylogid
          }).then(res => {
            this.$message({
              type: 'success',
              message: '已放弃跟踪!'
            })
            this.$router.push({
              path: '/indexPage/myCus',
              query: { data: 'fromDetail' }
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 修改并申请重审
    applyRepeatCheck () {
      let params = {
        companyid: this.receiveData.id,
        companylogid: this.receiveData.companylogid,
        cat: this.cusDetail.bid || this.cusDetail.cid,
        fm: this.cusDetail.fm,
        areaid:
          this.cusDetail.county ||
          this.cusDetail.city ||
          this.cusDetail.province,
        address: this.cusDetail.address,
        legal_person: this.cusDetail.legal_person,
        website: this.cusDetail.website,
        business_scope: this.cusDetail.business_scope,
        establishment_date: this.cusDetail.establishment_date,
        companycontact: this.form.contactList,
        companycontactbefore: this.form.oldContactList,
        imgUrl: this.cusDetail.imgUrl
      }
      this.$post('/Company.do?EditCompany', params).then(res => {
        this.applyEditDialog = false
        this.$message({
          type: 'success',
          message: '申请重审成功'
        })
        this.$router.push({
          path: '/indexPage/myCus',
          query: { data: 'fromDetail' } // 标识myCus组件列表带之前条件重新加载一次
        })
      })
    },
    // 申请修改
    subApplyEdit () {
      let params = {
        companyid: this.receiveData.id,
        companylogid: this.receiveData.companylogid,
        remark: this.applyEditRemark
      }
      if (!this.applyEditRemark) {
        this.$message({
          type: 'warning',
          message: '请填写日志记录'
        })
        return
      }
      this.$post('/Company.do?applyEditInfo', params).then(res => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '申请成功'
          })
          this.$router.push({
            path: '/indexPage/myCus',
            query: { data: 'fromDetail' }
          })
        }
      })
    },
    // 申请保A提交
    subBaoA () {
      if (this.form.contactList.some(val => !val.name || !val.contact)) {
        this.$message.error('请填写联系人或电话！')
        return
      }
      if (!this.proTypeList.some(val => this.proType === val.id)) {
        this.$message.error('请选择产品类型！')
        return
      }
      if (this.cusType === undefined || this.cusType === null || this.cusType === '') {
        this.$message.error('请选择客户类型！')
        return
      }
      let params = {
        'pid': this.proType,
        'companylogid': this.rowData.companylogid,
        'companyid': this.cusDetail.id,
        'remark': this.viewRemark,
        'apply_A': '我的客户申请保A',
        'type': 20,
        'producttype': this.cusType,
        'website': this.cusDetail.website,
        'cat': this.form.trade[1] || this.form.trade[0] || this.cusDetail.bid || this.cusDetail.cid,
        'contact': this.form.contactList,
        'establishment': this.cusDetail.establishment_date,
        'legal_person': this.cusDetail.legal_person,
        'address': this.cusDetail.address,
        'fm': this.cusDetail.fm,
        'area': this.form.area[2] || this.form.area[1] || this.form.area[0] || this.cusDetail.county || this.cusDetail.city || this.cusDetail.province,
        'business_scope': this.cusDetail.business_scope
      }
      this.$post('/Company.do?compset', params).then(res => {
        if (res.data[0].success) {
          this.$router.push({
            path: '/indexPage/myCus',
            query: {data: 'fromDetail'}
          })
          this.$message.success('已提交申请！')
        } else {
          this.$message({
            type: 'danger',
            message: res.data[0].msg
          })
        }
      })
    },
    _getMyCusDetail (fn, fnParams) {
      this.$post('/CustomerCheck.do?customlist', {
        cid: this.receiveData.id,
        companylogid: this.receiveData.companylogid
      }).then(res => {
        this.cusDetail = res.data[0].data[0]
        if (this.cusDetail.ctype === -10) {
          this.disabled = false
        }
        fn(fnParams)
        console.log(this.cusDetail)
        this.form.trade = [this.cusDetail.cid, this.cusDetail.bid]
        this.form.area = [
          this.cusDetail.province,
          this.cusDetail.city,
          this.cusDetail.county
        ]
        this.form.contactList = res.data[1].data || [{}]
        this.form.oldContactList = res.data[1].data || []
        this.checkLogs = res.data[2].data // 审核记录
        // this.form = {
        //   cusName: detailData.name,
        //   buildDate: detailData.establishment_date,
        //   cus: detailData.legal_person,
        //   cusAddr: detailData.address,
        //   cusWeb: detailData.website,
        //   cusFrom: detailData.fm,
        //   trade: detailData.cid,
        //   area: detailData.province,
        //   businessScope: detailData.business_scope,
        //   contactList: contacts
        // }
        this._getFollowLogs()
        this._getVisitLogs()
      })
    },
    // 跟进记录
    _getFollowLogs () {
      this.$post('/follow.do?up', {
        cid: this.receiveData.id,
        pid: this.cusDetail.productId,
        cat: 200,
        companylogid: this.receiveData.companylogid
      }).then(res => {
        this.followLogs = res.data.data
      })
    },
    // 出访记录
    _getVisitLogs () {
      this.$post('/follow.do?visitrecord', {
        cid: this.receiveData.id,
        pid: this.cusDetail.productId,
        cat: 100
      }).then(res => {
        this.visitLogs = res.data.data
      })
    },
    // 修改记录带分页
    getChangeLogs (res) {
      this.changeLogs = res.data[0].data
    },
    // 申请修改记录带分页
    getApplyChangeLogs (res) {
      this.applyChangeLogs = res.data[0].data
    },
    // 放弃保A记录带分页
    getStopBaoALogs (res) {
      this.stopBaoALogs = res.data[0].data
    },
    // 续费记录带分页
    getRenewLogs (res) {
      this.renewLogs = res.data[0].data
    },
    backRouter () {
      this.$router.go(-1)
    },
    addContact (index) {
      if (index === 0) {
        this.form.contactList.push({
          contact: '',
          name: ''
        })
      } else {
        this.form.contactList.splice(index, 1)
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  components: { Page, SelectArea, SelectTrade }
}
</script>

<style lang="less" scoped>
.mycus-detail {
  .maxwidth {
    max-width: 500px;
  }
  .circle-btn {
    width: 26px;
    height: 26px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    max-width: 980px;
    .title-btn {
      border-top-right-radius: 15px;
    }
  }
  .input-btn{
    width: calc(~"(100% - 40px)");
  }
}
</style>

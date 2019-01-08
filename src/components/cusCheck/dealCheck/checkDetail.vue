<template>
  <div class="mycus-detail child-component-container media-padding">
    <div class="detail-main">
      <div class="cus-info">
        <div class="check-search">
          <el-input placeholder="请输入电话或公司名进行搜索" v-model="searchWords" style="max-width:400px;"></el-input>
          <el-button type="primary" @click.native="checkSearch" size="mini">查 重</el-button>
        </div>
        <div class="title">
          <el-button class="title-btn" type="primary">客户信息</el-button>
          <el-button @click.native="backRouter" class="back" type="warning">返回</el-button>
        </div>
        <div class="line" style="max-width:980px;"></div>
        <el-form ref="form" :model="form" label-width="90px">
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户名称 :">
                <el-input v-model="form.cusName"></el-input>
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
                <el-input v-model="cusDetail.legal_person"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户地址 :">
                <el-input type="textarea" v-model="cusDetail.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="成立日期 :">
                <el-date-picker v-model="cusDetail.establishment_date" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd" type="date" style="width:100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="所属地区 :" required>
                <select-area :echoArea="form.area" v-model="form.area" style="width:100%"></select-area>
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
                <el-select v-model="cusDetail.fm" style="width:100%;">
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
              <el-form-item label="联系电话 :" required>
                <el-input v-model="item.contact" class="contact-phone" :class="item.red ?'phonered': ''"></el-input>
                <el-button @click.native="addContact(index)" class="circle-btn" :type="index===0?'success':'danger'" size="mini" :icon="index===0?'fa fa-plus':'fa fa-minus'" circle></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户类型 :" required>
                <el-select v-model="cusDetail.producttype" style="width:100%;">
                  <el-option :value="0" label="新开"></el-option>
                  <el-option :value="10" label="一户多开"></el-option>
                  <el-option :value="20" label="老户重开"></el-option>
                  <el-option :value="30" label="多项目"></el-option>
                  <el-option :value="40" label="(新)"></el-option>
                  <el-option :value="50" label="信息流"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="24" style="max-width:1000px;">
              <el-form-item label="经营范围 :" required>
                <el-input v-model="cusDetail.business_scope" type="textarea" :rows="4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="24" style="max-width:1000px;">
              <el-form-item label="备注 :" required>
                <el-input v-model="cusDetail.company_remark" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 待审信息 -->
      <div class="cus-info">
        <div class="title">
          <el-button class="title-btn" type="primary">待审信息</el-button>
        </div>
        <div class="line" style="max-width:980px;"></div>
        <el-form ref="form" :model="form" label-width="115px">
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="处理类型 :">
                <span>{{cusDetail.cltype | cusState('checkType')}}</span>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="提交人 :">
                <span>{{cusDetail.username}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="提交备注 :">
                <span>{{cusDetail.remark}}</span>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="提交时间 :">
                <span>{{cusDetail.insert_time | timeFormat}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="提交时间 :">
                <span>{{cusDetail.insert_time | timeFormat}}</span>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row :gutter="20">
            <el-col :md="24" style="max-width:1000px;">
              <el-form-item label="审核被拒原因 :">
                <el-select multiple v-model="reason" value-key="id" style="width:100%;">
                  <el-option v-for="item in rejectData" :key="item.id" :value="item" :label="item.code_desc"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="24" style="max-width:1000px;">
              <el-form-item label="审核备注 :">
                <el-input v-model="checkRemark" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="btns mt10px" style="max-width:1000px;text-align:center;">
            <el-button v-if="receiveData.cltype!=20" type="success" @click.native="checkPass">审核通过</el-button>
            <el-button v-if="receiveData.cltype!=20" type="danger" @click.native="checkFail">审核不通过</el-button>
            <el-button v-if="receiveData.cltype==20&&cusDetail.ctype<=0" type="primary" @click.native="basicCheckPass">仅基本信息通过</el-button>
            <el-button v-if="receiveData.cltype==20" type="success" @click.native="baoAPass">保A审核通过</el-button>
            <el-button v-if="receiveData.cltype==20&&cusDetail.ctype>0" type="danger" @click.native="baoAFail">保A审核不通过</el-button>
            <el-button v-if="receiveData.cltype==20&&cusDetail.ctype<=0" type="danger" @click.native="allCheckFail">审核都不通过</el-button>
            <el-button type="primary" @click.native="saveCusInfo">保存客户资料</el-button>
          </div>
        </el-form>
      </div>
      <!-- 日志记录 -->
      <div class="follow-record mt10px">
        <div class="title">
          <el-button class="title-btn" type="primary">日志记录</el-button>
        </div>
        <el-tabs v-model="activeName" style="width:100%;" type="card" @tab-click="handleClick">
          <el-tab-pane label="审核记录" name="1">
            <el-table :data="checkLogs" border stripe style="width: 100%;">
              <el-table-column prop="pname" label="业务类型" width="80">
              </el-table-column>
              <el-table-column prop="" label="处理类型" width="120">
                <span slot-scope="scope">{{scope.row.type | cusState('checkType')}}</span>
              </el-table-column>
              <el-table-column prop="" label="处理状态" min-width="120">
                <span slot-scope="scope">{{scope.row.status | cusState('checkStatus')}}</span>
              </el-table-column>
              <el-table-column prop="username" label="提交人" width="80">
              </el-table-column>
              <el-table-column prop="insert_time" label="提交时间" width="95">
                <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="cremark" label="提交备注" min-width="250">
              </el-table-column>
              <el-table-column prop="auditor" label="处理人" width="100">
              </el-table-column>
              <el-table-column prop="" label="处理时间" width="95">
                <span slot-scope="scope">{{scope.row.auditor_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="reason" label="被拒原因" min-width="150">
              </el-table-column>
              <el-table-column prop="clremark" label="处理备注" min-width="180">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="修改记录" name="2">
            <el-table :data="changeLogs" border stripe style="width: 100%;">
              <el-table-column prop="name" label="操作人" width="120">
              </el-table-column>
              <el-table-column prop="" label="操作时间" width="150">
                <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="remark" label="操作内容">
              </el-table-column>
            </el-table>
            <page :defaultSearch="defaultSearch" class="page" :url="changeUrl" :sendParams="changeParams" @updateList="getChangeLogs"></page>
          </el-tab-pane>
          <el-tab-pane label="申请修改记录" name="3">
            <el-table :data="applyChangeLogs" border stripe style="width: 100%;">
              <el-table-column prop="applyName" label="提交人">
              </el-table-column>
              <el-table-column prop="" label="提交时间" width="150">
                <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="remark" label="提交备注">
              </el-table-column>
              <el-table-column prop="auditorName" label="处理人">
              </el-table-column>
              <el-table-column prop="" label="处理状态">
                <span slot-scope="scope">{{scope.row.type | cusState('checkStatus')}}</span>
              </el-table-column>
              <el-table-column prop="" label="处理时间" width="150">
                <span slot-scope="scope">{{scope.row.auditor_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="refuseremark" label="被拒原因">
              </el-table-column>
            </el-table>
            <page :defaultSearch="defaultSearch" class="page" :url="applyChangeUrl" :sendParams="applyChangeParams" @updateList="getApplyChangeLogs"></page>
          </el-tab-pane>
          <el-tab-pane label="放弃保A日志" name="4">
            <el-table :data="stopBaoALogs" border stripe style="width: 100%;">
              <el-table-column prop="companyname" label="客户名称">
              </el-table-column>
              <el-table-column prop="" label="操作时间" width="150">
                <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="username" label="操作人" width="80">
              </el-table-column>
              <el-table-column prop="remark" label="备注" min-width="200">
              </el-table-column>
            </el-table>
            <page :defaultSearch="defaultSearch" class="page" :url="stopUrl" :sendParams="stopParams" @updateList="getStopBaoALogs"></page>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 电话查重弹窗 -->
    <el-dialog v-drag-dialog :modal-append-to-body="false" title="电话查重" :visible.sync="phoneRepeatDialog" width="800px">
      <el-table stripe border :data="repeatList" style="width: 100%;margin-top:10px;">
        <el-table-column prop="companyname" label="客户名称" min-width="150">
        </el-table-column>
        <el-table-column prop="" label="客户类型" min-width="80">
          <span slot-scope="scope">
            {{scope.row.producttype | cusState('cusType')}}{{scope.row.producttype!==0?scope.row.productnumber:''}}
          </span>
        </el-table-column>
        <el-table-column prop="productname" label="业务类型" min-width="80">
        </el-table-column>
        <el-table-column prop="" label="业务状态">
          <span :class="scope.row.logstatus==10?'red':''" slot-scope="scope">{{scope.row.logtype+""+scope.row.logstatus | businessStatus}}</span>
        </el-table-column>
        <el-table-column prop="username" label="提交人">
        </el-table-column>
        <el-table-column prop="fullname" label="提交人部门">
        </el-table-column>
        <el-table-column prop="" label="操作" width="80px">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click.native="view(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page class="page" :url="phoneRepeatUrl" :sendParams="phoneRepeatParams" @updateList="getPhoneRepeatInfo"></page>
    </el-dialog>

    <!-- 查看弹窗 -->
    <el-dialog :modal-append-to-body="false" title="客户信息" :visible.sync="viewDialog" width="700px">
      <el-form ref="form" :model="form" label-width="90px">
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户名称 :">
                <el-input v-model="cusDetail2.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="所属行业 :" required>
                <select-trade :echoTrade="[cusDetail2.cid,cusDetail2.bid]" style="width:100%"></select-trade>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户法人 :">
                <el-input v-model="cusDetail2.legal_person"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户地址 :">
                <el-input type="textarea" v-model="cusDetail2.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户网址 :">
                <el-input v-model="cusDetail2.website"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户来源 :">
                <el-select v-model="cusDetail2.fm" style="width:100%;">
                  <el-option v-for="(item,index) in fmList" :key="index" :value="item.id" :label="item.code_desc"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="(item,index) in form.contactList2" :key="index" :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="联系人 :" required>
                <el-input v-model="item.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="联系电话 :" required>
                <el-input v-model="item.contact" :class="item.red ?'phonered': ''"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="24" style="max-width:1000px;">
              <el-form-item label="经营范围 :" required>
                <el-input v-model="cusDetail.business_scope" type="textarea" :rows="4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import Page from 'base/page/page'
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import { getByCode } from 'api/getOptions'
export default {
  data () {
    return {
      searchWords: '',
      userId: cookie.get('userId'),
      form: {
        cusName: '',
        trade: [],
        area: [],
        oldContactList: [],
        contactList: [
          {
            contact: '',
            phone: ''
          }
        ],
        contactList2: []
      },
      fmList: [],
      // disabled: true,
      followRecordData: [],
      activeName: '1',
      receiveData: {},
      cusDetail: {},
      cusDetail2: {},
      checkLogs: [], // 审核记录
      changeLogs: [], // 修改记录
      changeUrl: '/Company.do?EditCompanyRecord',
      changeParams: {},
      applyChangeLogs: [], // 申请修改记录
      applyChangeUrl: '/Company.do?applyEditInfoRecord',
      applyChangeParams: {},
      stopBaoALogs: [], // 放弃保A记录
      stopUrl: '/Company.do?userCompanylogRecord',
      stopParams: {},
      defaultSearch: false,

      phoneRepeatDialog: false, // 电话查重弹窗
      repeatList: [],
      phoneRepeatUrl: '/Search.do?ByPhone',
      phoneRepeatParams: {},

      viewDialog: false, // 查看弹窗

      rejectData: [], // 待审数据
      reason: [],
      checkRemark: '',
      realDelcontact: [] // 储存真正被删除的联系人信息
    }
  },
  created () {
    this.realDelcontact = []
    console.log(this.$route.query.data)
    this.receiveData = this.$route.query.data
    if (!this.receiveData.id) {
      this.$router.go(-1)
      return
    }
    this._getMyCusDetail()
  },
  mounted () {
    getByCode(27).then(res => {
      this.fmList = res.data.data
    })
    if (this.receiveData.cltype === 20) {
      getByCode(30).then(res => {
        this.rejectData = res.data.data
        this.rejectData.forEach(val => {
          val.label = val.code_desc
        })
      })
    } else {
      getByCode(29).then(res => {
        this.rejectData = res.data.data
        this.rejectData.forEach(val => {
          val.label = val.code_desc
        })
      })
    }
    this.defaultSearch = true
    this.applyChangeParams = {
      companyid: this.receiveData.id,
      companylogid: this.receiveData.companylogid
    }
    this.stopParams = {
      companyid: this.receiveData.id,
      companylogid: this.receiveData.companylogid
    }
    this.changeParams = {
      companyid: this.receiveData.id,
      companylogid: this.receiveData.companylogid,
      companylogtype: this.cusDetail.cltype,
      companylogstatus: this.cusDetail.clstatus
    }
  },
  methods: {
    view (data) {
      let params = {
        'cid': data.companyid,
        'companylogid': data.logid,
        'uid': data.userid
      }
      this.$post('/CheckOut.do?list', params).then(res => {
        this.cusDetail2 = res.data[0].data[0]
        this.contactList2 = res.data[1].data
      })
      this.viewDialog = true
    },
    checkSearch () {
      let reg = /\d{7,}/
      let reg1 = /[\u4e00-\u9fa5]/
      if (reg.test(this.searchWords)) {
        this.phoneRepeatDialog = true
        this.phoneRepeatParams = {
          phone: this.searchWords
        }
      } else if (reg1.test(this.searchWords)) {
        this.phoneRepeatDialog = true
        this.phoneRepeatParams = {
          companyname: this.searchWords
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请输入至少7位电话号码或公司名进行查询!'
        })
      }
    },
    getPhoneRepeatInfo (res) {
      this.repeatList = res.data[0].data
    },
    // 审核通过
    checkPass () {
      let params = {
        id: this.receiveData.id,
        logckid: this.checkLogs[0].logckid,
        cid: this.receiveData.check_id,
        companylogtype: this.cusDetail.cltype,
        reason: this.reason,
        remark: this.checkRemark
      }
      this.$post('/CheckOut.do?pass', params).then(res => {
        if (res.data[2].success) {
          this.$message.success(res.data[2].msg)
          this.$router.push({
            path: '/indexPage/dealCheck',
            query: { data: 'fromDetail' }
          })
        }
      })
    },
    // 审核不通过
    checkFail () {
      let params = {
        id: this.receiveData.id,
        logckid: this.checkLogs[0].logckid,
        cid: this.receiveData.check_id,
        companylogtype: this.cusDetail.cltype,
        reason: this.reason,
        remark: this.checkRemark
      }
      this.$post('/CheckOut.do?baserefuse', params).then(res => {
        if (res.data[0].success) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.$router.push({
            path: '/indexPage/dealCheck',
            query: { data: 'fromDetail' }
          })
        }
      })
    },
    // 基本资料审核通过但保A不通过
    basicCheckPass () {
      let params = {
        uid: this.receiveData.uid,
        type: this.cusDetail.ctype,
        id: this.receiveData.id,
        logckid: this.checkLogs[0].logckid,
        cid: this.receiveData.check_id,
        companylogtype: this.cusDetail.cltype,
        reason: this.reason,
        remark: this.checkRemark
      }
      this.$post('/CheckOut.do?basepass', params).then(res => {
        if (res.data[0].success) {
          this.$message.success('操作成功！')
          this.$router.push({
            path: '/indexPage/dealCheck',
            query: { data: 'fromDetail' }
          })
        }
      })
    },
    // 保A审核通过
    baoAPass () {
      this.checkPass()
    },
    // 保A审核不通过
    baoAFail () {
      this.basicCheckPass()
    },
    // 审核都不通过
    allCheckFail () {
      this.checkFail()
    },
    // 保存客户资料
    saveCusInfo () {
      let newadd = []
      let oldcontact = []
      this.form.contactList.forEach(val => {
        if (!val.contactid) {
          newadd.push(val)
        } else {
          oldcontact.push(val)
        }
        if (!val.name || !val.contact) {
          this.$message({
            type: 'warning',
            message: '请完善联系人信息'
          })
          throw new Error('ignore')
        }
      })
      this.form.cusName = this.form.cusName
        .replace((/\(/g, '（'))
        .replace((/\)/g, '）'))
      let params = {
        cid: this.receiveData.id,
        cat: this.form.trade[1] || this.form.trade[0],
        fm: this.cusDetail.fm,
        name:
          this.cusDetail.name === this.form.cusName ? '' : this.form.cusName,
        area: this.form.area[2] || this.form.area[1] || this.form.area[0],
        address: this.cusDetail.address,
        legal_person: this.cusDetail.legal_person,
        website: this.cusDetail.website,
        business_scope: this.cusDetail.business_scope,
        company_remark: this.cusDetail.company_remark,
        remark: this.cusDetail.remark,
        establishment_date: this.cusDetail.establishment_date,
        addcontact: newadd,
        delcontact: this.realDelcontact,
        oldcontact: oldcontact,
        producttype: this.cusDetail.producttype + '',
        companylogid: this.receiveData.check_id,
        pid: this.receiveData.pid
      }
      this.$post('/CheckOut.do?EditCustomer', params).then(res => {
        if (res.data[0].success) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        }
      })
    },
    _getMyCusDetail () {
      this.$post('/CheckOut.do?list', {
        cid: this.receiveData.id,
        uid: this.receiveData.uid,
        companylogid: this.receiveData.companylogid
      }).then(res => {
        this.cusDetail = res.data[0].data[0]
        // console.log(this.cusDetail)
        this.form.cusName = this.cusDetail.name
        this.form.trade = [this.cusDetail.cid, this.cusDetail.bid]
        this.form.area = [
          this.cusDetail.province,
          this.cusDetail.city,
          this.cusDetail.county
        ]
        this.form.contactList =
          res.data[1].data.length === 0 ? [{}] : res.data[1].data
        this.form.oldContactList = JSON.parse(
          JSON.stringify(this.form.contactList)
        )
        this.checkLogs = res.data[2].data // 审核记录
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
        let onceDel = this.form.contactList.splice(index, 1)
        console.log(onceDel)
        if (onceDel[0].contactid) {
          this.realDelcontact.push(onceDel[0])
        }
        console.log(this.realDelcontact)
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  components: { Page, SelectArea, SelectTrade }
}
</script>

<style lang="less">
.phonered .el-input__inner {
  color: red;
}
</style>

<style lang="less" scoped>
.mycus-detail {
  .maxwidth {
    max-width: 500px;
  }
  .check-search {
    margin-bottom: 10px;
  }
  .contact-phone {
    width: calc(~'(100% - 35px)');
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
  .el-form-item{
    margin-bottom: 5px;
  }
}
</style>

<template>
  <div class="mycus-detail child-component-container media-padding">
    <div class="detail-main">
      <div class="cus-info">
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
              <el-form-item label="所属行业 :" >
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
                <el-input v-model="cusDetail.address"></el-input>
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
              <el-form-item label="所属地区 :" >
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
              <el-form-item label="联系人 :" >
                <el-input v-model="form.contactList[index].name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="联系电话 :" >
                <el-input v-model="form.contactList[index].contact" class="contact-phone" :class="form.contactList[index].red ?'phonered': ''"></el-input>
                <el-button @click.native="addContact(index)" class="circle-btn" :type="index===0?'success':'danger'" size="mini" :icon="index===0?'fa fa-plus':'fa fa-minus'" circle></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户类型 :" >
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
            <el-col :md="12" class="maxwidth">
              <el-form-item label="保A日期 :" >
                <el-date-picker v-model="cusDetail.checktime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" type="date" style="width:100%"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="24" style="max-width:1000px;">
              <el-form-item label="经营范围 :" >
                <el-input v-model="cusDetail.business_scope" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="24" style="max-width:1000px;">
              <el-form-item label="备注 :" >
                <el-input v-model="cusDetail.company_remark" type="textarea" :rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="btns mt10px" style="max-width:1000px;text-align:center;">
            <el-button type="warning" @click.native="saveCusInfo">保存客户资料</el-button>
          </div>
        </el-form>
      </div>
      <div class="follow-record mt10px">
        <div class="title">
          <el-button class="title-btn" type="primary">日志记录</el-button>
        </div>
        <el-tabs v-model="activeName" style="width:100%;" type="card" @tab-click="handleClick">
          <el-tab-pane label="审核记录" name="1">
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
              <el-table-column prop="insert_time" label="提交时间" width="100">
                <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="cremark" label="提交备注" min-width="200">
              </el-table-column>
              <el-table-column prop="auditor" label="处理人" width="100">
              </el-table-column>
              <el-table-column prop="" label="处理时间" width="100">
                <span slot-scope="scope">{{scope.row.auditor_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="reason" label="被拒原因">
              </el-table-column>
              <el-table-column prop="clremark" label="处理备注">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="修改记录" name="2">
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
          <el-tab-pane label="申请修改记录" name="3">
            <el-table :data="applyChangeLogs" style="width: 100%;">
              <el-table-column prop="applyName" label="提交人">
              </el-table-column>
              <el-table-column prop="" label="提交时间">
                <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="remark" label="提交备注" min-width="200">
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
          <el-tab-pane label="放弃保A日志" name="4">
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
            <page class="page" :url="stopUrl" :sendParams="stopParams" :defaultSearch="defaultSearch" @updateList="getStopBaoALogs"></page>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script>
import cookie from 'js-cookie'
import Page from 'base/page/page'
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import { getByCode } from 'api/getOptions'
import { timeFormat } from 'common/js/filters'
export default {
  data () {
    return {
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
        ]
      },
      fmList: [],
      activeName: '1',
      receiveData: {},
      cusDetail: {},
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

      realDelcontact: [] // 储存真正被删除的联系人信息
    }
  },
  created () {
    this.realDelcontact = []
    console.log(this.$route.query.data)
    this.receiveData = this.$route.query.data
    if (!this.receiveData.cid) {
      this.$router.go(-1)
      return
    }
    this._getMyCusDetail()
  },
  mounted () {
    getByCode(27).then(res => {
      this.fmList = res.data.data
    })
    this.applyChangeParams = {
      cid: this.receiveData.cid,
      companylogid: this.receiveData.companylogid
    }
    this.defaultSearch = true
    this.stopParams = {
      companyid: this.receiveData.cid,
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
        cid: this.receiveData.cid,
        cat: this.cusDetail.bid || this.cusDetail.cid,
        fm: this.cusDetail.fm,
        name:
          this.cusDetail.name === this.form.cusName ? '' : this.form.cusName,
        area:
          this.cusDetail.county ||
          this.cusDetail.city ||
          this.cusDetail.province,
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
        companylogid: this.receiveData.companylogid,
        companyloguid: this.cusDetail.companyloguid
      }
      this.$post('/CheckOut.do?EditCustomer', params).then(res => {
        if (res.data[0].success) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.$router.push({
            path: '/indexPage/cusPoolManage',
            query: { data: 'fromDetail' }
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
        console.log(this.cusDetail)
        this.cusDetail.checktime = timeFormat(this.cusDetail.checktime)
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
}
</style>

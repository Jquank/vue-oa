<template>
  <div class="view-detail">
    <div class="detail-content">
      <el-tabs type="border-card" @tab-click="tab">
        <el-tab-pane label="百度订单基本信息">
          <el-row style="text-align:right;margin-bottom:10px;">
            <el-button type="warning" @click.native="changeInfo">修改基本信息</el-button>
          </el-row>
          <el-table :data="basicInfo" border style="width: 100%">
            <el-table-column prop="type" label="信息分类" width="150">
            </el-table-column>
            <el-table-column prop="" label="详细信息">
              <div slot-scope="scope">
                <div v-if="scope.$index===0">
                  <div class="row-container">
                    <div>
                      <b>公司名称：</b>
                      <span>{{contactInfoList[0].name}}</span>
                    </div>
                    <div>
                      <b>PC网址：</b>
                      <span>{{orderInfo.pcwebsite}}</span>
                    </div>
                    <div>
                      <b>手机网址：</b>
                      <span>{{orderInfo.mobilewebsite}}</span>
                    </div>
                  </div>
                  <div v-for="(c,index) in contactInfoList" :key="index" class="mt10px row-container">
                    <div>
                      <b>联系人{{index?index:''}}：姓名{{index?index:''}}：</b>
                      <span>{{c.contactname}}</span>
                    </div>
                    <div>
                      <b>手机{{index?index:''}}：</b>
                      <span>{{c.contactnumber}}</span>
                    </div>
                    <div>
                      <b>座机{{index?index:''}}：</b>
                      <span>{{c.telphone}}</span>
                    </div>
                    <div>
                      <b>邮箱{{index?index:''}}：</b>
                      <span>{{c.mailnumber}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>客户类型：</b>
                      <span>{{contactInfoList[0].producttype | cusStatus}}{{contactInfoList[0].productnumber}}</span>
                    </div>
                    <div>
                      <b>对公账号：</b>
                      <span>{{orderInfo.receiveaccount}}</span>
                    </div>
                    <div>
                      <b>开户行：</b>
                      <span>{{orderInfo.receivebank}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>公司地址：</b>
                      <span>{{orderInfo.companyaddress}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===1">
                  <div class="row-container">
                    <div>
                      <b>网建类型：</b>
                      <span>{{productInfo[0].websitetype | wjType}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===2">
                  <div class="row-container">
                    <div>
                      <b>百度订单金额：</b>
                      <span>{{orderInfo.amount_real | currency}}</span>
                    </div>
                    <div>
                      <b>客户类型：</b>
                      <span>{{orderInfo.custom_type ? "老客户" : "新客户"}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>百度推广服务订单编号：</b>
                      <span>{{orderInfo.ordernumber}}</span>
                    </div>
                    <div>
                      <b> 百度推广首消授权书：</b>
                      <span>{{orderInfo.order2number ? orderInfo.order2number : "无首消授权书"}}</span>
                    </div>
                    <div>
                      <b> 百度推广专业服务协议：</b>
                      <span>{{orderInfo.order3number}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===3">
                  <div class="row-container">
                    <div>
                      <b>姓名：</b>
                      <span>{{originUser.name}}</span>
                    </div>
                    <div>
                      <b>部门：</b>
                      <span>{{originUser.fullname}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>Hi号：</b>
                      <span>{{originUser.hi}}</span>
                    </div>
                    <div>
                      <b> 手机号：</b>
                      <span>{{originUser.mobile}}</span>
                    </div>
                    <div>
                      <b> 下单日期：</b>
                      <span>{{orderInfo.insert_time | timeFormat}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>

        <el-tab-pane label="审核记录">
          <el-steps :active="isChecked" space="14%" finish-status="success">
            <el-step v-for="step in stepList.slice(0,8)" :key="step.id" :title="step.name" style="margin-top:15px">
              <span v-if="step.status>0" slot="description">{{step.opt_time | timeFormat}}</span>
            </el-step>
          </el-steps>
          <el-steps :active="isNextChecked" space="12.5%" finish-status="success">
            <el-step v-for="(step,index) in stepList.slice(8)" :key="step.id" :title="step.name" style="margin-top:15px">
              <span slot="icon">{{9+index}}</span>
              <span v-if="step.status>0" slot="description">{{step.opt_time | timeFormat}}</span>
            </el-step>
          </el-steps>
          <el-table :data="checkRecord" stripe style="width: 100%;margin-top:25px;">
            <el-table-column prop="" label="时间" width="160">
              <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
            </el-table-column>
            <el-table-column prop="username" label="操作人" width="100">
            </el-table-column>
            <el-table-column prop="remark" label="审核内容">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 修改订单信息弹窗 -->
    <el-dialog title="修改订单基本信息" width="800px" :visible.sync="changeInfoDialog" :modal-append-to-body="false">
      <el-form :model="form">
        <el-row :gutter="20">
          <el-col :sm="12">
            <el-form-item label="公司名称" :label-width="formLabelWidth" required>
              <el-input v-model="form.cName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="公司地址" :label-width="formLabelWidth" required>
              <el-input v-model="form.addr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :sm="12">
            <el-form-item label="对公账号" :label-width="formLabelWidth">
              <el-input v-model="form.accountNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="开户行" :label-width="formLabelWidth">
              <el-input v-model="form.bType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :sm="12">
            <el-form-item label="PC网址" :label-width="formLabelWidth">
              <el-input v-model="form.pcWeb"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="手机网址" :label-width="formLabelWidth">
              <el-input v-model="form.phoneWeb"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-for="(c,index) in form.contactList" :key="index">
          <el-col :sm="12">
            <el-form-item :label-width="formLabelWidth" required>
              <span slot="label">
                <el-button @click="addContact(index)" :type="index?'danger':'success'" circle size="mini" :icon="index?minusIcon:addIcon"></el-button>
                <span>联系人{{index?index:''}}</span>
              </span>
              <el-input v-model="c.contactname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item :label-width="formLabelWidth" required>
              <span slot="label">手机号{{index?index:''}}</span>
              <el-input v-model="c.contactnumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item :label-width="formLabelWidth">
              <span slot="label">座机{{index?index:''}}</span>
              <el-input v-model="c.telphone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item :label-width="formLabelWidth" required>
              <span slot="label">邮箱{{index?index:''}}</span>
              <el-input v-model="c.mailnumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :sm="12">
            <el-form-item label="客户类型" :label-width="formLabelWidth">
              <el-input v-model="form.cusType" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="subBaseInfo">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { serverUrl } from 'api/config'
import { $get, $post } from 'api/http'
import { cusStatus } from 'common/js/filters'
export default {
  data () {
    return {
      stepList: [],
      isChecked: 0,
      isNextChecked: -1,
      checkRecord: [],
      basicInfo: [
        { type: '客户基本信息' },
        { type: '网建信息' },
        { type: '订单/金额' },
        { type: '商务信息' }
      ],
      contactInfoList: [{ name: '', producttype: '', productnumber: '' }],
      orderInfo: {},
      productInfo: [{ websitetype: -1 }],
      originUser: {},
      changeInfoDialog: false,
      form: {
        cName: '',
        addr: '',
        accountNum: '',
        bType: '',
        pcWeb: '',
        phoneWeb: '',
        contactList: [
          {
            contactname: '',
            contactnumber: '',
            telphone: '',
            mailnumber: ''
          }
        ],
        cusType: ''
      },
      formLabelWidth: '120px',
      addIcon: 'fa fa-plus',
      minusIcon: 'fa fa-minus',
      subParams: {}
    }
  },
  created () {
    this._getBasicInfo()
  },
  methods: {
    tab (val) {
      console.log(val)
      if (val.label === '审核记录') {
        this._getRecord()
      }
    },
    // 修改基本信息按钮
    changeInfo () {
      let receiveData = this.$route.query.data
      let messUrl = serverUrl + '/Company.do?getCompanyByCpid'
      let messParams = {
        cpid: receiveData.cpid
      }
      $post(messUrl, messParams).then(res => {
        let mess = res.data[0].data
        this.form.contactList = mess.orderContact
        this.form.cName = mess.name || null
        this.form.addr = mess.companyaddress || null
        this.form.pcWeb = mess.pcwebsite || null
        this.form.phoneWeb = mess.mobilewebsite || null
        this.form.accountNum = mess.receiveaccount || null
        this.form.bType = mess.receivebank || null
        this.form.cusType = cusStatus(mess.producttype)
        this.subParams = {
          cid: mess.cid,
          oid: mess.oid,
          logid: mess.logid,
          cpid: receiveData.cpid,
          oldOrderContact: JSON.parse(JSON.stringify(mess.orderContact)),
          producttype: mess.producttype
        }
      })
      this.changeInfoDialog = true
    },
    // 提交修改
    subBaseInfo () {
      let subUrl = serverUrl + '/Company.do?setCompanyOrder'
      let subParams = {
        name: this.form.cName,
        companyaddress: this.form.addr,
        orderContact: this.form.contactList,
        pcwebsite: this.form.pcWeb,
        mobilewebsite: this.form.phoneWeb,
        receiveaccount: this.form.accountNum,
        receivebank: this.form.bType
      }
      subParams = Object.assign({}, this.subParams, subParams)
      this.form.contactList.every(val => {
        if (!this.form.addr || !val.contactname || !val.contactnumber || !val.mailnumber) {
          this.$message.error('请完善必填项！')
          throw new Error('ignore')
        }
      })
      $post(subUrl, subParams).then(res => {
        if (res.data[0].success === true) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this._getBasicInfo()
        } else {
          this.$message.error('修改失败')
        }
      })
      this.changeInfoDialog = false
    },
    // 点击添加联系人
    addContact (index) {
      if (index === 0) {
        this.form.contactList.push({
          contactname: '',
          contactnumber: '',
          mailnumber: '',
          telphone: ''
        })
      } else {
        this.form.contactList.splice(index, 1)
      }
    },
    // 获取订单基本信息
    _getBasicInfo () {
      let receiveData = this.$route.query.data
      console.log(receiveData)
      if (!receiveData.cpid) {
        this.$router.push({
          path: '/indexPage/orderPending'
        })
      }
      let baseUrl = serverUrl + '/wf.do?ndget'
      let baseParams = {
        sn: receiveData.sn,
        cpid: receiveData.cpid,
        uid: receiveData.uid,
        orderid: receiveData.orderid,
        pid: receiveData.pid
      }
      $post(baseUrl, baseParams).then(res => {
        if (res.data.success === true) {
          this.contactInfoList = res.data.data[7]
          this.orderInfo = res.data.data[1]
          this.productInfo = res.data.data[4]
          this.originUser = res.data.data[10]
        }
      })
    },
    // 获取审核记录信息
    _getRecord () {
      let lastIndex = 0
      let receiveData = this.$route.query.data
      let progressUrl = serverUrl + '/wf/order.do?Schedule'
      let progressParam = {
        cpid: receiveData.cpid
      }
      $get(progressUrl, progressParam).then(res => {
        if (res.data[0].success === true) {
          this.stepList = res.data[0].data
          this.checkRecord = res.data[1].data
          this.stepList.forEach((val, index) => {
            if (val.status === 100) {
              lastIndex = index
            }
          })
          this.isChecked = lastIndex
          if (this.isChecked > 7) {
            this.isNextChecked = this.isChecked - 7
          }
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.view-detail {
  width: 100%;
  height: 100%;
  background: #e2e5ec;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  .detail-content {
    background: #fff;
    padding: 20px;
    .row-container {
      display: flex;
      & > div {
        margin-right: 20px;
      }
    }
  }
}
</style>

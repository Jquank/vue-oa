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
                <el-input @blur="accountNameBlur(form.cusName)" v-model="form.cusName" placeholder="客户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="所属行业 :" required>
                <select-trade v-model="form.trade" style="width:100%"></select-trade>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户法人 :">
                <el-input v-model="form.cus" :disabled="disabled" placeholder="客户法人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户地址 :">
                <el-input v-model="form.cusAddr" :disabled="disabled" placeholder="客户地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="成立日期 :">
                <el-date-picker v-model="form.buildDate" value-format="yyyy-MM-dd" :disabled="disabled" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="所属地区 :" required>
                <select-area v-model="form.area" style="width:100%"></select-area>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户网址 :">
                <el-input v-model="form.cusWeb" :disabled="disabled" placeholder="客户网址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户来源 :">
                <el-select v-model="form.cusFrom" :disabled="disabled" placeholder="客户来源" style="width:100%;">
                  <el-option value="10" label="个人查找"></el-option>
                  <el-option value="20" label="个人查找"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="(item,index) in form.contactList" :key="index" :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="联系人 :" required>
                <el-input v-model="form.contactList[index].name" :disabled="disabled" placeholder="联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="联系电话 :" required>
                <el-input v-model="form.contactList[index].contact" :disabled="disabled" placeholder="联系电话" class="contact-phone"></el-input>
                <el-button @click.native="addContact(index)" class="circle-btn" :type="index===0?'success':'danger'" size="mini" :icon="index===0?'fa fa-plus':'fa fa-minus'" circle></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="24" style="max-width:1000px;">
              <el-form-item label="经营范围 :" required>
                <el-input v-model="form.businessScope" :disabled="disabled" type="textarea" :rows="4" placeholder="经营范围"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="btns mt10px" style="max-width:1000px;text-align:center;">
            <el-button type="success" @click.native="aaa">申请保A</el-button>
            <el-button type="warning" @click.native="aaa">修改并申请重审</el-button>
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
              <el-table-column prop="insert_time" label="跟进日期" width="150">
              </el-table-column>
              <el-table-column prop="remark" label="跟进备注">
              </el-table-column>
              <el-table-column prop="username" label="跟进人" width="150">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="审核记录" name="2">
            <el-table :data="checkLogs" style="width: 100%;">
              <el-table-column prop="pname" label="业务类型" width="80">
              </el-table-column>
              <el-table-column prop="type" label="处理类型" width="120">
              </el-table-column>
              <el-table-column prop="status" label="处理状态" width="120">
              </el-table-column>
              <el-table-column prop="username" label="提交人" width="100">
              </el-table-column>
              <el-table-column prop="insert_time" label="提交时间" width="120">
              </el-table-column>
              <el-table-column prop="cremark" label="提交备注">
              </el-table-column>
              <el-table-column prop="auditor" label="处理人" width="100">
              </el-table-column>
              <el-table-column prop="auditor_time" label="处理时间" width="120">
              </el-table-column>
              <el-table-column prop="reason" label="被拒原因">
              </el-table-column>
              <el-table-column prop="clremark" label="处理备注">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="出访记录" name="3">角色管理</el-tab-pane>
          <el-tab-pane label="修改记录" name="4">定时任务补偿</el-tab-pane>
          <el-tab-pane label="申请修改记录" name="5">定时任务补偿</el-tab-pane>
          <el-tab-pane label="放弃保A日志" name="6">定时任务补偿</el-tab-pane>
          <el-tab-pane label="续费记录" name="7">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
const tk = sessionStorage.getItem('token')
export default {
  data () {
    return {
      form: {
        cusName: '',
        buildDate: '',
        cus: '',
        cusAddr: '',
        cusWeb: '',
        cusFrom: '',
        trade: '',
        area: '',
        businessScope: '',
        contactList: [
          {
            contact: '',
            phone: ''
          }
        ]
      },
      disabled: false,
      followRecordData: [],
      activeName: '1',
      receiveData: {},
      detailData: {},
      followLogs: [], // 跟进记录
      checkLogs: [], // 审核记录
      visitLogs: [], // 出访记录
      applyChangeLogs: [], // 申请修改记录
      stopBaoALogs: [], // 放弃保A记录
      renewLogs: [], // 续费记录
      productId: ''
    }
  },
  created () {
    console.log(this.$route.query.data)
    this.receiveData = this.$route.query.data
    if (!this.receiveData.id) {
      this.$router.go(-1)
      return
    }
    this._getMyCusDetail()
  },
  methods: {
    _getMyCusDetail () {
      this.$post('/CustomerCheck.do?customlist&tk=' + tk, {
        cid: this.receiveData.id,
        companylogid: this.receiveData.companylogid
      }).then(res => {
        let detailData = res.data[0].data[0]
        let contacts = res.data[1].data || [{}]
        this.productId = detailData.productid
        this.checkLogs = res.data[2].data
        this.form = {
          cusName: detailData.name,
          buildDate: detailData.establishment_date,
          cus: detailData.legal_person,
          cusAddr: detailData.address,
          cusWeb: detailData.website,
          cusFrom: detailData.fm,
          trade: detailData.cid,
          area: detailData.province,
          businessScope: detailData.business_scope,
          contactList: contacts
        }
        this._getFollowLogs()
      })
    },
    // 跟进记录
    _getFollowLogs () {
      this.$post('/follow.do?up&tk=' + tk, {
        cid: this.receiveData.id,
        pid: this.productId,
        cat: 200,
        companylogid: this.receiveData.companylogid
      }).then(res => {
        this.followLogs = res.data.data
      })
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
  components: { SelectArea, SelectTrade }
}
</script>

<style lang="less" scoped>
.mycus-detail {
  .detail-main {
    padding: 15px;
  }
  .maxwidth {
    max-width: 500px;
  }
  .contact-phone {
    width: calc(~'(100% - 30px)');
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

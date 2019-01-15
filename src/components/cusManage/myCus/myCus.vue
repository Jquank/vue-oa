<template>
  <div class="my-customer component-container media-padding">
    <div>
      <div class="cus-status">
        <el-radio-group @change="changeRadio" v-model="myKind" class="cus-status-radio">
          <el-radio-button :label="30">保A客户</el-radio-button>
          <el-radio-button :label="10">录入客户</el-radio-button>
          <el-radio-button :label="20">跟踪客户</el-radio-button>
          <el-radio-button :label="40">签约客户</el-radio-button>
          <el-radio-button :label="50">废弃客户</el-radio-button>
        </el-radio-group>
      </div>
      <div class="search-cus">
        <el-input placeholder="搜索客户名称" v-model="cusName" class="cus-item item-width">
          <template slot="prepend">客户名称:</template>
        </el-input>
        <select-area :key="key_area" v-model="area" class="cus-item item-width"></select-area>
        <select-trade :key="key_trade" v-model="trade" class="cus-item item-width"></select-trade>
        <el-input placeholder="搜索录入人" v-model="inputPerson" class="cus-item item-width">
          <template slot="prepend">录入人:</template>
        </el-input>
        <el-input placeholder="搜索所属商务" v-model="shangWu" class="cus-item item-width">
          <template slot="prepend">所属商务:</template>
        </el-input>
        <auto-select :title="'客户状态'" :defaultValue="'30'" v-model="cusStatus" id="mycus-auto-select" class="cus-item item-width">
          <el-option label="全部" value="100"></el-option>
          <el-option label="审核通过" value="30"></el-option>
          <el-option label="待审核" value="20"></el-option>
          <el-option label="审核不通过" value="10"></el-option>
          <el-option label="放弃" value="0"></el-option>
        </auto-select>
        <div class="cus-item">
          <el-button @click.native="search" type="primary">查 询</el-button>
          <el-button @click.native="reset" type="warning">重 置</el-button>
        </div>
        <div class="cus-item export">
          <el-button v-if="permissions.indexOf('5x') > -1&&myKind==30" @click.native="throwOrder" type="warning">保A甩单</el-button>
        </div>
      </div>

      <!-- 列表 -->
      <el-table :key="myKind" @selection-change="handleSelectionChange" stripe border :data="myCusList" max-height="550" style="width: 100%" size="mini">
        <el-table-column fixed type="selection" width="40">
        </el-table-column>
        <el-table-column prop="companyname" label="客户名称" min-width="130">
        </el-table-column>
        <el-table-column prop="companytype" label="公司状态" width="75">
          <span :class="scope.row.companytype===-10?'red':''" slot-scope="scope">
            {{scope.row.companytype | comType}}
          </span>
        </el-table-column>
        <el-table-column prop="producttype" label="业务/客户类型" min-width="110">
          <template slot-scope="scope">
            <div>{{scope.row.productname}}</div>
            <span>{{scope.row.producttype | cusStatus}} {{scope.row.producttype===0?scope.row.productnumber+1:''}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="productname" label="业务类型" min-width="80">
        </el-table-column> -->
        <el-table-column prop="username" label="所属商务" width="75">
        </el-table-column>
        <el-table-column prop="" label="业务状态" width="75">
          <span :class="scope.row.companylogstatus===10?'red':''" slot-scope="scope">
            {{scope.row.companylogtype+""+scope.row.companylogstatus | businessStatus}}
          </span>
        </el-table-column>
        <el-table-column prop="cccontact" label="联系人/电话" min-width="140">
          <template slot-scope="scope">
            <div>{{scope.row.ccname}}</div>
            <div>{{scope.row.cccontact}}&nbsp;<i class="fa fa-phone fa-2x call-icon" @click="call_phone(scope.row)"></i></div>
          </template>
        </el-table-column>
        <el-table-column prop="areaname" label="地区" min-width="120">
        </el-table-column>
        <el-table-column prop="catname" label="行业" min-width="120">
        </el-table-column>
        <el-table-column prop="entername" label="录入人" width="70">
        </el-table-column>
        <el-table-column v-if="myKind==20" prop="traceName" label="跟踪人" width="80">
        </el-table-column>
         <el-table-column prop="" label="最后跟进时间" width="95">
          <span :class="scope.row.tip?'red':''" slot-scope="scope">
            {{scope.row.visittime | timeFormat}}
          </span>
        </el-table-column>
        <el-table-column v-if="myKind==30" prop="auditor_time" label="最后审核时间" width="95">
          <span slot-scope="scope">{{scope.row.auditor_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column v-if="myKind==40" prop="auditor_time" label="最后降E时间" width="95">
          <span slot-scope="scope">{{scope.row.jiangE | timeFormat}}</span>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center" fixed="right">
          <template slot-scope="scope">
            <el-dropdown :trigger="trigger">
              <el-button type="primary" class="xsbtn">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="text-center">
                <el-dropdown-item>
                  <el-button @click.native.prevent="view(scope.row)" type="success" class="xsbtn">查看</el-button>
                </el-dropdown-item>
                <el-dropdown-item divided v-if="((myKind==20&&scope.row.companylogtype==10&&(scope.row.companylogstatus>20||scope.row.companylogstatus==0))||(myKind==30&&scope.row.companylogtype>=20&&scope.row.companylogstatus>20))" @click.native.prevent="follow(scope.row)">
                  <el-button type="warning" class="xsbtn">跟进</el-button>
                </el-dropdown-item>
                <el-dropdown-item divided v-if="((myKind==20&&scope.row.companylogtype==10&&(scope.row.companylogstatus>20||scope.row.companylogstatus==0))||(myKind==30&&scope.row.companylogtype>=20&&scope.row.companylogstatus>20))" @click.native.prevent="visit(scope.row)">
                  <el-button type="primary" class="xsbtn">出访</el-button>
                </el-dropdown-item>
                <el-dropdown-item divided v-if="(scope.row.userid==USER_ID)&&scope.row.companylogtype==20&&scope.row.companylogstatus==10&&scope.row.companytype==10&&scope.row.auditor_now_h!==null&&(scope.row.tb_field_name-scope.row.auditor_now_h>=0)" @click.native.prevent="stop(scope.row)">
                  <el-button type="danger" class="xsbtn">放弃</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <page class="page" :url="myCusUrl" :sendParams="sendParams" @updateList="updateMyCusList"></page>
    </div>
    <router-view></router-view>

    <!-- 保A甩单弹窗 -->
    <el-dialog title="选择" :visible.sync="throwDialog" width="550px">
      <select-user @userId="getUserId"></select-user>
    </el-dialog>
    <!-- 跟进弹窗 -->
    <el-dialog title="填写跟进记录" :visible.sync="followDialog" width="400px">
      <el-input v-model="followRecord" type="textarea" :rows="3"></el-input>
      <div class="follow-btns">
        <el-button @click.native="followDialog = false" type="warning">取 消</el-button>
        <el-button @click.native="subFollowRecord" type="success">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 出访弹窗 -->
    <el-dialog title="填写出访记录" :visible.sync="visitDialog" width="750px">
      <el-form ref="form" :model="form" label-width="90px">
        <el-row :gutter="20">
          <el-col :md="12">
            <el-form-item label="客户名称 :">
              <el-input v-model="cusDetail.name" disabled placeholder="客户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="客户意向 :" required>
              <el-select v-model="form.cusIntention" placeholder="请选择客户意向" style="width:100%;">
                <el-option value="25" label="25%"></el-option>
                <el-option value="50" label="50%"></el-option>
                <el-option value="75" label="75%"></el-option>
                <el-option value="100" label="100%"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12">
            <el-form-item label="拜访人 :">
              <el-select v-model="form.visitMan" placeholder="请选择联系人" style="width:100%;">
                <el-option v-for="(contact,index) in contacts" :key="index" :value="contact.contactid" :label="contact.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="陪访人 :">
              <el-input v-model="form.keepMan" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- <el-col :md="12">
            <el-form-item label="联系电话 :">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :md="24">
            <el-form-item label="联系地址 :">
              <el-input v-model="cusDetail.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12">
            <el-form-item label="出访时间 :" required>
              <el-date-picker v-model="form.visitTime" value-format="yyyy/MM/dd" format="yyyy-MM-dd HH:mm" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="出访类型 :" required>
              <el-select v-model="form.visitType" style="width:100%;">
                <el-option value="110" label="首访"></el-option>
                <el-option value="120" label="二访"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="btns mt10px" style="text-align:center;">
          <el-button @click.native="subVisit" type="primary">提交</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import Page from '@/base/page/page'
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectUser from 'base/selectUser/selectUser'
import { appMark } from 'common/js/utils'
export default {
  data () {
    return {
      trigger: 'hover',
      permissions: cookie.getJSON('permissions'),
      USER_ID: cookie.get('userId'),
      refresh: true,
      myKind: 30,
      cusName: '',
      area: [],
      key_area: '',
      trade: [],
      key_trade: '1',
      inputPerson: '',
      shangWu: '',
      cusStatus: 30,
      sendParams: {
        logStatus: 30,
        myKind: 30
      },
      myCusUrl: '/Company.do?myCustomer',
      pageCount: 0,
      cusType: '',
      myCusList: [],
      multipleSelection: [],
      followDialog: false,
      followRecord: '',
      visitDialog: false,

      cusDetail: {}, // 出访弹窗数据
      contacts: [],
      form: {
        cusIntention: '',
        visitMan: '',
        keepMan: '',
        phone: '',
        visitTime: '',
        visitType: ''
      },
      throwDialog: false,
      userId: '',
      rowData: {}
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (from.meta.text.indexOf('详情') > -1 && to.query.data === 'fromDetail') {
      this.search()
    }
    next()
  },
  created() {
    if (appMark()) {
      this.trigger = 'click'
    }
  },
  methods: {
    call_phone(data) {
      this.callPhone(data.cccontact, 10, data.companylogid)
    },
    // 甩单按钮
    throwOrder () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请勾选客户！'
        })
        return
      }
      this.throwDialog = true
    },
    // 获取用户id，完成甩单
    getUserId (id) {
      this.userId = id
      if (id) {
        this.$get('/Product.do?GetNumberById', {id: id}).then(res => {
          if (res.data[0].success) {
            let maxBaoA = res.data[0].data
            if (this.multipleSelection.length > maxBaoA) {
              this.$message({
                type: 'error',
                message: `已超出剩余保A配额数：${maxBaoA}`
              })
            } else {
              let selArr = []
              this.multipleSelection.forEach(val => {
                selArr.push({id: val.companylogid})
              })
              this.$post('/Project.do?ThrowA',
                {
                  receiveorderuid: id,
                  companylog: selArr
                }
              ).then(res => {
                if (res.data[0].data) {
                  this.$message({
                    type: 'success',
                    message: '甩单成功'
                  })
                  this.search()
                  this.throwDialog = false
                } else {
                  this.$message({
                    type: 'error',
                    message: '甩单失败'
                  })
                }
              })
            }
          }
        })
      }
    },
    changeRadio () {
      this.sendParams = {
        logStatus: 30,
        myKind: this.myKind
      }
    },
    search () {
      this.sendParams = Object.assign({}, this.params, {
        myKind: this.myKind,
        companyName: this.cusName,
        areaId: this.area[2],
        catId: this.trade[1],
        businessname: this.shangWu,
        entername: this.inputPerson,
        logStatus: +this.cusStatus
      })
    },
    reset () {
      this.cusName = ''
      this.inputPerson = ''
      this.shangWu = ''
      this.area = []
      this.key_area = new Date() + ''
      this.trade = []
      this.key_trade = new Date() + '1'
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 查看按钮
    view (data) {
      this.$router.push({
        path: `myCus/${data.id}`,
        query: { data: data, myKind: this.myKind }
      })
    },
    // 跟进按钮
    follow (val) {
      this.rowData = val
      this.followDialog = true
    },
    subFollowRecord () {
      let params = {
        'companylogid': this.rowData.companylogid,
        'cat': 200,
        'cid': this.rowData.id,
        'uid': this.USER_ID,
        'pid': this.rowData.productid,
        'remark': this.followRecord
      }
      if (!this.followRecord) {
        this.$message({
          type: 'warning',
          message: '请填写跟进记录'
        })
        return
      }
      this.$post('/follow.do?visit', params).then(res => {
        this.$message({
          type: 'success',
          message: '跟进成功'
        })
      })
      this.followDialog = false
    },
    // 出访按钮
    visit (val) {
      this.form = {
        cusIntention: '',
        visitMan: '',
        keepMan: '',
        phone: '',
        visitTime: '',
        visitType: ''
      }
      this.rowData = val
      this.visitDialog = true
      this.$post('/CustomerCheck.do?customlist', {
        'cid': this.rowData.id,
        'companylogid': this.rowData.companylogid
      }).then(res => {
        this.cusDetail = res.data[0].data[0]
        this.contacts = res.data[1].data
      })
    },
    subVisit () {
      let params = {
        'cat': this.form.visitType,
        'cid': this.rowData.id,
        'uid': this.USER_ID,
        'accompany': this.rowData.accompanyUserId,
        'pid': this.rowData.pid,
        'ccid': this.form.visitMan,
        'result': this.form.cusIntention, // 意向
        'begin': this.form.visitTime,
        'status': 10,
        'addr': this.cusDetail.address,
        'companylogid': this.rowData.companylogid
      }
      if (!this.form.cusIntention ||
          !this.form.visitType ||
          !this.form.visitTime) {
        this.$message({
          type: 'warning',
          message: '请填写必填项'
        })
        return
      }
      this.visitDialog = false
      this.$post('/follow.do?visit', params).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      })
    },
    // 放弃按钮
    stop (val) {
      this.$confirm('请确认是否终止该客户的保护机制?', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$post('/Company.do?logStop', {
            'companyid': val.id,
            'companylogid': val.companylogid
          }).then(res => {
            this.$message({
              type: 'success',
              message: '成功'
            })
            this.search()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    updateMyCusList (data) {
      this.myCusList = data.data[0].data
      console.log(this.myCusList)
    }
  },
  components: {
    Page,
    SelectArea,
    SelectTrade,
    AutoSelect,
    SelectUser
  }
}
</script>

<style lang="less">
/* 自定义auto-select的padding */
#mycus-auto-select {
  .auto-select-padding(86px);
}
</style>

<style scoped lang="less">
.my-customer {
  position: relative;
  .cus-status {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .cus-status-radio {
      margin-top: 10px;
    }
  }
  .my-list {
    margin-top: 15px;
    .my-list-col {
      position: relative;
    }
  }
  .cus-status {
    padding-left: 10px;
  }
  .search-cus {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .cus-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
  .follow-btns {
    margin-top: 10px;
    text-align: right;
  }
  .call-icon{
    cursor: pointer;
    color: green;
  }
}
</style>

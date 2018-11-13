<template>
  <div class="cus-search component-container media-padding">
    <div class="search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="search-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <el-input placeholder="搜索百度账号" v-model="bdAccount" class="search-item item-width">
        <template slot="prepend">百度账号:</template>
      </el-input>
      <div class="search-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
      <div class="search-item countTip">
        <span class="tipfont">当前可保A数量 :
          <span class="red"> {{baoANum}}</span>
        </span>
        <span  class="tipfont">当前可跟踪数量 :
          <span class="red"> {{followNum}}</span>
        </span>
      </div>
    </div>

    <el-table stripe border :data="list" style="width: 100%;margin-top:10px;">
      <el-table-column prop="companyname" label="客户名称" width="190">
      </el-table-column>
      <el-table-column prop="" label="客户类型">
        <span slot-scope="scope">{{scope.row.producttype | cusState('cusType')}}</span>
      </el-table-column>
      <el-table-column prop="" label="公司状态">
        <span :class="scope.row.ctype==-10?'red':''" slot-scope="scope">{{scope.row.ctype | cusState('cusStatus')}}</span>
      </el-table-column>
      <el-table-column prop="pname" label="业务状态" min-width="80">
        <span slot-scope="scope">{{scope.row.cltype+''+scope.row.clstatus | businessStatus}}</span>
      </el-table-column>
      <el-table-column prop="areaname" label="地区" min-width="80">
      </el-table-column>
      <el-table-column prop="companycatname" label="行业" min-width="80">
      </el-table-column>
      <template v-if="permissions.indexOf('73')>-1">
        <el-table-column prop="baidu_account" label="百度账号">
        </el-table-column>
        <el-table-column prop="website" label="推广网址">
        </el-table-column>
        <el-table-column prop="kefa" label="商务姓名">
        </el-table-column>
        <el-table-column prop="kefaDept" label="商务部门">
        </el-table-column>
        <el-table-column prop="kefu" label="客服虚拟账号" min-width="100">
        </el-table-column>
        <el-table-column prop="kefuDept" label="客服部门">
        </el-table-column>
      </template>
      <el-table-column prop="" label="操作" min-width="60px" v-if="permissions.indexOf('73')==-1">
        <template slot-scope="scope">
          <el-button @click.native="view(scope.row)" type="success" class="xsbtn">查看</el-button>
          <el-button @click.native="turnFollow(scope.row)" v-if="!(scope.row.cltype>=20&&scope.row.clstatus>=20)" type="primary" class="xsbtn">转跟踪</el-button>
          <el-button @click.native="applyEditDialog=true" v-if="(scope.row.cltype==20&&scope.row.clstatus>20&&scope.row.uid==userId)||(scope.row.cltype<20&&scope.row.clstatus>20)||(scope.row.cltype==20&&scope.row.clstatus==0)" type="warning" class="xsbtn">申请修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" @updateList="getList"></page>

    <!-- 查看弹窗 -->
    <el-dialog width="800px" title="客户详情" :visible.sync="cusDetailDialog">
      <el-form ref="form" :model="form" label-width="90px">
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户名称 :">
              <el-input v-model="form.cusName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="所属行业 :">
              <select-trade v-model="form.trade" :tradeDisabled="true" style="width:100%"></select-trade>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户法人 :">
              <el-input v-model="cusDetail.legal_person" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户地址 :">
              <el-input v-model="cusDetail.address" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="成立日期 :">
              <el-date-picker v-model="cusDetail.establishment_date" value-format="yyyy-MM-dd" type="date"  style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="所属地区 :">
              <select-area v-model="form.area" :areaDisabled="true" style="width:100%"></select-area>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户网址 :">
              <el-input v-model="cusDetail.website" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户来源 :">
              <el-select v-model="cusDetail.fm" style="width:100%;" disabled>
                <el-option v-for="(item,index) in fmList" :key="index" :value="item.id" :label="item.code_desc"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-for="(item,index) in form.contactList" :key="index" :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="联系人 :">
              <el-input v-model="form.contactList[index].name" disabled=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="联系电话 :">
              <el-input v-model="form.contactList[index].contact" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="24" style="max-width:1000px;">
            <el-form-item label="经营范围 :">
              <el-input v-model="cusDetail.business_scope" type="textarea" :rows="3" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;">
        <el-button v-if="cusDetail.ctype==-10&&cusDetail.clstatus!=20" @click.native="changeAndApply" type="warning">修改并申请重审</el-button>
        <el-button v-if="(((((rowData.cltype>=20&&rowData.clstatus!=20)||(rowData.cltype<20&&(rowData.clstatus==30||rowData.clstatus==0)))&&rowData.producttype==0)||(rowData.cltype==20&&rowData.clstatus<=10&&rowData.producttype!=0)))&&(cusDetail.ctype!=-10)" @click.native="applyBaoADialog = true" type="primary">申请保A</el-button>
      </div>
    </el-dialog>

    <!-- 申请保A弹窗 -->
    <el-dialog :modal-append-to-body="false" title="申请保A" :visible.sync="applyBaoADialog" width="400px">
      <p>客户类型：</p>
      <el-select v-model="productType" style="width:100%;">
        <el-option value="" label="请选择客户类型"></el-option>
        <el-option v-if="!(rowData.cltype>=20&&rowData.clstatus>=20)" value="0" label="新开"></el-option>
        <template v-if="rowData.cltype==30">
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
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import { getByCode } from 'api/getOptions'
const userId = cookie.get('userId')
export default {
  data () {
    return {
      userId: userId,
      permissions: cookie.getJSON('permissions'),
      cusName: '',
      bdAccount: '',
      baoANum: '',
      followNum: '',

      list: [],
      url: '/Search.do?ByCompanyName',
      sendParams: {
        'companyname': '$'
      },

      cusDetailDialog: false,
      cusDetail: {},
      rowData: {},
      form: {
        cusName: '',
        trade: '',
        area: ''
      },
      fmList: [],
      contactList: [
        {
          contact: '',
          phone: ''
        }
      ],
      oldContactList: [],

      applyBaoADialog: false, // 保A弹窗
      productType: '',
      remark: '',

      applyEditDialog: false, // 申请修改弹窗
      applyEditRemark: ''
    }
  },
  created () {
    this._getNum()
  },
  mounted () {
    getByCode(27).then(res => {
      this.fmList = res.data.data
    })
  },
  methods: {
    // 转跟踪
    turnFollow (data) {
      this.rowData = data
      if (this.followNum <= 0) {
        this.$message({
          type: 'warning',
          message: '您已达到跟踪上限！'
        })
        return
      }
      this.$get('/Company.do?CanChangeToB', {
        'companyid': this.rowData.companyid,
        'companylogid': this.rowData.companylogid
      }).then(res => {
        if (res.data[0].data) {
          this.$confirm('请确认是否转跟踪?', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.$post('/Company.do?ChangeToB', {
                'companyid': this.rowData.companyid,
                'companylogid': this.rowData.companylogid,
                'producttype': this.rowData.producttype,
                'productnumber': this.rowData.productnumber
              }).then(res => {
                if (res.data[0].data) {
                  this.$message({
                    type: 'success',
                    message: '跟踪成功！'
                  })
                }
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
        } else {
          this.$message({
            type: 'warning',
            message: '您已跟踪过该客户！'
          })
        }
      })
    },
    // 申请修改（针对公共库和保a通过的）
    subApplyEdit (data) {
      this.rowData = data
      let params = {
        companyid: this.rowData.id,
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
          this.applyEditDialog = false
          this.search()
        }
      })
    },
    // 申请保A提交
    subBaoA () {
      if (!this.productType) {
        this.$message({
          type: 'warning',
          message: '请选择客户类型！'
        })
        return
      }
      let params = {
        companylogid: this.rowData.companylogid,
        companyid: this.rowData.companyid,
        remark: this.remark,
        type: 20,
        producttype: this.productType
      }
      this.$post('/Company.do?compset', params).then(res => {
        if (res.data[0].success) {
          this.applyBaoADialog = false
          this.cusDetailDialog = false
          this.$message({
            type: 'success',
            message: '申请保A成功'
          })
          this.search()
        } else {
          this.applyBaoADialog = false
          this.$message({
            type: 'danger',
            message: res.data[0].msg
          })
        }
      })
    },
    // 修改并申请重审
    changeAndApply () {
      // console.dir(this.contactList)
      // this.contactList.forEach(val => {
      //   if (!val.name || !val.contact) {
      //     this.$message({
      //       type: 'warning',
      //       message: '请完善联系人信息'
      //     })
      //     throw new Error('ignore')
      //   }
      // })
      this.cusDetailDialog = false
      let params = {
        'companyid': this.rowData.id,
        'companylogid': this.cusDetail.companylogid,
        'cat': this.cusDetail.bid || this.cusDetail.cid,
        'fm': this.cusDetail.fm,
        'area':
          this.cusDetail.county ||
          this.cusDetail.city ||
          this.cusDetail.province,
        'address': this.cusDetail.address,
        'legal_person': this.cusDetail.legal_person,
        'website': this.cusDetail.website,
        'business_scope': this.cusDetail.business_scope,
        'establishment_date': this.cusDetail.establishment_date,
        'companycontact': this.contactList,
        'companycontactbefore': this.oldContactList,
        'imgUrl': this.cusDetail.imgUrl
      }
      this.$post('/Company.do?EditCompany', params).then(res => {
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
    view (data) {
      this.rowData = data
      this._getMyCusDetail(data)
      this.cusDetailDialog = true
    },
    search () {
      this.sendParams = {
        'companyname': this.cusName,
        'baidu_account': this.bdAccount
      }
    },
    reset () {
      this.cusName = ''
      this.bdAccount = ''
    },
    _getMyCusDetail (data) {
      this.$post('/CustomerCheck.do?customlist', {
        'cid': data.companyid,
        'cltype': data.cltype,
        'clstatus': data.clstatus,
        'protectAuid': data.uid,
        'companylogid': data.companylogid
      }).then(res => {
        this.cusDetail = res.data[0].data[0]
        console.log(this.cusDetail)
        this.form.cusName = this.cusDetail.name
        this.form.trade = [this.cusDetail.cid, this.cusDetail.bid]
        this.form.area = [
          this.cusDetail.province,
          this.cusDetail.city,
          this.cusDetail.county
        ]
        this.contactList =
          res.data[1].data.length === 0 ? [{}] : res.data[1].data
        this.oldContactList = JSON.parse(
          JSON.stringify(this.contactList)
        )
        this.checkLogs = res.data[2].data // 审核记录
      })
    },
    _getNum () {
      let params = {
        'id': userId
      }
      this.$get('/Product.do?GetNumberById', params).then(res => {
        try {
          this.baoANum = res.data[0].data
          this.followNum = res.data[1].data
        } catch (error) {
          this.baoANum = ''
          this.followNum = ''
        }
      })
    },
    getList (res) {
      this.list = res.data[0].data
    }
  },
  components: {
    Page,
    AutoSelect,
    SelectDepartment,
    SelectArea,
    SelectTrade
  }
}
</script>

<style lang="less" scoped>
.cus-search {
  .search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .search-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
    .countTip {
      display: flex;
      align-items: center;
      span + span {
        padding-left: 15px;
      }
    }
  }
}
</style>

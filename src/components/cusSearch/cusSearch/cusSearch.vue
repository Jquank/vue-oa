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
      <el-table-column prop="companyname" label="客户名称" min-width="150">
      </el-table-column>
      <el-table-column prop="" label="客户类型" width="100">
        <span slot-scope="scope">{{scope.row.producttype | cusState('cusType')}}</span>
      </el-table-column>
      <el-table-column prop="productname" label="产品类型" width="100">
      </el-table-column>
      <el-table-column prop="" label="公司状态" width="100">
        <span :class="scope.row.ctype==-10?'red':''" slot-scope="scope">{{scope.row.ctype | cusState('cusStatus')}}</span>
      </el-table-column>
      <el-table-column prop="pname" label="业务状态" min-width="100">
        <span slot-scope="scope">{{scope.row.cltype+''+scope.row.clstatus | businessStatus}}</span>
      </el-table-column>
      <el-table-column prop="areaname" label="地区" min-width="120">
      </el-table-column>
      <el-table-column prop="companycatname" label="行业" min-width="100">
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
      <el-table-column prop="" label="操作" min-width="120px" v-if="permissions.indexOf('84')>-1">
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
              <select-trade v-model="form.trade" :echoTrade="form.trade" style="width:100%"></select-trade>
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
              <el-input v-model="cusDetail.address"  type="textarea" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="成立日期 :">
              <el-date-picker v-model="cusDetail.establishment_date" value-format="yyyy-MM-dd" type="date" disabled style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="所属地区 :">
              <select-area v-model="form.area" :areaDisabled="true" :echoArea="form.area" style="width:100%"></select-area>
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
              <el-select v-model="cusDetail.fm" style="width:100%;" disabled>
                <el-option v-for="(item,index) in fmList" :key="index" :value="item.id" :label="item.code_desc"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-for="(item,index) in contactList" :key="index" :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="联系人 :">
              <el-input v-model="item.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="联系电话 :">
              <el-input v-model="item.contact" class="input-btn"></el-input>
              <el-button @click.native="addContact(index)" size="mini" :type="index?'danger':'success'" :icon="index?'el-icon-minus':'el-icon-plus'" circle></el-button>
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
        <el-row>
          <el-col :md="24" class="maxwidth">
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
      </el-form>
      <div style="text-align: center;">
        <!-- <el-button v-if="cusDetail.ctype==-10&&cusDetail.clstatus!=20" @click.native="changeAndApply" type="warning">修改并申请重审</el-button> -->
        <el-button @click.native="subBaoA" type="primary">申请保A</el-button>
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
        trade: [],
        area: []
      },
      fmList: [],
      contactList: [
        {
          contact: '',
          phone: ''
        }
      ],
      oldContactList: [],

      proType: 'DS',
      proTypeList: [],
      cusType: '',
      cusTypeList: [],
      viewRemark: '',

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
    addContact (index) {
      if (index === 0) {
        this.contactList.push({
          concontact: '',
          phone: ''
        })
      } else {
        this.contactList.splice(index, 1)
      }
    },
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
      if (this.contactList.some(val => !val.name || !val.contact)) {
        this.$message.error('请填写联系人或电话！')
        return
      }
      if (!this.proTypeList.some(val => this.proType === val.id)) {
        this.$message.error('请选择产品类型！')
        return
      }
      if (!this.cusType) {
        this.$message.error('请选择客户类型！')
        return
      }
      let params = {
        'pid': this.proType,
        'companylogid': this.rowData.companylogid,
        'companyid': this.rowData.companyid,
        'remark': this.viewRemark,
        'apply_A': '搜索客户申请保A',
        'type': 20,
        'producttype': this.cusType,
        'website': this.cusDetail.website,
        'cat': this.cusDetail.bid || this.cusDetail.cid,
        'contact': this.contactList,
        'establishment': this.cusDetail.establishment_date,
        'legal_person': this.cusDetail.legal_person,
        'address': this.cusDetail.address,
        'fm': this.cusDetail.fm,
        'area': this.cusDetail.county || this.cusDetail.city || this.cusDetail.province,
        'business_scope': this.cusDetail.business_scope
      }
      this.$post('/Company.do?compset', params).then(res => {
        if (res.data[0].success) {
          this.cusDetailDialog = false
          this.search()
        } else {
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
      this.cusType = ''
      this.rowData = data
      this.proType = data.pid
      this._getProTypeList()
      this._getMyCusDetail(data, this._getCusTypeList, data.pid)
      this.cusDetailDialog = true
    },
    search () {
      const regKeyWords = /(湖北省)|(武汉市)|(江岸区)|(江汉区)|(硚口区)|(汉阳区)|(武昌区)|(青山区)|(洪山区)|(蔡甸区)|(江夏区)|(黄陂区)|(新洲区)|(东西湖区)|(汉南区)|(东湖区)|(化学区)|(八吉府区)|(汉口区)|(北京市)|(上海市)|(天津市)|(深圳市)|(东莞市)|(重庆市)|(成都市)|(四川市)|(广东省)|(广州市)|(顺德市)|(佛山市)|(河源市)|(惠州市)|(西安市)|(陕西省)|(山东省)|(济南市)|(山西省)|(太原市)|(广西省)|(桂林市)|(云南省)|(昆明市)|(湖南省)|(长沙市)|(株洲市)|(常德市)|(安徽省)|(黄山市)|(合肥市)|(浙江省)|(杭州市)|(江苏省)|(苏州市)|(南京市)|(哈尔滨省)|(黑龙江省)|(吉林市)|(长春市)|(辽宁市)|(沈阳市)|(内蒙古)|(呼和浩特)|(河北省)|(石家庄市)|(新疆省)|(乌鲁木齐市)|(甘肃省)|(兰州市)|(青海省)|(西宁市)|(宁夏市)|(银川市)|(河南省)|(郑州市)|(贵州市)|(贵阳市)|(西藏)|(拉萨)|(江西省)|(南昌市)|(福建省)|(福州市)|(台湾)|(台北)|(海南省)|(海口市)|(香港)|(澳门)|(湖北)|(武汉)|(江岸)|(江汉)|(硚口)|(汉阳)|(武昌)|(青山)|(洪山)|(蔡甸)|(江夏)|(黄陂)|(新洲)|(东西湖)|(汉南)|(东湖)|(化学)|(八吉府)|(汉口)|(北京)|(上海)|(天津)|(深圳)|(东莞)|(重庆)|(成都)|(四川)|(广东)|(广州)|(顺德)|(佛山)|(河源)|(惠州)|(西安)|(陕西)|(山东)|(济南)|(山西)|(太原)|(广西)|(桂林)|(云南)|(昆明)|(湖南)|(长沙)|(株洲)|(常德)|(安徽)|(黄山)|(合肥)|(浙江)|(杭州)|(江苏)|(苏州)|(南京)|(哈乐滨)|(黑龙江)|(吉林)|(长春)|(辽宁)|(沈阳)|(内蒙古)|(呼和浩特)|(河北)|(石家庄)|(新疆)|(乌鲁木齐)|(甘肃)|(兰州)|(青海)|(西宁)|(宁夏)|(银川)|(河南)|(郑州)|(贵州)|(贵阳)|(西藏)|(拉萨)|(江西)|(南昌)|(福建)|(福州)|(台湾)|(台北)|(海南)|(海口)|(香港)|(澳门)|(分公司)/g
      this.sendParams = {
        'companyname': this.cusName.trim().replace(regKeyWords, ''),
        'baidu_account': this.bdAccount.trim()
      }
    },
    reset () {
      this.cusName = ''
      this.bdAccount = ''
    },
    changeProType (val) {
      this._getCusTypeList(val)
    },
    _getCusTypeList (pid) {
      let params = {
        cid: this.rowData.companyid,
        pid: pid,
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
    _getMyCusDetail (data, fn, fnParams) {
      this.$post('/CustomerCheck.do?customlist', {
        'cid': data.companyid,
        'cltype': data.cltype,
        'clstatus': data.clstatus,
        'protectAuid': data.uid,
        'companylogid': data.companylogid
      }).then(res => {
        this.cusDetail = res.data[0].data[0]
        fn(fnParams)
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
        console.log(this.contactList)
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
      width: 280px;
    }
    .countTip {
      display: flex;
      align-items: center;
      span + span {
        padding-left: 15px;
      }
    }
  }
  .input-btn{
    width: calc(~"(100% - 32px)");
  }
}
</style>

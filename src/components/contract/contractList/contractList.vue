<template>
  <div class="contract-list component-container media-padding">
    <div class="allot-search" style="margin-top:-10px;">
      <el-input placeholder="搜索合同编号" v-model="contractNum" class="list-item item-width">
        <template slot="prepend">合同编号:</template>
      </el-input>
      <auto-select :key="key_select_type" title="合同类型" v-model="contratType" class="list-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="(item,index) in contratTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
      </auto-select>
      <auto-select :key="key_select_status" title="合同状态" v-model="contratStatus" class="list-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option label="未领用" value="10"></el-option>
        <el-option label="已领用" value="20"></el-option>
        <el-option label="签约" value="30"></el-option>
        <el-option label="作废" value="40"></el-option>
      </auto-select>
      <el-input placeholder="搜索领用人" v-model="receiptName" class="list-item item-width">
        <template slot="prepend">领用人:</template>
      </el-input>
    </div>

    <div class="export">
      <div class="allot-search">
        <el-date-picker v-model="receiptTime" value-format="yyyy/MM/dd HH:mm" format="yyyy/MM/dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="领用开始日期" end-placeholder="领用结束日期" :unlink-panels="true" class="list-item" style="width:310px;"></el-date-picker>
        <div class="list-item">
          <el-button @click.native="search" type="primary">查 询</el-button>
          <el-button @click.native="reset" type="warning">重 置</el-button>
        </div>
      </div>
      <div class="list-item">
        <el-button @click.native="exportContract" type="success" icon="el-icon-upload">导出合同</el-button>
      </div>
    </div>

    <el-table stripe border :data="list" class="table-width">
      <el-table-column prop="number" label="合同号" width="140">
      </el-table-column>
      <el-table-column prop="username" label="领用人">
      </el-table-column>
      <el-table-column prop="catname" label="合同类型" width="160">
      </el-table-column>
      <el-table-column prop="companyname" label="公司名称" min-width="150">
      </el-table-column>
      <el-table-column prop="" label="领用时间" width="150">
        <span slot-scope="scope">{{scope.row.apply_dt | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="" label="收回时间" width="150">
        <span slot-scope="scope">{{scope.row.return_dt | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="" label="状态" width="80">
        <el-button slot-scope="scope" plain class="xsbtn" :type="scope.row.status==20?'primary':
        scope.row.status==40?'danger':
        scope.row.status==10?'info':'success'">{{scope.row.status | cusState('contractStatus')}}</el-button>
      </el-table-column>
      <el-table-column prop="" label="转出/接收合同" min-width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==20 && scope.row.uid == userId">转出合同</el-button>
          <el-button v-if="scope.row.status==20 && scope.row.switchuid != '' && scope.row.switchuid!=null && userId != scope.row.uid">接收合同</el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="permissions.indexOf('76') > -1" prop="" label="操作" width="60px" align="center">
        <template slot-scope="scope">
          <el-button @click.native="edit(scope.row)" type="primary" class="xsbtn">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" @updateList="getList"></page>

    <!-- 编辑弹窗 -->
    <el-dialog :modal-append-to-body="false" title="新增合同" :visible.sync="editContractDialog" width="800px">
      <el-form ref="form" :model="detailInfo" label-width="95px">
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="合同类型 :">
              <el-input v-model="detailInfo.catname" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="合同号 :">
              <el-input v-model="detailInfo.number" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="合同状态 :">
              <el-select v-model="detailInfo.status" style="width:100%;">
                <el-option label="未领用" :value="10"></el-option>
                <el-option label="已领用" :value="20"></el-option>
                <el-option label="已签约" :value="25"></el-option>
                <el-option label="已签约" :value="30"></el-option>
                <el-option label="作废" :value="40"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="领用人 :">
              <el-input v-model="detailInfo.username" disabled class="btn-input"></el-input>
              <el-button @click.native="selUser" type="primary">选择</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="24" class="maxwidth">
            <el-form-item label="领用时间 :">
              <el-date-picker v-model="detailInfo.apply_dt" disabled type="datetime" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="24" class="maxwidth">
            <el-form-item label="收回/签约/遗失/作废时间 :" label-width="190px">
              <el-date-picker v-model="detailInfo.return_dt" disabled type="datetime" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="签约客户名 :">
              <el-input v-model="detailInfo.companyname" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="归档时间 :">
              <el-date-picker v-model="detailInfo.returntime" format="yyyy/MM/dd HH:mm" value-format="yyyy/MM/dd HH:mm" type="datetime" placeholder="选择日期" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="24" style="max-width:1000px;">
            <el-form-item label="备注 :">
              <el-input v-model="detailInfo.remark" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="text-center">
          <el-button @click.native="subEdit" type="warning">提交修改</el-button>
        </div>
      </el-form>
      <el-table stripe border :data="checkLogs" style="width: 100%;margin-top:10px;">
        <el-table-column prop="insert_time" label="日期" width="100">
          <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="name" label="发表者" width="100">
        </el-table-column>
        <el-table-column prop="catname" label="合同类型" width="160">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 选择人员弹窗 -->
    <el-dialog :modal-append-to-body="false" title="选择人员" :visible.sync="selUserDialog" width="550px">
      <select-user @userId="getUserId"></select-user>
    </el-dialog>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import SelectUser from 'base/selectUser/selectUser'
import { timeFormat } from 'common/js/filters'
export default {
  data () {
    return {
      userId: cookie.get('userId'),
      permissions: cookie.getJSON('permissions'),

      contractNum: '',
      contratType: '',
      key_select_type: '',
      contratTypeList: [],
      contratStatus: '',
      key_select_status: '1',
      receiptName: '',
      receiptTime: [],

      list: [],
      url: '/Contract.do?SearchByCatId',
      sendParams: {
        ctlist: 'list'
      },
      rowData: {},
      editContractDialog: false, // 编辑合同弹窗
      detailInfo: {},
      checkLogs: [],
      selUserDialog: false, // 选择人员弹窗
      selUserId: '',

      statusnamebefore: ''
    }
  },
  created () {
    this._getContractTypeList()
  },
  methods: {
    search () {
      this.sendParams = {
        contractnumber: this.contractNum,
        catid: this.contratType,
        status: this.contratStatus,
        apply_dt_begin: this.receiptTime[0],
        apply_dt_end: this.receiptTime[1],
        contracter: this.receiptName,
        ctlist: 'list'
      }
    },
    reset () {
      this.contractNum = ''
      this.contratType = ''
      this.key_select_type = new Date() + ''
      this.contratStatus = ''
      this.key_select_status = new Date() + '1'
      this.receiptTime = []
      this.receiptName = ''
    },
    exportContract () {
      this.$export('/Contract.do?contractExport', this.sendParams)
    },
    // 编辑
    edit (data) {
      this.rowData = data
      this.editContractDialog = true
      let params = {
        contractid: data.id,
        ctlist: 'list',
        paging: true
      }
      this.$get('/Contract.do?SearchByCatId', params).then(res => {
        this.detailInfo = res.data[0].data[0]
        this.statusnamebefore = this.detailInfo.text
        this.detailInfo.returntime = timeFormat(this.detailInfo.returntime)
        this.beforeUserName = this.detailInfo.username
        this.checkLogs = res.data[1].data
      })
    },
    // 提交修改
    subEdit () {
      let params = {
        contractid: this.rowData.id,
        contractnumber: this.detailInfo.number,
        status: this.detailInfo.status,
        statusname: '',
        uid: this.selUserId || this.detailInfo.uid,
        username: this.detailInfo.username,
        statusnamebefore: this.statusnamebefore,
        uidbefore: this.detailInfo.uid,
        usernamebefore: this.beforeUserName,
        returntime: this.detailInfo.returntime || null,
        remark: this.detailInfo.remark
      }
      console.log(params)
      // todo
      this.$post('/Contract.do?editcontract', params).then(res => {
        if (res.data[0].success) {
          this.$message.success('保存成功！')
          this.editContractDialog = false
          this.search()
        }
      })
    },
    selUser () {
      this.selUserDialog = true
    },
    getUserId (id, name) {
      this.selUserId = id
      if (id) {
        this.selUserDialog = false
      }
      this.detailInfo.username = name
    },
    _getContractTypeList () {
      this.$get('/Contract.do?catlst').then(res => {
        this.contratTypeList = res.data.data
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
    SelectUser
  }
}
</script>

<style lang="less" scoped>
.contract-list {
  .allot-search {
    display: flex;
    flex-wrap: wrap;
    .list-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
  .export {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > .list-item {
      margin-left: 10px;
      margin-right: 20px;
      margin-top: 10px;
    }
  }
  .btn-input {
    width: calc(~'(100% - 65px)');
  }
}
</style>

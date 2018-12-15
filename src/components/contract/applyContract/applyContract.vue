<template>
  <div class="apply-contract component-container media-padding">
    <div class="apply-btn">
      <el-button @click.native="applyContract" type="primary" icon="fa fa-plus"> 申请合同</el-button>
    </div>
    <div class="apply-search">
      <auto-select :key="key_select_type" title="合同类型" v-model="contratType" class="apply-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="(item,index) in contratTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
      </auto-select>
      <auto-select :key="key_select_status" title="合同状态" v-model="contratStatus" class="apply-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option label="待分配" value="20"></el-option>
        <el-option label="已分配" value="30"></el-option>
      </auto-select>
      <el-date-picker v-model="applyTime" value-format="yyyy/MM/dd HH:mm" format="yyyy/MM/dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="申请开始日期" end-placeholder="申请结束日期" class="apply-item item-width" style="width: 310px;"></el-date-picker>
      <div class="apply-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
    </div>

    <el-table stripe border :data="list" style="width: 100%;margin-top:10px;">
      <el-table-column prop="username" label="申请人">
      </el-table-column>
      <el-table-column prop="catname" label="合同类型" min-width="160">
      </el-table-column>
      <el-table-column prop="contractnumber" label="合同编号">
      </el-table-column>
      <el-table-column prop="" label="申请时间" min-width="100">
        <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="" label="状态" min-width="80" align="center">
        <el-button slot-scope="scope" plain class="xsbtn"
        :type="scope.row.status==20?'warning':
        scope.row.status==10?'danger':'success'">{{scope.row.status | cusState('applyStatus')}}</el-button>
      </el-table-column>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" @updateList="getList"></page>

    <!-- 申请合同弹窗 -->
    <el-dialog :modal-append-to-body="false" title="新增合同" :visible.sync="applyDialog" width="400px">
      <el-select title="业务类型" v-model="conType" placeholder="请选择业务类型" style="width:100%">
        <el-option v-for="(item,index) in conTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <div class="text-center mt10px">
        <el-button @click.native="subApply" type="primary">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
export default {
  data () {
    return {
      contratType: '',
      key_select_type: '',
      contratTypeList: [],
      contratStatus: '',
      key_select_status: '1',
      applyTime: [],

      list: [],
      url: '/Contract.do?SearchUnallocContract',
      sendParams: {},

      applyDialog: false,
      conType: '',
      conTypeList: []
    }
  },
  mounted () {
    this._getContractTypeList()
  },
  methods: {
    search () {
      this.sendParams = {
        'catid': this.contratType,
        'status': this.contratStatus,
        'begintime': this.applyTime[0],
        'endtime': this.applyTime[1]
      }
    },
    reset () {
      this.contratType = ''
      this.key_select_type = new Date() + ''
      this.key_select_status = new Date() + '1'
      this.contratStatus = ''
      this.applyTime = []
    },
    applyContract () {
      this.applyDialog = true
      this._getBusinessType()
    },
    subApply () {
      this.$post('/Contract.do?ApplyFor', {pid: this.conType}).then(res => {
        if (res.data.success) {
          this.applyDialog = false
          this.$message({
            type: 'success',
            message: '申请成功'
          })
        }
      })
    },
    getList (res) {
      this.list = res.data[0].data
    },
    // 获取业务类型
    _getBusinessType () {
      this.$get('/Product.do?proget').then(res => {
        this.conTypeList = res.data.data
      })
    },
    // 获取合同类型
    _getContractTypeList () {
      this.$get('/Contract.do?catlst').then(res => {
        this.contratTypeList = res.data.data
      })
    }
  },
  components: {
    Page,
    AutoSelect,
    SelectDepartment
  }
}
</script>

<style lang="less" scoped>
.apply-contract {
  .apply-btn{
    margin-left:10px;
  }
  .apply-search {
    display: flex;
    flex-wrap: wrap;
    .apply-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
}
</style>

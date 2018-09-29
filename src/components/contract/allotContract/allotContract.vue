<template>
  <div class="allot-contract component-container media-padding">
    <div  class="add-contract">
      <el-button @click.native="addContract" type="primary" class="allot-item">新增合同</el-button>
    </div>
    <div class="allot-search">
      <auto-select :key="key_auto_select" title="合同类型" v-model="contratType" class="allot-item item-width">
        <el-option label="全部" :value="undefined"></el-option>
        <el-option v-for="(item,index) in contratTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
      </auto-select>
      <el-date-picker v-model="applyDate" value-format="yyyy/MM/dd HH:mm" format="yyyy/MM/dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="申请开始日期" end-placeholder="申请结束日期" class="allot-item" style="width:300px;"></el-date-picker>
      <el-input placeholder="搜索客户名称" v-model="applyName" class="allot-item item-width">
        <template slot="prepend">申请人:</template>
      </el-input>
      <div class="allot-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
    </div>

    <el-table stripe border :data="list" style="width: 100%;margin-top:10px;">
      <el-table-column prop="username" label="申请人" min-width="80">
      </el-table-column>
      <el-table-column prop="fullname" label="申请部门">
      </el-table-column>
      <el-table-column prop="catname" label="合同类型">
      </el-table-column>
      <el-table-column prop="count" label="份数">
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="100px">
        <template slot-scope="scope">
          <el-button @click.native="allot(scope.row)" type="success" class="xsbtn">分配</el-button>
          <el-button @click.native="back(scope.row)" type="danger" class="xsbtn">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" @updateList="getList"></page>

    <!-- 新增合同弹窗 -->
    <el-dialog :modal-append-to-body="false" title="分配合同" :visible.sync="allotDialog" width="600px">
      <auto-select title="合同类型" v-model="contractType" class="contract-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option label="待审核" value="10"></el-option>
        <el-option label="已审核" value="20"></el-option>
      </auto-select>
      <el-input v-model="stratNum" class="contract-item item-width">
        <template slot="prepend">起始号:</template>
      </el-input>
      <el-input v-model="contractCount" class="contract-item item-width">
        <template slot="prepend">合同份数:</template>
      </el-input>
      <div class="contract-item item-width" style="text-align:center">
        <el-button type="primary" >提 交</el-button>
      </div>
    </el-dialog>

    <!-- 分配合同弹窗 -->
    <el-dialog :modal-append-to-body="false" title="分配合同" :visible.sync="allotDialog" width="600px">
      <div>
        <el-input v-model="contractNum" placeholder="搜索合同编号" style="max-width:350px;"></el-input>
        <el-button @click.native="searchContractNum" type="primary">查询</el-button>
      </div>
      <el-table @selection-change="handleSelectionChange" stripe border :data="allotList" style="width: 100%;margin-top:10px;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="contractnumber" label="合同编号">
      </el-table-column>
      <el-table-column prop="catname" label="合同类型">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button @click.native="delContract(scope.row)" type="danger" class="xsbtn">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="allotUrl" :sendParams="allotParams" @updateList="getAllotList"></page>
    <div style="text-align:right;margin-top:10px;">
      <el-button @click.native="confirmAllot" type="primary">分 配</el-button>
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
      contratType: undefined,
      contratTypeList: [],
      key_auto_select: '',
      applyDate: [],
      applyName: '',

      rowData: {},
      list: [],
      url: '/Contract.do?SearchByUserId',
      sendParams: {
        'status_undis': 10
      },

      allotDialog: false,
      contractNum: '',
      allotList: [],
      allotUrl: '/Contract.do?SearchByStatus',
      allotParams: {},
      handleSelContract: []

    }
  },
  mounted () {
    this._getContratTypeList()
  },
  methods: {
    addContract () {

    },
    delContract (data) {
      this.$confirm('确定删除吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/Contract.do?contractDel', {
            ctid: data.contractid
          }).then(res => {
            if (res.data.success) {
              this.allotParams = {
                'catid': this.rowData.cat_id,
                'status': 10
              }
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            } else {
              this.$message({
                type: 'danger',
                message: '删除失败'
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
    },
    handleSelectionChange (val) {
      this.handleSelContract = val
    },
    allot (data) {
      this.contractNum = ''
      this.rowData = data
      this.allotDialog = true
      this.allotParams = {
        'catid': data.cat_id,
        'status': 10
      }
    },
    confirmAllot () {
      if (!this.handleSelContract.length) {
        this.$message({
          type: 'warning',
          message: '请勾选合同'
        })
        return
      }
      if (this.handleSelContract.length > this.rowData.count) {
        this.$message({
          type: 'warning',
          message: '分配合同份数不能超过申请份数！'
        })
        return
      }
      let params = {
        'catid': this.rowData.cat_id,
        'uid': this.rowData.uid,
        'constractid': this.handleSelContract,
        'username': this.rowData.username
      }
      this.$post('/Contract.do?Alloction', params).then(res => {
        this.allotDialog = false
        this.search()
      })
    },
    back () {

    },
    searchContractNum () {
      this.allotParams = {
        'catid': this.rowData.cat_id,
        'status': 10,
        'contractnumber': this.contractNum
      }
    },
    search () {
      this.sendParams = {
        'catid': this.contratType,
        'status_undis': 100,
        'begintime': this.applyDate[0],
        'endtime': this.applyDate[1],
        'allocname': this.applyName
      }
    },
    reset () {
      this.contratType = undefined
      this.key_auto_select = new Date() + ''
      this.applyDate = []
      this.applyName = ''
    },
    _getContratTypeList () {
      this.$get('/Contract.do?catlst').then(res => {
        this.contratTypeList = res.data.data
      })
    },
    getAllotList (res) {
      this.allotList = res.data[0].data
    },
    getList (res) {
      this.list = res.data[0].data
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
.allot-contract {
  .add-contract{
    margin-left: 10px;
  }
  .allot-search {
    display: flex;
    flex-wrap: wrap;
    .allot-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
}
</style>

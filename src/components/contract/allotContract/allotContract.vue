<template>
  <div class="allot-contract component-container media-padding">
    <div class="add-contract">
      <el-button v-if="permissions.indexOf('43') > -1" @click.native="addContract" icon="el-icon-plus" type="primary" class="allot-item">新增合同</el-button>
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
      <el-table-column prop="" label="操作" min-width="100px" align="center">
        <template slot-scope="scope">
          <el-button @click.native="allot(scope.row)" type="success" class="xsbtn">分配</el-button>
          <el-button @click.native="back(scope.row)" type="danger" class="xsbtn">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" @updateList="getList"></page>

    <!-- 新增合同弹窗 -->
    <el-dialog :modal-append-to-body="false" title="新增合同" :visible.sync="addContractDialog" width="500px">
      <el-select @change="selChange" value-key="id" title="合同类型" v-model="conType" placeholder="请选择合同类型" class="contract-item">
        <el-option v-for="(item,index) in conTypeList" :key="index" :label="item.name" :value="item"></el-option>
      </el-select>
      <el-input v-model="stratNum" class="contract-item">
        <template slot="prepend">起始号:</template>
      </el-input>
      <el-input v-model="contractCount" placeholder="每次最多100份" class="contract-item">
        <template slot="prepend">合同份数:</template>
      </el-input>
      <div style="text-align:center">
        <el-button @click.native="subAddContract" type="primary">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 分配合同弹窗 -->
    <el-dialog :modal-append-to-body="false" title="分配合同" :visible.sync="allotDialog" width="600px">
      <div>
        <el-input v-model="contractNum" placeholder="搜索合同编号" style="max-width:350px;"></el-input>
        <el-button @click.native="searchContractNum" type="primary">查询</el-button>
      </div>
      <el-table @selection-change="handleSelectionChange" stripe border :data="allotList" style="width: 100%;margin-top:10px;">
        <el-table-column type="selection" width="45">
        </el-table-column>
        <el-table-column prop="contractnumber" label="合同编号">
        </el-table-column>
        <el-table-column prop="catname" label="合同类型">
        </el-table-column>
        <el-table-column prop="" label="操作" align="center">
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
import cookie from 'js-cookie'
export default {
  data () {
    return {
      permissions: cookie.getJSON('permissions'),
      contratType: undefined,
      contratTypeList: [],
      key_auto_select: '',
      applyDate: [],
      applyName: '',

      rowData: {},
      list: [],
      url: '/Contract.do?SearchByUserId',
      sendParams: {
        status_undis: 10
      },

      addContractDialog: false, // 新增合同弹窗
      conTypeList: [],
      conType: {},
      stratNum: '',
      contractCount: '',

      allotDialog: false, // 分配合同弹窗
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
    selChange (val) {
      this.stratNum = val.begin_pos
    },
    addContract () {
      this.addContractDialog = true
      this.contractCount = ''
      this.conType = {}
      this.stratNum = ''
      this.$get('/Contract.do?catlst').then(res => {
        this.conTypeList = res.data.data
      })
    },
    subAddContract () {
      let params = {
        'cat': this.conType.id,
        'fmt': this.conType.fmt,
        'begin_pos': this.conType.begin_pos,
        'len': this.conType.len,
        'num': this.contractCount
      }
      console.log(params)
      if (!this.contractCount || !this.conType.id) {
        this.$message({
          type: 'warning',
          message: '请选择合同类型或填写合同份数'
        })
        return
      }
      this.$post('/Contract.do?catset', params).then(res => {
        this.addContractDialog = false
        if (res.data[1].data) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
      })
    },
    // 删除单份合同
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
                catid: this.rowData.cat_id,
                status: 10
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
    // 分配合同
    allot (data) {
      this.contractNum = ''
      this.rowData = data
      this.allotDialog = true
      this.allotParams = {
        catid: data.cat_id,
        status: 10
      }
    },
    // 确认分配
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
      let contractIds = []
      this.handleSelContract.forEach(val => {
        contractIds.push({
          id: val.contractid,
          number: val.contractnumber
        })
      })
      let params = {
        catid: this.rowData.cat_id,
        uid: this.rowData.uid,
        constractid: contractIds,
        username: this.rowData.username
      }
      this.$post('/Contract.do?Alloction', params).then(res => {
        this.$message.success('已分配！')
        this.allotDialog = false
        this.search()
      })
    },
    // 驳回
    back (data) {
      this.$confirm('确定驳回吗？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/Contract.do?contractAllocBack', {
            caId: data.id
          }).then(res => {
            if (res.data.success) {
              this.$message({
                type: 'success',
                message: '驳回成功'
              })
              this.search()
            } else {
              this.$message({
                type: 'danger',
                message: '驳回失败'
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
    searchContractNum () {
      this.allotParams = {
        catid: this.rowData.cat_id,
        status: 10,
        contractnumber: this.contractNum
      }
    },
    search () {
      this.sendParams = {
        catid: this.contratType,
        status_undis: 100,
        begintime: this.applyDate[0],
        endtime: this.applyDate[1],
        allocname: this.applyName
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
  .add-contract {
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
  .contract-item {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>

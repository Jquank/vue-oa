<template>
  <div class="apply-cus component-container media-padding">
    <div class="apply-search top">
      <auto-select :classMark="'sel1'" :title="'数量'" v-model="applyCount" :defaultValue="applyCount" class="apply-item item-width">
        <el-option label="5" value="5"></el-option>
        <el-option label="10" value="10"></el-option>
        <el-option label="30" value="30"></el-option>
        <el-option label="50" value="50"></el-option>
        <el-option label="100" value="100"></el-option>
      </auto-select>
      <el-button @click.native="apply" :loading="applyBtnLoading" type="primary" class="apply-item">申 领</el-button>
      <el-button class="apply-item" type="primary" plain>公共库总客户: {{count1}}</el-button>
      <el-button class="apply-item" type="primary" plain>已申领客户: {{count2}}</el-button>
      <el-button class="apply-item" type="primary" plain>申领次数大于5的客户: {{count3}}</el-button>
      <el-button class="apply-item" type="primary" plain>申领次数等于2的客户: {{count4}}</el-button>
    </div>
    <div class="cut-line"></div>
    <div class="apply-search">
      <select-department :key="key_dept" @upDeptId="upDeptId" class="apply-item item-width"></select-department>
      <el-input v-model="cusName" class="apply-item item-width" placeholder="客户名称">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <el-input v-model="inputName" class="apply-item item-width" placeholder="导入人">
        <template slot="prepend">导入人:</template>
      </el-input>
      <auto-select :classMark="'sel3'" :key="key_auto_source" :title="'客户来源'" v-model="source" class="apply-item item-width">
        <el-option v-for="item in sourceList" :key="item.id" :label="item.code_desc" :value="item.id"></el-option>
      </auto-select>
      <auto-select :classMark="'sel2'" :key="key_auto_sel" :title="'状态'" v-model="applyCusStatus" :defaultValue="applyCusStatus" class="apply-item item-width">
        <el-option label="全部" value="300"></el-option>
        <el-option label="未完成客户" value="0"></el-option>
        <el-option label="完成客户" value="100"></el-option>
      </auto-select>
      <el-date-picker v-model="applyDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="申领时间" end-placeholder="申领时间" class="apply-item" style="width:250px;"></el-date-picker>
      <el-date-picker v-model="doneDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="完成时间" end-placeholder="完成时间" class="apply-item" style="width:250px;"></el-date-picker>
      <div class="apply-item">
        <el-button type="primary" @click.native="search">查 询</el-button>
        <el-button type="warning" @click.native="reset">重 置</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table stripe border max-height="550" :data="applyList" class="table-width">
      <el-table-column prop="companyname" label="客户名称" min-width="150">
      </el-table-column>
      <el-table-column prop="" label="客户类型" min-width="80">
        <template slot-scope="scope">
          <span>{{scope.row.producttype | cusState('cusType')}}</span>
          <span>{{scope.row.producttype!==0?scope.row.productnumber:''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="申领商务" width="80">
      </el-table-column>
      <el-table-column prop="fullname" label="所属部门">
      </el-table-column>
      <el-table-column prop="" label="申领时间" width="150">
        <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="" label="最后跟进时间" width="150">
        <span slot-scope="scope">{{scope.row.followtime | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="" label="状态">
        <span slot-scope="scope">{{
          scope.row.applytype===-100?'永久放弃':
          scope.row.applytype===-10?'暂不跟进':
          scope.row.applytype===-1?'空号错号':
          scope.row.applytype===10?'转跟踪':
          scope.row.applytype===20?'跟进':
          scope.row.applytype===100?'完成':'未标记'
          }}</span>
      </el-table-column>
      <el-table-column label="操作" width="60" align="center">
        <template slot-scope="scope">
          <el-button @click.native="view(scope.row)" type="success" class="xsbtn">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="applyUrl" :sendParams="sendParams" @updateList="updateApplyList"></page>
    <router-view></router-view>
  </div>
</template>

<script>
import Page from '@/base/page/page'
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import { getByCode } from 'api/getOptions'
export default {
  data () {
    return {
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      applyBtnLoading: false,
      key_dept: '',
      key_auto_sel: '1',
      key_auto_source: '2',
      area: [],
      trade: [],
      applyCount: '30',
      dept: '',
      cusName: '',
      applyCusStatus: '0',
      applyDate: [],
      doneDate: [],
      applyList: [],
      applyUrl: '/Apply.do?getcompany',
      sendParams: {
        applytype: '0'
      },
      inputName: '',
      source: '',
      sourceList: []
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to)
    if (to.query.data === 'fromDetail') {
      this.search()
    }
    next()
  },
  mounted () {
    this._getSourceList()
  },
  methods: {
    apply () {
      this.applyBtnLoading = true
      this.$post('/Apply.do?company', {count: this.applyCount}).then(res => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '申领成功'
          })
          this.search()
          this.applyBtnLoading = false
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
          this.applyBtnLoading = false
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _getSourceList () {
      getByCode(27).then(res => {
        this.sourceList = res.data.data
      })
    },
    search () {
      this.sendParams = {
        applytype: this.applyCusStatus,
        companyname: this.cusName,
        applyStart: this.applyDate[0],
        applyEnd: this.applyDate[1],
        followStart: this.doneDate[0],
        followEnd: this.doneDate[1],
        deptcode: this.dept,
        source_name: this.inputName,
        source: this.source
      }
    },
    reset () {
      this.applyCusStatus = '300'
      this.cusName = ''
      this.applyDate = []
      this.doneDate = []
      this.dept = ''
      this.inputName = ''
      this.source = ''
      this.key_dept = new Date() + ''
      this.key_auto_sel = new Date() + '1'
      this.key_auto_source = new Date() + '2'
    },
    updateApplyList (res) {
      this.applyList = res.data[0].data
      this.count1 = res.data[2].data.pubCnt
      this.count2 = res.data[2].data.applyCnt
      this.count3 = res.data[2].data.errCnt5
      this.count4 = res.data[2].data.errCnt2
    },
    upDeptId (id) {
      this.dept = id
    },
    view (data) {
      this.$router.push({
        path: `applyCus/${data.applyid}`,
        query: { data: data }
      })
    }
  },
  components: {
    Page,
    SelectArea,
    SelectTrade,
    AutoSelect,
    SelectDepartment
  }
}
</script>

<style lang="less" scoped>
.apply-cus {
  position: relative;
  .top {
    margin-top: -10px;
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
  .cut-line {
    margin-top: 10px;
    border-top: 1px solid rgb(218, 214, 214);
  }
  .page {
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

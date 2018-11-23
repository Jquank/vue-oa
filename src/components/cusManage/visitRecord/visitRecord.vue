<template>
  <div class="visit-record component-container media-padding">
    <div class="visit-search">
      <el-input v-model="cusName" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <auto-select :key="key_visit_type" title="出访类型" defaultValue="100" v-model="visitType" id="visit-status" class="visit-item item-width">
        <el-option label="全部" value="100"></el-option>
        <el-option label="首访" value="110"></el-option>
        <el-option label="二访" value="120"></el-option>
      </auto-select>
      <el-date-picker v-model="visitDate" format="yyyy/MM/dd HH:mm" value-format="yyyy/MM/dd HH:mm" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="出访开始日期" end-placeholder="出访结束日期" class="visit-item" style="width:300px;"></el-date-picker>
      <div class="visit-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
    </div>

    <!-- 列表 -->
      <el-table stripe border :data="myVisitList" style="width: 100%;margin-top:10px;">
        <el-table-column prop="cname" label="客户名称" min-width="150">
        </el-table-column>
        <el-table-column prop="pname" label="业务类型" width="80">
        </el-table-column>
        <el-table-column prop="" label="出访类型" width="80">
          <span slot-scope="scope">{{scope.row.cat == 110? '首访': '二访'}}</span>
        </el-table-column>
        <el-table-column prop="" label="客户意向" width="70">
          <span slot-scope="scope">{{scope.row.result+'%'}}</span>
        </el-table-column>
        <el-table-column prop="ccname" label="拜访人" width="70">
        </el-table-column>
        <el-table-column prop="uname" label="出访人" width="70">
        </el-table-column>
        <el-table-column prop="accompanyname" label="陪访人" width="70">
        </el-table-column>
        <el-table-column prop="" label="出访时间" width="133">
          <span slot-scope="scope">{{scope.row.begin_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="" label="拜访结束时间" width="133">
          <span slot-scope="scope">{{scope.row.end_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="remark" label="出访结果" min-width="130">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==10" @click.native.prevent="writeVisitResult(scope.row)" type="primary" class="xsbtn">填写出访结果</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page class="page" :url="myVisitUrl" :sendParams="params" @updateList="updateMyVisitList"></page>

    <!-- 填写出访结果弹窗 -->
    <el-dialog v-el-drag-dialog title="填写出访结果" class="visit-result-dialog" :visible.sync="visitResultDialog">
      <el-form ref="form" :model="form" label-width="105px">
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户名称 :">
              <el-input type="textarea" v-model="echoVisit.cname" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户意向 :" required>
              <el-select v-model="echoVisit.result" style="width:100%;">
                <el-option :value="25" label="25%"></el-option>
                <el-option :value="50" label="50%"></el-option>
                <el-option :value="75" label="75%"></el-option>
                <el-option :value="100" label="100%"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="拜访人 :">
              <el-input v-model="echoVisit.ccname" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="陪访人 :">
              <el-input v-model="echoVisit.accompanyname" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="联系电话 :" >
              <el-input v-model="echoVisit.contact" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="联系地址 :">
              <el-input type="textarea" v-model="echoVisit.addr" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="出访时间 :">
              <el-date-picker v-model="echoVisit.begin_time" disabled type="datetime" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="拜访结束时间 :" label-width="115px" required>
              <el-date-picker v-model="form.overTime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" type="datetime" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="出访类型 :">
              <el-select v-model="echoVisit.cat" disabled style="width:100%;">
                <el-option :value="110" label="首访"></el-option>
                <el-option :value="120" label="二访"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="出访结果 :" required>
              <el-select v-model="form.visitResult" style="width:100%;">
                <el-option value="10" label="继续跟进"></el-option>
                <el-option value="20" label="只签合同"></el-option>
                <el-option value="30" label="收半款"></el-option>
                <el-option value="40" label="收全款"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="24">
            <el-form-item label="出访详情 :" required>
              <el-input v-model="form.visitDetail" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:center;">
        <el-button type="primary" @click.native="subVisitResult">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import elDragDialog from '@/directive/el-dragDialog' // eslint-disable-line
import Page from 'base/page/page'
export default {
  directives: { elDragDialog },
  data () {
    return {
      key_visit_type: '',
      myVisitList: [],
      myVisitUrl: '/follow.do?ListAll',
      params: { cat: '100' },
      cusName: '',
      visitType: '100',
      visitDate: '',
      visitResultDialog: false,
      form: {
        overTime: '',
        visitResult: '',
        visitDetail: ''
      },
      disabled: true,
      echoVisit: {},
      rowData: {}
    }
  },
  methods: {
    search () {
      this.params = {
        companyname: this.cusName,
        cat: this.visitType,
        begin_time: this.visitDate[0],
        end_time: this.visitDate[1]
      }
    },
    reset () {
      this.cusName = ''
      this.key_visit_type = new Date() + ''
      this.visitType = '100'
      this.visitDate = ''
    },
    writeVisitResult (val) {
      this.rowData = val
      this.visitResultDialog = true
      this.form = {
        overTime: '',
        visitResult: '',
        visitDetail: ''
      }
      this.$post('/follow.do?DetailVisit', { id: val.cvid }).then(res => {
        this.echoVisit = res.data.data[0]
      })
    },
    subVisitResult () {
      let params = {
        'id': this.rowData.cvid,
        'cat': this.echoVisit.cat,
        'cid': this.echoVisit.cid, // 公司id
        'uid': this.echoVisit.cvuid,
        'addr': this.echoVisit.addr,
        'pid': this.echoVisit.pid, // 产品id
        'ccid': this.echoVisit.ccid,
        'result': this.echoVisit.result, // 意向
        'accompany': this.echoVisit.accompanyid,
        'begin': this.echoVisit.begin_time,
        'end': this.form.overTime,
        'remark': this.form.visitDetail,
        'end_result': this.form.visitResult,
        'status': 20 // 出访结束
      }
      if (!params.result || !params.end || !params.end_result || !params.remark) {
        this.$message({
          type: 'warning',
          message: '请填写必填项'
        })
        return
      }
      this.$post('/follow.do?VisitUpdate', params).then(res => {
        this.visitResultDialog = false
        this.search()
      })
    },
    updateMyVisitList (data) {
      this.myVisitList = data.data[0].data
    }
  },
  components: {
    AutoSelect, Page
  }
}
</script>
<style lang="less">
.visit-result-dialog{
    >.el-dialog{
      width:800px;
    }
  }
</style>
<style lang="less" scoped>
.visit-record {
  padding: 20px;
  .visit-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .visit-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
  .maxwidth{
    max-width: 500px;
  }
}
</style>

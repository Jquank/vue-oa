<template>
  <div class="follow-record component-container media-padding">
    <div class="follow-search mt-10px">
      <div class="follow-item">
        <!-- <el-button type="primary" @click.native="search">导入</el-button> -->
        <el-upload
          :action="'http://172.16.11.84:8080/BaiJieOA/ch.do?import&tk='+tk"
          :limit="1"
          :file-list="fileList"
          :show-file-list = "false"
          :on-success = "handleSuccess"
          >
          <el-button size="small" type="primary">导 入</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </div>
      <div class="follow-item">
        <el-button type="warning" @click.native="exportExcell">导出excel</el-button>
      </div>
      <div class="follow-item">
        <span class="tipfont" style="display:inline-block;padding-top:6px;">( 提示：1.初次使用请点击导出按钮，导出excel作为模板。2.填充客户信息时请务必按照表头正确填充。)</span>
      </div>
    </div>
    <div class="follow-search">
      <el-input v-model="cusName" class="follow-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">公司名称:</template>
      </el-input>
      <el-input v-model="phone" class="follow-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">联系电话:</template>
      </el-input>
      <el-input v-model="shangWu" class="follow-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">商务姓名:</template>
      </el-input>
      <auto-select :key="key_status" v-model="lastStatus" title="状态" class="follow-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option label="未标注" value="0"></el-option>
        <el-option label="未接通" value="10"></el-option>
        <el-option label="空错号" value="20"></el-option>
        <el-option label="继续跟进" value="30"></el-option>
        <el-option label="重点客户" value="40"></el-option>
        <el-option label="已签约" value="50"></el-option>
        <el-option label="已保A" value="60"></el-option>
      </auto-select>
      <el-date-picker v-model="subDate" type="datetimerange" format="yyyy/MM/dd HH:mm" value-format="yyyy/MM/dd HH:mm" range-separator="至" start-placeholder="提交开始日期" end-placeholder="提交结束日期" :unlink-panels="true" class="follow-item" style="width:300px;"></el-date-picker>
      <div class="follow-item">
        <el-button type="primary" @click.native="search">查 询</el-button>
        <el-button type="warning" @click.native="reset">重 置</el-button>
      </div>
      <div class="follow-item delete">
        <el-button @click.native="del" type="danger">删除</el-button>
      </div>
    </div>

    <el-table @selection-change="handleSelectionChange" stripe border :data="balckList" class="table-width" max-height="600">
      <el-table-column type="selection" width="40">
      </el-table-column>
      <el-table-column prop="bname" label="商务姓名">
      </el-table-column>
      <el-table-column prop="companyname" label="公司名称" min-width="110">
      </el-table-column>
      <el-table-column prop="contactname" label="联系人">
      </el-table-column>
      <el-table-column prop="" label="电话" width="120">
        <span slot-scope="scope">{{scope.row.telnum}}&nbsp;<i class="el-icon-phone" @click="call(scope.row.telnum)"></i></span>
      </el-table-column>
      <el-table-column prop="" label="最新状态" width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.latest_status" @change="changeStatus(scope.row, 'latest_status')">
            <el-option label="未标注" value="0"></el-option>
            <el-option label="未接通" value="10"></el-option>
            <el-option label="空错号" value="20"></el-option>
            <el-option label="继续跟进" value="30"></el-option>
            <el-option label="重点客户" value="40"></el-option>
            <el-option label="已签约" value="50"></el-option>
            <el-option label="已保A" value="60"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="" label="创建时间" width="90">
        <span slot-scope="scope">{{scope.row.createdtime | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="" label="修改时间" width="90">
        <span slot-scope="scope">{{scope.row.last_opt_time | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="" label="网站">
        <template slot-scope="scope">
          <a :href="(scope.row.site.indexOf('http')>-1?'':'http://')+scope.row.site" target="_blank" class="clicked">{{scope.row.site}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="" label="备注" width="220">
        <template slot-scope="scope">
          <div class="remark">
            <el-input style="width:150px;" v-model="scope.row.remark" type="textarea" :rows="2"></el-input>
            <el-button @click.native="saveRemark(scope.row, 'remark')" type="primary" class="xsbtn">保存</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="blackUrl" :sendParams="sendParams" @updateList="updateBackList"></page>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import Page from 'base/page/page'
import cookie from 'js-cookie'
export default {
  data () {
    return {
      tk: cookie.get('token'),
      fileList: [],
      phone: '',
      cusName: '',
      shangWu: '',
      subDate: [],
      lastStatus: '',
      key_status: '',
      status: '',
      remark: '',
      balckList: [],
      blackUrl: '/ch.do?GetCallList',
      sendParams: {},
      multipleSelection: []
    }
  },
  methods: {
    search () {
      this.sendParams = {
        'companyname': this.cusName,
        'bname': this.shangWu,
        'dateEnd': this.subDate[1],
        'dateStart': this.subDate[0],
        'telNum': this.phone,
        'latest_status': this.lastStatus
      }
    },
    reset () {
      this.cusName = ''
      this.shangWu = ''
      this.subDate = []
      this.phone = ''
      this.lastStatus = ''
      this.key_status = new Date() + ''
    },
    changeStatus (data, type) {
      this.saveRemark(data, type)
    },
    saveRemark (data, type) {
      if (type === 'remark' && !data.remark) {
        return
      }
      let params = {
        'id': data.id,
        'value': type === 'remark' ? data.remark : data.latest_status,
        'colums': type
      }
      this.$post('/ch.do?updateColums', params).then(res => {
        if (res.data.success) {
          this.search()
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    updateBackList (res) {
      this.balckList = res.data[0].data
    },
    del () {
      if (!this.multipleSelection.length) {
        this.$message({
          type: 'error',
          message: '请进行勾选'
        })
        return
      }
      let ids = []
      this.multipleSelection.forEach(val => {
        ids.push(val.id)
      })
      this.$confirm('确定删除吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/ch.do?delSeleted', {
            'uids': ids
          }).then(res => {
            if (res.data.success) {
              this.search()
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
    call (phone) {
      window.agentbar.makecall('', '', phone, '', '', '', '', '', 1)
    },
    exportExcell () {
      let params = {
        'companyname': this.cusName,
        'bname': this.shangWu,
        'dateEnd': this.subDate[1],
        'dateStart': this.subDate[0],
        'telNum': this.phone,
        'latest_status': this.lastStatus
      }
      this.$export('/ch.do?exportexcel', params)
    },
    handleSuccess (res, file, fileList) {
      if (res.success) {
        this.$message({
          type: 'success',
          message: '导入成功！'
        })
        this.fileList = []
      } else {
        this.$message({
          type: 'error',
          message: '导入失败！'
        })
        this.fileList = []
      }
    }

  },
  components: {
    Page,
    AutoSelect
  }
}
</script>

<style lang="less" scoped>
.follow-record {
  .follow-search {
    display: flex;
    flex-wrap: wrap;
    .follow-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
  .delete{
    flex-grow: 1;
    text-align: right;
    padding-right: 30px;
  }
  .remark{
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  .clicked{
    text-decoration: underline;
    text-decoration-color:dodgerblue;
  }
}
</style>

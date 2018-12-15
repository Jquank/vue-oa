<template>
  <div class="renew-dispatch component-container media-padding">
     <el-radio-group v-model="stateRadio" @change="search" class="ml10px">
      <el-radio-button label="DS">大搜</el-radio-button>
      <el-radio-button label="ZTC">直通车</el-radio-button>
    </el-radio-group>
    <div class="follow-search">
      <el-input v-model="comName" class="follow-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">公司名称:</template>
      </el-input>
      <div class="follow-item">
        <el-button type="primary" @click.native="search">查 询</el-button>
        <el-button type="warning" @click.native="reset">重 置</el-button>
      </div>
      <div class="follow-item export">
        <el-button type="warning"  @click.native="confirm('mutiple')">批量处理</el-button>
      </div>
    </div>
    <el-table  @selection-change="handleSelectionChange" stripe border :data="myFollowList" style="width: 100%;margin-top:10px;">
      <el-table-column type="selection" width="40">
      </el-table-column>
      <el-table-column prop="inserttime" label="日期" width="140">
        <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="username" label="客服">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
          <span>{{scope.row.true_name?'('+scope.row.true_name+')':''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="companyname" label="公司名称" min-width="150">
      </el-table-column>
      <el-table-column prop="proxy_id" label="SF账号">
      </el-table-column>
      <el-table-column prop="baidu_account" label="百度账号">
      </el-table-column>
      <el-table-column prop="addtype" label="续费类型">
        <span slot-scope="scope">{{scope.row.addtype+'' | renewState('addType')}}</span>
      </el-table-column>
      <el-table-column prop="stepName" label="审核状态" min-width="120" v-if="step!=150">
        <template slot-scope="scope">
          <el-button type="warning" plain class="xsbtn">{{scope.row.stepName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="85">
        <template slot-scope="scope">
          <el-button @click.native="confirm(scope.row)" type="success" class="xsbtn">确认转出</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="myFollowUrl" :sendParams="sendParams" @updateList="updateMyFollowList"></page>

  </div>
</template>

<script>
import Page from 'base/page/page'
const CHECK = 100
export default {
  props: {
    step: {
      type: Number,
      default: 130
    }
  },
  data () {
    return {
      stateRadio: 'DS',
      comName: '',

      myFollowList: [],
      myFollowUrl: '/Renew.do?renewlistcw',
      sendParams: {
        'check': CHECK,
        'pid': 'DS',
        'step': this.step
      },
      selectArr: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.selectArr = val.map(item => { return item.reid })
    },
    confirm (data) {
      let params = {
        'checkresult': 300,
        'step': this.step
      }
      if (data !== 'mutiple') {
        params.reid = data.reid
      } else {
        params.reidarray = this.selectArr
        if (!this.selectArr.length) {
          this.$message.warning('请进行勾选！')
          return
        }
      }
      this.$confirm('确定转出吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/Renew.do?checkrenew', params).then(res => {
            if (res.data.success) {
              this.search()
            }
          })
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },
    search () {
      this.sendParams = {
        'companyname': this.comName,
        'check': CHECK,
        'pid': this.stateRadio,
        'step': this.step
      }
    },
    reset () {
      this.comName = ''
    },
    updateMyFollowList (res) {
      this.myFollowList = res.data[0].data
    }
  },
  components: {
    Page
  }
}
</script>

<style lang="less" scoped>
.renew-dispatch {
  .follow-search {
    display: flex;
    flex-wrap: wrap;
    .follow-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 300px;
    }
  }
}
</style>

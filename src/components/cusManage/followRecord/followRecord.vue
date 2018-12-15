<template>
  <div class="follow-record component-container media-padding">
    <div class="follow-search">
      <el-input v-model="cusName" class="follow-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <el-date-picker v-model="followDate" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="跟进开始日期" end-placeholder="跟进结束日期" :unlink-panels="true"
      class="follow-item item-width"></el-date-picker>
      <div class="follow-item">
        <el-button type="primary" @click.native="search">查 询</el-button>
        <el-button type="warning" @click.native="reset">重 置</el-button>
      </div>
    </div>
    <el-table stripe border :data="myFollowList" class="table-width">
      <el-table-column prop="cname" label="客户名称">
      </el-table-column>
      <el-table-column prop="remark" label="跟进备注">
      </el-table-column>
      <el-table-column prop="" label="跟进日期">
        <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="uname" label="跟进人">
      </el-table-column>
    </el-table>
    <page class="page" :url="myFollowUrl" :sendParams="sendParams" @updateList="updateMyFollowList"></page>
  </div>
</template>

<script>
import Page from 'base/page/page'
export default {
  data () {
    return {
      cusName: '',
      followDate: [],

      myFollowList: [],
      myFollowUrl: '/follow.do?record',
      sendParams: {
        cat: 200
      }
    }
  },
  methods: {
    search () {
      this.sendParams = {
        companyname: this.cusName,
        cat: 200,
        begin_time: this.followDate[0],
        end_time: this.followDate[1]
      }
    },
    reset () {
      this.cusName = ''
      this.followDate = []
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
.follow-record {
  padding: 20px;
  .follow-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .follow-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 280px;
    }
  }
}
</style>

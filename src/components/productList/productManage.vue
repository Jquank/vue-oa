<template>
  <div class="news-manage component-container media-padding">
    <div class="news-content">
      <div>
        <el-button icon="el-icon-plus" type="primary" @click.native="addNews">新增</el-button>
        <el-button icon="el-icon-delete" type="danger" @click.native="delNews">删除</el-button>
      </div>
      <el-table  @selection-change="handleSelectionChange" border stripe :data="newsList" class="table-width">
        <el-table-column type="selection" width="45">
        </el-table-column>
        <el-table-column type="index" >
        </el-table-column>
        <el-table-column prop="title" label="公告标题" min-width="120">
        </el-table-column>
        <el-table-column label="类型">
          <span slot-scope="scope">{{scope.row.type===0?'消息通知':scope.row.type===10?'重要公告':'百捷大家庭'}}</span>
        </el-table-column>
        <el-table-column label="状态">
          <span slot-scope="scope">{{scope.row.newsstatus===0?'已发布':'草稿'}}</span>
        </el-table-column>
        <el-table-column prop="username" label="作者">
        </el-table-column>
        <el-table-column label="发布时间" width="150">
          <span slot-scope="scope">{{scope.row.opttime | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" class="xsbtn" @click.native="view(scope.row)">查看</el-button>
            <el-button type="warning" class="xsbtn" icon="fa fa-pencil" @click.native="edit(scope.row)"> 编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page class="page" :url="url" :sendParams="sendParams" @updateList="updateNewsList"></page>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Page from 'base/page/page'
export default {
  data () {
    return {
      newsList: [],
      url: '/User.do?DisplayInfo',
      sendParams: {},
      multipleSelection: []
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.query.data === 'fromDetail') {
      this.search()
    }
    next()
  },
  methods: {
    search () {
      this.sendParams = {}
    },
    addNews () {
      this.$router.push({
        path: 'productManage/add/123'
      })
    },
    delNews () {
      if (!this.multipleSelection.length) {
        this.$message.warning('请勾选！')
        return
      }
      let arr = this.multipleSelection.map(val => val.id)
      this.$post('/User.do?DeleteInfo', {'id': arr}).then(res => {
        this.$message.success('已删除！')
        this.search()
      })
    },
    edit (data) {
      this.$router.push({
        path: 'productManage/edit/456',
        query: {data: data}
      })
    },
    view (data) {
      this.$router.push({
        path: 'productManage/view/789',
        query: {data: data}
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    updateNewsList (res) {
      this.newsList = res.data[0].data
    }
  },
  components: { Page }
}
</script>

<style lang="less" scoped>
.news-manage {
  position: relative;
  // .news-content {
  // }
}
</style>

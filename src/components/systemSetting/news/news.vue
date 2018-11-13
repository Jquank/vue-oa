<template>
  <div class="news-manage component-container media-padding">
    <div class="news-content">
      <div>
        <el-button type="primary" @click="addNews">新增</el-button>
        <el-button type="primary">删除</el-button>
      </div>
      <el-table stripe :data="newsList" class="table-width">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" >
        </el-table-column>
        <el-table-column prop="title" label="公告标题" min-width="120">
        </el-table-column>
        <el-table-column label="类型" width="100">
          <span slot-scope="scope">{{scope.row.type===0?'消息通知':scope.row.type===10?'重要公告':'百捷大家庭'}}</span>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <span slot-scope="scope">{{scope.row.newsstatus===0?'已发布':'草稿'}}</span>
        </el-table-column>
        <el-table-column prop="username" label="作者" width="80">
        </el-table-column>
        <el-table-column label="发布时间" width="135">
          <span slot-scope="scope">{{scope.row.opttime | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="success" class="xsbtn" @click.native="edit(scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <page class="page" :url="url" @updateList="updateNewsList"></page>
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
      url: '/User.do?DisplayInfo'
    }
  },
  methods: {
    addNews () {
      this.$router.push({
        path: 'news/editor/add/123'
      })
    },
    edit (data) {
      console.log(data)
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
  .news-content {
  }
}
</style>

<template>
  <div class="news-manage">
    <div class="news-content">
      <el-row>
        <el-button type="primary" @click="addNews">新增</el-button>
        <el-button type="primary">删除</el-button>
      </el-row>
      <el-row style="margin-top:10px;">
        <el-table stripe :data="newsList" style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" width="100">
          </el-table-column>
          <el-table-column prop="title" label="公告标题">
          </el-table-column>
          <el-table-column label="类型" width="200">
            <span slot-scope="scope">{{scope.row.type===0?'消息通知':scope.row.type===10?'重要公告':'百捷大家庭'}}</span>
          </el-table-column>
          <el-table-column label="状态" width="200">
            <span slot-scope="scope">{{scope.row.newsstatus===0?'已发布':'草稿'}}</span>
          </el-table-column>
          <el-table-column prop="username" label="作者" width="200">
          </el-table-column>
          <el-table-column label="发布时间" width="200">
            <span slot-scope="scope">{{scope.row.opttime | timeFormat}}</span>
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click.native="edit(scope.row)">
                <i class="fa fa-edit"></i> 编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <page class="pagination" :url="url" @updateList="updateNewsList"></page>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { serverUrl } from 'api/config'
import Page from 'base/page/page'
export default {
  data () {
    return {
      newsList: [],
      url: serverUrl + '/User.do?DisplayInfo'
    }
  },
  methods: {
    addNews () {
      let num = 89757
      this.$router.push({
        path: `news/editor/${num}`
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
    position: relative;
    background: #fff;
    padding: 20px;
    .pagination {
      padding-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>

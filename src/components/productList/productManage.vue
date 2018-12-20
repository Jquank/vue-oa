<template>
  <div class="news-manage component-container media-padding">
    <div class="news-content">
      <div>
        <el-button icon="el-icon-plus" type="primary" @click.native="addNews">新增</el-button>
        <!-- <el-button icon="el-icon-delete" type="danger" @click.native="delNews">删除</el-button> -->
      </div>
      <el-table  @selection-change="handleSelectionChange" border stripe :data="newsList" class="table-width">
        <!-- <el-table-column type="selection" width="45">
        </el-table-column> -->
        <el-table-column type="index" width="45">
        </el-table-column>
        <el-table-column prop="title" label="文章名称" min-width="100">
        </el-table-column>
        <el-table-column label="类型">
          <span slot-scope="scope">{{scope.row.type===10?'产品全景':''}}</span>
        </el-table-column>
        <el-table-column label="发布时间" width="150">
          <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" class="xsbtn" @click.native="view(scope.row)">查看</el-button>
            <el-button type="warning" class="xsbtn" icon="fa fa-pencil" @click.native="edit(scope.row)"> 编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <page class="page" :url="url" :sendParams="sendParams" @updateList="updateNewsList"></page> -->
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
      // url: '/res.do?get',
      // sendParams: {
      //   type: 10
      // },
      multipleSelection: []
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.query.data === 'fromDetail') {
      this._getList()
    }
    next()
  },
  created() {
    this._getList()
  },
  methods: {
    _getList() {
      this.$post('/res.do?get', {type: 10}).then(res => {
        if (res.data.success) {
          this.newsList = res.data.data
        }
      })
    },
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
        path: `productManage/edit/${data.id}`,
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

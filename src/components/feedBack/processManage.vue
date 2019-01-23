<template>
  <div class="process-manage component-container media-padding">
    <div class="news-content">
      <div>
        <el-button icon="el-icon-plus" type="primary" @click.native="addNews">新增</el-button>
      </div>
      <el-table border stripe :data="newsList" class="table-width">
        <el-table-column type="index" width="45">
        </el-table-column>
        <el-table-column prop="title" label="文章名称" min-width="100">
        </el-table-column>
        <el-table-column label="发布时间">
          <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
        </el-table-column>
        <el-table-column prop="" label="操作" width="220" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="success" class="xsbtn" @click.native="viewNews(scope.row)">查看</el-button> -->
            <el-button type="warning" class="xsbtn" icon="fa fa-pencil" @click.native="editNews(scope.row)"> 编辑</el-button>
            <el-button type="danger" class="xsbtn" icon="fa fa-trash-o" @click.native="delNews(scope.row)"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
const TYPE = 30
const PAGE_ROUTER = 'processManage'
export default {
  data () {
    return {
      newsList: [],
      type: TYPE
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log(111)
    console.log(to.query.data)
    if (to.query.data === 'fromDetail') {
      this._getList()
    }
    next()
  },
  created() {
    this._getList()
  },
  methods: {
    addNews () {
      let queryParams = {
        id: undefined,
        type: TYPE,
        _status: 'manage_add'
      }
      this.$router.push({
        path: `${PAGE_ROUTER}/add`,
        query: {data: queryParams}
      })
    },
    delNews (data) {
      let params = {
        status: -1,
        id: data.id
      }
      this.$confirm('确定删除吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/res.do?delete', params).then(res => {
            if (res.data.success) {
              this.$message.success('已删除！')
              this._getList()
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
    editNews (data) {
      data._status = 'manage_edit'
      this.$router.push({
        path: `${PAGE_ROUTER}/edit`,
        query: {data: data}
      })
    },
    viewNews (data) {
      if (data.vtext.indexOf('<table') > -1 && data.vtext.indexOf('border="1"') < 0) {
        data.vtext = data.vtext.split('<table')[0] + '<table' + ' border="1" cellspacing="0" cellpadding="0"' + data.vtext.split('<table')[1]
      }
      this.$router.push({
        path: `${PAGE_ROUTER}/view`,
        query: {data: data}
      })
    },
    _getList() {
      this.$post('/res.do?get', {type: TYPE}).then(res => {
        if (res.data.success) {
          this.newsList = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.process-manage {
  position: relative;
}
</style>

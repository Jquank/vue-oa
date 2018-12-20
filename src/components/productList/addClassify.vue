<template>
  <div class="add-classify component-container media-padding">
    <div class="wrapper">
      <div class="tree">
        <div class="add-title mb10px">
          <h3 class="title">产品树结构</h3>
          <el-button @click.native="addArticleByNode" class="btn" icon="fa fa-plus" type="primary" size="mini">新增</el-button>
        </div>
        <el-tree
          :data="data"
          :highlight-current="true"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span class="add-del" :ref="'x'+node.id">
              <span @click="handleClick(node)" :ref="'y'+node.id" class="fa fa-caret-right">...</span>
              <template>
                <el-button type="text" size="mini" @click="() => append(data, node)" class="add">添加下级</el-button>
                <el-button type="text" size="mini" @click="() => edit(node, data)" class="edit">编辑</el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)" class="del">删除</el-button>
                <el-button class="fold-icon" @click="() => flod(node)" icon="fa fa-caret-left" size="mini" type="text"></el-button>
              </template>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="article-list">
        <div class="search-article">
          <el-input placeholder="搜索文章名称" v-model="articleName">
            <template slot="prepend">文章名称:</template>
          </el-input>
          <span>
            <el-button @click.native="search" type="primary">查 询</el-button>
          </span>
        </div>
        <div class="flex-table">
          <el-table :data="articleList" max-height="600" border class="mt10px">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="title" label="文章名称"></el-table-column>
            <el-table-column prop="type" label="类型">
              <template slot-scope="scope">
                <!-- <span>{{'http://172.16.11.85:8080' + '/#/indexPage/productManage/view/' + scope.row.id}}</span> -->
                <a :href="'http://172.16.11.85:8080' + '/#/indexPage/productManage/view/' + scope.row.id + '@=888'">123</a>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140" align="center">
              <template slot-scope="scope">
                <el-button @click.native="viewArticle(scope.row)" icon="fa fa-eye" type="success" class="xsbtn"></el-button>
                <el-button @click.native="editArticle(scope.row)" icon="fa fa-pencil" type="warning" class="xsbtn"></el-button>
                <el-button @click.native="delArticle(scope.row)" icon="fa fa-trash-o" type="danger" class="xsbtn"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { serverUrl } from 'api/http'
export default {
  data() {
    return {
      serverUrl: serverUrl,
      data: [],
      articleList: [],
      currentNode: {},
      articleName: ''
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.data === 'fromDetail') {
      this.search()
    }
    next()
  },
  created() {
    console.log(this.$route)
    // this._setTreeData()
    this._getTreeData()
  },
  methods: {
    _getArticleList(nodeId) {
      let params = {
        'type': 20,
        'cat': nodeId
      }
      this.$post('/res.do?get', params).then(res => {
        if (res.data.success) {
          this.articleList = res.data.data
        }
      })
    },
    _setTreeData(data) {
      let params = {
        data: this.data
      }
      this.$post('res.do?catSet', params).then(res => {})
    },
    _getTreeData() {
      this.$post('res.do?catGet').then(res => {
        if (res.data.success) {
          this.data = JSON.parse(res.data.data[0].data)
        }
      })
    },
    addArticleByNode() {
      if (!this.currentNode.id) {
        this.$message.warning('请点击选择树节点')
        return
      }
      this.$router.push({
        path: `productManage/add/${this.currentNode.id}`,
        query: { data: this.currentNode, type: 20 }
      })
    },
    viewArticle(data) {
      this.$router.push({
        path: `productManage/view/${data.id}`,
        query: { data: data }
      })
    },
    editArticle(data) {
      this.$router.push({
        path: `productManage/edit/${data.id}`,
        query: { data: data }
      })
    },
    delArticle(data) {
      this.$confirm('确定删除吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    append(data, node) {
      console.log(data)
      console.log(node.key)
      let currentId = node.key
      let newId = currentId + this._addZero(+(this._getMaxId(data)) + 1) // 获取递增新id
      const newChild = { id: newId, label: '新增的节点', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      this._setTreeData(data)
    },
    remove(node, data) {
      this.$confirm(`确定删除：${data.label}？`, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.id === data.id)
          children.splice(index, 1)
          this._setTreeData(this.data)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    edit(node, data) {
      console.log(node)
      console.log(data)
      this.$prompt('', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: data.label || ''
      })
        .then(({ value }) => {
          if (!value) {
            this.$message.warning('请输入名称！')
            return
          }
          data.label = value
          this._setTreeData(this.data)
          this.$message({
            type: 'success',
            message: '已修改'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    flod(node) {
      let span = this.$refs['x' + node.id]
      let replaceSpan = this.$refs['y' + node.id]
      span.style.width = '20px'
      replaceSpan.style.display = 'inline'
    },
    handleClick(node) {
      let span = this.$refs['x' + node.id]
      let replaceSpan = this.$refs['y' + node.id]
      span.style.width = '140px'
      replaceSpan.style.display = 'none'
    },
    handleNodeClick(data) {
      this._getArticleList(data.id)
      this.currentNode = data
    },
    _getMaxId(data) {
      if (data.children.length) {
        let idsArr = data.children.map(val => val.id.slice(val.id.length - 4)).sort()
        return idsArr[idsArr.length - 1]
      } else {
        return '0'
      }
    },
    _addZero(str) {
      switch ((str + '').length) {
        case 1:
          return '000' + str
        case 2:
          return '00' + str
        case 3:
          return '0' + str
        default:
          return '' + str
      }
    }
  },
  components: {}
}
</script>

<style lang="less">
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: rgb(182, 206, 230);
}
</style>

<style lang="less" scoped>
.add-classify {
  // position: relative;
  .add-title {
    display: flex;
    justify-content: space-between;
    .title {
      margin: 3px 0;
      padding-left: 20px;
      color: #e6a23c;
    }
    .btn {
      margin-right: 10px;
    }
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    .tree {
      flex: 0 0 390px;
      width: 360px;
      overflow: auto;
      // border: 1px solid #000;
      .custom-tree-node {
        display: flex;
        flex: 1;
        align-items: center;
        .add-del {
          display: inline-block;
          width: 20px;
          overflow: hidden;
          font-size: 14px;
          padding-left: 8px;
          .el-button + .el-button {
            margin-left: 3px;
          }
          .add {
            color: #67c23a;
          }
          .edit {
            color: #e6a23c;
          }
          .del {
            color: #f56c6c;
          }
          .fold-icon {
            font-size: 15px;
            width: 20px;
          }
        }
      }
    }
    .article-list {
      flex: 1;
      position: relative;
      margin-left: 20px;
      .search-article {
        width: 100%;
        text-align: center;
        .el-input {
          max-width: 320px;
        }
      }
      .flex-table {
        // flex布局下el-table宽度不能自适应
        position: absolute;
        width: 100%;
      }
    }
  }
}
</style>

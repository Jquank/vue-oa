<template>
  <div class="add-classify component-container media-padding">
    <div class="wrapper">
      <div class="tree">
        <div class="add-title mb10px">
          <h3 class="title">产品树结构</h3>
          <el-button @click.native="addArticleByNode" class="btn" icon="fa fa-plus" type="primary" size="mini">添加文章</el-button>
        </div>
        <div class="tree-content">
          <el-tree
            :data="data"
            :highlight-current="true"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node" @mouseenter="handleClick(node)" @mouseleave="flod(node)">
              <span>{{ node.label }}</span>
              <span class="add-del" :ref="'x'+node.id">
                <template>
                  <el-button type="text" size="mini" @click="() => append(data, node)" class="add">添加下级</el-button>
                  <el-button type="text" size="mini" @click="() => edit(node, data)" class="edit">编辑</el-button>
                  <el-button v-if="node.key!=='0001'" type="text" size="mini" @click="() => remove(node, data)" class="del">删除</el-button>
                </template>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
      <div class="article-list">
        <div class="search-article">
          <el-input placeholder="搜索文章名称" v-model="articleName">
            <template slot="prepend">文章名称:</template>
          </el-input>
          <span>
            <el-button @click.native="search" type="primary" icon="fa fa-search" size="mini"> 搜索</el-button>
          </span>
        </div>
        <div class="flex-table">
          <el-table :data="articleList" max-height="550" border class="mt10px">
            <el-table-column type="index" width="40"></el-table-column>
            <el-table-column prop="title" label="文章名称" min-width="80"></el-table-column>
            <el-table-column prop="id" label="链接" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.alink">
                  <el-button
                    :ref="'copybtn'+scope.$index"
                    slot="append"
                    @click.native="copyUrl(scope.row.alink,$event)"
                  >copy</el-button>
                </el-input>
                <!-- <a :href="scope.row.alink">123</a> -->
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
    <router-view></router-view>
  </div>
</template>

<script>
import { serverUrl } from 'api/http'
import Clipboard from 'clipboard'
const PAGE_ROUTER = 'processClassify'
const TYPE = 40
export default {
  data() {
    return {
      serverUrl: serverUrl,
      data: [],
      articleList: [],
      currentNode: {},
      articleName: '',
      clipboard: null
      // defaultExpanded: ['0001', '0002', '0003', '0004']
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.data === 'fromDetail') {
      this._getArticleList(to.query.queryParams.cat)
    }
    next()
  },
  created() {
    this._getTreeData()
  },
  methods: {
    copyUrl(url, e) {
      let that = this
      if (this.clipboard) {
        this.clipboard.destroy()
      }
      this.clipboard = new Clipboard(e.target, {
        text: () => url
      })
      this.clipboard.on('success', function(e) {
        that.$message.success('已复制')
        that.clipboard.off('error')
        that.clipboard.off('success')
        that.clipboard.destroy()
      })
      this.clipboard.on('error', function(e) {
        that.$message.success('复制失败 ')
        that.clipboard.off('error')
        that.clipboard.off('success')
        that.clipboard.destroy()
      })
      this.clipboard.onClick(e)
    },
    search() {
      this._getArticleList('', this.articleName.trim())
    },
    _getArticleList(nodeId, title) {
      let params = {
        type: TYPE,
        cat: nodeId,
        title: title
      }
      this.$post('/res.do?get', params).then(res => {
        if (res.data.success) {
          this.articleList = res.data.data
          this.articleList.forEach(val => {
            val.alink =
              `http://172.16.11.85:8080/#/indexPage/${PAGE_ROUTER}/view/${val.id}@20`
          })
        }
      })
    },
    _setTreeData(data) {
      let params = {
        type: TYPE,
        data: this.data
      }
      this.$post('res.do?catSet', params).then(res => {})
    },
    _getTreeData() {
      this.$post('res.do?catGet', { type: TYPE }).then(res => {
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
      let queryParams = {
        id: undefined,
        cat: this.currentNode.id,
        type: TYPE,
        _status: 'add'
      }
      console.log(queryParams)
      this.$router.push({
        path: `${PAGE_ROUTER}/add`,
        query: { data: queryParams }
      })
    },
    viewArticle(data) {
      this.$router.push({
        path: `${PAGE_ROUTER}/view/${data.id}`,
        query: { data: data }
      })
    },
    editArticle(data) {
      data._status = 'edit'
      this.$router.push({
        path: `${PAGE_ROUTER}/edit`,
        query: { data: data }
      })
    },
    delArticle(data) {
      this.$confirm('确定删除吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/res.do?delete', { id: data.id, status: -1 }).then(res => {
            if (res.data.success) {
              this._getArticleList(data.cat)
            }
          }
          )
        })
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
      let newId = currentId + this._addZero(+this._getMaxId(data) + 2) // 获取递增新id
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
      span.style.width = '0'
    },
    handleClick(node) {
      let span = this.$refs['x' + node.id]
      span.style.width = '130px'
    },
    handleNodeClick(data) {
      this._getArticleList(data.id)
      this.currentNode = data
    },
    _getMaxId(data) {
      if (data.children && data.children.length) {
        let idsArr = data.children
          .map(val => val.id.slice(val.id.length - 4))
          .sort()
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

.expanded.el-tree-node__expand-icon{
  color: #67c23a;
  font-size: 15px;
}
</style>

<style lang="less" scoped>
.add-classify {
  position: relative;
  .add-title {
    display: flex;
    justify-content: space-between;
    .title {
      margin: 3px 0;
      padding-left: 20px;
      color: #409EFF;
      font-weight: 700;
    }
    .btn {
      margin-right: 10px;
    }
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    .tree {
      flex: 0 0 360px;
      width: 360px;
      .tree-content {
        display: -webkit-box;
        max-height: 550px;
        overflow: auto;
        .custom-tree-node {
          display: flex;
          flex: 1;
          align-items: center;
          font-size: 14px;
          .add-del {
            display: inline-block;
            width: 0;
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

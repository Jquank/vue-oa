<template>
  <div class="add-classify component-container media-padding">
    <div class="wrapper">
      <div class="tree" ref="tree">
        <div class="add-title mb10px">
          <h3 class="title">产品查询</h3>
          <el-button v-if="permissions.indexOf('8m') > -1" @click.native="addArticleByNode" class="btn" icon="fa fa-plus" type="primary" size="mini">添加文章</el-button>
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
            <span
              slot-scope="{ node, data }"
              class="custom-tree-node"
              @mouseenter="handleClick(node)"
              @mouseleave="flod(node)"
            >
              <span>{{ node.label }}</span>
              <span class="add-del" :ref="'x'+node.id">
                <template v-if="permissions.indexOf('8m') > -1">
                  <el-button type="text" size="mini" @click="() => append(data, node)" class="add">添加</el-button>
                  <el-button type="text" size="mini" @click="() => edit(node, data)" class="edit">编辑</el-button>
                  <el-button
                    v-if="node.key!=='0001'"
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)"
                    class="del"
                  >删除</el-button>
                </template>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
      <div class="drag-tree" draggable="true" @dragstart="dragstart" @drag="drag"></div>
      <div class="article-list">
        <div class="search-article">
          <el-input placeholder="搜索文章名称" v-model="articleName">
            <template slot="prepend">文章名称:</template>
          </el-input>
          <span>
            <el-button @click.native="search" type="primary" icon="fa fa-search" size="mini">搜索</el-button>
          </span>
        </div>
        <div class="flex-table">
          <el-row :gutter="20">
            <el-col :xl="12" class="mt10px">
              <div class="pro-title">产品资料</div>
              <el-table :data="articleList21" max-height="550" border class="mt10px">
                <el-table-column type="index" width="40"></el-table-column>
                <el-table-column prop="insert_time" label="发布时间" width="150">
                  <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
                </el-table-column>
                <el-table-column prop="title" label="文章名称" min-width="80">
                  <span slot-scope="scope" @click="viewArticle(scope.row)" class="clikc-title">{{scope.row.title}}</span>
                </el-table-column>
                <template v-if="permissions.indexOf('8m') > -1">
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
                <el-table-column label="操作" width="110" align="center">
                  <template slot-scope="scope">
                      <el-button @click.native="editArticle(scope.row)" icon="fa fa-pencil" type="warning" class="xsbtn"></el-button>
                    <el-button @click.native="delArticle(scope.row)" icon="fa fa-trash-o" type="danger" class="xsbtn"></el-button>
                  </template>
                </el-table-column>
                </template>
              </el-table>
            </el-col>
            <el-col :xl="12" class="mt10px">
              <div class="pro-title">产品Q&A</div>
              <el-table :data="articleList22" max-height="550" border class="mt10px">
                <el-table-column type="index" width="40"></el-table-column>
                <el-table-column prop="insert_time" label="发布时间" width="150">
                  <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
                </el-table-column>
                <el-table-column prop="title" label="文章名称" min-width="80">
                  <span slot-scope="scope" @click="viewArticle(scope.row)" class="clikc-title">{{scope.row.title}}</span>
                </el-table-column>
                <template v-if="permissions.indexOf('8m') > -1">
                 <el-table-column prop="id" label="链接" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.alink">
                      <el-button
                        :ref="'copybtn'+scope.$index"
                        slot="append"
                        @click.native="copyUrl(scope.row.alink,$event)"
                      >copy</el-button>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="140" align="center">
                  <template slot-scope="scope">
                      <el-button @click.native="editArticle(scope.row)" icon="fa fa-pencil" type="warning" class="xsbtn"></el-button>
                      <el-button @click.native="delArticle(scope.row)" icon="fa fa-trash-o" type="danger" class="xsbtn"></el-button>
                  </template>
                </el-table-column>
                </template>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import Clipboard from 'clipboard'
const PAGE_ROUTER = 'addClassify'
const TYPE = 20
const TYPE_ZL = 21
const TYPE_QA = 22
export default {
  data() {
    return {
      permissions: cookie.getJSON('permissions'),
      jumpBaseUrl: '',
      data: [],
      articleList21: [],
      articleList22: [],
      currentNode: {},
      articleName: '',
      clipboard: null
      // defaultExpanded: ['0001', '0002', '0003', '0004']
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.data === 'fromDetail') {
      this._getArticleList(to.query.queryParams.cat, '', to.query.queryParams.type)
    }
    next()
  },
  created() {
    this._getTreeData()
    this.jumpBaseUrl = window.location.href
    if (this.jumpBaseUrl.indexOf('?menu=no') > -1) {
      this.jumpBaseUrl = this.jumpBaseUrl.split('?menu=no')[0].toString()
    }
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
      this._getArticleList('', this.articleName.trim(), TYPE_ZL)
      this._getArticleList('', this.articleName.trim(), TYPE_QA)
    },
    _getArticleList(nodeId, title, type) {
      let params = {
        type: type,
        cat: nodeId,
        title: title
      }
      this.$post('/res.do?get', params).then(res => {
        if (res.data.success) {
          this['articleList' + type] = res.data.data
          this['articleList' + type].forEach(val => {
            val.alink = `${this.jumpBaseUrl}/view/${val.id}@${type}`
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
        _mark: 'addClassify',
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
      data._mark = 'addClassify'
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
          this.$post('/res.do?delete', { id: data.id, status: -1 }).then(
            res => {
              if (res.data.success) {
                this._getArticleList(data.cat, '', TYPE_ZL)
                this._getArticleList(data.cat, '', TYPE_QA)
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
      span.style.zIndex = '1000'
    },
    handleNodeClick(data) {
      this._getArticleList(data.id, '', TYPE_ZL)
      this._getArticleList(data.id, '', TYPE_QA)
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
    },
    dragstart(e) {
      this.startClientX = e.clientX
      this.startTreeWidth = this.$refs.tree.clientWidth
    },
    drag(e) {
      this.endClientX = e.clientX
      this.dragX = this.endClientX - this.startClientX
      let width = this.startTreeWidth + this.dragX + 'px'
      this.$refs.tree.style.flex = `0 0 ${width}`
    }
  },
  components: {}
}
</script>

<style lang="less">
.add-classify {
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: rgb(182, 206, 230);
  }

  .expanded.el-tree-node__expand-icon {
    // color: #67c23a;
    font-size: 15px;
  }
}
</style>

<style lang="less" scoped>
@max-height: 600px;
.add-classify {
  position: relative;
  .add-title {
    display: flex;
    justify-content: space-between;
    height: 32px;
    .title {
      margin: 3px 0;
      padding-left: 20px;
      color: #409eff;
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
        max-height: @max-height;
        overflow: auto;
        background: #EBEEF5;
        .el-tree{
          background: #EBEEF5;
          width: 100%;
        }
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
            z-index: 10000;
            .el-button + .el-button {
              margin-left: 2px;
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
    .drag-tree{
      max-height: @max-height;
      margin-top: 42px;
      border: 3px solid #EBEEF5;
      cursor: e-resize;
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
        .pro-title{
          font-size: 15px;
          font-weight: 600;
          text-align: center;
          color: #409eff;
        }
        .clikc-title{
          cursor: pointer;
        }
      }
    }
  }
}
</style>

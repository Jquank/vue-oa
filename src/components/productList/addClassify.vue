<template>
  <div class="add-classify component-container media-padding">
    <div class="wrapper">
      <div class="tree" ref="tree">
        <div class="add-title mb10px">
          <h3 class="title">产品查询</h3>
          <el-button v-if="permissions.indexOf('8m') > -1" @click.native="addArticleByNode" class="btn" icon="fa fa-plus" type="primary" size="mini">添加文章</el-button>
        </div>
        <div class="tree-content" ref="treeContent">
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
              @mouseenter.stop="handleClick(node)"
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
        <product-list v-if="getProductListData._status==='list'" :articleList21="articleList21"  :articleList22="articleList22" :tableMaxHeight="tableMaxHeight/2" @refresh="refreshList"></product-list>
        <view-product v-if="getProductListData._status==='view'" :data="getProductListData"></view-product>
      </div>
      <div class="text-editor" v-if="getProductListData._status==='edit'">
        <text-editor :data="getProductListData"></text-editor>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import ProductList from './productList'
import ViewProduct from './viewProduct'
import TextEditor from 'components/textEditor/textEditor'
import { mapGetters, mapMutations } from 'vuex'
// const PAGE_ROUTER = 'addClassify'
const TYPE = 20
const TYPE_ZL = 21
const TYPE_QA = 22
export default {
  computed: {
    ...mapGetters([
      'getProductListData'
    ])
  },
  data() {
    return {
      permissions: cookie.getJSON('permissions'),
      data: [],
      articleList21: [],
      articleList22: [],
      currentNode: {},
      articleName: '',
      clipboard: null,
      tableMaxHeight: 550
      // defaultExpanded: ['0001', '0002', '0003', '0004']
    }
  },
  watch: {
    getProductListData(newVal) {
      if (newVal._mark === 'sub') {
        console.log(newVal)
        this._getArticleList(newVal.cat, '', newVal.type)
      }
    }
  },
  created() {
    this._getJumpBaseUrl(window.location.href)
    this._getTreeData()
  },
  mounted() {
    this.tableMaxHeight = this.$refs.treeContent.clientHeight
  },
  methods: {
    // 节点拖拽
    // handleDrop(draggingNode, dropNode, dropType, ev) {
    //   console.log(draggingNode)
    //   console.log(dropNode)
    //   console.log(dropType)
    //   let dragingId = draggingNode.key
    //   let dropId = dropNode.key
    //   // let newId = dragingId + this._addZero(+this._getMaxId(draggingNode.data) + 1)
    //   let newId = ''
    //   if (dropType === 'inner') {
    //     newId = dropId + this._addZero(+this._getMaxId(dropNode.data) + 1)
    //     console.log(newId)
    //   }
    //   let params = {
    //     type: TYPE,
    //     data: this.data,
    //     newId: newId,
    //     oldId: dragingId
    //   }
    //   console.log(params)
    //   return
    //   this.$post('res.do?catSet', params).then(res => {})
    // },
    _getJumpBaseUrl(url) {
      let index = url.lastIndexOf('/')
      this.jumpBaseUrl = url.substr(0, index)
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
            val.alink = `${this.jumpBaseUrl}/productShow/view/${val.id}@${type}`
          })
        }
      })
    },
    refreshList(data) {
      this._getArticleList(data.cat, data.title, data.type)
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
        _mark: 'add',
        _status: 'edit'
      }
      this.setProductListData(queryParams)
      this._getArticleList(this.currentNode.id, '', TYPE_ZL)
      this._getArticleList(this.currentNode.id, '', TYPE_QA)
    },
    append(data, node) {
      console.log(node)
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
      data._status = 'list'
      this.setProductListData(data)
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
    },
    ...mapMutations({
      setProductListData: 'GET_PRODUCTLIST_DATA'
    })
  },
  components: {ProductList, ViewProduct, TextEditor}
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
@max-height: calc(~"(100vh - 232px)");
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
      flex: 0 0 300px;
      width: 300px;
      .tree-content {
        display: -webkit-box;
        height: @max-height;
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
      height: @max-height;
      margin-top: 42px;
      border: 3px solid #EBEEF5;
      box-sizing: border-box;
      cursor: e-resize;
    }
    .article-list {
      flex: 1;
      position: relative;
      margin-left: 20px;
      overflow: auto;
      &::after{
        display: block;
      }
    }
  }
  .text-editor{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
  }
}
</style>

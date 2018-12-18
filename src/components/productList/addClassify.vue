<template>
  <div class="add-classify component-container media-padding">
    <div class="wrapper">
      <el-tree
        class="tree"
        :data="data5"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">
        <span slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span class="add-del">
            <el-button type="text" size="mini" @click="() => append(data)" class="add">添加下级</el-button>
            <el-button type="text" size="mini" @click="() => appendContent(data)" class="add">添加内容</el-button>
            <el-button type="text" size="mini" @click="() => edit(node, data)" class="edit">编辑</el-button>
            <el-button type="text" size="mini" @click="() => remove(node, data)" class="del">删除</el-button>
          </span>
        </span>
      </el-tree>
      <div class="article-list">
        <el-table :data="articleList" max-height="500">
          <el-table-column type="selection"></el-table-column>
          <el-table-column property="name" label="文章名"></el-table-column>
          <el-table-column property="type" label="类型" width="100"></el-table-column>
          <el-table-column property="username" label="发布人" width="100"></el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 选择文章弹窗 -->
    <el-dialog title="选择文章" :visible.sync="selArticleDialog" width="650px">
      <el-table :data="articleList" max-height="500">
        <el-table-column type="index"></el-table-column>
        <el-table-column property="name" label="文章名"></el-table-column>
        <el-table-column property="type" label="类型" width="100"></el-table-column>
        <el-table-column property="username" label="发布人" width="100"></el-table-column>
      </el-table>
      <!-- <page class="pagination" :url="comDialog.url" :sendParams="comDialog.params" @updateList="updateMyCompanyList" :key="comDialog.key">
      </page> -->
      <div class="text-center">
        <el-button type="success" class="mt10px" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
let id = 1000
export default {
  data () {
    const data = [
      {
        id: 1,
        label: '百度商业产品资源全景图',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '百度pc资源位',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '百度移动端资源位',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }, {
        id: 4,
        label: '百度聚屏资源位',
        children: [{
          id: 9,
          label: '二级 3-1'
        }, {
          id: 10,
          label: '二级 3-2'
        }]
      }
    ]
    return {
      data5: JSON.parse(JSON.stringify(data)),
      selArticleDialog: false,
      articleList: []
    }
  },
  methods: {
    append(data) {
      console.log(data)
      const newChild = { id: id++, label: '新增', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    appendContent(data) {
      this.selArticleDialog = true
    },
    remove(node, data) {
      console.log(node)
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    edit(node, data) {
      console.log(node)
      console.log(data)
      this.$prompt('', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: data.label || ''
      }).then(({ value }) => {
        if (!value) {
          this.$message.warning('请输入名称！')
          return
        }
        data.label = value
        this.$message({
          type: 'success',
          message: '已修改'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.add-classify{
  .wrapper{
    display: flex;
    .tree{
      flex: 0 0 300px;
      // overflow: auto;
      // border: 1px solid #000;
    }
    .article-list{
      flex: 1;
      margin-left: 15px;
    }
  }
  .add-del {
  font-size: 14px;
  padding-left: 8px;
  .add{
    color: #67C23A;
  }
  .edit{
    color: #E6A23C;
  }
  .del{
    color: #F56C6C;
  }
}
}
</style>

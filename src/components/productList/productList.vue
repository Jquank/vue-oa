<template>
  <div class="pro-list">
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
          <el-table :data="articleList21" :max-height="tableMaxHeight-36+''" border class="mt10px">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="title" label="文章名称" min-width="100">
              <span slot-scope="scope" @click="viewArticle(scope.row)" class="clikc-title">{{scope.row.title}}</span>
            </el-table-column>
            <el-table-column prop="insert_time" label="发布时间" width="150">
              <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
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
          <el-table :data="articleList22" :max-height="tableMaxHeight-36+''" border class="mt10px">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="title" label="文章名称" min-width="100">
              <span slot-scope="scope" @click="viewArticle(scope.row)" class="clikc-title">{{scope.row.title}}</span>
            </el-table-column>
            <el-table-column prop="insert_time" label="发布时间" width="150">
              <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
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
              <el-table-column label="操作" width="110" align="center">
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
</template>

<script>
import cookie from 'js-cookie'
import Clipboard from 'clipboard'
import { mapGetters, mapMutations } from 'vuex'
// const PAGE_ROUTER = 'addClassify'
// const TYPE = 20
const TYPE_ZL = 21
const TYPE_QA = 22
export default {
  props: {
    articleList21: {
      type: Array,
      default: function() {
        return []
      }
    },
    articleList22: {
      type: Array,
      default: function() {
        return []
      }
    },
    tableMaxHeight: {
      type: Number,
      default: 550
    }
  },
  computed: {
    articleList_21: {
      get () {
        return this.articleList21
      },
      set() {

      }
    },
    articleList_22: {
      get () {
        return this.articleList21
      },
      set() {

      }
    },
    ...mapGetters(['getProductListData'])
  },
  data() {
    return {
      permissions: cookie.getJSON('permissions'),
      articleName: ''
    }
  },
  created() {
    this._getJumpBaseUrl(window.location.href)
  },
  mounted() {

  },
  methods: {
    search() {
      let data1 = {
        title: this.articleName.trim(),
        type: TYPE_ZL
      }
      let data2 = {
        title: this.articleName.trim(),
        type: TYPE_QA
      }
      this.$emit('refresh', data1)
      this.$emit('refresh', data2)
    },
    viewArticle(data) {
      data._status = 'view'
      this.setProductListData(data)
    },
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
    editArticle(data) {
      data._status = 'edit'
      data._mark = 'edit'
      this.setProductListData(data)
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
                let obj = {
                  cat: data.cat,
                  type: data.type
                }
                this.$emit('refresh', obj)
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
    _getJumpBaseUrl(url) {
      let index = url.lastIndexOf('/')
      this.jumpBaseUrl = url.substr(0, index)
    },
    ...mapMutations({
      setProductListData: 'GET_PRODUCTLIST_DATA'
    })
  },
  components: {}
}
</script>

<style scoped lang="less">
.pro-list {
  .search-article {
    width: 100%;
    text-align: center;
    .el-input {
      max-width: 320px;
    }
  }
  .flex-table {
    // flex布局下el-table宽度不能自适应
    position: relative;
    width: 100%;
    .pro-title {
      font-size: 15px;
      font-weight: 600;
      text-align: center;
      color: #409eff;
    }
    .clikc-title {
      cursor: pointer;
    }
    &>.el-row {
      margin: 0 !important;
    }
  }
}
</style>

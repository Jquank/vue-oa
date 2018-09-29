// 分页组件：
// 用法：<page @updateList="updateList" :url="url" :sendParams="sendParams" class="page"></page>
// 接受数据：
//   updateList (data, load) {
//     if (!load) {
//       this.tableData = data.data.list
//     }
//   }
<template>
 <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,30,50,100]"
      :page-size="10"
      :layout="layout"
      :total="pageCount">
    </el-pagination>
  </div>
</template>

<script>
import { $post } from '@/api/http'
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    sendParams: {
      type: Object,
      default: function () {
        return {}
      }
    },
    simpleLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  watch: {
    // sendParams: {
    //   handler () {
    //     console.log(333)
    //     this._getFirstList()
    //   },
    //   deep: true
    // }
    sendParams () {
      this._getFirstList()
    }

  },
  data () {
    return {
      currentPage: 1,
      handleList: [],
      pageCount: 0,
      pageval: 10,
      isLoading: true,
      layout: this.simpleLayout
    }
  },
  created () {
    let width = document.documentElement.clientWidth
    if (width < 768) {
      this.layout = 'total, prev, next, jumper'
    }
    this._getFirstList()
  },
  methods: {
    // 获取列表的第一页
    _getFirstList () {
      let params = Object.assign({}, {
        pagesize: 10,
        currentpage: 1
      }, this.sendParams)

      $post(this.url, params)
        .then(res => {
          if (res.data[0].success) {
            try {
              this.pageCount = res.data[1].data.pagecount
            } catch (e) {
              this.pageCount = 0
            }
            this.handleList = res
            this._updateList()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // page-size改变的回调，默认为10
    handleSizeChange (val) {
      this.pageval = val
      let params = Object.assign({}, {
        pagesize: this.pageval,
        currentpage: 1
      }, this.sendParams)
      $post(this.url, params)
        .then(res => {
          if (res.data[0].success) {
            this.handleList = res
            this._updateList()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 当前页改变的回调
    handleCurrentChange (page) {
      if (!this.pageval) {
        this.pageval = 10
      }
      let params = Object.assign({}, {
        pagesize: this.pageval,
        currentpage: page
      }, this.sendParams)
      $post(this.url, params)
        .then(res => {
          if (res.data[0].success) {
            this.handleList = res
            this._updateList()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 触发自定义事件
    _updateList () {
      this.$emit('updateList', this.handleList)
    }
  }
}
</script>

<style>
</style>

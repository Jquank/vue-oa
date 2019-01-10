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
      :key="key"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,30,50,100,500]"
      :page-size="pageval"
      :layout="layout"
      :total="pageCount"
    ></el-pagination>
  </div>
</template>

<script>
import { appMark } from 'common/js/utils'
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    sendParams: {
      type: Object,
      default: function() {
        return {}
      }
    },
    otherParams: {
      type: Object,
      default: function() {
        return {}
      }
    },
    cols: {
      type: Array,
      default: function() {
        return []
      }
    },
    simpleLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    defaultSearch: {
      type: Boolean,
      default: true
    },
    isRememberStatus: { // 是否记住分页状态，默认为true，为false时解决tab切换currentPage未置为1的问题
      type: Boolean,
      default: true
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
    sendParams() {
      this.key = new Date() + '' // 修复搜索时当前页未改变为1的bug
      if (!this.isRememberStatus) {
        this.currentPage = 1
      }
      this._getFirstList()
    },
    otherParams() {
      this._getFirstList()
    }
  },
  data() {
    return {
      key: '',
      currentPage: 1,
      handleList: [],
      pageCount: 0,
      pageval: 10,
      isLoading: true,
      layout: this.simpleLayout
    }
  },
  created() {
    if (appMark()) {
      this.layout = 'total, prev, next, jumper'
    }
    this._getFirstList()
  },
  methods: {
    // 获取列表的第一页
    _getFirstList() {
      if (!this.defaultSearch) {
        return
      }
      let params = Object.assign(
        {},
        {
          pagesize: this.pageval,
          currentpage: this.currentPage
        },
        this.sendParams,
        this.otherParams
      )

      this.$post(this.url, params)
        .then(res => {
          if (res.data.success) {
            // 万能报表的分页
            this.pageCount = res.data.data.page_count
            this.handleList = res
            this._updateList()
          } else if (res.data[0].success) {
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
    handleSizeChange(val) {
      this.pageval = val

      if (this.url === '/rpt.do?get') {
        // 万能报表
        if (!this.otherParams.rpt_data) {
          this.otherParams.rpt_data = {}
        }
        this.otherParams.rpt_data.pageno = this.currentPage
        this.otherParams.rpt_data.pagenum = this.pageval
        this.otherParams.rpt_data.columns = this.cols
      }
      let params = Object.assign(
        {},
        {
          pagesize: this.pageval,
          currentpage: this.currentPage
        },
        this.sendParams,
        this.otherParams
      )
      this.$post(this.url, params)
        .then(res => {
          if (res.data.success || res.data[0].success) {
            // 前面表示万能报表
            this.handleList = res
            this._updateList()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 当前页改变的回调
    handleCurrentChange(page) {
      this.currentPage = page
      if (!this.pageval) {
        this.pageval = 10
      }

      if (this.url === '/rpt.do?get') {
        // 万能报表
        if (!this.otherParams.rpt_data) {
          this.otherParams.rpt_data = {}
        }
        this.otherParams.rpt_data.pageno = page
        this.otherParams.rpt_data.pagenum = this.pageval
        this.otherParams.rpt_data.columns = this.cols
      }
      let params = Object.assign(
        {},
        {
          pagesize: this.pageval,
          currentpage: this.currentPage
        },
        this.sendParams,
        this.otherParams
      )
      this.$post(this.url, params)
        .then(res => {
          if (res.data.success || res.data[0].success) {
            // 前面表示万能报表
            this.handleList = res
            this._updateList()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 触发自定义事件
    _updateList() {
      this.$emit('updateList', this.handleList)
    }
  }
}
</script>

<style>
</style>

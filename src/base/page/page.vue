<template>
 <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,30,50,100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
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
    sendparams: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  watch: {
    sendparams () {
      this._getFirstList()
    }
  },
  data () {
    return {
      currentPage: 1,
      handleList: [],
      pageCount: 0,
      pageval: 10,
      isLoading: true
    }
  },
  created () {
    this._getFirstList()
  },
  methods: {
    // page-size改变的回调，默认为10
    handleSizeChange (val) {
      this.isLoading = true
      this._updateList() // 派发loading状态

      this.pageval = val
      let params = Object.assign({}, {
        pageSize: this.pageval,
        pageNum: 1
      }, this.sendparams)
      $post(this.url, params)
        .then(res => {
          if (res.data.status === 1) {
            this.handleList = res
            this.isLoading = false
            this._updateList() // this.isLoading为false时，this.handleList才有值
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 当前页改变的回调
    handleCurrentChange (page) {
      this.isLoading = true
      this._updateList()

      if (!this.pageval) {
        this.pageval = 10
      }
      let params = Object.assign({}, {
        pageSize: this.pageval,
        pageNum: page
      }, this.sendparams)
      $post(this.url, params)
        .then(res => {
          if (res.data.status === 1) {
            this.handleList = res
            this.isLoading = false
            this._updateList()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取列表的第一页
    _getFirstList () {
      this.isLoading = true
      this._updateList()

      let params = Object.assign({}, {
        pageSize: 10,
        pageNum: 1
      }, this.sendparams)

      $post(this.url, params)
        .then(res => {
          if (res.data.status === 1) {
            try {
              this.pageCount = res.data.data.total
            } catch (e) {
              this.pageCount = 0
            }
            this.handleList = res
            console.log(res)
            this.isLoading = false
            this._updateList()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 触发自定义事件
    _updateList () {
      this.$emit('updateList', this.handleList, this.isLoading)
    }
  }
}
</script>

<style>
</style>

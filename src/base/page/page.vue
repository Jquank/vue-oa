<template>
 <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,20,30,40]"
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
  data () {
    return {
      currentPage: 1,
      handleList: [],
      pageCount: 0,
      pageval: 10
    }
  },
  created () {
    this._getFirstList()
  },
  methods: {
    // page-size改变的回调，默认为10
    handleSizeChange (val) {
      this.pageval = val
      let params = Object.assign({}, {
        pagesize: this.pageval,
        currentpage: 1
      }, this.sendparams)
      $post(this.url, params)
        .then(res => {
          let res0 = res.data[0].data
          this.handleList = res0
          this._updateList()
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
      }, this.sendparams)
      $post(this.url, params)
        .then(res => {
          let res0 = res.data[0].data
          this.handleList = res0
          this._updateList()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取列表的第一页
    _getFirstList () {
      let params = Object.assign({}, {
        pagesize: 10,
        currentpage: 1
      }, this.sendparams)

      $post(this.url, params)
        .then(res => {
          let res0 = res.data[0].data
          let res1 = res.data[1].data
          this.handleList = res0
          this.pageCount = res1.pagecount
          this._updateList()
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

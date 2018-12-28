<template>
  <div class="view-product child-component-container media-padding">
    <h2 class="text-center">{{v.title}}</h2>
    <div class="text-center author">
      <span><b>发布时间：</b>{{v.insert_time | timeFormat}}</span>
      <span><b>浏览次数：</b>{{count}}</span>
      <div>
        <el-button type="primary" @click.native="$router.go(-1)" class="xsbtn">返回</el-button>
      </div>
    </div>
    <div class="article mt10px">
      <div v-html="v.vtext"></div>
    </div>
    <div v-show="v.img">
      <download-enclosure :data="v"></download-enclosure>
    </div>
  </div>
</template>

<script>
import DownloadEnclosure from 'base/downloadEnclosure/downloadEnclosure'
export default {
  data () {
    return {
      v: {},
      count: 0
    }
  },
  created () {
    let href = window.location.href
    let type = href.split('@')[1]
    if (type) {
      let arr = href.split('@')[0].split('/')
      let id = arr[arr.length - 1]
      this._getList(type, id)
      return
    }
    this.v = this.$route.query.data
    if (!this.v.id) {
      this.$router.go(-1)
    }
    this._getCount(this.v)
  },
  methods: {
    _getList(type, id) {
      this.$post('/res.do?get', {type: type, id: id}).then(res => {
        if (res.data.success) {
          this.v = res.data.data[0]
        }
      })
    },
    _getCount(data) {
      this.$post('/res.do?get', {id: data.id, type: data.type}).then(res => {
        if (res.data.success) {
          this.count = res.data.data[0].view_times
        }
      })
    }
  },
  components: {
    DownloadEnclosure
  }
}
</script>

<style lang="less" scoped>
  .view-product{
    .author{
      display: flex;
      justify-content: center;
      font-size: 14px;
      line-height: 24px;
      span{
        margin-right: 15px;
      }
      div{
        display: inline-block;
        vertical-align: middle;
      }
    }
    .article{
      display: flex;
      justify-content: center;
      div{
        max-width: 100%;
        // max-height: 600px;
        overflow: auto;
        // border: 1px solid #000;
      }
    }
  }
</style>

<template>
  <div class="view-process">
    <h2 class="text-center title">{{v.title}}</h2>
    <div v-show="v.img">
      <download-enclosure :data="v"></download-enclosure>
    </div>
    <div class="text-center author mt10px">
      <span><b>发布时间：</b>{{v.insert_time | timeFormat}}</span>
      <span><b>浏览次数：</b>{{count}}</span>
      <!-- <div>
        <el-button type="primary" @click.native="back" class="xsbtn">返回</el-button>
      </div> -->
    </div>
    <div class="article">
      <div v-html="v.vtext"></div>
    </div>
  </div>
</template>

<script>
import DownloadEnclosure from 'base/downloadEnclosure/downloadEnclosure'
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      v: {},
      count: 0
    }
  },
  created () {
    let result = this._getIdFromUrl(window.location.href)
    console.log(result)
    if (result) {
      let params = {
        id: result.id,
        type: result.type
      }
      this.$post('/res.do?get', params).then(res => {
        if (res.data.success) {
          this.v = res.data.data[0]
          if (this.v.type) {
            this._getCount(this.v)
          }
        }
      })
    } else {
      console.log(this.data)
      this.v = this.data
      if (this.v.type) {
        this._getCount(this.v)
      }
    }
  },
  methods: {
    _getCount(data) {
      this.$post('/res.do?get', {id: data.id, type: data.type}).then(res => {
        if (res.data.success) {
          this.count = res.data.data[0].view_times
        }
      })
    },
    _getIdFromUrl(url) {
      let bool = url.indexOf('@') > -1
      if (!bool) {
        return false
      }
      let index = url.lastIndexOf('/') + 1
      let idAndType = url.substr(index).split('@')
      return {
        id: idAndType[0],
        type: idAndType[1]
      }
    }
  },
  components: {
    DownloadEnclosure
  }
}
</script>

<style lang="less" scoped>
  .view-process{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 500;
    width: 100%;
    // max-height: calc(~"(100vh - 190px)");
    height: 100%;
    overflow: auto;
    background: white;
    .title{
      margin: 10px 0;
    }
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
        max-width: 99%;
        padding-bottom: 10px;
      }
    }
  }
</style>

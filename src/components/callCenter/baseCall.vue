<template>
  <div class="base-call">
    <div id="iframe-div">
      <iframe ref="iframecall" class="call-iframe" :src="resUrl" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    iframeUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      url: '/bdurl.do?jump',
      resUrl: ''
    }
  },
  created () {

  },
  mounted () {
    this.$post(this.url, {'url': this.iframeUrl}).then(res => {
      if (res.data.success) {
        this.resUrl = res.data.data
      }
    })
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  .base-call{
    #iframe-div{
      height: calc(~"(100vh - 160px)");
    }
    .call-iframe{
      width: 100%;
      min-height: 100%;
    }
  }
</style>

<template>
  <div class="call-container component-container media-padding phone-change">
    <base-call :iframeUrl="iframeUrl"></base-call>
  </div>
</template>

<script>
import BaseCall from 'components/callCenter/baseCall'
export default {
  data () {
    return {
      iframeUrl: 'gaiaopt/rest/web/agent/detail'
    }
  },
  components: {
    BaseCall
  }
}
</script>

<style lang="less" scoped>
  .phone-change{
    padding-left: 15px;
  }
</style>

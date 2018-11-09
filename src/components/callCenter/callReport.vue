<template>
  <div class="call-container component-container media-padding">
    <base-call :iframeUrl="iframeUrl"></base-call>
  </div>
</template>

<script>
import BaseCall from 'components/callCenter/baseCall'
export default {
  data () {
    return {
      iframeUrl: 'gaiareport/rest/web/report/reportindex/index'
    }
  },
  components: {
    BaseCall
  }
}
</script>

<style>
</style>

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
      iframeUrl: 'gaiaopt/rest/web/calldata/missedcall/init.action'
    }
  },
  components: {
    BaseCall
  }
}
</script>

<style>
</style>

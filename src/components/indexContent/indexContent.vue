<template>
  <div class="index-content component-container media-padding">
    <renew-info></renew-info>
  </div>
</template>

<script>
import MakeInvoice from 'base/makeInvoice/makeInvoice'
import RenewInfo from 'base/renewInfo/renewInfo'
export default {
  data () {
    return {
    }
  },
  components: {
    MakeInvoice,
    RenewInfo
  }
}
</script>

<style scoped lang="less">

</style>

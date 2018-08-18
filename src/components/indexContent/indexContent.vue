<template>
  <div class="index-content">
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
  .index-content{
    background: #fff;
  }

</style>

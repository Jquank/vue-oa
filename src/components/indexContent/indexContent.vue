<template>
  <div class="index-content">
    <select-area></select-area>
    <select-trade></select-trade>
    <make-invoice></make-invoice>
  </div>
</template>

<script>
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import MakeInvoice from 'base/makeInvoice/makeInvoice'
export default {
  data () {
    return {
    }
  },
  components: {
    SelectArea,
    SelectTrade,
    MakeInvoice
  }
}
</script>

<style scoped lang="less">
  .index-content{
    background: #fff;
  }

</style>

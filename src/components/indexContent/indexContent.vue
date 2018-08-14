<template>
  <div class="index-content">
    <select-area></select-area>
    <select-trade></select-trade>
  </div>
</template>

<script>
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
export default {
  data () {
    return {
    }
  },
  components: {
    SelectArea,
    SelectTrade
  }
}
</script>

<style scoped lang="less">
  .index-content{
    background: #fff;
  }

</style>

<template>
  <div class="pending-detail">
    <p>
      <span>待处理订单 / 待处理详情</span>
    </p>
    <div class="detail-content">
      <h1>123</h1>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {
    console.log(852)
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  .pending-detail{
    width: 100%;
    height: 100%;
    background: #e2e5ec;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    .detail-content{
      background: #fff;
      padding: 20px;
    }
  }
</style>

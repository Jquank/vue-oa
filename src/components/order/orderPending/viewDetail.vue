<template>
  <div class="view-detail">
    <p>
      <span>待处理订单 / 查看订单</span>
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
    this._getDetailData()
  },
  methods: {
    _getDetailData () {
      let receiveData = this.$route.query.data
      if (!receiveData.cpid) {
        this.$router.push({
          path: '/indexPage/orderPending'
        })
      }
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  .view-detail{
    width: 100%;
    height: 100%;
    background: #e2e5ec;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 200;
    .detail-content{
      background: #fff;
      padding: 20px;
    }
  }
</style>

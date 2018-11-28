<template>
  <div class="view-news child-component-container media-padding">
    <h3 class="text-center">{{v.title}}</h3>
    <div class="text-center author">
      <span>时间：{{v.opttime | timeFormat}}</span>
      <span>发布者：{{v.username}}</span>
    </div>
    <div class="article">
      <div v-html="v.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v: {}
    }
  },
  created () {
    this.v = this.$route.query.data
    if (!this.v.id) {
      this.$router.push('/indexPage/news')
    }
    console.log(this.v)
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  .view-news{
    .author{
      font-size: 14px;
      span{
        display: inline-block;
        margin-right: 15px;
      }
    }
    .article{
      display: flex;
      justify-content: center;
      div{
        max-width: 750px;
        overflow: auto;
        // border: 1px solid #000;
      }
    }
  }
</style>

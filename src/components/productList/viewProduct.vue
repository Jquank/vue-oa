<template>
  <div class="view-product child-component-container media-padding">
    <h3 class="text-center">{{v.title}}</h3>
    <div class="text-center author">
      <span>发布时间：{{v.insert_time | timeFormat}}</span>
      <!-- <span>发布者：{{v.userName}}</span> -->
      <div>
        <el-button type="primary" @click.native="$router.go(-1)" class="xsbtn">返回</el-button>
      </div>
    </div>
    <div class="article">
      <div v-html="v.vtext"></div>
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
    let href = window.location.href
    let mark = href.split('@')[1]
    if (mark) {

    }
    return
    this.v = this.$route.query.data
    if (!this.v.id) {
      this.$router.go(-1)
    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  .view-product{
    .author{
      display: flex;
      font-size: 14px;
      justify-content: center;
      span{
        margin-right: 15px;
      }
    }
    .article{
      display: flex;
      justify-content: center;
      div{
        max-width: 850px;
        max-height: 600px;
        overflow: auto;
        // border: 1px solid #000;
      }
    }
  }
</style>

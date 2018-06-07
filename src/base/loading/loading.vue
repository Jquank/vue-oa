<template>
  <div class="loading">
    <img width="54" height="54" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '拼命加载中 ...'
    }
  }
}
</script>

<style scoped lang="less">
  .loading{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .desc{
    color:gray;
  }
</style>

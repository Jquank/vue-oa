<template>
  <div>
    <!-- <div class="parent">
      <div class="left">
        <p>123461111111111111111111</p>
      </div>
      <div class="right"></div>
    </div> -->
    <div class="flex">
      <div class="l"></div>
      <div class="c"></div>
      <div class="r"></div>
    </div>
 </div>
</template>

<style scoped lang="less">
  .flex{
    clear: both;
    display: flex;
    .l{
      width: 100px;
      height: 200px;
      background: red;
    }
    .c{
      flex: 1;
      // width: 100px;
      height: 200px;
      background: yellow;
    }
    .r{
      width: 100px;
      height: 200px;
      background: blue;
    }
  }
  .parent{
    overflow: hidden;
    .left{
      float: left;
      // width: 200px;
      height: 200px;
      background: red;
      // margin-right: 20px;
    }
    .right{
      // width: 300px;
      height: 200px;
      background: blue;
      overflow: hidden;
    }
  }

</style>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

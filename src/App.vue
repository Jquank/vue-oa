<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import Navbar from './components/navbar/navbar'
import MHeader from './components/m-header/m-header'
export default {
  components: {
    Navbar,
    MHeader
  }
}
</script>

<style scoped lang="less">
  #app {
    padding: 0;
  }

</style>

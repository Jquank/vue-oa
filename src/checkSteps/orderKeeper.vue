<template>
  <div>
    <h3 class="check-title">{{title}}</h3>
    <el-button type="success">审核通过</el-button>
    <div class="mt10px">
      <el-input style="width:80%" type="textarea" :rows="5" placeholder="请填写驳回理由！！！"></el-input>
      <el-button type="danger">驳回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>

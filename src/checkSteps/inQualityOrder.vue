<template>
  <div>
    <h3 class="check-title">质检内审派单</h3>
    <el-select v-model="outOrder" placeholder="请选择">
      <el-option label="123" value="456"></el-option>
    </el-select>
    <el-button type="success">确认派单</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      outOrder: ''
    }
  },
  components: {

  }
}
</script>

<style>

</style>

<template>
  <div>
    <el-tree
      :data="productData"
      :props="roleProps"
      show-checkbox accordion :check-strictly="true"
      node-key="id" ref="tree"
      :default-checked-keys="defaultChecked"
      @check-change="checkChange">
    </el-tree>
  </div>
</template>

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

<style>

</style>

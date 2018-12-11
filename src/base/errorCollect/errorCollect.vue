<template>
  <div>
    <el-table :data="errorList" class="table-width">
      <el-table-column prop="companyname" label="客户名称" min-width="160">
      </el-table-column>
    </el-table>
    <!-- <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="comUrl" :sendParams="comParams" @updateList="getComList"></page> -->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      errorList: []
    }
  }
}
</script>

<style>

</style>

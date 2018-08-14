<template>
  <el-cascader @active-item-change="handleItemChange" @change="change" placeholder="请选择行业" :options="options" :change-on-select="false" :props="props"></el-cascader>
</template>

<script>
import { getTrade } from 'api/getOptions'
export default {
  data () {
    return {
      options: [],
      props: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      index: 0,
      tradeList: []
    }
  },
  mounted () {
    getTrade().then(res => {
      console.log(res.data.data)
      if (res.data.status === 1) {
        this.options = res.data.data
      }
    })
  },
  methods: {
    change (val) {
    },
    handleItemChange (val) {
    }
  }
}
</script>

<style>
</style>

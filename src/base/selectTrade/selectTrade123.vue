<template>
  <el-cascader @active-item-change="handleItemChange" @change="change" placeholder="请选择行业" :options="options" :change-on-select="false" :props="props"></el-cascader>
</template>

<script>
import storage from 'good-storage'
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
    this.options = storage.get('trade')
  },
  methods: {
    change (val) {
      console.log(val)
      this.$emit('tradeSelect', val)
    },
    handleItemChange (val) {
      let idArr = []
      let value = val[0]
      getTrade({parentid: value}).then(res => {
        this.tradeList = res.data.data || []
        console.log(this.tradeList)
        this.options.forEach(val => {
          idArr.push(val.id)
        })
        this.index = idArr.indexOf(value)
        this.tradeList.forEach(val => {
          this.options[this.index].children.push({
            label: val.name,
            name: val.name,
            id: val.id
          })
        })
      })
    }
  }
}
</script>

<style>
</style>

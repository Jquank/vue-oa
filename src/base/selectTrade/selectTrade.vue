<template>
  <el-cascader @active-item-change="handleItemChange" @change="change" placeholder="请选择行业" :options="options" :change-on-select="false" :props="props"></el-cascader>
</template>

<script>
import { getTrade } from 'api/getOptions'
import storage from 'good-storage'
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
    let tradeList = storage.get('trade')
    if (!tradeList) {
      this._getTradeList()
    } else {
      this.options = tradeList
    }
  },
  methods: {
    _getTradeList () {
      getTrade().then(res => {
        if (res.data.status === 1) {
          this.options = res.data.data
          storage.set('trade', this.options)
        }
      })
    },
    change (val) {
    },
    handleItemChange (val) {
    }
  }
}
</script>

<style>
</style>

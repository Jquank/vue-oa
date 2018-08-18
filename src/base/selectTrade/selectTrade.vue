<template>
  <el-cascader v-model="trade" @change="$emit('input', trade)" placeholder="请选择行业" :options="options" :change-on-select="false" :props="props"></el-cascader>
</template>

<script>
import { getTrade } from 'api/getOptions'
import storage from 'good-storage'
export default {
  data () {
    return {
      trade: [],
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
    }
  }
}
</script>

<style>
</style>

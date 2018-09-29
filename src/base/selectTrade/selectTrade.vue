<template>
  <el-cascader v-model="trade" @change="$emit('input', trade)"  :change-on-select="false" :disabled="tradeDisabled" placeholder="请选择行业" :options="options" @active-item-change="handleItemChange" :props="tradeProps"></el-cascader>
</template>

<script>
// import storage from 'good-storage'
export default {
  props: {
    tradeDisabled: {
      type: Boolean,
      default: false
    },
    echoTrade: { // 回显数据
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      trade: [],
      options: [],
      tradeProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      index: 0,
      tradeList: []
    }
  },
  watch: {
    echoTrade (newVal) {
      this._getTradeList(newVal[0])
    }
  },
  mounted () {
    this._getTradeList()
  },
  methods: {
    handleItemChange (val) {
      this._getTradeList(val[0])
    },
    _getTradeList (id) {
      this.$post('/CompanyCat.do?compcat', {parentid: id}).then(res => {
        if (!id) {
          this.options = res.data.data
          this.options.forEach(val => {
            val.children = []
          })
        } else {
          let secondTrade = res.data.data
          this.options.forEach((val, key) => {
            if (val.id === id) {
              this.index = key
            }
          })
          this.options[this.index].children = secondTrade
          this.trade = this.echoTrade // 回显行业，异步
        }
      })
    }
  }
}
</script>

<style>
</style>

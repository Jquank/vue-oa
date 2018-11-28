<template>
  <keep-alive>
    <el-cascader v-model="trade" @change="$emit('input', trade)"  :change-on-select="false" :disabled="tradeDisabled" placeholder="请选择行业" :options="options" @active-item-change="handleItemChange" :props="tradeProps"></el-cascader>
  </keep-alive>
</template>

<script>
import storage from 'good-storage'
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
      if (this._isHasSecondTrade(newVal[0])) {
        this.trade = this.echoTrade
        return
      }
      this._getTradeList(newVal[0])
    }
  },
  created () {
    let trade = storage.get('trade')
    if (trade) {
      this.options = trade
    } else {
      this._getTradeList()
    }
  },
  methods: {
    handleItemChange (val) {
      if (this._isHasSecondTrade(val[0])) { // 做本地缓存
        return
      }
      this._getTradeList(val[0])
    },
    _getTradeList (id) {
      this.$post('/CompanyCat.do?compcat', {parentid: id}).then(res => {
        if (!id) {
          this.options = res.data.data
          this.options.forEach(val => {
            this.$set(val, 'children', [])
          })
          storage.set('trade', this.options)
        } else {
          let secondTrade = res.data.data
          this.options.forEach((val, key) => {
            if (val.id === id) {
              this.index = key
            }
          })
          this.options[this.index].children = secondTrade
          storage.set('trade', this.options)
          this.trade = this.echoTrade // 回显行业，异步
        }
      })
    },
    _isHasSecondTrade (pid) {
      this.options.forEach((item, key) => {
        if (item.id === pid) {
          this.index = key
        }
      })
      return !!this.options[this.index].children.length
    }
  }
}
</script>

<style>
</style>

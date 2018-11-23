<template>
  <el-cascader v-model="selArea" @change="$emit('input', selArea)" :disabled="areaDisabled"
  :options="options" :change-on-select="false" :props="props" placeholder="请选择地区"></el-cascader>
</template>

<script>
import { transTree } from 'common/js/utils'
// import storage from 'good-storage'
export default {
  props: {
    areaDisabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selArea: [],
      options: [],
      props: {
        value: 'id',
        label: 'AREANAME',
        children: 'children'
      }
    }
  },
  mounted () {
    // let areaList = storage.get('area')
    // if (!areaList) {
    this._getAreaList()
    // } else {
    // this.options = areaList
    // }
  },
  methods: {
    _getAreaList () {
      this.$post('/Area.do?comparea', {parentid: 1}).then(res => {
        if (res.data.success) {
          let area = res.data.data
          transTree(area)
          console.log(123)
          this.options = area
          // storage.set('area', area)
        }
      })
    },
    clearChildren (arr) {
      arr.forEach(val => {
        if (val.children.length === 0) {
          delete val.children
        }
        if (val.children) {
          this.clearChildren(val.children)
        }
      })
    }
  }
}
</script>

<style>
</style>

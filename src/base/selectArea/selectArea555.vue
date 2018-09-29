<template>
  <el-cascader v-model="selArea" @change="$emit('input', selArea)" :disabled="areaDisabled"
  :options="options" :change-on-select="false" :props="props" placeholder="请选择地区"></el-cascader>
</template>

<script>
// import { getArea } from 'api/getOptions'
import storage from 'good-storage'
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
        label: 'areaname',
        children: 'children'
      }
    }
  },
  mounted () {
    let areaList = storage.get('area')
    if (!areaList) {
      this._getAreaList()
    } else {
      this.options = areaList
    }
  },
  methods: {
    _getAreaList () {
      this.$post('/Area.do?comparea', {parentid: 1}).then(res => {
        let area = res.data.data
        // this.clearChildren(area)
        this.options = area
        storage.set('area', area)
        if (res.data.status === 1) {

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

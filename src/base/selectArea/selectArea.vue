<template>
  <el-cascader @active-item-change="handleItemChange" @change="change" placeholder="请选择地区" :options="options" :change-on-select="false" :props="props"></el-cascader>
</template>

<script>
// import { getArea } from 'api/getOptions'
import { $post } from 'api/http'
import storage from 'good-storage'
export default {
  data () {
    return {
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
      $post('/Area/HomeAreaTreeGet').then(res => {
        if (res.data.status === 1) {
          let area = res.data.data
          this.clearChildren(area)
          this.options = area
          storage.set('area', area)
        }
      })
    },
    change (val) {
    },
    handleItemChange (val) {

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

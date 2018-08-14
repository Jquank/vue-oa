<template>
  <el-cascader @active-item-change="handleItemChange" @change="change" placeholder="请选择地区" :options="options" :change-on-select="false" :props="props"></el-cascader>
</template>

<script>
import storage from 'good-storage'
import { getArea } from 'api/getOptions'
export default {
  data () {
    return {
      options: [],
      props: {
        value: 'id',
        label: 'AREANAME',
        children: 'children'
      },
      index: 0,
      secondIndex: 0,
      areaList: []
    }
  },
  mounted () {
    this.options = storage.get('province')
  },
  methods: {
    change (val) {
      console.log(val)
      this.$emit('areaSelect', val)
    },
    handleItemChange (val) {
      let idArr = []
      let secondIdArr = []
      let value

      if (val.length === 1) {
        value = val[0]
      } else {
        value = val[1]
      }

      getArea({parentid: parseInt(value)}).then(res => {
        this.areaList = res.data.data || []
        if (val.length === 1) {
          this.options.forEach(val => {
            idArr.push(val.id)
          })
          this.index = idArr.indexOf(value)
          this.areaList.forEach(val => {
            this.options[this.index].children.push({
              label: val.AREANAME,
              AREANAME: val.AREANAME,
              id: val.id,
              children: []
            })
          })
        } else {
          this.options[this.index].children.forEach(val => {
            secondIdArr.push(val.id)
          })
          this.secondIndex = secondIdArr.indexOf(value)
          let arr = this.options[this.index].children[this.secondIndex].children
          this.areaList.forEach(val => {
            arr.push({
              label: val.AREANAME,
              AREANAME: val.AREANAME,
              id: val.id
            })
          })
          // console.log(this.options)
        }
      })
    }
  }
}
</script>

<style>
</style>

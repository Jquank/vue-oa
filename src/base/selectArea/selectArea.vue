<template>
  <el-cascader v-model="area" @change="$emit('input', area)" placeholder="请选择地区" :options="options" :change-on-select="false" :props="areaProps"  @active-item-change="handleItemChange"></el-cascader>
</template>

<script>
// import storage from 'good-storage'
// import transTree from 'common/js/utils'
export default {
  props: {
    echoArea: { // 回显
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      area: [],
      options: [],
      areaProps: {
        value: 'id',
        label: 'AREANAME',
        children: 'children'
      },
      firstIndex: 0,
      secondIndex: 0,
      areaList: []
    }
  },
  watch: {
    echoArea () {
      this._getAreaList(this.echoArea[0])
      this._getAreaList(this.echoArea[1])
    }
  },
  mounted () {
    this._getAreaList(1)
  },
  methods: {
    handleItemChange (val) {
      console.log(val)
      if (val.length === 1) {
        this._getAreaList(val[0])
      } else {
        this._getAreaList(val[1])
      }
    },
    _getAreaList (id) {
      this.$post('/Area.do?comparea', {parentid: id}).then(res => {
        if (id === 1) { // get省
          this.options = res.data.data
          this.options.forEach((val, key) => {
            val.children = []
          })
        } else {
          let nextArea = res.data.data
          if (id.length === 2) { // get市
            this.options.forEach((val, key) => {
              if (val.id == id) { // eslint-disable-line
                this.firstIndex = key
              }
            })
            this.options[this.firstIndex].children = nextArea
            this.options[this.firstIndex].children.forEach(val => {
              if (!val.children) {
                val.children = []
              }
            })
            this.area = this.echoArea
          } else { // get区
            this.options.forEach((val, key) => {
              if (val.id == id) { // eslint-disable-line
                this.secondIndex = key
              }
            })
            this.options[this.firstIndex].children[this.secondIndex].children = nextArea
            this.area = this.echoArea
          }
        }
      })
    }
  }
}
</script>

<style>
</style>

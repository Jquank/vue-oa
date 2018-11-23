<template>
  <el-cascader v-model="area" @change="$emit('input', area)" placeholder="请选择地区" :options="options" :change-on-select="false" :props="areaProps"  @active-item-change="handleItemChange" :disabled="areaDisabled"></el-cascader>
</template>

<script>
// import storage from 'good-storage'
// import transTree from 'common/js/utils'
export default {
  props: {
    areaDisabled: {
      type: Boolean,
      default: false
    },
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
    echoArea (newVal) {
      if (newVal[1]) {
        this._getAreaList(newVal[0])
      }
      if (newVal[2]) {
        setTimeout(() => { // get区依赖于get市获取到的firstIndex值，所以加个延时，或者用promise
          this._getAreaList(newVal[1])
        }, 100)
      }
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
      } else if (val.length === 2) {
        this._getAreaList(val[1])
      }
    },
    _getAreaList (id) {
      this.$post('/Area.do?comparea', {parentid: id}).then(res => {
        if (id === 1) { // get省
          this.options = res.data.data
          this.options.forEach((val, key) => {
            if (!val.children) {
              val.children = []
            }
          })
        } else {
          let nextArea = res.data.data
          if (id.length === 2) { // get市
            this.options.forEach((val, key) => {
              if (val.id == id) { // eslint-disable-line
                this.firstIndex = key
              }
            })
            setTimeout(() => {
              this.options[this.firstIndex].children = nextArea
              this.options[this.firstIndex].children.forEach(val => {
                if (!val.children) {
                  val.children = []
                }
              })
            }, 300)

            if (this.echoArea.length === 1) { // 回显只有两级的时候赋值
              this.area = this.echoArea
            }
          } else { // get区
            this.options[this.firstIndex].children.forEach((val, key) => {
              if (val.id == id) { // eslint-disable-line
                this.secondIndex = key
              }
            })
            setTimeout(() => {
              this.options[this.firstIndex].children[this.secondIndex].children = nextArea
            }, 300)
            if (this.echoArea.length) {
              this.area = this.echoArea
            }
          }
        }
      })
    }
  }
}
</script>

<style>
</style>

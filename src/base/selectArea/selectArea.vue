<template>
  <el-cascader v-model="area" @change="$emit('input', area)" placeholder="请选择地区" :options="options" :change-on-select="false" :props="areaProps"  @active-item-change="handleItemChange" :disabled="areaDisabled"></el-cascader>
</template>

<script>
import storage from 'good-storage'
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
    echoArea: {
      handler (newVal) {
        this._echoArea(newVal)
      },
      deep: true
    }
  },
  created () {
    this._getFirstArea()
  },
  methods: {
    _getFirstArea () {
      let area = storage.get('area')
      if (area) {
        this.options = area
      } else {
        this.getFirstArea(1)
      }
    },
    _echoArea (newVal) {
      if (this.echoArea.length === 1) { // 只回显一级
        this.area = newVal
      } else if (this.echoArea.length === 2) { // 只回显二级
        if (this._isHasSecondArea(newVal[0])) {
          this.area = newVal
        } else {
          this.getSecondArea(newVal[0])
        }
      } else if (this.echoArea.length === 3) { // 回显三级
        if (this._isHasSecondArea(newVal[0])) {
          if (this._isHasThirdArea(newVal[0], newVal[1])) {
            this.area = newVal
          } else {
            this.getThirdArea(newVal[1])
            this.area = newVal
          }
        } else {
          this.getSecondArea(newVal[0]).then(res => {
            this.getThirdArea(newVal[1]) // 依赖getSecondArea的firstIndex值
            this.area = newVal
          })
        }
      }
    },
    handleItemChange (val) {
      if (val.length === 1) {
        if (!this._isHasSecondArea(val[0])) {
          this.getSecondArea(val[0])
        }
      } else if (val.length === 2) {
        if (!this._isHasThirdArea(val[0], val[1])) {
          this.getThirdArea(val[1])
        }
      }
    },
    _isHasSecondArea (pid) { // 是否有二级地区
      this.options.forEach((val, key) => {
        if (val.id == pid) { // eslint-disable-line
          this.firstIndex = key
        }
      })
      return !!this.options[this.firstIndex].children.length
    },
    _isHasThirdArea (pid, rpid) { // 是否有三级地区
      this.options.forEach((item, key) => {
        if(item.id == pid){ // eslint-disable-line
          this.firstIndex = key
        }
      })
      this.options[this.firstIndex].children.forEach((val, key) => {
        if (val.id == rpid) { // eslint-disable-line
          this.secondIndex = key
        }
      })
      return !!this.options[this.firstIndex].children[this.secondIndex].children.length
    },
    getFirstArea (id) {
      this.$post('/Area.do?comparea', {parentid: id}).then(res => {
        this.options = res.data.data
        this.options.forEach((val, key) => {
          if (!val.children) {
            this.$set(val, 'children', [])
          }
        })
        storage.set('area', this.options)
      })
    },
    getSecondArea (id) {
      return new Promise((resolve, reject) => {
        this.$post('/Area.do?comparea', {parentid: id}).then(res => {
          let nextArea = res.data.data
          this.options.forEach((val, key) => {
          if (val.id == id) { // eslint-disable-line
              this.firstIndex = key
            }
          })
          this.options[this.firstIndex].children = nextArea
          this.options[this.firstIndex].children.forEach(val => {
            if (!val.children) {
              this.$set(val, 'children', [])
            }
          })
          storage.set('area', this.options)
          resolve(this.options)
        })
      })
    },
    getThirdArea (id) {
      this.$post('/Area.do?comparea', {parentid: id}).then(res => {
        let nextArea = res.data.data
        this.options[this.firstIndex].children.forEach((val, key) => {
        if (val.id == id) { // eslint-disable-line
            this.secondIndex = key
          }
        })
        this.options[this.firstIndex].children[this.secondIndex].children = nextArea
        storage.set('area', this.options)
      })
    }
  }
}
</script>

<style>
</style>

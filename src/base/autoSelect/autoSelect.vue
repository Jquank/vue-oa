// 对element-ui的select组件的再封装，用于带前置文字的select，slot="prefix"
// 用法：<auto-select :title="'司龄'" v-model="workAge">
//         <el-option label="3个月以上" value="3"></el-option>
//         <el-option label="6个月以上" value="6"></el-option>
//       </auto-select>
<template>
  <el-select @change="$emit('input',sel)" v-model="sel" :filterable="isSearch" :self-class="classMark" class="auto-sel" :placeholder="placeholder">
    <span slot="prefix" class="prefix">{{title}}:</span>
    <slot></slot>
  </el-select>
</template>

<script>
export default {
  props: {
    classMark: { // 区分同一组件的auto-select，计算padding
      type: String,
      default: ''
    },
    title: { // 插槽文字
      type: String,
      default: ''
    },
    defaultValue: { // 默认显示
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sel: this.defaultValue || ''
    }
  },
  mounted () {
    if (this.classMark) {
      this._setInputPadding()
    }
  },
  methods: {
    _setInputPadding () {
      let sels = document.getElementsByClassName('auto-sel')
      for (let i = 0, len = sels.length; i < len; i++) {
        if (sels[i].getAttribute('self-class') === this.classMark) {
          sels[i].setAttribute('id', this.classMark)
        }
      }
      let len = this.title.length
      let paddingWidth = this.title ? (4 + 20 + 10) : 0 // 冒号宽度+padding及其他
      let width = len * 13 + paddingWidth + 'px'
      let input = document.querySelector('#' + this.classMark + '.auto-sel input.el-input__inner')
      input.style.paddingLeft = width
    }
  }
}
</script>
<style>
.auto-sel input.el-input__inner {
  /* // 默认4个字的宽度+34px，如果不是4个字，需在父组件中重新定义padding值 */
  padding-left: 86px;
 }
</style>

<style lang="less" scoped>
.auto-sel {
  .prefix {
    display: inline-block;
    position: relative;
    left: -4px;
    top: 1px;
    height: 30px;
    padding: 0 10px;
    line-height: 30px;
    background: #f5f7fa;
    color: #909399;
    border-right: 1px solid #dcdfe6;
    border-radius: 4px;
  }
}
</style>

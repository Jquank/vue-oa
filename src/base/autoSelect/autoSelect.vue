// 对element-ui的select组件的再封装，用于带前置文字的select，slot="prefix"
// 用法：<auto-select title="司龄" v-model="workAge">
//         <el-option label="3个月以上" value="3"></el-option>
//         <el-option label="6个月以上" value="6"></el-option>
//       </auto-select>
// 默认选中取决于sel的值，so，默认选中的sel值需统一某个值，ex：''或'10'
<template>
  <el-select @change="$emit('input',sel)" v-model="sel" class="auto-sel" :placeholder="placeholder">
    <span slot="prefix" class="prefix">{{title}}:</span>
    <slot></slot>
  </el-select>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '选择'
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      sel: ''
    }
  },
  mounted () {
    let len = this.title.length
    let width = len * 13 + 4 + 36 + 'px' // 字体宽度+冒号宽度+padding及其他
    let input = document.querySelector('.auto-sel input.el-input__inner')
    input.style.paddingLeft = width
  }
}
</script>

<style lang="less" scoped>
  .auto-sel {
    .prefix{
      display: inline-block;
      position: relative;
      left:-4px;
      top:1px;
      height: 30px;
      padding:0 10px;
      line-height: 30px;
      background: #f5f7fa;
      color:#909399;
      border-right: 1px solid #dcdfe6;
      border-radius: 4px;
    }
  }
</style>

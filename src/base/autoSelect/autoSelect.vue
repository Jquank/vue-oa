// 对element-ui的select组件的再封装，用于带前置文字的select，slot="prefix"
<template>
<div>
  <el-select v-model="sel" class="auto-sel">
    <span slot="prefix" class="prefix">{{title}}:</span>
    <slot></slot>
  </el-select>
  <p>嗯{{sel}}</p>
</div>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '选择'
    }
  },
  data () {
    return {
      sel: ''
    }
  },
  mounted () {
    let len = this.title.length
    let width = len * 13 + 4 + 57 + 'px' // 字体宽度+冒号宽度+padding及其他
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
      padding:0 20px;
      line-height: 32px;
      background: #f5f7fa;
      color:#909399;
      border-right: 1px solid #dcdfe6;
      border-radius: 4px;
    }
  }
</style>

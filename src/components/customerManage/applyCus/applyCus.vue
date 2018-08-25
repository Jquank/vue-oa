<template>
  <div class="apply-cus">
    <div class="apply top">
      <select-area v-model="area" class="apply-item item-width"></select-area>
      <select-trade v-model="trade" class="apply-item item-width"></select-trade>
      <el-input v-model="applyCount" class="apply-item item-width">
        <template slot="prepend">数量:</template>
      </el-input>
      <el-button type="primary" class="apply-item">申 领</el-button>
    </div>
    <div class="cut-line"></div>
    <div class="apply">
      <el-input v-model="cusName" class="apply-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <auto-select :title="'状态'" v-model="applyCusStatus" class="apply-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option label="今日申领客户" value="10"></el-option>
        <el-option label="今日完成客户" value="20"></el-option>
      </auto-select>
      <div class="apply-item">
        <el-button type="primary">查 询</el-button>
        <el-button type="warning">重 置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import AutoSelect from 'base/autoSelect/autoSelect'
export default {
  data () {
    return {
      area: [],
      trade: [],
      applyCount: '',
      cusName: '',
      applyCusStatus: ''
    }
  },
  components: {
    SelectArea,
    SelectTrade,
    AutoSelect
  }
}
</script>

<style lang="less" scoped>
.apply-cus{
  background: #fff;
  padding: 20px;
  .top{
    margin-top:-10px;
  }
  .apply{
    display: flex;
    flex-wrap: wrap;
    .apply-item{
      margin-left: 10px;
      margin-top:10px;
    }
    .item-width{
      width:250px;
    }
  }
  .cut-line{
    margin-top:10px;
    border-top:1px solid rgb(218, 214, 214);
  }
}

</style>

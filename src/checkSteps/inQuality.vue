<template>
  <div>
    <h3 class="check-title">质检内审</h3>
    <el-select v-model="outOrder" placeholder="请选择派单对象">
      <el-option label="123" value="456"></el-option>
    </el-select>
    <el-button type="success">确认派单</el-button>
    <!-- <div style="width:100%;border-top:1px solid #E4E7ED;margin-top:10px;"></div> -->
    <div class="mt10px">
      <el-select v-model="breakReason" placeholder="请选择退回原因" style="display:block;width:215px;">
        <el-option label="123" value="456"></el-option>
      </el-select>
      <div class="mt10px">
        <el-input :rows="3" style="width:50%" size="medium" type="textarea" placeholder="填写驳回理由"></el-input>
      </div>
      <div class="mt10px break-step">
        <el-select v-model="breakStep" placeholder="" style="width:215px;">
          <span slot="prefix" style="line-height:32px;color:#606266">驳回至 :</span>
          <el-option label="商务" value="1"></el-option>
          <el-option label="理单员审核" value="2"></el-option>
          <el-option label="质检外审" value="3"></el-option>
          <el-option label="质检内审派单" value="4"></el-option>
        </el-select>
        <el-button type="danger">驳 回</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      outOrder: '',
      breakReason: '',
      breakStep: '1'
    }
  },
  components: {}
}
</script>

<style lang="less">
.break-step{
  input.el-input__inner{
    padding-left:55px;
  }
}
</style>

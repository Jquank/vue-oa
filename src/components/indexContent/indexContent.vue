<template>
  <div class="index-content component-container media-padding">
    <renew-info></renew-info>
    <el-table :data="payList" class="table-width">
      <el-table-column prop="" label="代金券">
        <template slot-scope="scope">
          <el-input v-model="scope.row._value" class="apply-add-money-input"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import MakeInvoice from 'base/makeInvoice/makeInvoice'
import RenewInfo from 'base/renewInfo/renewInfo'
export default {
  data () {
    return {
      payList: []
    }
  },
  watch: {
    payList: {
      handler: function (val, oldVal) {
        console.log(123588)
      },
      deep: true
    }
  },
  created () {
    setTimeout(() => {
      this.payList = [
        {_value: 1000},
        {_value: 2000}
      ]
    }, 300)
  },
  mounted () {
  },
  components: {
    MakeInvoice,
    RenewInfo
  }
}
</script>

<style scoped lang="less">

</style>

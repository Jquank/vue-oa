<template>
  <div>
    <invoice-list :fixed="false" :mark="'pending'"></invoice-list>
  </div>
</template>

<script>
import InvoiceList from 'components/invoiceManage/invoiceList/invoiceList'
export default {
  data () {
    return {

    }
  },
  components: {
    InvoiceList
  }
}
</script>

<style lang="less">
</style>

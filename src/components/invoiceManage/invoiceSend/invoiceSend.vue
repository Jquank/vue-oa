<template>
    <invoice-list :mark="'send'"></invoice-list>
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

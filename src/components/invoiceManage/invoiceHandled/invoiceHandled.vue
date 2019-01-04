<template>
    <invoice-list :mark="'handled'"></invoice-list>
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

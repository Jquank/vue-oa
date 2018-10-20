<template>
  <div  class="edit-detail child-component-container media-padding">
    <div>
      <add-baidu-order v-if="pid==='BAITUI'" :showQualify="showQualify" :showEditBD="false" :editData="editData">
        <show-qualify slot="echoQualify" :showQualify="showQualify" @getQualifyList="getQualifyList"></show-qualify>
      </add-baidu-order>
      <add-wj-order v-if="pid==='WEBSITE'" :showEditWJ="false" :editData="editData">
        <show-qualify></show-qualify>
      </add-wj-order>
    </div>
  </div>
</template>

<script>
import ShowQualify from 'base/showQualify/showQualify'
import addBaiduOrder from 'components/order/addBaiduOrder/addBaiduOrder'
import addWjOrder from 'components/order/addWjOrder/addWjOrder'
import { uploadUrl } from 'api/config' //eslint-disable-line
export default {
  data () {
    return {
      pid: 'BAITUI',
      editData: {},
      showQualify: [],
      rowData: {}
    }
  },
  created () {
    this.rowData = this.$route.query.data
    if (!this.rowData.cpid) {
      this.$router.push({
        path: '/indexPage/orderPending'
      })
      return
    }
    this._getEditData()
  },
  methods: {
    _getEditData () {
      this.pid = this.rowData.pid
      let companylogid = this.rowData.companylogid
      let cpid = this.rowData.cpid
      let uid = this.rowData.uid
      let orderid = this.rowData.orderid
      let params = {
        companylogid: companylogid,
        cpid: cpid,
        uid: uid,
        sn: 10,
        orderid: orderid,
        pid: this.pid
      }
      this.$post('/wf.do?ndget', params).then(res => {
        if (res.data.success === true) {
          this.editData = JSON.parse(res.data.data[0][0].from_val)
          let productInfo = res.data.data[4]
          let orderInfo = res.data.data[1]
          this.editData.order_id = orderInfo.id
          this.editData.rowData = this.rowData // cpid,orderid,pid,sn,uid 从列表页取，其它从接口取
          this.editData.wjType = productInfo[0].websitetype
          this.editData.cusType = orderInfo.custom_type
          this.editData.isInvoice = orderInfo.invoice_type
          this.editData.bdOrderNumber = orderInfo.con_id
          if (orderInfo.con_id3) {
            this.editData.contractTab = 'old'
            this.editData.bdProxy = orderInfo.con_id2
            this.editData.bdServiceProtocol = orderInfo.con_id3
          } else {
            this.editData.contractTab = 'new'
          }
          this.editData.receiveAccount = orderInfo.receiveaccount
          this.editData.receiveBank = orderInfo.receivebank
          this.showQualify = res.data.data[5]
          this.editData.record = res.data.data[8]
          this.editData.recordDetail = res.data.data[9]
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getQualifyList (data) { // 删除资质时更新资质list
      this.showQualify = data
    }
  },
  components: {
    addBaiduOrder, addWjOrder, ShowQualify
  }
}
</script>

<style lang="less" scoped>
</style>

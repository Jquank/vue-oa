<template>
  <div  class="edit-detail child-component-container media-padding">
    <div>
      <add-baidu-order v-if="pid==='BAITUI'" :showQualify="showQualify" :deledQualify="deledQualify" :showEditBD="false" :editData="editData">
        <show-qualify v-if="showQualify.length" slot="echoQualify" :showQualify="showQualify" @getQualifyList="getQualifyList"></show-qualify>
      </add-baidu-order>
      <add-wj-order v-if="pid==='WEBSITE'" :showQualify="showQualify" :deledQualify="deledQualify" :showEditWJ="false" :editData="editData">
        <show-qualify v-if="showQualify.length" slot="echoQualify" :showQualify="showQualify" @getQualifyList="getQualifyList"></show-qualify>
      </add-wj-order>
      <add-ztc-order v-if="pid==='ZTC2'" :showQualify="showQualify" :deledQualify="deledQualify" :showEditZTC="false" :editData="editData">
        <show-qualify v-if="showQualify.length" slot="echoQualify" :showQualify="showQualify" @getQualifyList="getQualifyList"></show-qualify>
      </add-ztc-order>
      <add-ka-order v-if="pid==='GD' || pid==='PZ' || pid==='KP'" :showQualify="showQualify" :deledQualify="deledQualify" :showEditKA="false" :editData="editData">
        <show-qualify v-if="showQualify.length" slot="echoQualify" :showQualify="showQualify" @getQualifyList="getQualifyList"></show-qualify>
      </add-ka-order>
    </div>
  </div>
</template>

<script>
import ShowQualify from 'base/showQualify/showQualify'
import addBaiduOrder from 'components/order/addBaiduOrder/addBaiduOrder'
import addWjOrder from 'components/order/addWjOrder/addWjOrder'
import addZtcOrder from 'components/order/addZtcOrder/addZtcOrder'
import addKaOrder from 'components/order/addKaOrder/addKaOrder'
import { uploadUrl } from 'api/config' //eslint-disable-line
export default {
  data () {
    return {
      pid: '',
      pid_ka: '',
      editData: {},
      showQualify: [],
      deledQualify: [],
      rowData: {}
    }
  },
  created () {
    this.rowData = this.$route.query.data
    console.log(this.rowData)
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
          console.log(this.editData)
          let orderInfo = res.data.data[1]
          let productInfo = res.data.data[4][0]
          this.editData.productInfo = productInfo
          this.editData.pid = this.pid
          this.editData.order_id = orderInfo.id
          this.editData.remark = orderInfo.remark
          this.editData.wjType = orderInfo.websitetype
          this.editData.rowData = this.rowData // cpid,orderid,pid,sn,uid 从列表页取，其它从接口取
          this.editData.cusType = orderInfo.custom_type
          this.editData.isInvoice = orderInfo.invoice_type
          this.editData.bdOrderNumber = orderInfo.con_id
          this.editData.bdProxy = orderInfo.con_id2
          this.editData.bdServiceProtocol = orderInfo.con_id3
          this.editData.receiveAccount = orderInfo.receiveaccount
          this.editData.receiveBank = orderInfo.receivebank
          this.editData.collectAccount = orderInfo.collectAccount
          this.editData.collectBank = orderInfo.collectBank
          this.editData.collectName = orderInfo.collectName
          this.showQualify = res.data.data[5]
          this.editData.record = res.data.data[8]
          this.editData.contacts = res.data.data[7]
          this.editData.recordDetail = res.data.data[9]
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getQualifyList (newArr, delArr) { // 获取删除的资质
      this.showQualify = newArr
      this.deledQualify = this.deledQualify.concat(delArr)
    }
  },
  components: {
    addBaiduOrder, addWjOrder, addZtcOrder, addKaOrder, ShowQualify
  }
}
</script>

<style lang="less" scoped>
</style>

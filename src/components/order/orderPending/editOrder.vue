<template>
  <div>
    <div class="edit-detail">
      <p>
        <span>订单管理 / 待处理订单 / 编辑百度订单</span>
      </p>
      <div class="detail-content">
        <add-baidu-order :isShow="false" :editData="editData"></add-baidu-order>
      </div>
    </div>
  </div>
</template>

<script>
import addBaiduOrder from 'components/order/addBaiduOrder/addBaiduOrder'
import { serverUrl, uploadUrl } from 'api/config' //eslint-disable-line
import { $post } from 'api/http'
export default {
  data () {
    return {
      editData: {}
    }
  },
  created () {
    this._getEditData()
  },
  methods: {
    _getEditData () {
      let routerData = this.$route.query.data
      if (!routerData.cpid) {
        this.$router.push({
          path: '/indexPage/orderPending'
        })
        return
      }
      let cpid = routerData.cpid
      let uid = routerData.uid
      let orderid = routerData.orderid
      let pid = routerData.pid
      let url = serverUrl + '/wf.do?ndget'
      let params = {
        cpid: cpid,
        uid: uid,
        sn: 10,
        orderid: orderid,
        pid: pid
      }
      $post(url, params).then(res => {
        if (res.data.success === true) {
          this.editData = JSON.parse(res.data.data[0][0].from_val)
          let productInfo = res.data.data[4]
          let orderInfo = res.data.data[1]
          this.editData.wjType = productInfo[0].websitetype
          this.editData.cusType = orderInfo.custom_type
          this.editData.isInvoice = orderInfo.invoice_type
          this.editData.bdOrderNumber = orderInfo.con_id
          this.editData.bdProxy = orderInfo.con_id2
          this.editData.bdServiceProtocol = orderInfo.con_id3
          this.editData.receiveAccount = orderInfo.receiveaccount
          this.editData.receiveBank = orderInfo.receivebank
          this.editData.qualifyList = res.data.data[5]
          this.editData.record = res.data.data[8]
          this.editData.recordDetail = res.data.data[9]
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    addBaiduOrder
  }
}
</script>

<style lang="less" scoped>
  .edit-detail{
    width: 100%;
    height: 100%;
    background: #e2e5ec;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 200;
    .detail-content{
      background: #fff;
      padding: 20px;
    }
  }
</style>

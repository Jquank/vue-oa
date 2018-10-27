import { getByCode, getMyContract } from 'api/getOptions'
import { groupBy } from 'common/js/utils'
import { timeFormat } from 'common/js/filters'

export const mobileFit = { // 移动端适配
  methods: {
    // element表单labelWidth
    _labelWidth (num = 50) {
      let viewWidth = document.documentElement.clientWidth
      if (viewWidth && viewWidth < 768) {
        this.labelWidth = num + 'px'
      }
    }
  }
}

export const orderMixin = { // 新增订单
  methods: {
    // 添加联系人
    addContact (index, type) {
      if (index === 0) {
        !type && this.form.contactList.push({})
        type && this.columns.push({})
      } else {
        !type && this.form.contactList.splice(index, 1)
        type && this.columns.splice(index, 1)
      }
    },
    // 文件上传前的回调
    uploadBefore (file) {
      if (file.size > 3 * 1024 * 1024) {
        this.$message({
          type: 'error',
          message: '上传失败！上传文件大小不能超过3M'
        })
        return false
      }
    },
    // 文件上传提示
    handleExceed (files, fileList) {
      this.$message.warning('单次上传，限制1个文件')
    },
    // 获取资质list，默认push营业执照原件
    _getQualifyType (code) {
      getByCode(code).then(res => {
        this.qualifyType = res.data.data
        this.form.zizhiList.push(this.qualifyType[11]) // 11--默认企业营业执照原件
      })
    },
    // 获取网建产品类型
    _getwjType (code) {
      getByCode(code).then(res => {
        this.form.wjTypeList = res.data.data
      })
    },
    // 添加资质
    addQualify (type) {
      if (!this.selectedQualify.id) {
        this.$message({
          message: '请选择资质类型',
          type: 'error'
        })
        return
      }
      this.form.zizhiList.push(this.selectedQualify)
    },
    // 合同
    _getMyContract (type1, type2, type3, type4) {
      type1 && getMyContract(type1, this.USER_ID).then(res => {
        this.contract.newBdOrderNumber = res.data[0].data
      })
      type2 && getMyContract(type2, this.USER_ID).then(res => {
        this.contract.bdOrderNumber = res.data[0].data
      })
      type3 && getMyContract(type3, this.USER_ID).then(res => {
        this.contract.bdProxy = res.data[0].data
      })
      type4 && getMyContract(type4, this.USER_ID).then(res => {
        this.contract.bdServiceProtocol = res.data[0].data
      })
    }
  }
}

export const orderDeal = { // 订单处理
  computed: {
    _moneyInfo () { // 未处理过的12数组
      return this.moneyInfo
    }
  },
  data () {
    return {
      payList: [], // groupBy处理过的12数组
      refuseRemark: '',
      url: '',
      backStepSN: 10,
      backName: '商务',
      backNodeList: [], // 可驳回节点
      dispatchRoleList: [], // 可派单角色
      next_uid: '', // 下一步派单id
      next_name: '', // 下一步派单人
      backValue: '10#商务',
      dispatchValue: ''
    }
  },
  methods: {
    // 处理payList数组[12]
    _getPayList () {
      // groupBy,根据type合并value和profit
      let tempArr = groupBy(this._moneyInfo, function (item) {
        return [item.type]
      })
      tempArr.forEach(val => {
        let sumValue = 0
        let sumCount = 0
        let sumProfit = 0
        val.forEach(item => {
          sumValue += parseFloat(item.value)
          sumCount += parseFloat(item.count)
          sumProfit += parseFloat(item.profit)
          val[0].count = sumCount.toFixed(2)
          val[0].value = sumValue.toFixed(2)
          val[0].profit = sumProfit.toFixed(2)
          val[0].typeAndBsid = val[0].receivetype + '#' + val[0].bsid
          this.payList.push(val[0])
        })
      })
      console.log(this.payList)
    },
    _getUrl () { // 获取url
      if (this.pid === 'BAITUI') {
        this.url = '/wf.do?go'
      } else if (this.pid === 'WEBSITE') {
        this.url = '/wf.do?WebSite'
      } else if (this.pid === 'ZTC') {
        this.url = '/wf.do?goZTC'
      }
    },
    // 获取可驳回节点
    _getBackNode (sn, cpid) {
      let url = '/BT.do?jump'
      let params = {
        sn: sn,
        cpid: cpid
      }
      this.$get(url, params).then(res => {
        this.backNodeList = res.data ? res.data.data : []
      })
    },
    // 获取可派单角色
    _getDispatchRole (sn, pid) {
      let url = '/order.do?send'
      let params = {
        sn: sn,
        pid: pid
      }
      this.$get(url, params).then(res => {
        this.dispatchRoleList = res.data[0].data || []
      })
    },
    _getFromVal () {
      switch (this.sn) {
        case 20:
        {
          return {
            remark: this.refuseRemark
          }
        }
        case 100:
        {
          return {
            remark_money: '',
            receivetype: '',
            receivetime: '',
            allpay: this.allReceive,
            remark: this.refuseRemark,
            remark_end: ''
          }
        }
        case 200:
        {
          return {
            remark: this.refuseRemark
          }
        }
        case 210:
        {
          return null
        }
        case 220:
        {
          return {
            remark: this.refuseRemark
          }
        }
        case 230:
        {
          return null
        }
        case 260:
        {
          return {
            // todo
            // baiduID: this.baiduID || undefined,
            // baiduAccount: this.baiduAccount || undefined,
            // preDeposit: this.preDeposit || undefined,
            // applyFortime: this.applyFortime || undefined,
            // proxyid: this.proxyid || undefined
          }
        }
        case 170:
        {
          return {
            // todo
            // baiduID: this.baiduID || undefined,
            // baiduAccount: this.baiduAccount || undefined,
            // preDeposit: this.preDeposit || undefined,
            // applyFortime: this.applyFortime || undefined,
            // proxyid: this.proxyid || undefined
          }
        }
        case 310:
        {
          return {
            // todo
            // addMoney: this.addMoney,
            // addmoney_time: this.addmoney_time
          }
        }
      }
    },
    // 驳回订单
    refuse () {
      if (!this.refuseRemark) {
        this.$message({
          type: 'warning',
          message: '请填写驳回理由！'
        })
        return
      }
      let params = {
        cpid: this.templateInfo.cpid,
        yn: 6,
        sn: this.templateInfo.sn,
        go_sn: (this.backValue || '').split('#')[0] || this.backStepSN,
        from_val: this.templateInfo.from_val,
        backname: (this.backValue || '').split('#')[1] || this.backName,
        remark: this.refuseRemark
      }
      console.log(params)
      this.$confirm('确定驳回此订单吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post(this.url, params).then(res => {
            if (res.data[0].success) {
              this.$router.push({
                path: '/indexPage/orderPending',
                query: { data: 'fromDetail' }
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 审核通过
    pass () {
      if (this.sn === 100) {
        this.payList.forEach(val => {
          val.receivetype = (val.typeAndBsid || '').split('#')[0]
          val.bsid = (val.typeAndBsid || '').split('#')[1]
        })
        console.log(this.payList)
        this.remark =
        '百度订单金额：' + this.moneyRecord.sum + '----' + '\n' + '到款金额：'
        this.orderFlowDatas.forEach(val => {
          val.split.forEach(item => {
            if (this.curid === item.curid) {
              this.remark +=
              item.split_amount +
              '----' +
              val.code_desc +
              '----' +
              timeFormat(val.tm) + ','
            }
          })
        })
        this.remark += '。 提单时间：' + timeFormat(this.billTime)
        console.log(this.remark)
        this.payList.forEach(item => {
          if (!item.producttype || !item.count || !item.receivetype || !item.receivetime || !this.billTime) {
            this.$message({
              type: 'warning',
              message: '请完善到款信息'
            })
            throw new Error('ignore')
          }
        })
      if (this.allReceive && this.totalReceive != this.orderInfo.amount_real.toFixed(2)) { //eslint-disable-line
          this.$message({
            type: 'warning',
            message: '请确保实际到账金额等于总到金额'
          })
          return
        }
      }
      if (this.sn === 210) {
        if (!this.dispatchValue) {
          this.$message({
            type: 'warning',
            message: '请选择派单角色！'
          })
          return
        }
        this.next_uid = (this.dispatchValue || '').split('#')[0]
        this.next_name = (this.dispatchValue || '').split('#')[1]
      }
      let params = {
        curId: this.moneyRecord.id,
        curid: this.orderInfo.curid,
        cpid: this.templateInfo.cpid,
        yn: 1,
        userid: this.originUser.id,
        sn: this.sn,
        companylogid: this.moneyRecord.companylogid,
        name: this.templateInfo.name,
        order_id: this.orderInfo.id, // 订单id
        con_id: this.orderInfo.con_id,
        con_id2: this.orderInfo.con_id2,
        con_id3: this.orderInfo.con_id3,
        contractid: [this.orderInfo.con_id],
        custom_type: this.orderInfo.custom_type, // 新，老客户
        invoice_type: this.orderInfo.invoice_type, // 发票类型
        invoice_title: this.orderInfo.invoice_title, // 发票名称
        invoice_addr: this.orderInfo.invoice_addr, // 发票地址
        amount: this.orderInfo.amount,
        amount_real: this.totalReceive || 0,
        gross_profit: this.profit || 0,
        remark_order: this.orderInfo.remark,
        pcwebsite: this.orderInfo.pcwebsite, // PC站
        mobilewebsite: this.orderInfo.mobilewebsite, // 手机站
        companyaddress: this.orderInfo.companyaddress,
        // order_attr: '',
        next_uid: this.next_uid,
        nextname: this.next_name,
        from_val: this._getFromVal(),
        baiduaccount: this.orderInfo.baiducount,
        baiduid: this.orderInfo.baiduid,
        proxyid: this.orderInfo.proxyid,
        dscd: parseFloat(this.orderInfo.dscd || 0), // 大搜冲单金额
        xxlcd: parseFloat(this.orderInfo.xxlcd || 0), // 信息流冲单金额
        applytime: this.orderInfo.applytime,
        applyremark: '',
        remark: this.refuseRemark,
        audittype: this.orderInfo.audittype,
        addmoneytime: '',
        receivekind: this.common ? '0' : '10',
        orderreceive: this.payList,
        receive: this.payList,
        ttype: this.invoiceInfo ? this.invoiceInfo.ttype : '' || '0',
        invoiceid: this.invoiceInfo ? this.invoiceInfo.id : '', // 发票信息id
        receiveaccount: this.orderInfo.receiveaccount, // 对公账户开户行
        receivebank: this.orderInfo.receivebank, // 对公账户开户行
        order_log: this.remark,
        billtime: this.billTime
      }
      if (this.orderInfo.con_id2) {
        params.contractid.push(this.orderInfo.con_id2)
      }
      if (this.orderInfo.con_id3) {
        params.contractid.push(this.orderInfo.con_id3)
      }
      console.log(params)
      this.$post(this.url, params).then(res => {
        if (res.data[0].success) {
          this.$router.push({
            path: '/indexPage/orderPending',
            query: { data: 'fromDetail' }
          })
        }
      })
    }
  }
}

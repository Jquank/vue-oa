import {
  getByCode,
  getMyContract
} from 'api/getOptions'
import {
  groupBy
} from 'common/js/utils'
import {
  timeFormat
} from 'common/js/filters'
import {
  productType,
  currency
} from './filters'
import Viewer from 'viewerjs'
export const mobileFit = { // 移动端适配
  methods: {
    // element表单labelWidth
    _labelWidth (num = 50) {
      let viewWidth = document.documentElement.clientWidth
      if (viewWidth && viewWidth < 768) {
        this.labelWidth = num + 'px'
        if (this.mobileMark === false) {
          this.mobileMark = true
        }
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
    upChange (id) { // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      setTimeout(() => {
        if (this.viewer) {
          this.viewer.destroy()
        }
        this.viewer = new Viewer(document.getElementById(id), {
        })
      }, 300)
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
        this.qualifyType.forEach(val => {
          if (val.code_desc === '企业营业执照原件') {
            this.form.zizhiList.push(val)
          }
        })
        // this.form.zizhiList.push(this.qualifyType[11]) // 11--默认企业营业执照原件
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
    },
    _applyAddMoneyTotal () { // 加款金额总和，含冲单费
      let sum = 0
      this.payList.forEach(val => {
        if (val.type < 500) {
          sum += parseFloat(val._value || 0)
        }
      })
      sum += parseFloat(this.orderInfo.dscd || 0) + parseFloat(this.orderInfo.xxlcd || 0)
      return sum
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
      dispatchValue: '',
      countTotal: 0, // count之和，预存款金额
      webOrderRemark: '' // 网建经理派单备注
    }
  },
  methods: {
    // 处理payList数组[12]
    _getPayList () {
      // groupBy,根据type合并value和profit
      let tempArr = groupBy(this._moneyInfo, function (item) {
        return [item.type]
      })
      console.log(tempArr)
      tempArr.forEach(val => {
        let sumValue = 0
        let sumCount = 0
        let sumProfit = 0
        val.forEach(item => {
          sumValue += parseFloat(item.value)
          sumCount += parseFloat(item.count)
          if (item.type < 500) {
            this.countTotal += parseFloat(item.count)
          }
          sumProfit += parseFloat(item.profit)
          val[0].count = sumCount.toFixed(2)
          val[0].value = sumValue.toFixed(2)
          val[0].profit = sumProfit.toFixed(2)
          val[0].add_money = parseFloat(item.add_money || 0).toFixed(2)
          val[0].true_value = parseFloat(item.true_value || 0).toFixed(2)
          this.$set(val[0], '_value', 0) // 触发vue的响应式（setter,getter）
        })
        this.payList.push(val[0])
      })
      console.log(this.payList)
    },
    _getUrl () { // 获取url
      this.url = '/wf.do?go'
      // if (this.pid === 'BAITUI') {
      //   this.url = '/wf.do?go'
      // } else if (this.pid === 'WEBSITE') {
      //   this.url = '/wf.do?WebSite'
      // } else if (this.pid === 'ZTC2') {
      //   this.url = '/wf.do?goZTC'
      // }
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
        if (res.data.length > 1) {
          this.userList1 = res.data[1].data
        }
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
            baiduid: this.orderInfo.baiduid || undefined,
            baiducount: this.orderInfo.baiducount || undefined,
            applytime: this.orderInfo.applytime || undefined,
            proxyid: this.orderInfo.proxyid || undefined
          }
        }
        case 170:
        {
          return {
            baiduid: this.orderInfo.baiduid || undefined,
            baiducount: this.orderInfo.baiducount || undefined,
            preDeposit: this.preDeposit || undefined,
            applytime: this.orderInfo.applytime || undefined,
            proxyid: this.orderInfo.proxyid || undefined
          }
        }
        case 310:
        {
          return {
            addMoney: '',
            addmoney_time: ''
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
              this.$message.success('已驳回！')
              this.$router.push({
                path: '/indexPage/orderPending',
                query: {
                  data: 'fromDetail'
                }
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
      if (this.sn === 305) {
        this.payList.forEach(val => {
          val.bsid = (val.receivetype || '').split('#')[1]
          val.receivetype = (val.receivetype || '').split('#')[0]
        })
      }
      if (this.sn === 100) {
        this.payList.forEach(val => {
          val.bsid = (val.receivetype || '').split('#')[1]
          val.receivetype = (val.receivetype || '').split('#')[0]
        })
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
        if (this.pid_ka !== 'KA') {
          console.log(this.payList)
          for (let i = 0; i < this.payList.length; i++) {
            let item = this.payList[i]
            if (!item.producttype || (!item.count && item.count !== 0) || (!item.receivetype && item.receivetype !== 0) || !item.receivetime || !this.billTime) {
              this.$message({
                type: 'warning',
                message: '请完善到款信息或提单时间'
              })
              return
            }
          }
        }
        if (this.pid !== 'WEBSITE'&&this.pid !== 'ZTC_WEBSITE'&&this.allReceive && this.totalReceive != this.orderInfo.amount_real.toFixed(2)) { //eslint-disable-line
          this.$message({
            type: 'warning',
            message: '请确保实际到账金额等于总到金额'
          })
          return
        }
      }
      const snArr = [160, 210, 220, 230, 320, 400, 410]
      if (snArr.includes(this.sn)) {
        if (!this.dispatchValue) {
          this.$message({
            type: 'warning',
            message: '请选择派单角色！'
          })
          return
        }
      }
      this.next_uid = (this.dispatchValue || '').split('#')[0]
      this.next_name = (this.dispatchValue || '').split('#')[1]
      if (this.pid === 'WEBSITE' || this.pid === 'ZTC_WEBSITE') {
        // 网开空域
        if (this.sn === 240) {
          if (!this.newSpace || !this.newSpaceName) {
            this.$message.warning('请填写域名信息！')
            return
          }
        }
        if (this.sn === 260) {
          // if (!this.documenter || !this.designer) {
          //   this.$message.warning('请选择资料员和设计师！')
          //   return
          // }
          this.next_uid = [this.documenter.id, this.designer.id].toString()
          this.webOrderRemark = `网建经理派单至:资料员-${this.documenter.name},设计师-${this.designer.name}；`
        }
        if (this.sn === 280 || this.sn === 300) {
          if (!this.browseAddr) {
            this.$message.warning('请填写访问地址！')
            return
          }
        }
      } else {
        if (this.sn === 260 || this.sn === 170) {
          if (this.pid !== 'PZ') {
            if (!this.orderInfo.baiduid || !this.orderInfo.baiducount || !this.orderInfo.proxyid || !this.orderInfo.applytime) {
              this.$message({
                type: 'warning',
                message: '请填写账户信息！'
              })
              return
            }
          }
          this.remark = '账户ID：' + this.orderInfo.baiduid +
              '；账户名：' + this.orderInfo.baiducount +
              '；代理账号：' + this.orderInfo.proxyid +
              '。申请加款时间：' + this.orderInfo.applytime + '。'
          this.payList.forEach(val => {
            if (val.type < 100 && val.type !== 8) {
              this.remark += productType(val.type) + '加款：' + currency(val._value || 0) + '；'
            }
          })
            if (this.orderInfo.dscd != 0) { // eslint-disable-line
            this.remark += '大搜冲单费：' + this.orderInfo.dscd
          }
            if (this.orderInfo.xxlcd != 0) { // eslint-disable-line
            this.remark += '信息流冲单费：' + this.orderInfo.xxlcd
          }
        }
      }
      let params = {
        pid: this.pid,
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
        invoice_status: this.orderInfo.invoice_status, // 是否需要发票
        invoice_title: this.orderInfo.invoice_title, // 发票名称
        invoice_addr: this.orderInfo.invoice_addr, // 发票地址
        amount: this.moneyRecord.service,
        amount_real: this.moneyRecord.sum,
        gross_profit: this.profit || 0,
        remark_order: this.orderInfo.remark,
        pcwebsite: this.orderInfo.pcwebsite, // PC站
        mobilewebsite: this.orderInfo.mobilewebsite, // 手机站
        companyaddress: this.orderInfo.companyaddress,
        // order_attr: '',
        next_uid: this.next_uid,
        nextname: this.next_name,
        from_val: this._getFromVal(),
        baiduaccount: this.orderInfo.baiduaccount,
        baiduid: this.orderInfo.baiduid,
        proxyid: this.orderInfo.proxyid,
        dscd: parseFloat(this.orderInfo.dscd || 0), // 大搜冲单金额
        xxlcd: parseFloat(this.orderInfo.xxlcd || 0), // 信息流冲单金额
        applytime: this.orderInfo.applytime,
        applyremark: '',
        remark: this.refuseRemark,
        audittype: this.orderInfo.audittype,
        addmoneytime: this.addMoneyTime || '',
        receivekind: this.common ? '0' : '10',
        orderreceive: this.payList,
        receive: this.payList,
        ttype: this.invoiceInfo ? this.invoiceInfo.ttype : '' || '0',
        invoiceid: this.invoiceInfo ? this.invoiceInfo.id : '', // 发票信息id
        order_log: this.remark,
        billtime: this.billTime,
        newzoneinfo: this.newSpaceName,
        newdomaininfo: this.newSpace,
        Designer: this.webOrderRemark,
        visitwebsite: this.browseAddr,
        quickwebsite: this.cdAddr,
        websitetype: this.orderInfo.websitetype,

        check_type: this.orderInfo.check_type,
        store_type: this.orderInfo.store_type,
        receiveaccount: this.orderInfo.receiveaccount, // 对公账户开户行
        receivebank: this.orderInfo.receivebank, // 对公账户开户行
        collectName: this.orderInfo.collect_name,
        collectBank: this.orderInfo.collect_bank,
        collectAccount: this.orderInfo.collect_account,
        finalSite: this.orderInfo.final_site
      }
      if (this.orderInfo.con_id2) {
        params.contractid.push(this.orderInfo.con_id2)
      }
      if (this.orderInfo.con_id3) {
        params.contractid.push(this.orderInfo.con_id3)
      }
      if (this.sn === 260) {
        let _params = {
          baiduid: this.orderInfo.baiduid,
          baiduaccount: this.orderInfo.baiduaccount,
          proxyid: this.orderInfo.proxyid,
          applytime: this.orderInfo.applytime
        }
        params = Object.assign({}, params, _params)
      }
      if (this.sn === 260 && this.pid !== 'WEBSITE' && this.pid !== 'ZTC_WEBSITE') {
        this.call('订单预存款金额为：' + this.countTotal + '，加款金额为：' + this._applyAddMoneyTotal +
          '，请确认是否提交？', params)
        return
      }
      this.call('请确认是否提交？', params)
    },
    call (msg, params) {
      this.$confirm(msg, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post(this.url, params).then(res => {
            if (res.data[0].success) {
              this.$message.success('审核通过！')
              if (this.tmark === '转户出纳') {
                this.search()
              } else {
                this.$router.push({
                  path: '/indexPage/orderPending',
                  query: {
                    data: 'fromDetail'
                  }
                })
              }
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }
  }
}

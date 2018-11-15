export const navList = [
  {
    id: '2u',
    fontIcon: 'fa fa-cogs',
    text: '系统配置',
    cList: [{
      cid: '3d',
      to: '/indexPage/rule',
      text: '权限设置'
    },
    {
      cid: '3y',
      to: '/indexPage/auth',
      text: '角色设置'
    },
    {
      cid: '5z',
      to: '/indexPage/systemCycle',
      text: '时长设置'
    },
    {
      cid: '64',
      to: '/indexPage/departSetNum',
      text: '部门配额'
    },
    {
      cid: '5d',
      to: '/indexPage/accountManage',
      text: '账号管理'
    },
    {
      cid: '5n',
      to: '/indexPage/news',
      text: '公告管理'
    },
    {
      cid: '6y',
      to: '/indexPage/activity',
      text: '活动/产品类型'
    }
    ]
  },
  {
    id: '3v',
    fontIcon: 'fa fa-street-view',
    text: '人员管理',
    cList: [
      {
        cid: '3w',
        to: '/indexPage/addUser',
        text: '新增人员'
      },
      {
        cid: '3x',
        to: '/indexPage/userList',
        text: '人员列表'
      }
    ]
  },
  {
    id: '3h',
    fontIcon: 'fa fa-user',
    text: '客户管理',
    cList: [{
      cid: '3i',
      to: '/indexPage/addCus',
      text: '新增客户'
    },
    {
      cid: '3j',
      to: '/indexPage/applyCus',
      text: '申领客户'
    },
    {
      cid: '3s',
      to: '/indexPage/myCus',
      text: '我的客户'
    },
    {
      cid: '3u',
      to: '/indexPage/visitRecord',
      text: '出访记录'
    },
    {
      cid: '62',
      to: '/indexPage/followRecord',
      text: '跟进记录'
    },
    {
      cid: '65',
      to: '/indexPage/importCus',
      text: '市场部导入'
    }
    ]
  },
  {
    id: '1',
    fontIcon: 'fa fa-calendar-check-o',
    text: '客户审核',
    cList: [
      {
        cid: '60',
        to: '/indexPage/dealCheck',
        text: '审核处理'
      },
      {
        cid: '61',
        to: '/indexPage/checkRecord',
        text: '审核记录'
      },
      {
        cid: '3p',
        to: '/indexPage/cusInfo',
        text: '客户信息修改'
      },
      {
        cid: '3f',
        to: '/indexPage/cusPoolManage',
        text: '客户库管理'
      }
    ]
  },
  {
    id: '40',
    fontIcon: 'fa fa-search-plus',
    text: '客户搜索',
    cList: [
      {
        // todo
        cid: '1000',
        to: '/indexPage/cusSearch',
        text: '搜索客户'
      },
      {
        cid: '72',
        to: '/indexPage/cusOut',
        text: '客户转出'
      }
    ]
  },
  {
    id: '42',
    fontIcon: 'fa fa-file',
    text: '合同管理',
    cList: [
      {
        cid: '47',
        to: '/indexPage/allotContract',
        text: '分配合同'
      },
      {
        cid: '44',
        to: '/indexPage/contractList',
        text: '合同列表'
      },
      {
        cid: '48',
        to: '/indexPage/applyContract',
        text: '合同申请'
      }
    ]
  },
  {
    id: '4f',
    fontIcon: 'fa fa-cny',
    text: '到款管理',
    cList: [{
      cid: '4g',
      to: '/indexPage/moneyRecord',
      text: '到款记录'
    },
    {
      cid: '4i',
      to: '/indexPage/bankflowList',
      text: '银行流水列表'
    },
    {
      cid: '6q',
      to: '/indexPage/myFlow',
      text: '我的银行流水'
    },
    {
      cid: '4h',
      to: '/indexPage/moneyCount',
      text: '到款统计'
    }
    ]
  },
  {
    id: 'y',
    fontIcon: 'fa fa-clipboard',
    text: '订单管理',
    cList: [
      { cid: 'z', to: '/indexPage/orderPending', text: '待处理订单' },
      { cid: '45', to: '/indexPage/orderProcessed', text: '已处理订单' },
      // { cid: '46', to: '/indexPage/orderList', text: '订单列表' },
      { cid: '49', to: '/indexPage/addBaiduOrder', text: '新增百度订单' },
      { cid: '4b', to: '/indexPage/addWjOrder', text: '新增网建订单' },
      { cid: '4c', to: '/indexPage/addZtcOrder', text: '新增直通车订单' },
      { cid: '8a', to: '/indexPage/addKaOrder', text: '新增大客订单' }
    ]
  },
  {
    id: '5f',
    fontIcon: 'fa fa-credit-card',
    text: '续费管理',
    cList: [
      { cid: '5i', to: '/indexPage/renewApply', text: '续费申请' },
      { cid: '5h', to: '/indexPage/renewList', text: '续费列表' },
      { cid: '5j', to: '/indexPage/renewCheck', text: '续费审核' },
      { cid: '5k', to: '/indexPage/renewReceive', text: '续费收单' },
      { cid: '5l', to: '/indexPage/renewList', text: '转户出纳' },
      { cid: '5m', to: '/indexPage/renewList', text: '续费加款' },
      { cid: '6p', to: '/indexPage/renewList', text: '转出出纳' }
    ]
  },
  {
    id: '4v',
    fontIcon: 'fa fa-newspaper-o',
    text: '发票管理',
    cList: [
      { cid: '7w', to: '/indexPage/invoiceList', text: '发票列表' },
      { cid: '4w', to: '/indexPage/invoicePending', text: '待开发票' },
      { cid: '4z', to: '/indexPage/invoiceHandled', text: '已开发票' },
      { cid: '6e', to: '/indexPage/invoiceSend', text: '邮寄发票' },
      { cid: '4x', to: '/indexPage/invoiceCheck', text: '开票审核' },
      { cid: '6v', to: '/indexPage/chargeOffCheck', text: '销账审核' }
    ]
  },
  {
    id: '4e',
    fontIcon: 'fa fa-money',
    text: '工资管理',
    cList: [
      // todo
      { cid: '1100', to: '/indexPage/salaryList', text: '工资列表' },
      { cid: '4q', to: '/indexPage/salaryList', text: '工资异常' }
    ]
  },
  {
    id: '12',
    fontIcon: 'fa fa-line-chart',
    text: '图表',
    cList: [
      { cid: '140', to: '/indexPage/charts', text: '图表实例' },
      { cid: '141', to: '/indexPage/editTable', text: '编辑表格' }
    ]
  },
  {
    id: '14',
    fontIcon: 'fa fa-line-chart',
    text: '报表统计',
    cList: [
      { cid: '7e', to: '/indexPage/REP_BACUS', text: '保A客户统计' },
      // { cid: 141, to: '/indexPage/REP_RECEIVE', text: '到款统计' },
      { cid: '7g', to: '/indexPage/REP_ORDER', text: '订单统计' },
      { cid: '7a', to: '/indexPage/REP_KHXQ', text: '薪资计算业绩' },
      { cid: '7b', to: '/indexPage/REP_JYJ', text: '外审业绩时间' },
      { cid: '56', to: '/indexPage/moneyChart', text: '资金明细表' },
      { cid: '7j', to: '/indexPage/aheadInvoice', text: '提前开票/加款汇总' },
      { cid: '7l', to: '/indexPage/REP_MONEY_ORDER', text: '新开活动明细' },
      { cid: '7m', to: '/indexPage/OrderReport', text: '岗位效能数据' },
      { cid: '7s', to: '/indexPage/REP_ZJJLDC', text: '质检经理导出表' },
      { cid: '7t', to: '/indexPage/REP_PERCENTAGE', text: '提成统计' },
      { cid: '7u', to: '/indexPage/REP_BUSINESS_RENEW', text: '商务续费统计' },
      { cid: '7v', to: '/indexPage/REP_BUSINESS_ACHIEVEMENT', text: '商务业绩查看' },
      { cid: '81', to: '/indexPage/branchAdd', text: '分公司加款' }
    ]
  },
  {
    id: '7o',
    fontIcon: 'fa fa-phone',
    text: '呼叫中心',
    cList: [
      { cid: '7p', to: '/indexPage/phoneChange', text: '坐席分机修改' },
      { cid: '7p', to: '/indexPage/history', text: '联系历史记录' },
      { cid: '7p', to: '/indexPage/missedCall', text: '未接来电' },
      { cid: '7q', to: '/indexPage/callReport', text: '呼叫中心报表' },
      { cid: '7q', to: '/indexPage/phoneWatch', text: '综合话务监控' },
      { cid: '7q', to: '/indexPage/acdWatch', text: 'ACD监控' },
      { cid: '7q', to: '/indexPage/workerWatch', text: '员工工作情况' },
      { cid: '7r', to: '/indexPage/blackList', text: '黑名单管理' },
      { cid: '7p', to: '/indexPage/callCenter', text: '拨号中心' }
    ]
  }
]

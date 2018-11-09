export const navList = [
  {
    id: 1,
    fontIcon: 'fa fa-cogs',
    text: '系统配置',
    cList: [{
      cid: 30,
      to: '/indexPage/rule',
      text: '权限设置'
    },
    {
      cid: 31,
      to: '/indexPage/auth',
      text: '角色设置'
    },
    {
      cid: 32,
      to: '/indexPage/systemCycle',
      text: '时长设置'
    },
    {
      cid: 33,
      to: '/indexPage/departSetNum',
      text: '部门配额'
    },
    {
      cid: 34,
      to: '/indexPage/accountManage',
      text: '账号管理'
    },
    {
      cid: 35,
      to: '/indexPage/news',
      text: '公告管理'
    },
    {
      cid: 36,
      to: '/indexPage/activity',
      text: '活动/产品类型'
    }
    ]
  },
  {
    id: 2,
    fontIcon: 'fa fa-street-view',
    text: '人员管理',
    cList: [
      {
        cid: 40,
        to: '/indexPage/addUser',
        text: '新增人员'
      },
      {
        cid: 41,
        to: '/indexPage/userList',
        text: '人员列表'
      }
    ]
  },
  {
    id: 3,
    fontIcon: 'fa fa-user',
    text: '客户管理',
    cList: [{
      cid: 50,
      to: '/indexPage/addCus',
      text: '新增客户'
    },
    {
      cid: 51,
      to: '/indexPage/applyCus',
      text: '申领客户'
    },
    {
      cid: 52,
      to: '/indexPage/myCus',
      text: '我的客户'
    },
    {
      cid: 53,
      to: '/indexPage/visitRecord',
      text: '出访记录'
    },
    {
      cid: 54,
      to: '/indexPage/followRecord',
      text: '跟进记录'
    },
    {
      cid: 55,
      to: '/indexPage/importCus',
      text: '市场部导入'
    }
    ]
  },
  {
    id: 4,
    fontIcon: 'fa fa-calendar-check-o',
    text: '客户审核',
    cList: [
      {
        cid: 40,
        to: '/indexPage/dealCheck',
        text: '审核处理'
      },
      {
        cid: 41,
        to: '/indexPage/checkRecord',
        text: '审核记录'
      },
      {
        cid: 42,
        to: '/indexPage/cusInfo',
        text: '客户信息修改'
      },
      {
        cid: 43,
        to: '/indexPage/cusPoolManage',
        text: '客户库管理'
      }
    ]
  },
  {
    id: 5,
    fontIcon: 'fa fa-search-plus',
    text: '客户搜索',
    cList: [
      {
        cid: 50,
        to: '/indexPage/cusSearch',
        text: '搜索客户'
      },
      {
        cid: 51,
        to: '/indexPage/cusOut',
        text: '客户转出'
      }
    ]
  },
  {
    id: 6,
    fontIcon: 'fa fa-file',
    text: '合同管理',
    cList: [
      {
        cid: 61,
        to: '/indexPage/allotContract',
        text: '分配合同'
      },
      {
        cid: 62,
        to: '/indexPage/contractList',
        text: '合同列表'
      },
      {
        cid: 63,
        to: '/indexPage/applyContract',
        text: '合同申请'
      }
    ]
  },
  {
    id: 7,
    fontIcon: 'fa fa-cny',
    text: '到款管理',
    cList: [{
      cid: 90,
      to: '/indexPage/moneyRecord',
      text: '到款记录'
    },
    {
      cid: 91,
      to: '/indexPage/bankflowList',
      text: '银行流水列表'
    },
    {
      cid: 92,
      to: '/indexPage/myFlow',
      text: '我的银行流水'
    },
    {
      cid: 93,
      to: '/indexPage/moneyCount',
      text: '到款统计'
    }
    ]
  },
  {
    id: 8,
    fontIcon: 'fa fa-clipboard',
    text: '订单管理',
    cList: [
      { cid: 100, to: '/indexPage/orderPending', text: '待处理订单' },
      { cid: 101, to: '/indexPage/orderProcessed', text: '已处理订单' },
      // { cid: 102, to: '/indexPage/orderList', text: '订单列表' },
      { cid: 104, to: '/indexPage/addBaiduOrder', text: '新增百度订单' },
      { cid: 105, to: '/indexPage/addWjOrder', text: '新增网建订单' },
      { cid: 106, to: '/indexPage/addZtcOrder', text: '新增直通车订单' }
    ]
  },
  {
    id: 9,
    fontIcon: 'fa fa-credit-card',
    text: '续费管理',
    cList: [
      { cid: 111, to: '/indexPage/cusList', text: '客户列表' },
      { cid: 112, to: '/indexPage/renewApply', text: '续费申请' },
      { cid: 113, to: '/indexPage/renewList', text: '续费列表' }
    ]
  },
  {
    id: 10,
    fontIcon: 'fa fa-newspaper-o',
    text: '发票管理',
    cList: [
      { cid: 121, to: '/indexPage/invoiceList', text: '发票列表' },
      { cid: 122, to: '/indexPage/invoicePending', text: '待开发票' },
      { cid: 123, to: '/indexPage/invoiceHandled', text: '已开发票' },
      { cid: 124, to: '/indexPage/invoiceSend', text: '邮寄发票' },
      { cid: 125, to: '/indexPage/invoiceCheck', text: '开票审核' }
    // { cid: 121, to: "/indexPage/auth", text: "角色设置" },
    // { cid: 122, to: "/indexPage/systemCycle", text: "时长设置" },
    // { cid: 123, to: "/indexPage/departSetNum", text: "部门配额" },
    // { cid: 124, to: "/indexPage/accountManage", text: "账号管理" },
    // { cid: 125, to: "/indexPage/news", text: "公告管理" },
    ]
  },
  {
    id: 11,
    fontIcon: 'fa fa-money',
    text: '工资管理',
    cList: [
      { cid: 130, to: '/indexPage/salaryList', text: '工资列表' }
    ]
  },
  {
    id: 12,
    fontIcon: 'fa fa-line-chart',
    text: '图表',
    cList: [
      { cid: 140, to: '/indexPage/charts', text: '图表实例' },
      { cid: 141, to: '/indexPage/editTable', text: '编辑表格' }
    ]
  },
  {
    id: 14,
    fontIcon: 'fa fa-line-chart',
    text: '报表统计',
    cList: [
      { cid: 140, to: '/indexPage/REP_BACUS', text: '保A客户统计' },
      { cid: 141, to: '/indexPage/REP_RECEIVE', text: '到款统计' },
      { cid: 142, to: '/indexPage/REP_ORDER', text: '订单统计' },
      { cid: 143, to: '/indexPage/REP_KHXQ', text: '薪资计算业绩' },
      { cid: 144, to: '/indexPage/REP_JYJ', text: '外审业绩时间' },
      { cid: 145, to: '/indexPage/moneyChart', text: '资金明细表' },
      { cid: 146, to: '/indexPage/aheadInvoice', text: '提前开票/加款汇总' },
      { cid: 147, to: '/indexPage/REP_MONEY_ORDER', text: '新开活动明细' },
      { cid: 148, to: '/indexPage/OrderReport', text: '岗位效能数据' },
      { cid: 149, to: '/indexPage/REP_ZJJLDC', text: '质检经理导出表' },
      { cid: 1491, to: '/indexPage/REP_PERCENTAGE', text: '提成统计' },
      { cid: 1492, to: '/indexPage/REP_BUSINESS_RENEW', text: '商务续费统计' },
      { cid: 1493, to: '/indexPage/REP_BUSINESS_ACHIEVEMENT', text: '商务业绩查看' },
      { cid: 1494, to: '/indexPage/branchAdd', text: '分公司加款' }
    ]
  },
  {
    id: 15,
    fontIcon: 'fa fa-phone',
    text: '呼叫中心',
    cList: [
      { cid: 150, to: '/indexPage/phoneChange', text: '坐席分机修改' },
      { cid: 151, to: '/indexPage/history', text: '联系历史记录' },
      { cid: 152, to: '/indexPage/missedCall', text: '未接来电' },
      { cid: 153, to: '/indexPage/callReport', text: '呼叫中心报表' },
      { cid: 154, to: '/indexPage/phoneWatch', text: '综合话务监控' },
      { cid: 155, to: '/indexPage/acdWatch', text: 'ACD监控' },
      { cid: 156, to: '/indexPage/workerWatch', text: '员工工作情况' },
      { cid: 157, to: '/indexPage/blackList', text: '黑名单管理' },
      { cid: 158, to: '/indexPage/callCenter', text: '拨号中心' }
    ]
  }
]

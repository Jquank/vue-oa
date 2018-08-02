export const serverUrl = 'http://172.16.11.78:8080/BaiJieOA'
export const uploadUrl = 'http://172.16.11.78:8080/upload/c'
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
    }
    ]
  },
  {
    id: 2,
    fontIcon: 'fa fa-street-view',
    text: '人员管理',
    cList: [
    ]
  },
  {
    id: 3,
    fontIcon: 'fa fa-user',
    text: '客户管理',
    cList: [{
      cid: 50,
      to: '/indexPage',
      text: '新增客户'
    },
    {
      cid: 51,
      to: '/indexPage',
      text: '申领客户'
    },
    {
      cid: 52,
      to: '/indexPage/myCustomer',
      text: '我的客户'
    },
    {
      cid: 53,
      to: '/indexPage',
      text: '出访记录'
    },
    {
      cid: 54,
      to: '/indexPage',
      text: '跟进记录'
    },
    {
      cid: 55,
      to: '/indexPage',
      text: '导入客户'
    }
    ]
  },
  {
    id: 4,
    fontIcon: 'fa fa-calendar-check-o',
    text: '客户审核',
    cList: [
    ]
  },
  {
    id: 5,
    fontIcon: 'fa fa-search-plus',
    text: '客户搜索',
    cList: [
    ]
  },
  {
    id: 6,
    fontIcon: 'fa fa-file',
    text: '合同管理',
    cList: [
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
      to: '/indexPage/myBankflow',
      text: '我的银行流水'
    },
    {
      cid: 93,
      to: '/indexPage/moneyCount',
      text: '到款统计'
    },
    {
      cid: 94,
      to: '/indexPage/addFlow',
      text: '录入流水'
    }
    ]
  },
  {
    id: 8,
    fontIcon: 'fa fa-clipboard',
    text: '订单管理',
    cList: [
      { cid: 100, to: '/indexPage/orderPending', text: '待处理订单' },
      // { cid: 101, to: '/indexPage/auth', text: '已处理订单' },
      // { cid: 102, to: '/indexPage/systemCycle', text: '订单列表' },
      // { cid: 103, to: '/indexPage/departSetNum', text: '资金表' },
      { cid: 104, to: '/indexPage/addBaiduOrder', text: '新增百度订单' }
      // { cid: 105, to: '/indexPage/news', text: '新增网建订单' }
    ]
  },
  {
    id: 9,
    fontIcon: 'fa fa-credit-card',
    text: '续费管理',
    cList: [
    ]
  },
  {
    id: 10,
    fontIcon: 'fa fa-newspaper-o',
    text: '发票管理',
    cList: [
      { cid: 120, to: '/indexPage/invoicePending', text: '待开发票' }
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
    ]
  },
  {
    id: 12,
    fontIcon: 'fa fa-line-chart',
    text: '图表',
    cList: [
      { cid: 140, to: '/indexPage/charts', text: '图表实例' },
      { cid: 150, to: '/indexPage/editTable', text: '编辑表格' }
    ]
  }
]

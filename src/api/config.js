export const serverUrl = 'http://172.16.11.72:88'
export const uploadUrl = 'http://172.16.11.72:88/upload/c'
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
      to: '/indexPage/myCustomer',
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
      text: '市场部导入客户'
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
        to: '/indexPage/editCusInfo',
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
        cid: 60,
        to: '/indexPage/addContract',
        text: '新增合同'
      },
      {
        cid: 61,
        to: '/indexPage/allotContract',
        text: '分配合同'
      },
      {
        cid: 60,
        to: '/indexPage/contractList',
        text: '合同列表'
      },
      {
        cid: 61,
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
      { cid: 110, to: '/indexPage/renewApply', text: '续费申请' }
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

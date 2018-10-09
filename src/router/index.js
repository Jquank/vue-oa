/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

import Login from 'components/login/login'
// 首页
import IndexPage from 'components/indexPage/indexPage'
import IndexContent from 'components/indexContent/indexContent'
// 系统配置
import Rule from 'components/systemSetting/rule/rule'
import Auth from 'components/systemSetting/auth/auth'
import SystemCycle from 'components/systemSetting/systemCycle/systemCycle'
import DepartSetNum from 'components/systemSetting/departSetNum/departSetNum'
import AccountManage from 'components/systemSetting/accountManage/accountManage'
import News from 'components/systemSetting/news/news'
import Activity from 'components/systemSetting/activity/activity'
import Editor from 'components/systemSetting/news/editor'
// 人员管理
import AddUser from 'components/userManage/addUser/addUser'
import UserList from 'components/userManage/userList/userList'
// 客户管理
import AddCus from 'components/cusManage/addCus/addCus'
import ApplyCus from 'components/cusManage/applyCus/applyCus'
import ApplyDetail from 'components/cusManage/applyCus/applyDetail'
import MyCus from 'components/cusManage/myCus/myCus'
import MyCusDetail from 'components/cusManage/myCus/myCusDetail'
import VisitRecord from 'components/cusManage/visitRecord/visitRecord'
import FollowRecord from 'components/cusManage/followRecord/followRecord'
import ImportCus from 'components/cusManage/importCus/importCus'
// 客户审核
import DealCheck from 'components/cusCheck/dealCheck/dealCheck'
import CheckDetail from 'components/cusCheck/dealCheck/checkDetail'
import CheckRecord from 'components/cusCheck/checkRecord/checkRecord'
import CusInfo from 'components/cusCheck/cusInfo/cusInfo'
import viewCusInfo from 'components/cusCheck/cusInfo/viewCusInfo'
import CusPoolManage from 'components/cusCheck/cusPoolManage/cusPoolManage'
import ViewCusInfo from 'components/cusCheck/cusPoolManage/viewCusInfo'

// 客户搜索
import CusSearch from 'components/cusSearch/cusSearch/cusSearch'
import CusOut from 'components/cusSearch/cusOut/cusOut'
// 合同管理
import AllotContract from 'components/contract/allotContract/allotContract'
import ContractList from 'components/contract/contractList/contractList'
import ApplyContract from 'components/contract/applyContract/applyContract'
// 续费管理
import RenewApply from 'components/renew/renewApply/renewApply'
import SalaryList from 'components/salary/salaryList'
// 到款管理
import MoneyRecord from 'components/moneyManage/moneyRecord/moneyRecord'
import AddMoney from 'components/moneyManage/moneyRecord/addMoney'
import ViewMoney from 'components/moneyManage/moneyRecord/viewMoney'
import BankflowList from 'components/moneyManage/bankflowList/bankflowList'
import MoneyCount from 'components/moneyManage/moneyCount/moneyCount'
// 订单管理
import AddBaiduOrder from 'components/order/addBaiduOrder/addBaiduOrder'
import OrderPending from 'components/order/orderPending/orderPending'
import ViewDetail from 'components/order/orderPending/viewDetail'
import EditOrder from 'components/order/orderPending/editOrder'
import OrderProcessed from 'components/order/orderProcessed/orderProcessed'

// 发票管理
import InvoicePending from 'components/invoiceManage/invoicePending/invoicePending'

// 图表
import Charts from 'views/charts/charts'
import EditTable from 'views/editTable/editTable'

// import store from '../store'
import cookie from 'js-cookie'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/indexPage',
      component: IndexPage,
      children: [
        {
          path: '',
          redirect: 'indexContent',
          component: IndexContent
        },
        {
          path: 'indexContent',
          name: 'indexContent',
          meta: { text: '首页' },
          component: IndexContent
        },
        // 系统配置
        {
          path: 'rule',
          name: 'rule',
          meta: { text: '权限设置' },
          component: Rule
        },
        {
          path: 'auth',
          name: 'auth',
          meta: { text: '角色设置' },
          component: Auth
        },
        {
          path: 'systemCycle',
          name: 'systemCycle',
          meta: { text: '时长设置' },
          component: SystemCycle
        },
        {
          path: 'departSetNum',
          name: 'departSetNum',
          meta: { text: '部门配额' },
          component: DepartSetNum
        },
        {
          path: 'accountManage',
          name: 'accountManage',
          meta: { text: '账号管理' },
          component: AccountManage
        },
        {
          path: 'news',
          name: 'news',
          meta: { text: '公告管理' },
          component: News,
          children: [
            {
              path: 'editor/:id',
              meta: { text: '编辑公告' },
              component: Editor
            }
          ]
        },
        {
          path: 'activity',
          name: 'activity',
          meta: { text: '活动/产品类型' },
          component: Activity
        },
        // 人员管理
        {
          path: 'addUser',
          name: 'addUser',
          meta: { text: '新增人员' },
          component: AddUser
        },
        {
          path: 'userList',
          name: 'userList',
          meta: { text: '人员列表' },
          component: UserList
        },
        // 客户管理
        {
          path: 'addCus',
          name: 'addCus',
          meta: { text: '新增客户' },
          component: AddCus
        },
        {
          path: 'applyCus',
          name: 'applyCus',
          meta: { text: '申领客户' },
          component: ApplyCus,
          children: [{
            path: ':id',
            meta: { text: '申领详情' },
            component: ApplyDetail
          }]
        },
        {
          path: 'myCus',
          name: 'myCus',
          meta: { text: '我的客户' },
          component: MyCus,
          children: [
            {
              path: ':id',
              meta: { text: '客户详情' },
              component: MyCusDetail
            }
          ]
        },
        {
          path: 'visitRecord',
          name: 'visitRecord',
          meta: { text: '出访记录' },
          component: VisitRecord
        },
        {
          path: 'followRecord',
          name: 'followRecord',
          meta: { text: '跟进记录' },
          component: FollowRecord
        },
        {
          path: 'importCus',
          name: 'importCus',
          meta: { text: '市场部导入客户' },
          component: ImportCus
        },
        // 客户审核
        {
          path: 'dealCheck',
          name: 'dealCheck',
          meta: { text: '审核处理' },
          component: DealCheck,
          children: [
            {
              path: ':id',
              meta: { text: '审核详情' },
              component: CheckDetail
            }
          ]
        },
        {
          path: 'checkRecord',
          name: 'checkRecord',
          meta: { text: '审核记录' },
          component: CheckRecord
        },
        {
          path: 'cusInfo',
          name: 'cusInfo',
          meta: { text: '客户信息修改' },
          component: CusInfo,
          children: [
            {
              path: ':id',
              meta: { text: '修改详情' },
              component: viewCusInfo
            }
          ]
        },
        {
          path: 'cusPoolManage',
          name: 'cusPoolManage',
          meta: { text: '客户库管理' },
          component: CusPoolManage,
          children : [{
            path: ':id',
            meta: { text: '审核详情' },
            component: ViewCusInfo
          }]
        },
        // 客户搜索
        {
          path: 'cusSearch',
          name: 'cusSearch',
          meta: { text: '搜索客户' },
          component: CusSearch
        },
        {
          path: 'cusOut',
          name: 'cusOut',
          meta: { text: '客户转出' },
          component: CusOut
        },
        // 合同管理
        {
          path: 'allotContract',
          name: 'allotContract',
          meta: { text: '分配合同' },
          component: AllotContract
        },
        {
          path: 'contractList',
          name: 'contractList',
          meta: { text: '合同列表' },
          component: ContractList
        },
        {
          path: 'applyContract',
          name: 'applyContract',
          meta: { text: '合同申请' },
          component: ApplyContract
        },
        // 到款管理
        {
          path: 'moneyRecord',
          name: 'moneyRecord',
          meta: { text: '到款记录' },
          component: MoneyRecord,
          children: [
            {
              path: 'add/:id',
              meta: { text: '到款记录/添加到款' },
              component: AddMoney
            },
            {
              path: 'view/:id',
              meta: { text: '到款记录/到款详情' },
              component: ViewMoney
            }
          ]
        },
        {
          path: 'bankflowList',
          name: 'bankflowList',
          meta: { text: '银行流水列表' },
          component: BankflowList
        },
        {
          path: 'moneyCount',
          name: 'moneyCount',
          meta: { text: '到款统计' },
          component: MoneyCount
        },
        // 订单管理
        {
          path: 'orderPending',
          name: 'orderPending',
          meta: { text: '待处理订单' },
          component: OrderPending,
          children: [
            {
              path: 'view/:id',
              meta: { text: '待处理订单/查看订单详情' },
              component: ViewDetail
            },
            {
              path: 'edit/:id',
              meta: { text: '待处理订单/编辑订单' },
              component: EditOrder
            }
          ]
        },
        {
          path: 'orderProcessed',
          name: 'orderProcessed',
          meta: { text: '已处理订单' },
          component: OrderProcessed
        },
        {
          path: 'addBaiduOrder',
          name: 'addBaiduOrder',
          meta: { text: '新增百度订单' },
          component: AddBaiduOrder
        },
        // 续费管理
        {
          path: 'renewApply',
          name: 'renewApply',
          meta: { text: '续费申请' },
          component: RenewApply
        },
        // 发票管理
        {
          path: 'invoicePending',
          name: 'invoicePending',
          meta: { text: '待开发票' },
          component: InvoicePending
        },
        // 工资管理
        {
          path: 'salaryList',
          name: 'salaryList',
          meta: { text: '工资列表' },
          component: SalaryList
        },
        // 图表
        {
          path: 'charts',
          name: 'charts',
          meta: { text: '图表' },
          component: Charts
        },
        {
          path: 'editTable',
          name: 'editTable',
          meta: { text: '可编辑的表格' },
          component: EditTable
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      let main = document.getElementById('main') //定位滚动条
      main.scrollLeft = 0
      main.scrollTop = 0
    }
  }
})

import Progress from 'nprogress' //进度条
Progress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  const isLogin = cookie.get('token')
  // todo
  // const isLogin = true
  if (to.name !== 'login') {
    if (!isLogin) {
      next({
        path: '/login'
      })
      Progress.done()
    } else {
      if (to.name === from.name) {
        // 防止刷新的时候加载两次组件
        next(false)
      } else {
        Progress.start()
        next()
      }
    }
  } else {
    next()
    Progress.done()
  }
})
router.afterEach((to, from) => {
  Progress.done()
})

export default router

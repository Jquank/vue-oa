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
import Editor from 'components/systemSetting/news/editor'
// 人员管理
import AddUser from 'components/userManage/addUser/addUser'
import UserList from 'components/userManage/userList/userList'
// 客户管理
import AddCus from 'components/customerManage/addCus/addCus'
import ApplyCus from 'components/customerManage/applyCus/applyCus'
import MyCustomer from 'components/customerManage/myCustomer/myCustomer'
import MyCusDetail from 'components/customerManage/myCustomer/myCusDetail'
import VisitRecord from 'components/customerManage/visitRecord/visitRecord'
import FollowRecord from 'components/customerManage/followRecord/followRecord'
import ImportCus from 'components/customerManage/importCus/importCus'
// 客户审核
import CustomerCheck from 'components/customerCheck/customerCheck'
import CustomerSearch from 'components/customerSearch/customerSearch'
import Contract from 'components/contract/contract'
// 续费管理
import RenewApply from 'components/renew/renewApply/renewApply'
import Salary from 'components/salary/salary'
// 到款管理
import BankflowList from 'components/moneyManage/bankflowList/bankflowList'
// 订单管理
import AddBaiduOrder from 'components/order/addBaiduOrder/addBaiduOrder'
import OrderPending from 'components/order/orderPending/orderPending'
import ViewDetail from 'components/order/orderPending/viewDetail'
import EditOrder from 'components/order/orderPending/editOrder'

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
      component: IndexPage
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
        // 人员管理
        {
          path: 'addUser',
          name: 'addUser',
          meta: { text: '新增人员' },
          component: AddUser,
        },
        {
          path: 'userList',
          name: 'userList',
          meta: { text: '人员列表' },
          component: UserList,
        },
        // 客户管理
        {
          path: 'addCus',
          name: 'addCus',
          meta: { text: '新增客户' },
          component: AddCus,
        },
        {
          path: 'applyCus',
          name: 'applyCus',
          meta: { text: '申领客户' },
          component: ApplyCus,
        },
        {
          path: 'myCustomer',
          name: 'myCustomer',
          meta: { text: '我的客户' },
          component: MyCustomer,
          children: [{
            path: ':id',
            meta: { text: '我的客户/客户详情' },
            component: MyCusDetail
          }]
        },
        {
          path: 'visitRecord',
          name: 'visitRecord',
          meta: { text: '出访记录' },
          component: VisitRecord,
        },
        {
          path: 'followRecord',
          name: 'followRecord',
          meta: { text: '跟进记录' },
          component: FollowRecord,
        },
        {
          path: 'importCus',
          name: 'importCus',
          meta: { text: '市场部导入客户' },
          component: ImportCus,
        },
        // 到款管理
        {
          path: 'bankflowList',
          name: 'bankflowList',
          meta: { text: '银行流水列表' },
          component: BankflowList
        },
        // 订单管理
        {
          path: 'addBaiduOrder',
          name: 'addBaiduOrder',
          meta: { text: '新增百度订单' },
          component: AddBaiduOrder
        },
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
            path:'edit/:id',
            meta: { text: '待处理订单/编辑订单' },
            component:EditOrder
            }
          ]
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
          component:InvoicePending
        },
        // 图表
        {
          path: 'charts',
          name: 'charts',
          meta: { text: '图表' },
          component:Charts
        },
        {
          path: 'editTable',
          name: 'editTable',
          meta: { text: '可编辑的表格' },
          component:EditTable
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      let main = document.getElementById('main') //定位滚动条
      main.scrollLeft = 0
      main.scrollTop = 0
    }
  }
})

import Progress from 'nprogress'
Progress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  // const isLogin = cookie.get('userName')
  const isLogin = true
  if (to.name !== 'login') {
    if (!isLogin) {
      next({
        path: '/login'
      })
      Progress.done()
    } else {
      if (to.name === from.name) { // 防止刷新的时候加载两次组件
        next(false)
      } else {
        Progress.start()
        next()
      }
    }
  } else {
    sessionStorage.clear()
    next()
    Progress.done()
  }
})
router.afterEach((to, from)=>{
  Progress.done()
})

export default router

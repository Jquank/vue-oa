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
import UserManage from 'components/userManage/userManage'
// 客户管理
import MyCustomer from 'components/customerManage/myCustomer/myCustomer'
import MyCusDetail from 'components/customerManage/myCustomer/myCusDetail'
// 客户审核
import CustomerCheck from 'components/customerCheck/customerCheck'
import CustomerSearch from 'components/customerSearch/customerSearch'
import Contract from 'components/contract/contract'
import Renew from 'components/renew/renew'
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

import store from '../store'
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
          component: IndexContent
        },
        // 系统配置
        {
          path: 'rule',
          name: 'rule',
          component: Rule
        },
        {
          path: 'auth',
          name: 'auth',
          component: Auth
        },
        {
          path: 'systemCycle',
          name: 'systemCycle',
          component: SystemCycle
        },
        {
          path: 'departSetNum',
          name: 'departSetNum',
          component: DepartSetNum
        },
        {
          path: 'accountManage',
          name: 'accountManage',
          component: AccountManage
        },
        {
          path: 'news',
          name: 'news',
          component: News,
          children: [
            {
              path: 'editor/:id',
              // name: 'editor',
              component: Editor
            }
          ]
        },
        // 客户管理
        {
          path: 'myCustomer',
          name: 'myCustomer',
          component: MyCustomer,
          children: [{
            path: ':id',
            component: MyCusDetail
          }]
        },
        // 到款管理
        {
          path: 'bankflowList',
          name: 'bankflowList',
          component: BankflowList
        },
        // 订单管理
        {
          path: 'addBaiduOrder',
          name: 'addBaiduOrder',
          meta: { text: '订单管理/新增百度订单' },
          component: AddBaiduOrder
        },
        {
          path: 'orderPending',
          name: 'orderPending',
          meta: { text: '订单管理/待处理订单' },
          component: OrderPending,
          children: [
            {
            path: 'view/:id',
            meta: { text: '订单管理/待处理订单/查看订单详情' },
            component: ViewDetail
            },
            {
            path:'edit/:id',
            meta: { text: '订单管理/待处理订单/编辑订单' },
            component:EditOrder
            }
          ]
        },
        // 发票管理
        {
          path: 'invoicePending',
          name: 'invoicePending',
          component:InvoicePending
        }
      ]
    }
  ]
})

// router.beforeResolve((to, from, ne
router.beforeEach((to, from, next) => {
  const isLogin = store.state.userName
  if (to.name !== 'login') {
    if (!isLogin) {
      next({
        path: '/login'
      })
    } else {
      if (to.name === from.name) { // 防止刷新的时候加载两次组件
        next(false)
      } else {
        next()
      }
    }
  } else {
    sessionStorage.clear()
    next()
  }
})

export default router

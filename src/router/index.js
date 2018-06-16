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
import InvoiceManage from 'components/invoiceManage/invoiceManage'
import Salary from 'components/salary/salary'
// 到款管理
import BankflowList from 'components/moneyManage/bankflowList/bankflowList'
// 订单管理
import AddBaiduOrder from 'components/order/addBaiduOrder/addBaiduOrder'

import store from '../store'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/IndexPage'
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
          component: News
        },
        // 客户管理
        {
          path: 'myCustomer',
          name: 'myCustomer',
          component: MyCustomer,
          children: [
            {
              path: ':id',
              component: MyCusDetail
            }
          ]
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
          component: AddBaiduOrder
        }
      ]
    }
  ]
})

// router.beforeResolve((to, from, next) => {
//   store.commit('GET_USERNAME')
//   const isLogin = store.state.userName
//   if (to.name !== 'login') {
//     if (!isLogin) {
//       next({
//         path: '/login'
//       })
//     } else {
//       if (to.name === from.name) {
//         // 防止刷新的时候加载两次组件
//         next(false)
//       } else {
//         next()
//       }
//     }
//   } else {
//     sessionStorage.clear()
//     store.commit('GET_USERNAME')
//     next()
//   }
// })

export default router

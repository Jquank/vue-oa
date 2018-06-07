import Vue from 'vue'
import Router from 'vue-router'

import IndexPage from '@/components/indexPage/indexPage'
import Login from '@/components/login/login'

import SystemSetting from '@/components/systemSetting/systemSetting'
import Rule from '@/components/systemSetting/rule/rule'
import Auth from '@/components/systemSetting/auth/auth'
import SystemCycle from '@/components/systemSetting/systemCycle/systemCycle'
import DepartSetNum from '@/components/systemSetting/departSetNum/departSetNum'
import AccountManage from '@/components/systemSetting/accountManage/accountManage'
import News from '@/components/systemSetting/news/news'

import UserManage from '@/components/userManage/userManage'
import CustomerManage from '@/components/customerManage/customerManage'
import CustomerCheck from '@/components/customerCheck/customerCheck'
import CustomerSearch from '@/components/customerSearch/customerSearch'
import Contract from '@/components/contract/contract'
import MoneyManage from '@/components/moneyManage/moneyManage'
import Order from '@/components/order/order'
import Renew from '@/components/renew/renew'
import InvoiceManage from '@/components/invoiceManage/invoiceManage'
import Salary from '@/components/salary/salary'

import store from '../store'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    // {
    //   path: "*",
    //   redirect: "/login"
    // },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/indexPage',
      name: 'indexPage',
      component: IndexPage
    },
    {
      path: '/systemSetting',
      component: SystemSetting,
      children: [
        {
          path: '',
          component: Rule
        },
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
        }
      ]
    },
    {
      path: '/userManage',
      name: 'userManage',
      component: UserManage
    },
    {
      path: '/customerManage',
      name: '/customerManage',
      component: CustomerManage
    },
    {
      path: '/customerCheck',
      name: 'customerCheck',
      component: CustomerCheck
    },
    {
      path: '/customerSearch',
      name: 'customerSearch',
      component: CustomerSearch
    },
    {
      path: '/contract',
      name: 'contract',
      component: Contract
    },
    {
      path: '/moneyManage',
      name: 'moneyManage',
      component: MoneyManage
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/renew',
      name: 'renew',
      component: Renew
    },
    {
      path: '/invoiceManage',
      name: 'invoiceManage',
      component: InvoiceManage
    },
    {
      path: '/salary',
      name: 'salary',
      component: Salary
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('GET_USERNAME')
  const isLogin = store.state.userName
  if (to.name !== 'login') {
    if (!isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    sessionStorage.clear()
    store.commit('GET_USERNAME')
    next()
  }
})

export default router

/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

import Login from 'components/login/login'
// 首页
import IndexPage from 'components/indexPage/indexPage'
import IndexContent from 'components/indexContent/indexContent'

import Charts from 'views/charts/charts'
import EditTable from 'views/editTable/editTable'
import DragTable from 'views/dragTable/dragTable'

// import store from '../store'

import Progress from 'nprogress'
Vue.use(Router)

export const baseRouterMap = [
  {
    path: '/',
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
      {
        path: 'charts',
        name: 'charts',
        meta: { text: '图表' },
        component: Charts
      },
      {
        path: 'editTable',
        name: 'editTable',
        meta: { text: '编辑表格' },
        component: EditTable
      }
    ]
  }
]
const router = new Router({
  routes: baseRouterMap
})
const asyncRouterMap = [
  {
    path: 'dragTable',
    name: 'dragTable',
    meta: { text: '可拖拽的表格' },
    component: DragTable
  }
]

Progress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
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
router.afterEach((to, from) => {
  Progress.done()
})

export default router

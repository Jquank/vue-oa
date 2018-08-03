// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'api/mock'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './common/css/base.css'

import 'nprogress/nprogress.css'

import * as filters from '@/common/js/filters'

Vue.config.productionTip = false

Vue.config.errorHandler = function (err, vm, info) {
  if (err === 'ignore') {
    return true
  }
}
Vue.use(ElementUI, {size: 'small'})
// 全局注册所有过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

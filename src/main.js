// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './common/css/base.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'vue-area-linkage/dist/index.css'
import VueAreaLinkage from 'vue-area-linkage'

import * as filters from '@/common/js/filters'

Vue.config.productionTip = false

Vue.use(VueAreaLinkage)
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

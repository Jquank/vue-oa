import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
import storage from 'good-storage'

Vue.use(Vuex)

storage.get('productType') && (state.productType = storage.get('productType'))
storage.session.get('userName') && (state.userName = storage.session.get('userName'))

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

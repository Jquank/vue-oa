import * as types from './mutation-types'
// import storage from 'good-storage'
// import cookie from 'js-cookie'

const mutations = {
  [types.CHANGE_COLLAPSE_COUNT] (state, count) {
    state.collapseCount++
  },
  [types.GET_PRODUCTLIST_DATA] (state, obj) {
    state.productListData = obj
  },
  [types.GET_PROCESSLIST_DATA] (state, obj) {
    state.processListData = obj
  },
  [types.GET_PERMISSIONS] (state, per) {
    state.permissions = per
  }
}
export default mutations

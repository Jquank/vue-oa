import * as types from './mutation-types'
// import storage from 'good-storage'
// import cookie from 'js-cookie'

const mutations = {
  [types.CHANGE_COLLAPSE_COUNT] (state, count) {
    state.collapseCount++
  }
}
export default mutations

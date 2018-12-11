import * as types from './mutation-types'
// import storage from 'good-storage'
// import cookie from 'js-cookie'

const mutations = {
  [types.CHANGE_COLLAPSE_COUNT] (state, count) {
    state.collapseCount++
  },
  [types.GET_ERROR] (state, err) {
    state.errorList.push(err)
  }
}
export default mutations

import * as types from './mutation-types'

const mutations = {
  [types.GET_USERNAME] (state) {
    state.userName = 'admin'
  },
  [types.GET_ASYNC_ROUTER] (state, data) {
    state.asyncRouter[0].children.push(data)
  }
}
export default mutations

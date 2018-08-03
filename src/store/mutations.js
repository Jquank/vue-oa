import * as types from './mutation-types'

const mutations = {
  [types.GET_USERNAME] (state) {
    state.userName = 'admin'
  }
}
export default mutations

import * as types from './mutation-types'
// import storage from 'good-storage'
import cookie from 'js-cookie'

const mutations = {
  [types.GET_USERNAME] (state) {
    state.userName = cookie.get('userName')
  }
}
export default mutations

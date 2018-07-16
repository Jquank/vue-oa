import * as types from './mutation-types'
import storage from 'good-storage'

const mutations = {
  [types.GET_USERNAME] (state) {
    state.userName = storage.session.get('userName')
  }
}
export default mutations

import * as types from './mutation-types'
import storage from 'good-storage'

const mutations = {
  [types.GET_USERNAME] (state) {
    state.userName = sessionStorage.getItem('userName')
  },
  [types.GET_PRODUCT_TYPE] (state, pro) {
    storage.set('productType', pro)
    state.productType = storage.get('productType')
  }
}
export default mutations

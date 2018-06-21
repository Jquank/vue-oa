import * as types from './mutation-types'
export const getProductType = function ({commit, state}, pro) {
  commit(types.GET_PRODUCT_TYPE, pro)
}

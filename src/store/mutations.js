import * as types from './mutation-types'
// import storage from 'good-storage'
// import cookie from 'js-cookie'

const mutations = {
  [types.GET_SEL_COMPANY_DIALOG] (state, selCompanyDialog) {
    state.selCompanyDialog = selCompanyDialog
  }
}
export default mutations

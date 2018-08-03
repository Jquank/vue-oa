import Vue from 'vue'
const install = function (Vue) {
  Vue.directive('focus', {
    inserted: function (el) {
      console.log(el)
      el.focus()
    }
  })
}

Vue.use(install) // eslint-disable-line

focus.install = install
export default focus

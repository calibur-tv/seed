import Vue from 'vue'
import Cookies from 'js-cookie'
import mitt from 'mitt'

export default ({ $axios }) => {
  const emitter = mitt()

  Vue.use({
    install(Vue) {
      Vue.prototype.$channel = emitter

      Vue.prototype.$cookie = Cookies
    }
  })

  window.$axios = $axios
  window.$cookie = Cookies
  window.$channel = emitter
}

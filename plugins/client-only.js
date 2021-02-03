import Vue from 'vue'
import { message } from 'ant-design-vue'
import Cookies from 'js-cookie'

Vue.use({
  install(Vue) {
    Vue.prototype.$channel = new Vue()

    Vue.prototype.$cookie = Cookies

    Vue.prototype.$toast = message
  }
})

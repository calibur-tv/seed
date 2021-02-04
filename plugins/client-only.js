import Vue from 'vue'
import { message } from 'ant-design-vue'
import Cookies from 'js-cookie'
import channel from '~/assets/js/channel'

Vue.use({
  install(Vue) {
    Vue.prototype.$channel = new Vue(channel)

    Vue.prototype.$cookie = Cookies

    Vue.prototype.$toast = message
  }
})

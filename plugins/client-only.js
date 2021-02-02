import Vue from 'vue'

Vue.use({
  install(Vue) {
    Vue.prototype.$channel = new Vue()
  }
})

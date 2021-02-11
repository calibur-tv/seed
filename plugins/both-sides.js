import Vue from 'vue'
import * as utils from '~/assets/js/utils'
import imageResize from '~/assets/js/imageResize'
import CurtainManager from '~/assets/js/curtain/manager'
import CurtainComponent from '~/assets/js/curtain/index'

Vue.component(CurtainComponent.name, CurtainComponent)

Vue.use({
  install(Vue) {
    Vue.prototype.$utils = utils

    Vue.prototype.$resize = imageResize

    Vue.prototype.$curtainManager = new CurtainManager()
  }
})

import Vue from 'vue'
import { Modal } from 'ant-design-vue'
import * as utils from '~/assets/js/utils'
import imageResize from '~/assets/js/imageResize'

Vue.use(Modal)

export default ({ store }) => {
  Vue.use({
    install(Vue) {
      Vue.prototype.$utils = utils

      Vue.prototype.$resize = imageResize
    }
  })
}

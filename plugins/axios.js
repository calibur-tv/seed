import { message } from 'ant-design-vue'
import parseToken from '~/assets/js/parseToken'

export default ({ $axios, app }) => {
  $axios.setToken(parseToken(app), 'Bearer')

  $axios.setBaseURL(process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : 'https://fc.calibur.tv/')

  $axios.onResponse((resp) => {
    return Promise[resp.data.code ? 'reject' : 'resolve'](resp.data)
  })

  $axios.onError((error) => {
    message.error(error.message || '网络错误，请稍后再试')
  })

  window.$axios = $axios
}

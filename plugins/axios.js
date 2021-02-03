import { message } from 'ant-design-vue'
import parseToken from '~/assets/js/parseToken'

export default ({ $axios, app }) => {
  $axios.setToken(parseToken(app), 'Bearer')

  $axios.onRequest((config) => {
    config.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : 'https://fc.calibur.tv/'
    config.timeout = 10000
  })

  $axios.onResponse((resp) => {
    console.log('resp', resp)
    if (resp.data.code) {
      return Promise.reject(resp.data)
    }
    console.log('resp.data.data', resp.data.data)
    return Promise.resolve(resp.data.data)
  })

  $axios.onError((error) => {
    message.error(error.message || '网络错误，请稍后再试')
    return Promise.reject(error)
  })
}

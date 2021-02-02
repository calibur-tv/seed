import generateRequestError from '~/assets/js/generateRequestError'
import parseToken from '~/assets/js/parseToken'

export default ({ $axios, app }) => {
  $axios.setToken(parseToken(app), 'Bearer')

  $axios.onRequest((config) => {
    config.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : 'https://fc.calibur.tv/'
    config.timeout = 10000
  })

  $axios.onResponse((resp) => {
    return resp.data
  })

  $axios.onError((error) => {
    return Promise.reject(generateRequestError(error))
  })
}

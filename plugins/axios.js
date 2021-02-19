import parseToken from '~/assets/js/parseToken'

export default ({ $axios, app }) => {
  const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : 'https://fc.calibur.tv/'

  $axios.setToken(parseToken(app), 'Bearer')

  $axios.setBaseURL(baseURL)

  $axios.onResponse((resp) => {
    return Promise[resp.data.code ? 'reject' : 'resolve'](resp.data)
  })

  $axios.onError((error) => {
    console.log(error.message || '网络错误，请稍后再试')
  })

  window.BASE_URL = baseURL
}

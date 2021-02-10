import { loadMicroApp } from 'qiankun'

const isDev = process.env.NODE_ENV === 'development'

export const aboutPage = () => {
  const res1 = loadMicroApp({
    name: 'vue-page-01',
    entry: isDev ? '//localhost:7102' : 'https://web.calibur.tv/other',
    container: '#vue-01'
  })

  return [res1]
}

export const homePage = () => {
  const res1 = loadMicroApp({
    name: 'vue-page-02',
    entry: isDev ? '//localhost:7101' : 'https://web.calibur.tv/uploader',
    container: '#about-01'
  })

  const res2 = loadMicroApp({
    name: 'vue-page-03',
    entry: isDev ? '//localhost:7102' : 'https://web.calibur.tv/other',
    container: '#about-02'
  })

  return [res1, res2]
}

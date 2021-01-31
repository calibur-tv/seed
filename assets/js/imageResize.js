export default (url, { width, height, rule, webP }) => {
  if (!url) {
    return ''
  }

  if (/imageMogr2/.test(url) || url.startsWith('data')) {
    return url
  }

  const link = url.startsWith('http') ? url : `https://m1.calibur.tv/${url}`
  const format = webP ? '/format/webp' : ''
  const mode = rule === undefined || rule === '' ? 1 : parseInt(rule)

  if ((mode === 1 && !width) || (!width && !height)) {
    return `${link}?imageMogr2/auto-orient/strip${format}`
  }

  let w
  let h
  const DPR = typeof window === 'undefined' ? 2 : window.devicePixelRatio

  if (mode === 1) {
    w = `/w/${(width * DPR) | 0}`
    h = height ? `/h/${(height * DPR) | 0}` : `/h/${(width * DPR) | 0}`
  } else {
    w = width ? `/w/${(width * DPR) | 0}` : ''
    h = height ? `/h/${(height * DPR) | 0}` : ''
  }

  return `${link}?imageMogr2/auto-orient/strip|imageView2/${mode}${w}${h}${format}`
}

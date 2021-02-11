export const clear = () => {
  try {
    localStorage.clear()
  } catch (e) {}
}

export const set = (key, value, timeout) => {
  if (typeof window === 'undefined') {
    return
  }
  try {
    localStorage.setItem(key, JSON.stringify(value))
    if (timeout) {
      localStorage.setItem(`${key}-timeout`, Date.now() + timeout * 1000)
    }
  } catch (e) {}
}

export const get = (key, def = null) => {
  if (typeof window === 'undefined') {
    return def
  }
  try {
    const value = localStorage.getItem(key)
    if (!value) {
      return def
    }
    const timeout = localStorage.getItem(`${key}-timeout`)
    if (timeout && parseInt(timeout) < Date.now()) {
      localStorage.removeItem(key)
      localStorage.removeItem(`${key}-timeout`)
      return def
    }
    return JSON.parse(value)
  } catch (e) {
    return def
  }
}

export const del = (key) => {
  if (typeof window === 'undefined') {
    return
  }
  try {
    localStorage.removeItem(key)
  } catch (e) {
    // do nothing
  }
}

export const has = (key) => {
  if (typeof window === 'undefined') {
    return false
  }
  try {
    return !!localStorage.getItem(key)
  } catch (e) {
    return false
  }
}

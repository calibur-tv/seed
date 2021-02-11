import * as Cache from '../cache'
import { isTouchDevice } from '../utils'

export default class Manager {
  constructor() {
    this.rectList = {}
    this.components = {}
    this.maxIndex = 0
    this.mouseDown = false
    this.currentId = ''
    this._init()
  }

  _init() {
    const getTargetId = (evt) => {
      if (evt.target.className !== 'curtain__header__drag') {
        return ''
      }
      return evt.target.getAttribute('data-id')
    }
    if (isTouchDevice()) {
      document.addEventListener('touchstart', (evt) => {
        const id = getTargetId(evt)
        if (!id) {
          return
        }
        this.currentId = id
        this.mouseDown = true
        this.components[id].handleStart(evt.touches[0])
      })
      document.addEventListener('touchmove', (evt) => {
        if (!this.mouseDown) {
          return
        }
        const comp = this.components[this.currentId]
        if (!comp) {
          return
        }
        comp.handleMove(evt.touches[0])
      })
      document.addEventListener('touchend', (evt) => {
        this.mouseDown = false
        if (!this.currentId) {
          return
        }
        const comp = this.components[this.currentId]
        if (!comp) {
          return
        }
        this.currentId = ''
        comp.handleEnd(evt.touches[0])
      })
    } else {
      document.addEventListener('mousedown', (evt) => {
        const id = getTargetId(evt)
        if (!id) {
          return
        }
        this.currentId = id
        this.mouseDown = true
        this.components[id].handleStart(evt)
      })
      document.addEventListener('mousemove', (evt) => {
        if (!this.mouseDown) {
          return
        }
        const comp = this.components[this.currentId]
        if (!comp) {
          return
        }
        comp.handleMove(evt)
      })
      document.addEventListener('mouseup', (evt) => {
        this.mouseDown = false
        if (!this.currentId) {
          return
        }
        const comp = this.components[this.currentId]
        if (!comp) {
          return
        }
        this.currentId = ''
        comp.handleEnd(evt)
      })
    }
  }

  bindComponent(id, self) {
    this.components[id] = self
  }

  unbindComponent(id) {
    delete this.components[id]
    delete this.rectList[id]
  }

  getRect(id, def) {
    let result = this.rectList[id]
    if (result) {
      return result
    }

    result = Cache.get(this._itemCacheKey(id))
    if (!result) {
      result = def || this._getDefaultRect()
    }

    this.setRect(id, result)
    if (result.zIndex > this.maxIndex) {
      this.maxIndex = result.zIndex
    }

    return result
  }

  /**
   * @param id
   * @param rect：left，top，width，height，zIndex
   */
  setRect(id, rect) {
    this.rectList[id] = rect
    Cache.set(this._itemCacheKey(id), rect)
  }

  /**
   * TODO：合理化排列组件
   */
  spreadDOM() {}

  setMaxIndex(id) {
    const max = ++this.maxIndex
    this._updateRect(id, 'zIndex', max)
    return max
  }

  componentIsUnique(id) {
    return !this.rectList[id]
  }

  _updateRect(id, key, value) {
    const rect = this.rectList[id]
    this.setRect(id, {
      ...rect,
      key: value
    })
  }

  _getDefaultRect() {
    return {
      top: 0,
      left: 0,
      zIndex: this.maxIndex++
    }
  }

  _itemCacheKey(id) {
    return `curtain-${id}-rect`
  }
}

import './curtain.scss'

export default {
  name: 'VCurtain',
  props: {
    id: {
      required: true,
      type: String
    },
    position: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      canRender: false,
      moving: false,
      drag: false,
      rect: {
        top: 0,
        left: 0,
        zIndex: 0
      },
      startX: 0,
      startY: 0,
      startLeft: 0,
      startTop: 0
    }
  },
  computed: {
    wrapStyle() {
      const { rect } = this
      return {
        transform: `translate3d(${rect.left}px, ${rect.top}px, 0)`,
        zIndex: rect.zIndex
      }
    }
  },
  mounted() {
    this.initManager()
    this.canRender = true
  },
  beforeDestroy() {
    this.$curtainManager.unbindComponent(this.id)
  },
  methods: {
    initManager() {
      if (!this.$curtainManager.componentIsUnique(this.id)) {
        // eslint-disable-next-line
        console.error(`curtain 组件的 id 必须是独一无二的，id：${this.id}已被注册`)
        return
      }
      const rect = this.$el.getBoundingClientRect()
      this.$curtainManager.bindComponent(this.id, this)
      this.rect = this.$curtainManager.getRect(
        this.id,
        this.position
          ? {
              ...this.position,
              width: rect.width,
              height: rect.height
            }
          : null
      )
    },
    handleStart(evt) {
      this.moving = true
      this.startX = evt.clientX
      this.startY = evt.clientY
      this.startLeft = this.rect.left
      this.startTop = this.rect.top
      this.updateIndex()
    },
    handleMove(evt) {
      if (!this.moving) {
        return
      }
      this.drag = true
      this.rect.left = this.startLeft + evt.clientX - this.startX
      this.rect.top = this.startTop + evt.clientY - this.startY
    },
    handleEnd() {
      this.drag = false
      this.moving = false
      const rect = this.$el.getBoundingClientRect()
      this.$curtainManager.setRect(this.id, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        zIndex: this.rect.zIndex
      })
    },
    handleClick() {
      this.updateIndex()
    },
    updateIndex() {
      this.rect.zIndex = this.$curtainManager.setMaxIndex(this.id)
    }
  },
  render(h) {
    if (this.canRender) {
      return h(
        'div',
        {
          class: ['curtain', { 'curtain--moving': this.drag }],
          style: this.wrapStyle,
          on: {
            click: this.handleClick
          }
        },
        [
          h(
            'div',
            {
              class: 'curtain__header'
            },
            [
              h('div', {
                class: 'curtain__header__drag',
                attrs: {
                  'data-id': this.id
                }
              })
            ]
          ),
          h(
            'div',
            {
              class: 'curtain__body'
            },
            this.$slots.default
          )
        ]
      )
    }

    return h(
      'div',
      {
        class: ['curtain__placeholder']
      },
      this.$slots.placeholder || this.placeholder
    )
  }
}

export default {
  data() {
    return {
      handler: {},
      events: {}
    }
  },
  methods: {
    $when(eventName, callback) {
      if (this.events[eventName]) {
        callback(this.events[eventName])
      } else if (this.handler[eventName]) {
        this.handler[eventName].push(callback)
      } else {
        this.handler[eventName] = [callback]
      }
    },
    $fire(eventName, value = undefined) {
      if (this.events[eventName]) {
        return
      }
      this.events[eventName] = value
      if (this.handler[eventName]) {
        this.handler[eventName].forEach((callback) => callback(value))
      }
    }
  }
}

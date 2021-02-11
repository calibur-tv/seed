<template>
  <div id="v-screen" :style="styleObj">
    <div class="bg">
      <div>
        <div v-for="i in verLineCount" :key="i" :style="{ left: `${i * pixelDensity}px` }" class="ver-line" />
      </div>
      <div>
        <div v-for="i in hozLineCount" :key="i" :style="{ top: `${i * pixelDensity}px` }" class="hoz-line" />
      </div>
    </div>
    <div class="wrap">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VScreen',
  components: {},
  props: {
    data: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    pixelDensity: {
      type: Number,
      default: 1
    },
    direction: {
      type: String,
      default: 'column'
    }
  },
  data() {
    return {
      list: {}
    }
  },
  computed: {
    styleObj() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    },
    hozLineCount() {
      if (this.pixelDensity <= 1) {
        return 0
      }
      return Math.max(this.height / this.pixelDensity - 1, 0)
    },
    verLineCount() {
      if (this.pixelDensity <= 1) {
        return 0
      }
      return Math.max(this.width / this.pixelDensity - 1, 0)
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.calc()
  },
  methods: {
    calc() {
      const zArr = Array.from(new Set(this.data.map((_) => _.zIndex)))
      zArr.forEach((zIndex) => {
        const dataArr = this.data.filter((_) => _.zIndex === zIndex).sort((a, b) => (a.xIndex > b.xIndex ? 1 : -1))
        console.log(zIndex, dataArr)
        const rightXIndex = dataArr.filter((_) => _.xIndex >= 0)
        console.log(rightXIndex)
      })
    }
  }
}
</script>

<style lang="scss">
#v-screen {
  position: relative;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-color: gainsboro;
    user-select: none;

    .ver-line {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 0;
      height: 100%;
      border-right: 1px dashed gray;
    }

    .hoz-line {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 0;
      border-bottom: 1px dashed gray;
    }
  }

  .wrap {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: transparent;
  }
}
</style>

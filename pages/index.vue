<template>
  <div id="homepage">
    <div :class="{ show: toggle }" :style="{ backgroundImage: banner1 ? `url(${$resize(banner1, options)})` : '' }" class="banner" />
    <div :class="{ show: !toggle }" :style="{ backgroundImage: banner2 ? `url(${$resize(banner2, options)})` : '' }" class="banner" />
  </div>
</template>

<script>
const BANNER_COUNT = 6
const BANNER_BASE_URL = 'https://fs.calibur.tv/banner/'
const getRandomBanner = () => {
  let a = new Array(BANNER_COUNT).fill(BANNER_BASE_URL)
  a = a.map((_, index) => `${_}${index + 1}.jpg`)
  return shuffle(a)
}
const shuffle = (a) => {
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

export default {
  name: 'Homepage',
  data() {
    return {
      banners: [],
      banner1: null,
      banner2: null,
      timer: null,
      toggle: true,
      options: {
        width: 2048,
        height: 0,
        mode: 0
      },
      index: 0
    }
  },
  mounted() {
    this.loopBanner()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    loopBanner() {
      this.banners = getRandomBanner()
      this.banner1 = this.banners[0]
      this.timer = setInterval(() => {
        if (!this.banners.length) {
          return
        }
        this.index = 1 + this.index === this.banners.length ? 0 : this.index + 1
        const data = this.banners[this.index]
        this.toggle ? (this.banner2 = data) : (this.banner1 = data)
        setTimeout(() => {
          this.toggle = !this.toggle
        }, 7500)
      }, 15000)
    }
  }
}
</script>

<style lang="scss">
#homepage {
  width: 100%;
  height: 100vh;
  background-color: #2d3748;
  z-index: 15;

  .banner {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 20;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &.show {
      opacity: 1;
    }
  }
}
</style>

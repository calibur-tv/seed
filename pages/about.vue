<template>
  <div id="about">
    <Screen :width="500" :height="500" :pixel-density="20" :data="spaces">
      <Pixel v-for="item in spaces" :key="item.id" :item="item" />
    </Screen>
  </div>
</template>

<script>
import Screen from '@/components/Screen'
import Pixel from '@/components/Pixel'

export default {
  components: {
    Screen,
    Pixel
  },
  data() {
    return {
      app: null,
      spaces: [
        {
          id: 1,
          width: 100,
          height: 50,
          xIndex: 0,
          yIndex: 0,
          zIndex: 0
        },
        {
          id: 2,
          width: 100,
          height: 50,
          xIndex: -1,
          yIndex: 0,
          zIndex: 0
        },
        {
          id: 3,
          width: 100,
          height: 50,
          xIndex: 1,
          yIndex: 1,
          zIndex: 1
        }
      ]
    }
  },
  mounted() {
    // this.app = aboutPage()
  },
  beforeDestroy() {
    // this.app.forEach((item) => item.unmount())
  }
}
</script>

<style lang="scss">
#about {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div style="text-align: center">
    <div id="vue-01">vue-01 loading...</div>
  </div>
</template>

<script>
import { aboutPage } from '@/assets/js/qiankun'

export default {
  data() {
    return {
      app: null
    }
  },
  mounted() {
    this.app = aboutPage()
  },
  beforeDestroy() {
    this.app.forEach((item) => item.unmount())
  }
}
</script>

<template>
  <div style="text-align: center">
    <VCurtain id="about-01" :position="{ left: 200, top: 200 }">
      <div id="about-01">vue-01 loading...</div>
    </VCurtain>
    <br />
    <VCurtain id="about-02" :position="{ left: 200, top: 500 }">
      <div id="about-02">vue-02 loading...</div>
    </VCurtain>
  </div>
</template>

<script>
import { homePage } from '@/assets/js/qiankun'

export default {
  data() {
    return {
      app: null
    }
  },
  mounted() {
    this.app = homePage()
  },
  beforeDestroy() {
    this.app.forEach((item) => item.unmount())
  }
}
</script>

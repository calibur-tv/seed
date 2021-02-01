<template>
  <div id="homepage">
    <AppBanner background="https://m1.calibur.tv/default-banner" />
    <h1 class="calibur">calibur.tv</h1>
    <AppFooter />
  </div>
</template>

<script>
import AppBanner from '@/components/app/AppBanner'
import AppFooter from '@/components/app/AppFooter'

export default {
  name: 'Homepage',
  components: {
    AppBanner,
    AppFooter
  }
}
</script>

<style lang="scss">
#homepage {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .calibur {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }
}
</style>

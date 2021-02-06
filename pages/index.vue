<template>
  <div id="homepage">
    <div class="shim" />
    <h1 class="calibur">calibur.tv</h1>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '@/components/app/AppFooter'

export default {
  name: 'Homepage',
  components: {
    AppFooter
  }
}
</script>

<style lang="scss">
#homepage {
  .shim {
    height: 100vh;
  }

  .calibur {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
      Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }
}
</style>

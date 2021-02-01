<template>
  <div id="layout-default">
    <AppHeader background="https://m1.calibur.tv/default-banner" />
    <Nuxt />
  </div>
</template>

<script>
import AppHeader from '@/components/app/AppHeader'

export default {
  components: {
    AppHeader
  }
}
</script>

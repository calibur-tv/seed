<template>
  <div id="layout-default">
    <AppHeader background="https://m1.calibur.tv/default-banner" />
    <Nuxt />
    <SignDialog />
  </div>
</template>

<script>
import AppHeader from '@/components/app/AppHeader'
import SignDialog from '@/components/sign/SignDialog'
import useSignMixin from '@/mixins/useSign'

export default {
  components: {
    AppHeader,
    SignDialog
  },
  mixins: [useSignMixin]
}
</script>

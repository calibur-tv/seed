<template>
  <div id="calibur">
    <AppHeader />
    <Nuxt />
    <SignDialog />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/app/AppHeader'
import AppFooter from '@/components/app/AppFooter'
import SignDialog from '@/components/sign/SignDialog'
import useSignMixin from '@/mixins/useSign'

export default {
  components: {
    AppHeader,
    AppFooter,
    SignDialog
  },
  mixins: [useSignMixin]
}
</script>

<style lang="scss">
#calibur {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>

<template>
  <div id="calibur">
    <Nuxt />
    <SignDialog />
  </div>
</template>

<script>
import SignDialog from '@/components/sign/SignDialog'
import useSignMixin from '@/mixins/useSign'

export default {
  components: {
    SignDialog
  },
  mixins: [useSignMixin]
}
</script>

<style lang="scss">
#calibur {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>

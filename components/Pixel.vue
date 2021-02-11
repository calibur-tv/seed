<template>
  <div class="pixel" :style="styleObj">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Pixel',
  components: {},
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    styleObj() {
      return {
        transform: `translate3d(
          ${(this.$parent.width - this.item.width) / 2}px,
          ${(this.$parent.height - this.item.height) / 2}px,
        0)`,
        width: `${this.item.width}px`,
        height: `${this.item.height}px`,
        zIndex: this.item.zIndex
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.pixel {
  position: absolute;
  background-color: #20c997;
}
</style>

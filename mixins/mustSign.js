export default {
  created() {
    if (this.$isServer) {
      return
    }

    this.$channel.on('user-not-sign', () => {
      this.$toast.error('继续操作前请先登录').then(() => {
        window.location.href = this.$alias.sign()
      })
    })
  }
}

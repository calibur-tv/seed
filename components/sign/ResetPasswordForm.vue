<template>
  <div class="reset-password-form">
    <form :loading="submitBtnLoading" :form="form" :rule="rule" @submit="submitForm">
      <input v-model.trim="form.access" type="text" placeholder="手机号" auto-complete="off" />
      <input v-model.trim="form.secret" type="text" placeholder="新密码" auto-complete="off" />
      <button type="primary" :loading="submitBtnLoading" :disabled="submitBtnDisabled" block>
        {{ submitBtnText }}
        <template v-if="timeout"> （{{ timeout }}s 后可重新获取） </template>
      </button>
    </form>
    <div class="others">
      <a @click="showLogin">返回登录></a>
      <a @click="showRegister">点击注册»</a>
    </div>
  </div>
</template>

<script>
import { sendMessage, resetPassword } from '~/api/signApi'

export default {
  name: 'ResetPasswordForm',
  data() {
    const validateAccess = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写手机号'))
      }
      if (value.length !== 11) {
        return callback(new Error('请填写11位手机号'))
      }
      callback()
    }
    const validateSecret = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请填写登录密码'))
      }
      if (value.length < 6) {
        return callback(new Error('密码不能小于6位'))
      }
      if (value.length > 16) {
        return callback(new Error('密码不能大于16位'))
      }
      callback()
    }
    return {
      form: {
        access: '',
        secret: '',
        authCode: ''
      },
      rule: {
        access: [{ validator: validateAccess, trigger: 'blur' }],
        secret: [{ validator: validateSecret, trigger: 'blur' }]
      },
      step: 0,
      timeout: 0
    }
  },
  computed: {
    submitBtnText() {
      if (this.step === 0) {
        return '立即重置'
      } else if (this.step === 1) {
        return '提交中...'
      } else if (this.step === 2) {
        return '短信已发送'
      } else if (this.step === 3) {
        return '已重置'
      }
      return '立即重置'
    },
    submitBtnLoading() {
      return this.step === 1 || this.step === 3
    },
    submitBtnDisabled() {
      return (this.timeout !== 0 && this.step === 0) || this.step === 3
    }
  },
  methods: {
    submitForm() {
      if (this.step === 0) {
        this.getResetAuthCode()
      }
      if (this.step === 2) {
        this.openConfirmModal()
      }
    },
    async getResetAuthCode() {
      this.step = 1
      try {
        await sendMessage(this, {
          type: 'forgot_password',
          phone_number: this.form.access
        })
        this.step = 2
        this.openConfirmModal()
      } catch (err) {
        this.$toast.error(err.message)
        this.step = 0
      } finally {
        this.timeout = 60
        const timer = setInterval(() => {
          if (!--this.timeout) {
            this.step = 0
            clearInterval(timer)
          }
        }, 1000)
      }
    },
    openConfirmModal() {
      this.$prompt('请输入收到的验证码', '短信已发送', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d{6}$/,
        inputErrorMessage: '验证码格式不正确'
      })
        .then(({ value }) => {
          this.form.authCode = value
          this.step = 3
          this.signReset()
        })
        .catch(() => {})
    },
    async signReset() {
      try {
        const res = await resetPassword(this, {
          access: this.form.access,
          authCode: this.form.authCode,
          secret: this.form.secret
        })
        this.$toast.success(res)
        this.showLogin()
      } catch (err) {
        this.$toast.error(err.message)
      } finally {
        this.step = 0
      }
    },
    showLogin() {
      this.$emit('to-login')
    },
    showRegister() {
      this.$emit('to-register')
    }
  }
}
</script>

<style lang="scss">
.reset-password-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .v-form {
    position: relative;
    width: 100%;
    height: 100%;

    &__submit {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .others {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    padding: 0 12px;
  }
}
</style>

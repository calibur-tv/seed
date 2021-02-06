<template>
  <div class="sign-up-form">
    <form :loading="submitBtnLoading" :form="form" :rule="rule" @submit="submitForm">
      <Input
        v-model.trim="form.access"
        type="text"
        placeholder="手机（填写常用手机号，用于登录）"
        auto-complete="off"
      />
      <Input
        v-model.trim="form.secret"
        type="password"
        placeholder="密码（6-16个字符组成，区分大小写）"
        auto-complete="off"
      />
      <Input
        v-model.trim="form.inviteCode"
        :disabled="!!inviteCode"
        placeholder="邀请码（可为空）"
        auto-complete="off"
      />
      <Button type="primary" :loading="submitBtnLoading" :disabled="submitBtnDisabled" block @click="submitForm">
        {{ submitBtnText }}
        <template v-if="timeout"> （{{ timeout }}s 后可重新获取） </template>
      </Button>
    </form>
    <!--
    <div class="others">
      <ul class="provider">
        <span>社交账号注册</span>
        <li @click="qqRegisterLink">
          <i class="iconfont ic-qq" />
        </li>
        <li @click="wechatRegisterLink">
          <i class="iconfont ic-v-chat" />
        </li>
      </ul>
      <a @click="showLogin">已有账号»</a>
    </div>
    -->
    <AModal
      title="短信已发送"
      :visible="showAuthModal"
      :confirm-loading="waitAuthModal"
      ok-text="确定"
      cancel-text="取消"
      @ok="submitFormData"
      @cancel="closeAuthModal"
    >
      <Input v-model.trim="form.authCode" placeholder="请输入收到的验证码" type="text"></Input>
    </AModal>
  </div>
</template>

<script>
import { Input, Button } from 'ant-design-vue'
import { sendMessage, register } from '~/api/signApi'

export default {
  name: 'SignUpForm',
  components: {
    Input,
    Button
  },
  props: {
    inviteCode: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    const validateAccess = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写手机号'))
      }
      if (value.length !== 11) {
        return callback(new Error('请填写11位手机号'))
      }
      if (!/^(0|86|17951)?(1)[0-9]{10}$/.test(value)) {
        return callback(new Error('错误的手机号格式'))
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
        authCode: '',
        inviteCode: this.inviteCode
      },
      rule: {
        access: { validator: validateAccess },
        secret: { validator: validateSecret }
      },
      /**
       * 0：初始化，表单待校验
       * ---- 如果表单校验失败，就一直在 0
       * 1：表单校验成功，获取手机短信中...
       * ---- 需要 loading
       * ---- 发送手机验证码需要 geetest 认证
       * ---- 如果 geetest 认证通过就请求发短信的接口
       * ---- 如果 geetest 认证不通过或者加载失败，就会返回到 step 0
       * ---- 请求发短信的接口如果失败，就会返回到 step 0
       * ---- 请求发短信的接口如果成功，就会到 step 2
       * ---- 30s 后会返回到 step 0，可以重新发短信
       * 2：获取手机验证码成功，用户填写短信验证码
       * ---- 如果用户填写的正确，就进入注册流程
       * ---- 如果用户填写的失败或关闭填写框，就提示错误，继续在 step 2
       * ---- 30s 后就会返回 step 0，用户可以重新发短信
       * 3：注册中...
       * ---- 需要 loading 和 disabled
       * ---- 注册成功，需要刷新页面
       * ---- 注册失败，可能是在 step 2 停留太久，短信验证码过期
       * ---- 注册失败，可能是服务器挂了
       * ---- 注册失败，可能是 unique 的信息被他人使用了
       * ---- 无论如何，注册失败都返回 step 0
       */
      step: 0,
      timeout: 0,
      showAuthModal: false,
      waitAuthModal: false
    }
  },
  computed: {
    submitBtnText() {
      if (this.step === 0) {
        return '注册'
      } else if (this.step === 1) {
        return '提交中...'
      } else if (this.step === 2) {
        return '短信已发送'
      } else if (this.step === 3) {
        return '注册中...'
      }
      return '注册'
    },
    submitBtnLoading() {
      return this.step === 1 || this.step === 3
    },
    submitBtnDisabled() {
      return (this.timeout !== 0 && this.step === 0) || this.step === 3
    },
    query() {
      return this.$route.query
    },
    paramsIsOK() {
      return !!(
        this.query.uid &&
        /^\d+$/.test(this.query.uid) &&
        this.query.time &&
        /^\d+$/.test(this.query.time) &&
        Date.now() <= this.query.time * 1000 &&
        this.query.key === this.$md5(`${this.query.uid}-the-world-${this.query.time}`)
      )
    }
  },
  methods: {
    addInviteForLink(url) {
      let result = url
      if (this.paramsIsOK) {
        result = `${result}&invite=${this.query.uid}`
      } else if (this.$route.name === 'about-invite-id') {
        result = `${result}&invite=${this.$route.params.id}`
      }
      return result
    },
    qqRegisterLink() {
      window.location.href = `${this.addInviteForLink('https://fc.calibur.tv/callback/oauth2/qq?from=sign')}}`
    },
    wechatRegisterLink() {
      window.location.href = `${this.addInviteForLink('https://fc.calibur.tv/callback/oauth2/wechat?from=sign')}}`
    },
    redirect() {
      return this.$route.query.redirect ? this.$route.query.redirect : encodeURIComponent(window.location.href)
    },
    submitForm() {
      if (this.step === 0) {
        this.getRegisterAuthCode()
      }
      if (this.step === 2) {
        this.openConfirmModal()
      }
    },
    async getRegisterAuthCode() {
      this.step = 1
      try {
        await sendMessage(this, {
          type: 'sign_up',
          phone_number: this.form.access
        })
        this.step = 2
        this.openConfirmModal()
      } catch (err) {
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
      this.showAuthModal = true
    },
    submitFormData() {
      this.waitAuthModal = true
      if (!/^\d{6}$/.test(this.form.authCode)) {
        this.waitAuthModal = false
        this.$toast.error('验证码格式不正确')
        return
      }
      this.step = 3
      this.signUp()
    },
    closeAuthModal() {
      this.showAuthModal = false
      this.waitAuthModal = false
    },
    signUp() {
      register(this, {
        access: this.form.access,
        secret: this.form.secret,
        authCode: this.form.authCode,
        inviteCode: this.form.inviteCode
      })
        .then((token) => {
          this.$cookie.set('JWT-TOKEN', token)
          this.$toast.success('注册成功！', () => {
            if (this.$route.query.redirect) {
              window.location = decodeURIComponent(this.$route.query.redirect)
            } else {
              window.location.reload()
            }
          })
        })
        .catch(() => {
          this.step = 0
        })
        .finally(() => {
          this.closeAuthModal()
        })
    },
    showLogin() {
      this.$emit('to-login')
    }
  }
}
</script>

<style lang="scss">
.sign-up-form {
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

    .provider {
      height: 16px;
      margin-top: -8px;

      span {
        line-height: 21px;
      }

      li {
        display: inline-block;
      }

      i {
        font-size: 20px;
        vertical-align: middle;
        margin-left: 10px;
        color: $color-icon-1;
        cursor: pointer;
      }

      .ic-qq:hover {
        color: $color-blue;
      }

      .ic-v-chat:hover {
        color: $color-green;
      }
    }
  }
}
</style>

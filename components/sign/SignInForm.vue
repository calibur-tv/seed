<template>
  <div class="sign-in-form">
    <form :loading="loading" :form="form" :rule="rule" :error="false">
      <Input v-model.trim="form.access" type="text" placeholder="手机（填写常用手机号，用于登录）" />
      <Input
        v-model.trim="form.secret"
        password
        type="password"
        placeholder="密码（6-16个字符组成，区分大小写）"
        @keydown.enter.native="submitForm"
      />
      <!--
      <div class="opt-container">
        <ul class="provider">
          <li @click="authQQ">
            <i class="iconfont ic-qq" />
          </li>
          <li @click="authWechat">
            <i class="iconfont ic-v-chat" />
          </li>
        </ul>
      </div>
      -->
      <Button type="primary" block :loading="loading" @click="login">登录</Button>
    </form>
    <div class="others">
      <a @click="showReset">忘记密码?></a>
      <a @click="showRegister">点击注册»</a>
    </div>
  </div>
</template>

<script>
import { Input, Button } from 'ant-design-vue'
import { login } from '~/api/signApi'

export default {
  name: 'SignInForm',
  components: {
    Input,
    Button
  },
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
        secret: ''
      },
      rule: {
        access: { validator: validateAccess },
        secret: { validator: validateSecret }
      },
      loading: false
    }
  },
  methods: {
    authQQ() {
      window.location.href = 'https://fc.calibur.tv/callback/oauth2/qq?from=sign'
    },
    authWechat() {
      window.location.href = 'http://fc.calibur.tv/callback/oauth2/wechat?from=sign'
    },
    redirect() {
      return this.$route.query.redirect ? this.$route.query.redirect : encodeURIComponent(window.location.href)
    },
    login() {
      if (this.loading) {
        return
      }
      this.loading = true
      login(this, {
        access: this.form.access,
        secret: this.form.secret
      })
        .then((token) => {
          this.$cookie.set('JWT-TOKEN', token, {
            expires: 365
          })
          if (this.$route.query.redirect) {
            window.location = decodeURIComponent(this.$route.query.redirect)
          } else {
            window.location.reload()
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    showReset() {
      this.$emit('to-reset')
    },
    showRegister() {
      this.$emit('to-register')
    }
  }
}
</script>

<style lang="scss">
.sign-in-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .opt-container {
    margin-top: 15px;
    padding: 0 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .provider {
      li {
        display: inline-block;
        margin-left: 8px;
      }

      i {
        font-size: 20px;
        vertical-align: middle;
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

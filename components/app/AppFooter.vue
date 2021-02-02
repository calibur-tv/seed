<template>
  <footer id="app-footer">
    <div class="v-layout">
      <div class="links-wrap">
        <div class="links-item">
          <p>calibur</p>
          <ul>
            <a class="fade-link" href="javascript:;">关于我们</a>
            <a class="fade-link" href="javascript:;">联系我们</a>
            <a class="fade-link" href="javascript:;">用户协议</a>
            <a class="fade-link" href="javascript:;">加入我们</a>
            <a class="fade-link" href="javascript:;">友情链接</a>
            <a class="fade-link" href="javascript:;">隐私政策</a>
          </ul>
        </div>
        <div class="links-item">
          <p>传送门</p>
          <ul>
            <a class="fade-link" href="javascript:;">Excalibur</a>
            <a class="fade-link" href="javascript:;">Dollars</a>
            <a class="fade-link" href="javascript:;">Sword Art Online</a>
            <a class="fade-link" href="javascript:;">SOS Dan</a>
            <a class="fade-link" href="javascript:;">Death Note</a>
          </ul>
        </div>
        <ul class="icons-wrap">
          <li class="icons-item">
            <i class="iconfont ic-qq" />
            <p class="name">QQ</p>
            <div class="qr">
              <img src="https://m1.calibur.tv/qq_mini_app.png" alt="" />
            </div>
          </li>
          <li class="icons-item">
            <i class="iconfont ic-v-chat" />
            <p class="name">微信</p>
            <div class="qr">
              <img src="https://m1.calibur.tv/weixin_mini_app.jpg" alt="" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="v-layout">
      <div class="text-con">
        <p>
          <span
            >互联网ICP备案：<a class="fade-link" href="http://beian.miit.gov.cn/" target="_blank"
              >沪ICP备17050785号-1</a
            ></span
          >
        </p>
        <p>违法不良信息举报邮箱：<a class="fade-link" href="mailto:im_bai@163.com">im_bai@163.com</a></p>
        <p>
          <a class="fade-link" href="http://www.shjbzx.cn" target="_blank">上海互联网举报中心</a>&nbsp;|
          <a class="fade-link" href="http://jbts.mct.gov.cn/" target="_blank">12318全国文化市场举报网站</a>&nbsp;|
          <a class="fade-link" href="mailto:userreport@bilibili.com">儿童色情信息举报专区</a>
        </p>
        <p>
          网上有害信息举报专区：<a class="fade-link" href="https://www.12377.cn/" target="_blank"
            >中国互联网违法和不良信息举报中心</a
          >
        </p>
        <p>公司名称：上海十六夜网络科技有限公司&nbsp;|&nbsp;公司地址：浦东新区 万祥镇宏祥北路83弄1-42号</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
#app-footer {
  width: 100%;
  font-family: 'Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei', 'Hiragino Sans GB', 'Heiti SC',
    'WenQuanYi Micro Hei', sans-serif;
  position: relative;
  background-color: #f6f9fa;
  padding: 30px;
  margin-top: 30px;

  .links-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .links-item {
      flex: 2;
      padding-right: 40px;
      margin-right: 40px;
      border-right: 1px solid #eee;

      p {
        font-size: 16px;
        color: #999;
        display: block;
        height: 20px;
        margin-bottom: 20px;
      }

      ul {
        height: 96px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
      }

      a {
        display: inline-block;
        margin-bottom: 10px;
        color: #212121;
        font-size: 14px;
      }
    }

    .icons-wrap {
      flex: 1;
    }
  }

  .icons-wrap {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .icons-item {
      position: relative;
      width: 70px;
      height: 75px;
      text-align: center;

      &:hover .qr {
        display: block;
      }
    }

    .qr {
      position: absolute;
      left: 50%;
      bottom: 110%;
      width: 117px;
      height: 117px;
      border: 1px solid #eee;
      transform: translateX(-50%);
      padding: 10px;
      background-color: #fff;
      display: none;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .iconfont {
      font-size: 25px;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      display: block;
      color: #fff;
      border-radius: 50%;
      margin: 0 auto;
    }

    .ic-qq {
      background-color: $color-blue;
    }

    .ic-v-chat {
      background-color: $color-green;
    }

    .name {
      margin-top: 10px;
      color: #212121;
    }
  }

  .text-con {
    color: #999;
    font-size: 12px;
    line-height: 24px;
    margin-top: 15px;
  }
}
</style>

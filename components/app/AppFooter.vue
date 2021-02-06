<template>
  <footer id="app-footer">
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

  .text-con {
    color: #999;
    font-size: 12px;
    line-height: 24px;
    margin-top: 15px;
  }
}
</style>

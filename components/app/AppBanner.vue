<template>
  <section id="app-banner" :style="{ backgroundImage: `url(${background})` }">
    <div class="v-layout">
      <img class="logo" :src="$resize('logo-border.png', { width: 220, rule: 2 })" alt="logo" />
      <div class="search-box">
        <a href="https://www.bilibili.com/v/popular/rank/all" class="rank">
          <span>排行榜</span>
        </a>
        <form action="#" method="get" class="search-wrap" @submit.prevent="handleSearch">
          <input
            v-model="keyword"
            placeholder="搜索 bilibili"
            type="text"
            name="keyword"
            aria-autocomplete="both"
            aria-haspopup="false"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            role="combobox"
            spellcheck="false"
            maxlength="50"
          />
          <button type="submit" class="submit-btn" />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppBanner',
  props: {
    background: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    handleSearch() {
      if (!this.keyword) {
        return
      }
      window.open(`https://search.bilibili.com/all?keyword=${encodeURIComponent(this.keyword)}&from_source=calibur`)
    }
  }
}
</script>

<style lang="scss">
#app-banner {
  width: 100%;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: $app-banner-hgt;
  padding-top: $app-header-hgt;

  .v-layout {
    height: 100%;
  }

  .logo {
    position: absolute;
    width: 220px;
    height: 116px;
    left: 24px;
    bottom: 0;
    z-index: 10;
    filter: drop-shadow(0 0.2rem 0.75rem rgba(0, 0, 0, 0.8));
  }

  .search-box {
    position: absolute;
    bottom: 20px;
    right: 0;
    width: 268px;
    height: 32px;
    padding: 2px 2px 2px 72px;
    background-color: rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    font-size: 12px;
    z-index: 10;
    box-sizing: content-box;
  }

  .rank {
    position: absolute;
    left: 2px;
    top: 2px;
    height: 32px;
    line-height: 32px;
    background-color: #fff;
    background-color: hsla(0, 0%, 100%, 0.88);
    border-radius: 4px;
    width: 68px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #fff;
    }

    span {
      display: block;
      background: url(~assets/img/icons.png) -659px -655px no-repeat;
      color: #f25d8e;
      padding-left: 26px;
    }
  }

  .search-wrap {
    background-color: hsla(0, 0%, 100%, 0.88);
    display: block;
    height: 32px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #fff;
    }

    input {
      float: left;
      width: 200px;
      color: #222;
      font-size: 12px;
      overflow: hidden;
      height: 32px;
      line-height: 32px;
      padding: 0 12px;
      border: 0;
      box-shadow: none;
      background-color: transparent;
    }

    button {
      display: block;
      position: absolute;
      right: 0;
      width: 48px;
      min-width: 0;
      height: 32px;
      background: url(~assets/img/icons.png) -653px -720px;
      margin: 0;
      padding: 0;
      border: 0;
      cursor: pointer;

      &:hover {
        background-position: -718px -720px;
      }
    }
  }
}
</style>

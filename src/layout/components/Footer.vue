<template>
  <footer class="footer-container">
    <div class="footer-container-main">
      <div class="footer-links">
        <span>{{ $t("common.systemTile") }}</span>
        <img :src="require('@/assets/imgs/github.png')" class="footer-logo" />
        <span>{{ $t("common.systemName") }}</span>
      </div>
      <div class="footer-copyright">
        {{ $t("common.copyright") }}
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {},
  data() {
    return {

    }
  },
  mounted() { },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.footer-container {
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  background: #f0f2f5;
  padding: 0;
  .footer-container-main {
    margin: 33px 0 24px;
    padding: 0 16px;
    text-align: center;
    font-size: 13px;
    .footer-links {
      margin-bottom: 10px;
      span {
        color: rgba(0, 0, 0, 0.45);
        transition: all 0.3s;
      }
      .footer-logo {
        width: 15px;
        height: 15px;
        margin-right: 30px;
      }
    }
    .footer-links span:not(:last-child) {
      margin-right: 30px;
    }
    .footer-copyright {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }
}
</style>
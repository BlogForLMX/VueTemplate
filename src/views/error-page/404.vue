<template>
  <div class="error-container">
    <img :src="require('@/assets/404/404.png')" class="error-image" alt="404" />
    <h3 class="error-title">Sorry, the page you visited does not exist.</h3>
    <el-button type="primary" class="error-btn" @click="handleGoBack">{{
      $t("common.goBack")
    }}</el-button>
  </div>
</template>

<script>
export default {
  name: '404',
  data() {
    return {
    }
  },
  methods: {
    /**
     * @description 处理返回操作
     * @returnsv void
     */
    handleGoBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.error-container {
  padding: 48px 32px;
  background: none;
  text-align: center;
  .error-image {
    width: 500px;
    height: auto;
    margin-top: 80px;
    margin-left: 35px;
  }
  .error-title {
    margin-top: 25px;
    line-height: 1.6;
    text-align: center;
  }
  .error-btn {
    margin-top: 25px;
  }
}
</style>
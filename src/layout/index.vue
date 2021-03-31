<template>
  <div class="layout-container">
    <!-- 侧边栏 -->
    <SiderBar @handleOpenOrClose="handleOpenOrClose" />
    <section class="right-container" :class="leftMargin">
      <Header />
      <div class="main-container">
        <div class="main-container-content">
          <keep-alive :include="keepAliveData">
            <router-view />
          </keep-alive>
        </div>
      </div>
      <Footer />
    </section>
  </div>
</template>

<script>
import Header from './components/Header'
import SiderBar from './components/SiderBar'
import Footer from './components/Footer'

export default {
  name: 'Layout',
  components: { SiderBar, Header, Footer },
  data() {
    return {
      leftMargin: 'max-left-margin',
      keepAliveData: []
    }
  },
  mounted() { },

  methods: {

    /**
     * @description 展开或者收起操作
     * @param {Boolean} flag
     * @returns void
     */
    handleOpenOrClose(flag) {
      this.leftMargin = flag ? 'max-left-margin' : 'min-left-margin'
    }

  }
}
</script>

<style lang='scss' scoped>
.layout-container {
  height: 100%;
  width: 100%;
  background-color: #f0f2f5;
  position: absulote;
  top: 0;
  left: 0;
  overflow: hidden;

  .right-container {
    height: 100%;
    transition: margin-left 0.3s;
    overflow: auto;
  }
  .max-left-margin {
    margin-left: 208px;
  }
  .min-left-margin {
    margin-left: 60px;
  }
  .main-container {
    position: relative;
    margin: 24px;
    flex: auto;
    min-height: 0;
    .main-container-content {
      width: 100%;
      min-height: 750px;
      background-color: #fff;
    }
  }
}
</style>

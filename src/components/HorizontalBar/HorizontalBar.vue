<template>
  <div class="horizontal-bar-container">
    <p class="bar-title">{{ horizontalBarName }}</p>
    <div class="bar-container">
      <div class="bar-main"></div>
      <div
        class="bar-main-content"
        :style="{ width: horizontalBarValue + '%' }"
      >
        <div
          class="bar-main-bg"
          :class="{ 'bar-main-bg-fill': fillFlag }"
        ></div>
      </div>
    </div>
    <p class="bar-value">
      <countTo
        :startVal="0"
        :endVal="horizontalBarValue"
        :duration="1200"
        :decimals="1"
      ></countTo
      >%
    </p>
  </div>
</template>

<script>
import countTo from 'vue-count-to'

export default {
  name: 'HorizontalBar',
  components: { countTo },
  props: {
    horizontalBarName: {
      type: String,
      default: '可用率'
    },
    horizontalBarValue: {
      type: Number,
      default: 86.23
    }
  },
  data() {
    return {
      fillFlag: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.fillFlag = true
    }, 200)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "./HorizontalBar.scss";
</style>

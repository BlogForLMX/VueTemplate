<template>
  <div class="roll-number-box">
    <p
      class="roll-number-item"
      v-for="(item, index) in rollNumberArray"
      :key="index"
    >
      <span ref="numberValue">0123456789</span>
    </p>
    <p class="roll-number-unit">
      <span>{{ rollUnit }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'RollNumber',
  props: {
    rollNumber: {
      type: Number,
      default: 0
    },
    rollUnit: {
      type: String,
      default: '个'
    }
  },
  watch: {
    rollNumber(newValue, oldValue) {
      this.rollNumberArray = newValue.toString().split('')
      this.handleRollAction()
    }
  },
  data() {
    return {
      rollNumberArray: []
    }
  },
  created() {
    // 处理传入的滚动数值
    this.rollNumberArray = this.rollNumber.toString().split('')
  },
  mounted() {
    // 为了显示效果延迟500毫秒显示
    setTimeout(() => {
      this.handleRollAction()
    }, 500)
  },
  methods: {
    /**
     * @description  设置滚动效果
     * @return void
     */
    handleRollAction() {
      const rollNumberRefsArray = this.$refs.numberValue
      rollNumberRefsArray.map((item, index) => {
        item.style.transform = `translate(-50%, -${this.rollNumberArray[index] * 10}%)`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./RollNumber.scss";
</style>

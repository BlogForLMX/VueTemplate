<template>
  <canvas :id="canvasId" :height="height" :width="width">
    The current browser does not support canvas
  </canvas>
</template>

<script>
import { Particle } from './Particle.js'
export default {
  name: 'CanvasParticle',
  props: {
    height: {
      type: Number,
      default: 300
    },
    width: {
      type: Number,
      default: 300
    },
    particleColor: {
      type: String,
      default: '#0396FF'
    },
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    animateRateTime: {
      type: Number,
      default: 85
    }
  },
  data() {
    return {
      canvasId: '',
      timer: undefined
    }
  },
  created() {
    this.canvasId = 'canvasBox_' + Math.random()
  },
  mounted() {
    this.timer = new Particle({
      width: this.width,
      height: this.height,
      particleColor: this.particleColor,
      canvasId: this.canvasId,
      bgColor: this.bgColor,
      animateRateTime: this.animateRateTime
    })
  },
  beforeDestroy() {
    if (this.timer) {
      window.cancelAnimationFrame(this.timer)
    }
  },
  methods: {}
}
</script>

<style lang="scss">
canvas {
  transform: rotateX(50deg);
  border-radius: 100%;
}
</style>

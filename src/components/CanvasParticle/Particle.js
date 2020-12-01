/**
 * 定义canvas粒子效果实体类
 * @param {Object} configObj
 */
export var Particle = function(configObj) {
  if (configObj === undefined) configObj = {}
  var _scope = this
  var lastTime = new Date().getTime()
  var nowTime = 0

  this.timer = undefined
  this.stars = []
  this.vel = configObj.vel || 1
  this.radius = configObj.radius || 1
  this.alpha = 0.5
  this.starsCounter = configObj.stars || 75
  var canvas, context

  this.init = function() {
    canvas = document.getElementById(configObj.canvasId)
    context = canvas.getContext('2d')
    this.start()
  }

  this.start = function() {
    this.stars = []
    for (let i = 0; i < this.starsCounter; i++) {
      _scope.stars.push(new CanvasParticleItem())
    }
  }

  this.animate = function() {
    nowTime = new Date().getTime()
    if (nowTime - lastTime > configObj.animateRateTime) {
      lastTime = nowTime
      this.render()
    }
    window.cancelAnimationFrame(_scope.timer)
    _scope.timer = window.requestAnimationFrame(this.animate.bind(this))
  }

  this.render = function() {
    context.clearRect(0, 0, configObj.width, configObj.height)
    context.fillStyle = configObj.bgColor
    context.fillRect(0, 0, configObj.width, configObj.height)
    context.strokeStyle = configObj.particleColor

    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].moveCicle()
      this.stars[i].drawCicle()
    }
  }

  var CanvasParticleItem = function() {
    this.x = configObj.width / 2
    this.y = configObj.height / 2
    this.init = function() {
      this.x = configObj.width / 2
      this.y = configObj.height / 2 + 10
      this.lineWidth = 0
      this.vel = {
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5
      }
    }
    this.moveCicle = function() {
      this.lineWidth += 0.4
      this.lineWidth = this.lineWidth > 2 ? 2 : this.lineWidth
      this.x0 = this.x
      this.y0 = this.y
      this.x += this.vel.x
      this.y += this.vel.y
      if (this.isDead()) this.init()
    }
    this.drawCicle = function() {
      context.beginPath()
      context.lineWidth = this.lineWidth
      context.arc(this.x0, this.y0, 1, 0, 360)
      context.stroke()
    }
    this.isDead = function() {
      return (this.x < 0 || this.x > configObj.width || this.y < 0 || this.y > configObj.height)
    }
    this.init()
    return this
  }

  this.init()
  this.animate()

  return this.timer
}

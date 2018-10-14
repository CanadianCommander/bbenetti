import GraphicObject from '../canvasGraphics2d/GraphicObject.js'
import Position from '../logic/Position.js'

export default class RadialGradientEffect extends GraphicObject(Position(Object)) {

  constructor (x, y, radius, color0, color1) {
    super()
    this.setX(x)
    this.setY(y)
    this.radius = radius
    this.color0 = color0
    this.color1 = color1

    this.rebuildGradient = true
    this.gradientEffect = null
  }

  setX (x) {
    super.setX(x)
    this.rebuildGradient = true
  }

  setY (y) {
    super.setY(y)
    this.rebuildGradient = true
  }

  draw (ctx) {
    ctx.save()

    // build gradient
    if (this.rebuildGradient) {
      this.gradientEffect = ctx.createRadialGradient(this.getX(), this.getY(), 0, this.getX(), this.getY(), this.radius)
      this.gradientEffect.addColorStop(0, this.color0)
      this.gradientEffect.addColorStop(1, this.color1)
      this.rebuildGradient = false
    }
    ctx.fillStyle = this.gradientEffect

    // draw circle
    ctx.beginPath()
    ctx.arc(this.getX(), this.getY(), this.radius, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }
}

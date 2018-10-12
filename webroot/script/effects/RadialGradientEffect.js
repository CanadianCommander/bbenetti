import GraphicObject from '../canvasGraphics2d/GraphicObject.js'
import Position from '../physics/Position.js'

export default class RadialGradientEffect extends GraphicObject(Position(Object)) {

  constructor (x, y, radius, color0, color1) {
    super()
    this.setX(x)
    this.setY(y)
    this.radius = radius
    this.color0 = color0
    this.color1 = color1
    this.rebuildGradient = false
  }

  draw (ctx) {
    ctx.save()

    // build gradient
    var gradientEffect = ctx.createRadialGradient(this.getX(), this.getY(), 0, this.getX(), this.getY(), this.radius)
    gradientEffect.addColorStop(0, this.color0)
    gradientEffect.addColorStop(1, this.color1)
    ctx.fillStyle = gradientEffect

    // draw circle
    ctx.beginPath()
    ctx.arc(this.getX(), this.getY(), this.radius, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }
}

import GraphicObject from '../canvasGraphics2d/GraphicObject.js'
import Position from '../logic/Position.js'

export default class RectEffect extends GraphicObject(Position(Object)) {

  constructor (x, y, w, h, color) {
    super()
    this.setX(x)
    this.setY(y)
    this.width = w
    this.height = h
    this.color = color
  }

  draw (ctx) {
    ctx.save()
    ctx.fillStyle = this.color

    // draw rect
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.fill()

    ctx.restore()
  }
}

import GraphicObject from '../canvasGraphics2d/GraphicObject.js'
import Position from '../logic/Position.js'
import * as util from '../util.js'

export default class LineEffect extends GraphicObject(Position(Object)) {
  constructor (x0, y0, x1, y1, thick, color) {
    super()
    this.color = color
    this.thickness = thick
    this.startPoint = util.toPoint(x0, y0)
    this.endPoint = util.toPoint(x1, y1)
    this.updateMidPoint()
  }

  updateMidPoint () {
    this.setPosition(math.add(math.multiply(this.startPoint, 0.5), math.multiply(this.endPoint, 0.5)))
  }

  setStart (x0, y0) {
    this.startPoint = util.toPoint(x0, y0)
    this.updateMidPoint()
  }

  setStartPoint (p) {
    this.startPoint = p
    this.updateMidPoint()
  }

  setEnd (x1, y1) {
    this.endPoint = util.toPoint(x1, y1)
    this.updateMidPoint()
  }

  setEndPoint (p) {
    this.endPoint = p
    this.updateMidPoint()
  }

  draw (ctx) {
    ctx.save()
    ctx.lineWidth = this.thickness
    ctx.strokeStyle = this.color

    ctx.beginPath()
    util.drawLineTo(ctx, util.getPointX(this.startPoint), util.getPointY(this.startPoint),
      util.getPointX(this.endPoint), util.getPointY(this.endPoint))
    ctx.stroke()

    ctx.restore()
  }
}

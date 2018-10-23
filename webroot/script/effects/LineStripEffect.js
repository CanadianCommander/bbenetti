import GraphicObject from '../canvasGraphics2d/GraphicObject.js'
import Position from '../logic/Position.js'
import * as util from '../util.js'

export default class LineStripEffect extends GraphicObject(Position(Object)) {
  constructor (pList, thickness, color) {
    super()

    this.pointList = pList
    this.color = color
    this.thickness = thickness
  }

  getPointList () {
    return this.pointList
  }

  setPointList (p) {
    this.pointList = p
  }

  draw (ctx) {
    ctx.save()
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.thickness

    ctx.beginPath()
    for (var i = 1; i < this.pointList.length; i++) {
      util.drawLineToP(ctx, this.pointList[i - 1], this.pointList[i])
    }
    ctx.stroke()

    ctx.restore()
  }
}

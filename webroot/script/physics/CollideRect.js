import CollidePoly from './CollidePoly.js'
import * as util from '../util.js'

export default class CollideRect extends CollidePoly {
  constructor (x, y, width, height, rotation) {
    super([])
    this.pos = util.toPoint(x, y)
    this.width = width
    this.height = height
    this.rotationMtx = util.createRotationMatrix(rotation)
    this.buildPointList()
  }

  setHeight (h) {
    this.height = h
    this.buildPointList()
  }

  setWidth (w) {
    this.width = w
    this.buildPointList()
  }

  setRotation (ro) {
    this.rotationMtx = util.createRotationMatrix(ro)
    this.buildPointList()
  }

  setX (x) {
    this.pos = util.setPointX(x)
    this.buildPointList()
  }

  setY (y) {
    this.pos = util.setPoinY(y)
    this.buildPointList()
  }

  setPos (pos) {
    this.pos = pos
    this.buildPointList()
  }

  // build list of points that represent this rectangle
  buildPointList () {
    var transBack = util.createTranslationMatrix(util.getPointX(this.pos) + this.width / 2, util.getPointY(this.pos) + this.height / 2)
    var pos = math.multiply(util.createTranslationMatrix(-util.getPointX(this.pos) - this.width / 2, -util.getPointY(this.pos) - this.height / 2), this.pos)

    var tl = math.multiply(transBack, math.multiply(this.rotationMtx, pos))
    var tr = math.multiply(transBack, math.multiply(this.rotationMtx, math.add(pos, math.matrix([[this.width], [0], [0]]))))
    var br = math.multiply(transBack, math.multiply(this.rotationMtx, math.add(pos, math.matrix([[this.width], [this.height], [0]]))))
    var bl = math.multiply(transBack, math.multiply(this.rotationMtx, math.add(pos, math.matrix([[0], [this.height], [0]]))))

    this.setPolyPoints([tl, tr, br, bl, tl])
  }
}

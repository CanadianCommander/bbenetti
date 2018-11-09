import CollidePoly from './CollidePoly.js'

import * as util from '../util.js'
import * as math from '../math/math.js'

export default class CollideRect extends CollidePoly {
  constructor (x, y, width, height, rotation) {
    super([])
    this.pos = math.point.createPoint(x, y)
    this.width = width
    this.height = height
    this.rotationMtx = math.matrix.createRotationMatrix(rotation)
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
    this.rotationMtx = math.matrix.createRotationMatrix(ro)
    this.buildPointList()
  }

  setX (x) {
    this.pos = math.point.setPointX(x)
    this.buildPointList()
  }

  setY (y) {
    this.pos = math.point.setPoinY(y)
    this.buildPointList()
  }

  setPos (pos) {
    this.pos = pos
    this.buildPointList()
  }

  // build list of points that represent this rectangle
  buildPointList () {
    var transBack = math.matrix.createTranslationMatrix(math.point.getPointX(this.pos) + this.width / 2,
      math.point.getPointY(this.pos) + this.height / 2)
    var pos = math.matrix.matmulVec(math.matrix.createTranslationMatrix(-math.point.getPointX(this.pos) - this.width / 2,
      -math.point.getPointY(this.pos) - this.height / 2), this.pos)

    var tl = math.matrix.matmulVec(transBack, math.matrix.matmulVec(this.rotationMtx, pos))
    var tr = math.matrix.matmulVec(transBack, math.matrix.matmulVec(this.rotationMtx, math.point.add(pos, math.point.createPoint(this.width, 0, 0))))
    var br = math.matrix.matmulVec(transBack, math.matrix.matmulVec(this.rotationMtx, math.point.add(pos, math.point.createPoint(this.width, this.height, 0))))
    var bl = math.matrix.matmulVec(transBack, math.matrix.matmulVec(this.rotationMtx, math.point.add(pos, math.point.createPoint(0, this.height, 0))))

    this.setPolyPoints([tl, tr, br, bl, tl])
  }
}

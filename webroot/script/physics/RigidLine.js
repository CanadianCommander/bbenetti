import LineStripEffect from '../effects/LineStripEffect.js'
import LineEffect from '../effects/LineEffect.js'
import GraphicCollection from '../canvasGraphics2d/GraphicCollection.js'

import Updatable from '../logic/Updatable.js'
import Position from '../logic/Position.js'
import CollideRect from './CollideRect.js'
import * as util from '../util.js'

export default class RigidLine extends Position(Updatable(Object)) {
  /**
  parmas
    - pos: the position of the line by mid point
    - angle: rotation of the line in radians
    - length: the length of the line
    - collide: an object that implements Collidable. This is the object with which the RigidLine will collide.
  **/
  constructor (pos, angle, length, thickness, collide) {
    super()
    this.setPosition(pos)
    this.length = length
    this.rotationMtx = util.createRotationMatrix(angle)

    this.translationalForce = math.matrix([[3], [0], [0]])
    this.angularForce = math.pi / 100
    this.angle = angle
    this.collide = collide
    this.thickness = thickness

    this.hitBox = new LineStripEffect([], 1, 'rgb(0, 255, 0)')
    this.lineGfx = new LineEffect(0, 0, 0, 0, 1, 'rgb(255, 0, 0)')
    this.updateGraphicPosition()
  }

  getGraphicEffect () {
    return new GraphicCollection([this.lineGfx, this.hitBox])
  }

  getStartPoint () {
    var lineVec = math.multiply(math.matrix([[1], [0], [0]]), this.length / 2)
    return math.subtract(this.getPosition(), math.multiply(this.rotationMtx, lineVec))
  }

  getEndPoint () {
    var lineVec = math.multiply(math.matrix([[1], [0], [0]]), this.length / 2)
    return math.add(this.getPosition(), math.multiply(this.rotationMtx, lineVec))
  }

  // update the graphical representation of the object on screen
  updateGraphicPosition () {
    var cRect = new CollideRect(util.getPointX(this.getPosition()) - this.length / 2, util.getPointY(this.getPosition()) - this.thickness / 2,
      this.length, this.thickness, this.angle)
    this.hitBox.setPointList(cRect.getPolyPoints())

    var startPoint = this.getStartPoint()
    var endPoint = this.getEndPoint()
    this.lineGfx.setStartPoint(startPoint)
    this.lineGfx.setEndPoint(endPoint)
  }

  update () {
    this.applyVelocity()

    // build collission rect
    var cRect = new CollideRect(util.getPointX(this.getPosition()) - this.length / 2, util.getPointY(this.getPosition()) - this.thickness / 2,
      this.length, this.thickness, this.angle)

    var collissionPoint = cRect.getCollissionPointWithOther(this.collide)
    if (collissionPoint !== null) {
      this.handleCollission(collissionPoint)
    }

    this.updateGraphicPosition()
  }

  applyVelocity () {
    this.setPosition(math.add(this.getPosition(), this.translationalForce))
    this.angle = this.angle + this.angularForce
    this.rotationMtx = math.multiply(util.createRotationMatrix(this.angularForce), this.rotationMtx)
  }

  handleCollission (collissionPoint) {
    this.translationalForce = math.add(this.translationalForce, math.multiply(this.translationalForce, -2.0))
    this.angularForce = -this.angularForce
  }
}

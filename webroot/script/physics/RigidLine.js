import LineEffect from '../effects/LineEffect.js'
import Updatable from '../logic/Updatable.js'
import Position from '../logic/Position.js'
import * as util from '../util.js'

export default class RigidLine extends Position(Updatable(Object)) {
  /**
  parmas
    - pos: the position of the line by mid point
    - angle: rotation of the line in radians
    - length: the length of the line
    - collide: an object that implements Collidable. This is the object with which the RigidLine will collide.
  **/
  constructor (pos, angle, length, collide) {
    super()
    this.setPosition(pos)
    this.length = length
    this.rotationMtx = util.createRotationMatrix(angle)

    this.translationalForce = math.matrix([[4], [0], [0]])
    this.angularForce = math.pi / 200
    this.angle = angle
    this.collide = collide

    this.lineGfx = new LineEffect(0, 0, 0, 0, 1, 'rgb(255, 0, 0)')
    this.updateGraphicPosition()
  }

  getGraphicEffect () {
    return this.lineGfx
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
    var startPoint = this.getStartPoint()
    var endPoint = this.getEndPoint()

    this.lineGfx.setStartPoint(startPoint)
    this.lineGfx.setEndPoint(endPoint)
  }

  update () {
    this.applyVelocity()

    // do some magic
    var collissionPoint = this.collide.getCollissionPoint(this.getStartPoint(), this.getEndPoint())
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
    console.log('BAM at: ' + collissionPoint)
    this.translationalForce = math.add(this.translationalForce, math.multiply(this.translationalForce, -2.0))
  }
}

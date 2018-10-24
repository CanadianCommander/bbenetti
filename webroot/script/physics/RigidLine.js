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
  constructor (pos, angle, length, thickness, collide, mass = 100) {
    super()
    this.setPosition(pos)
    this.oldPos = this.getPosition()
    this.length = length
    this.rotationMtx = util.createRotationMatrix(angle)

    this.translationalForce = math.matrix([[400], [0], [0]])
    this.angularForce = 0
    this.angle = angle
    this.oldAngle = angle
    this.mass = mass
    this.collide = collide
    this.thickness = thickness
    this.inertia = ((length / 2) * (thickness / 2))

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

    var collissionPoints = cRect.getCollissionPointsWithOther(this.collide)
    if (collissionPoints !== null) {
      var cPoint = util.getMeanPoint(collissionPoints.map((p) => p[0]))
      var cNorm = util.getMeanPoint(collissionPoints.map((p) => p[1]))

      this.handleCollission(cPoint, this.calculateCollissionForce(cPoint, cNorm),
      this.calculateCollissionAngularForce(cPoint, cNorm))

      while (cRect.getCollissionPointsWithOther(this.collide) !== null) {
        this.applyVelocity()
        cRect = new CollideRect(util.getPointX(this.getPosition()) - this.length / 2, util.getPointY(this.getPosition()) - this.thickness / 2,
          this.length, this.thickness, this.angle)
      }
    }

    this.updateGraphicPosition()
  }

  applyVelocity () {
    // save old state
    this.oldPos = this.getPosition()
    this.oldAngle = this.angle
    // move
    this.setPosition(math.add(this.getPosition(), math.multiply(this.translationalForce, 1.0 / this.mass)))
    this.angle = this.angle + this.angularForce / (this.mass * this.length / 2)
    this.rotationMtx = util.createRotationMatrix(this.angle)
  }

  undoApplyVelocity () {
    this.setPosition(this.oldPos)
    this.angle = this.oldAngle
    this.rotationMtx = util.createRotationMatrix(this.angle)
  }

  calculateCollissionForce (collissionPoint, surfaceNormal) {
    var snFlat = math.flatten(surfaceNormal).toArray()
    var sn = math.divide(math.abs(surfaceNormal), math.norm(snFlat))
    console.log('NORMAL: ' + sn)
    var vF = math.dotMultiply(math.multiply(this.translationalForce, -2.0), sn)

    console.log('TRANSLATIONAL F: ' + vF)
    return vF
  }

  calculateCollissionAngularForce (collissionPoint, surfaceNormal) {
    var vAF = math.subtract(this.getEndPoint(), this.getStartPoint())
    var vAF = math.multiply(util.createRotationMatrix(-math.pi / 2), vAF)
    console.log('Line NORMAL: ' + vAF)
    var vAFflat = math.flatten(vAF).toArray()
    var vAF = math.multiply(math.divide(vAF, math.norm(vAFflat)), 1.0 * this.angularForce)
    // TODO correct Angular force calc

    // vAF = math.multiply(vAF, -1.0)

    console.log('ANGULAR F: ' + vAF)
    return vAF
  }

  handleCollission (collissionPoint, vF, vAF) {
    vF = math.add(vF, vAF)
    // calc new translational and angular force
    var vFflat = math.flatten(vF).toArray()
    var vR = math.subtract(this.getPosition(), collissionPoint)
    var torque = util.getPointX(vR) * util.getPointY(vF) - util.getPointY(vR) * util.getPointX(vF)
    var transForce = torque / (this.inertia)

    console.log('Troque: ' + transForce)
    console.log('Trans: ' + (1.0 - math.abs(transForce) / math.norm(vFflat)))
    this.angularForce = this.angularForce - torque / this.inertia
    this.translationalForce = math.add(this.translationalForce, math.multiply(vF, (1.0 - math.abs(transForce) / math.norm(vFflat))))

    // this.translationalForce = math.add(this.translationalForce, vAF)
    // this.undoApplyVelocity()
    /*
    var vNorm = math.flatten(util.stripW(math.multiply(util.createRotationMatrix(math.pi / 2), this.translationalForce))).toArray()
    var vFlat = math.flatten(util.stripW(v)).toArray()
    var cpl = math.flatten(util.stripW(math.subtract(collissionPoint, this.getPosition()))).toArray()

    var cTheta = math.dot(math.divide(vNorm, math.norm(vNorm)), math.divide(cpl, math.norm(cpl)))
    console.log('CosTheta: ' + cTheta)

    this.translationalForce = math.multiply(v, -(1.0 - math.abs(cTheta)))
    this.angularForce = -(af - (math.norm(vFlat) * cTheta) / this.length)
    */
  }
}

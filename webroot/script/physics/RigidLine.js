import LineStripEffect from '../effects/LineStripEffect.js'
import LineEffect from '../effects/LineEffect.js'
import GraphicCollection from '../canvasGraphics2d/GraphicCollection.js'

import Updatable from '../logic/Updatable.js'
import Position from '../logic/Position.js'
import CollideRect from './CollideRect.js'
import * as util from '../util.js'

// number of velocity updates to apply at MAX to get out of collision state
// This setting is to prevent the browser from locking in the case of infinite collision
const MAX_COLLISSION_BACKOUT = 1000
export default class RigidLine extends Position(Updatable(Object)) {
  /**
  parmas
    - pos: the position of the line by mid point
    - angle: rotation of the line in radians
    - length: the length of the line
    - collide: an object that implements Collidable. This is the object with which the RigidLine will collide.
  **/
  constructor (pos, angle, length, thickness, collide, gfxEffect, mass = 100) {
    super()
    this.setPosition(pos)
    this.length = length
    this.rotationMtx = util.createRotationMatrix(angle)

    this.translationalForce = math.matrix([[0], [0], [0]])
    this.angularForce = 0
    this.angle = angle
    this.mass = mass
    this.collide = collide
    this.thickness = thickness
    this.inertia = (mass + length)
    // true if we have collided with an object and are in the process
    // of "un colliding" (moving away from the object). This goes to false
    // once we have unmerged with the object.
    this.isColliding = false

    this.textGfx = gfxEffect
    this.updateGraphicPosition()
  }

  getGraphicEffect () {
    return this.textGfx
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
    this.textGfx.setPosition(this.getPosition())
    this.textGfx.setMatrix(
      math.multiply(util.createTranslationMatrix(this.getX(), this.getY()),
        math.multiply(this.rotationMtx, util.createTranslationMatrix(-this.getX(), -this.getY()))))
  }

  update (ups) {
    this.applyVelocity(ups)

    if (this.isColliding) {
      // don't re calculate physics we are most likely inside another object. just drift out.
      cRect = new CollideRect(util.getPointX(this.getPosition()) - this.length / 2, util.getPointY(this.getPosition()) - this.thickness / 2,
        this.length, this.thickness, this.angle)
      if (cRect.getCollisionPointsWithOther(this.collide) !== null) {
        this.applyVelocity(ups)
      } else {
        this.isColliding = false
      }
    } else {
      // check for collision and if collide calculate physics
      var cRect = new CollideRect(util.getPointX(this.getPosition()) - this.length / 2, util.getPointY(this.getPosition()) - this.thickness / 2,
        this.length, this.thickness, this.angle)

      var collissionPoints = cRect.getCollisionPointsWithOther(this.collide)
      if (collissionPoints !== null) {
        var cPoint = util.getMeanPoint(collissionPoints.map((p) => p[0]))
        var cNorm = util.getMeanPoint(collissionPoints.map((p) => p[1]))

        this.handleCollision(cPoint, this.calculateCollisionForce(cPoint, cNorm),
        this.calculateCollisionAngularForce(cPoint, cNorm))

        this.isColliding = true
      }
    }

    this.updateGraphicPosition()
  }

  applyVelocity (ups) {
    // move
    this.setPosition(math.add(this.getPosition(), math.multiply(this.translationalForce, (1.0 / this.mass) * (1.0 / ups))))
    this.angle = this.angle + (this.angularForce / (this.mass * this.length / 2)) * (1.0 / ups)
    this.rotationMtx = util.createRotationMatrix(this.angle)
  }

  // apply force vector to the rigid line
  applyForce (f) {
    this.translationalForce = math.add(this.translationalForce, f)
  }

  calculateCollisionForce (collissionPoint, surfaceNormal) {
    var snFlat = math.flatten(surfaceNormal).toArray()
    var sn = math.divide(math.abs(surfaceNormal), math.norm(snFlat))
    var vF = math.dotMultiply(math.multiply(this.translationalForce, -2.0), sn)

    return vF
  }

  calculateCollisionAngularForce (collissionPoint, surfaceNormal) {
    var rP = math.flatten(math.subtract(this.getPosition(), collissionPoint)).toArray()
    var line = math.flatten(math.subtract(this.getEndPoint(), this.getStartPoint())).toArray()

    var lineProj = math.multiply(math.dot(rP, line) / math.dot(line, line), line)
    var lineNorm = math.multiply(util.createRotationMatrix(math.pi / 2), util.vectorToPoint(math.divide(lineProj, math.norm(lineProj))))

    var vAF = util.setPointW(math.multiply(lineNorm, 1.0 * this.angularForce), 0)

    return vAF
  }

  handleCollision (collissionPoint, vF, vAF) {
    vF = math.add(vF, vAF)
    // calc new translational and angular force
    var vFflat = math.flatten(vF).toArray()
    var vR = math.subtract(this.getPosition(), collissionPoint)
    var torque = util.getPointX(vR) * util.getPointY(vF) - util.getPointY(vR) * util.getPointX(vF)
    var transForce = torque / (this.inertia)

    this.angularForce = this.angularForce - torque / this.inertia
    this.translationalForce = math.add(this.translationalForce, math.multiply(vF, (1.0 - math.abs(transForce) / math.norm(vFflat))))
  }
}

import LineStripEffect from '../effects/LineStripEffect.js'
import LineEffect from '../effects/LineEffect.js'
import GraphicCollection from '../canvasGraphics2d/GraphicCollection.js'

import Updatable from '../logic/Updatable.js'
import Position from '../logic/Position.js'
import CollideRect from './CollideRect.js'

import * as util from '../util.js'
import * as math from '../math/math.js'

export default class RigidLine extends Position(Updatable(Object)) {
  /**
  params
    - pos: the position of the line by mid point
    - angle: rotation of the line in radians
    - length: the length of the line
    - collide: an object that implements Collidable. This is the object with which the RigidLine will collide.
  **/
  constructor (pos, angle, length, thickness, collide, gfxEffect, mass = 100) {
    super()
    this.setPosition(pos)
    this.length = length
    this.rotationMtx = math.matrix.createRotationMatrix(angle)

    this.translationalForce = math.point.createPoint(0, 0, 0)
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
    var lineVec = math.point.scale(math.point.createPoint(1, 0), this.length / 2)
    return math.point.sub(this.getPosition(), math.matrix.matmulVec(this.rotationMtx, lineVec))
  }

  getEndPoint () {
    var lineVec = math.point.scale(math.point.createPoint(1, 0), this.length / 2)
    return math.point.add(this.getPosition(), math.matrix.matmulVec(this.rotationMtx, lineVec))
  }

  // update the graphical representation of the object on screen
  updateGraphicPosition () {
    this.textGfx.setPosition(this.getPosition())
    this.textGfx.setMatrix(
      math.matrix.matmul(math.matrix.createTranslationMatrix(this.getX(), this.getY()),
        math.matrix.matmul(this.rotationMtx, math.matrix.createTranslationMatrix(-this.getX(), -this.getY()))))
  }

  update (ups) {
    this.applyVelocity(ups)
    this.updateGraphicPosition()

    if (this.isColliding) {
      // don't re calculate physics we are most likely inside another object. just drift out. (BUG can cause phasing in multi collide)
      cRect = new CollideRect(math.point.getPointX(this.getPosition()) - this.length / 2, math.point.getPointY(this.getPosition()) - this.thickness / 2,
        this.length, this.thickness, this.angle)
      if (cRect.getCollisionPointsWithOther(this.collide) === null) {
        this.isColliding = false
      }
    } else {
      // check for collision and if collide calculate physics
      var cRect = new CollideRect(math.point.getPointX(this.getPosition()) - this.length / 2, math.point.getPointY(this.getPosition()) - this.thickness / 2,
        this.length, this.thickness, this.angle)

      var collisionPoints = cRect.getCollisionPointsWithOther(this.collide)
      if (collisionPoints !== null) {
        var cPoint = math.point.getMeanPoint(collisionPoints.map((p) => p[0]))
        var cNorm = math.point.getMeanPoint(collisionPoints.map((p) => p[1]))

        this.handleCollision(cPoint, this.calculateCollisionForce(cPoint, cNorm),
        this.calculateCollisionAngularForce(cPoint, cNorm))

        this.isColliding = true
      }
    }
  }

  applyVelocity (ups) {
    // move
    this.setPosition(math.point.add(this.getPosition(), math.point.scale(this.translationalForce, (1.0 / this.mass) * (1.0 / ups))))
    this.angle = this.angle + (this.angularForce / (this.mass * this.length / 2)) * (1.0 / ups)
    this.rotationMtx = math.matrix.createRotationMatrix(this.angle)
  }

  // apply force vector to the rigid line
  applyForce (f) {
    this.translationalForce = math.point.add(this.translationalForce, f)
  }

  calculateCollisionForce (collisionPoint, surfaceNormal) {
    var sn = math.point.divide(math.point.abs(surfaceNormal), math.point.length(surfaceNormal))
    var vF = math.point.multiply(math.point.scale(this.translationalForce, -2.0), sn)

    return vF
  }

  calculateCollisionAngularForce (collisionPoint, surfaceNormal) {
    var rP = math.point.sub(this.getPosition(), collisionPoint)
    var line = math.point.sub(this.getEndPoint(), this.getStartPoint())

    var lineProj = math.point.scale(line, math.point.dot(rP, line) / math.point.dot(line, line))

    if (math.point.length(lineProj) != 0) {
      var lineNorm = math.matrix.matmulVec(math.matrix.createRotationMatrix(Math.PI / 2), math.point.normalize(lineProj))
      var vAF = math.point.setPointW(math.point.scale(lineNorm, 1.0 * this.angularForce), 0)

      return vAF
    } else {
      return math.point.createPoint(0, 0, 0)
    }
  }

  handleCollision (collisionPoint, vF, vAF) {
    vF = math.point.add(vF, vAF)
    // calc new translational and angular force
    var vR = math.point.sub(this.getPosition(), collisionPoint)
    var torque = math.point.getPointX(vR) * math.point.getPointY(vF) - math.point.getPointY(vR) * math.point.getPointX(vF)
    var transForce = torque / (this.inertia)

    this.angularForce = this.angularForce - torque / this.inertia
    this.translationalForce = math.point.add(this.translationalForce, math.point.scale(vF, (1.0 - Math.abs(transForce) / math.point.length(vF))))
  }
}

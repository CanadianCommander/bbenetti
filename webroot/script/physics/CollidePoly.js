import Collidable from './Collidable.js'

import * as util from '../util.js'
import * as math from '../math/math.js'

export default class CollidablePoly extends Collidable(Object) {
  constructor (polyPoints) {
    super()

    this.pointList = polyPoints
  }

  setPolyPoints (polyPoints) {
    this.pointList = polyPoints
  }

  getPolyPoints () {
    return this.pointList
  }

  /**
  like getCollissionPoints but finds collission point(s) between the two CollidePolies
  param:
    pOther: the other CollidablePoly Object with which to check for collission
  return:
    a list of lists of the format [[point, surface normal], [point, surface normal], ...]
  **/
  getCollisionPointsWithOther (pOther) {
    var cPoints = []
    for (var i = 1; i < this.pointList.length; i++) {
      var p = pOther.getCollisionPoints(this.pointList[i - 1], this.pointList[i])
      if (p !== null) {
        cPoints = cPoints.concat(p)
      }
    }

    if (cPoints.length > 0) {
      return cPoints
    } else {
      return null
    }
  }

  /*
  get a list of collission points.
  param:
    rayStart: start of ray
    rayEnd: end of ray
  return:
    a list of lists of the format [[point, surface normal], [point, surface normal], ...]
  */
  getCollisionPoints (rayStart, rayEnd) {
    return this.checkCollision(rayStart, rayEnd)
  }

  isColliding (rayStart, rayEnd) {
    if (this.checkCollision(rayStart, rayEnd) !== null) {
      return true
    }
    return false
  }

  checkCollision (rayStart, rayEnd) {
    var cPoints = []
    for (var i = 1; i < this.pointList.length; i++) {
      var intersectPoint = math.misc.intersectLines(rayStart, rayEnd, this.pointList[i - 1], this.pointList[i])
      if (intersectPoint !== null) {
        cPoints.push([intersectPoint,
          math.point.normalize(
            math.matrix.matmulVec(math.matrix.createRotationMatrix(Math.PI / 2), math.point.sub(this.pointList[i - 1], this.pointList[i])))])
      }
    }

    if (cPoints.length > 0) {
      return cPoints
    } else {
      return null
    }
  }
}

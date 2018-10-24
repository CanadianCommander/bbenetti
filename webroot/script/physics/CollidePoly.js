import Collidable from './Collidable.js'
import * as util from '../util.js'

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
  getCollissionPointsWithOther (pOther) {
    var cPoints = []
    for (var i = 1; i < this.pointList.length; i++) {
      var p = pOther.getCollissionPoints(this.pointList[i - 1], this.pointList[i])
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
  getCollissionPoints (rayStart, rayEnd) {
    return this.checkCollission(rayStart, rayEnd)
  }

  isColliding (rayStart, rayEnd) {
    if (this.checkCollission(rayStart, rayEnd) !== null) {
      return true
    }
    return false
  }

  checkCollission (rayStart, rayEnd) {
    var cPoints = []
    for (var i = 1; i < this.pointList.length; i++) {
      var intersectPoint = util.intersectLines(rayStart, rayEnd, this.pointList[i - 1], this.pointList[i])
      if (intersectPoint !== null) {
        cPoints.push([intersectPoint,
          math.multiply(util.createRotationMatrix(math.pi / 2), math.subtract(this.pointList[i - 1], this.pointList[i]))])
      }
    }

    if (cPoints.length > 0) {
      return cPoints
    } else {
      return null
    }
  }
}

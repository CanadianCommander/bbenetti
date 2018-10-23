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
  return point of collission or null if pOther does not collide with this.
  param:
    pOther: the other CollidablePoly Object with which to check for collission
  **/
  getCollissionPointWithOther (pOther) {
    for (var i = 1; i < this.pointList.length; i++) {
      var p = pOther.getCollissionPoint(this.pointList[i - 1], this.pointList[i])
      if (p !== null) {
        return p
      }
    }
    return null
  }

  getCollissionPoint (rayStart, rayEnd) {
    return this.checkCollission(rayStart, rayEnd)
  }

  isColliding (rayStart, rayEnd) {
    if (this.checkCollission(rayStart, rayEnd) !== null) {
      return true
    }
    return false
  }

  checkCollission (rayStart, rayEnd) {
    for (var i = 1; i < this.pointList.length; i++) {
      var intersectPoint = util.intersectLines(rayStart, rayEnd, this.pointList[i - 1], this.pointList[i])
      if (intersectPoint !== null) {
        return intersectPoint
      }
    }

    return null
  }
}

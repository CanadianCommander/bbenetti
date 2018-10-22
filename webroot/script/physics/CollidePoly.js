import Collidable from './Collidable.js'
import * as util from '../util.js'

export default class CollidablePoly extends Collidable(Object) {
  constructor (polyPoints) {
    super()

    this.pointList = polyPoints
    this.pointList.forEach((p, i) => this.pointList[i] = math.flatten(util.stripW(p)).toArray())
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
    // intersect wants flat arrays not matrices
    rayStart = math.flatten(util.stripW(rayStart).toArray())
    rayEnd = math.flatten(util.stripW(rayEnd).toArray())

    for (var i = 1; i < this.pointList.length; i++) {
      var intersectPoint = util.intersectLines(rayStart, rayEnd, this.pointList[i - 1], this.pointList[i])
      if (intersectPoint !== null) {
        return intersectPoint
      }
    }

    return null
  }
}

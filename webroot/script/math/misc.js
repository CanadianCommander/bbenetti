import * as glm from '../vendor/gl-matrix/gl-matrix.js'
import * as point from './point.js'

export function intersectLines (startLine0, endLine0, startLine1, endLine1) {
  // find intersection point of two lines
  var v = point.sub(startLine1, startLine0)
  var l0 = point.sub(endLine0, startLine0)
  var l1 = point.sub(endLine1, startLine1)
  var l0Proj = point.scale(l0, (point.dot(l0, v) / point.dot(l0, l0)))
  var w = point.sub(point.add(l0Proj, startLine0), startLine1)
  var cosTheta = point.dot(point.divide(w, point.length(w)), point.divide(l1, point.length(l1)))

  if (cosTheta != 0) {
    var h = point.length(w) / cosTheta
    var intersect = point.add(point.scale(point.divide(l1, point.length(l1)), h), startLine1)

    var line0MinX = Math.min(startLine0[0], endLine0[0])
    var line0MaxX = Math.max(startLine0[0], endLine0[0])
    var line0MinY = Math.min(startLine0[1], endLine0[1])
    var line0MaxY = Math.max(startLine0[1], endLine0[1])

    var line1MinX = Math.min(startLine1[0], endLine1[0])
    var line1MaxX = Math.max(startLine1[0], endLine1[0])
    var line1MinY = Math.min(startLine1[1], endLine1[1])
    var line1MaxY = Math.max(startLine1[1], endLine1[1])

    // make sure the intersection point is on the specified line segment.
    if (intersect[0] >= line0MinX && intersect[0] <= line0MaxX) {
      if (intersect[1] >= line0MinY && intersect[1] <= line0MaxY) {
        if (intersect[0] >= line1MinX && intersect[0] <= line1MaxX) {
          if (intersect[1] >= line1MinY && intersect[1] <= line1MaxY) {
            return intersect
          }
        }
      }
    }
  }

  return null
}

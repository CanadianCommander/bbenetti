
export function drawLineTo (ctx, x0, y0, x1, y1) {
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
}

export function applyMathJSMatrixToCanvas (ctx, mtx) {
  if (!mtx.isIdentity) {
    var row1 = math.flatten(math.subset(mtx, math.index(0, [0, 1, 2]))).toArray()
    var row2 = math.flatten(math.subset(mtx, math.index(1, [0, 1, 2]))).toArray()
    ctx.setTransform(row1[0], row2[0], row1[1], row2[1], row1[2], row2[2])
  }
}

export function toPoint (x, y) {
  return math.matrix([[x], [y], [1]])
}

export function getPointX (point) {
  return math.subset(point, math.index(0, 0))
}

export function getPointY (point) {
  return math.subset(point, math.index(1, 0))
}

// set w value back to 1 (matrix math can mess it up)
export function fixW (point) {
  var wVal = math.subset(point, math.index(2, 0))
  return math.add(point, math.matrix([[0], [0], [-wVal + 1]]))
}

// remove w component from point
export function stripW (point) {
  var pSize = math.size(point)
  return math.subset(point, math.index([0, 1], 0))
}

export function createTranslationMatrix (x, y) {
  return math.matrix([[1, 0, x], [0, 1, y], [0, 0, 1]])
}

export function createScaleMatrix (xScale, yScale) {
  return math.matrix([[xScale, 0, 0], [0, yScale, 0], [0, 0, 1]])
}

export function createRotationMatrix (angle) {
  return math.matrix([[math.cos(angle), -math.sin(angle), 0],
    [math.sin(angle), math.cos(angle), 0], [0, 0, 1]])
}

export function intersectLines (startLine0, endLine0, startLine1, endLine1) {
  var v = math.subtract(startLine1, startLine0)
  var l0 = math.subtract(endLine0, startLine0)
  var l1 = math.subtract(endLine1, startLine1)
  var l0Proj = math.multiply((math.dot(l0, v) / math.dot(l0, l0)), l0)
  var w = math.subtract(math.add(l0Proj, startLine0), startLine1)
  var cosTheta = math.dot(math.divide(w, math.norm(w)), math.divide(l1, math.norm(l1)))

  if (cosTheta != 0) {
    var h = math.norm(w) / cosTheta
    var intersect = math.add(math.multiply(math.divide(l1, math.norm(l1)), h), startLine1)

    var line0MinX = math.min(startLine0[0], endLine0[0])
    var line0MaxX = math.max(startLine0[0], endLine0[0])

    var line1MinY = math.min(startLine1[1], endLine1[1])
    var line1MaxY = math.max(startLine1[1], endLine1[1])

    if (intersect[0] > line0MinX && intersect[0] < line0MaxX) {
      if (intersect[1] > line1MinY && intersect[1] < line1MaxY) {
        return intersect
      }
    }
  }

  return null
}

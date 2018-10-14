
export function lineTo (ctx, x0, y0, x1, y1) {
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

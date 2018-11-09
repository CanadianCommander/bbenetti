import * as glm from '../vendor/gl-matrix/gl-matrix.js'

export function createPoint (x, y, w = 1.0) {
  return glm.vec3.fromValues(x, y, w)
}

// add vectors. a + b
export function add (a, b) {
  return glm.vec2.add(glm.vec3.fromValues(0, 0, Math.max(a[2], b[2])), a, b)
}

// subtract vectors. a - b
export function sub (a, b) {
  return glm.vec2.sub(glm.vec3.fromValues(0, 0, Math.max(a[2], b[2])), a, b)
}

// dot product of vectors. a * b
export function dot (a, b) {
  return glm.vec2.dot(a, b)
}

// element wise multiplication of vectos a and b.
export function multiply (a, b) {
  return glm.vec2.multiply(glm.vec3.fromValues(0, 0, Math.max(a[2], b[2])), a, b)
}

// scale vector a by scalar s.
export function scale (a, s) {
  return glm.vec2.scale(glm.vec3.fromValues(0, 0, a[2]), a, s)
}

// scale vector a by 1/s aka divide
export function divide (a, s) {
  return scale(a, 1.0 / s)
}

export function normalize (v) {
  return glm.vec2.normalize(glm.vec3.fromValues(0, 0, v[2]), v)
}

// make v absolute
export function abs (v) {
  return createPoint(Math.abs(v[0]), Math.abs(v[1]), Math.abs(v[2]))
}

// get magnitude of vector a
export function length (a) {
  return glm.vec2.length(a)
}

export function getPointX (point) {
  return point[0]
}

export function getPointY (point) {
  return point[1]
}

export function getPointW (point) {
  return point[2]
}

export function setPointX (point, x) {
  point[0] = x
  return point
}

export function setPointY (point, y) {
  point[1] = y
  return point
}

export function setPointW (point, w) {
  point[2] = w
  return point
}

// set w value back to 1 (matrix math can mess it up)
export function fixW (point) {
  point[2] = 1.0
  return point
}

// remove w component from point
export function stripW (point) {
  var vec2d = glm.vec2.fromValues(point[0], point[1])
  return vec2d
}

// return the "mean" point of a group of points. that is to say the point the is
// in the middle of the group of points
export function getMeanPoint (pointList) {
  var n = pointList.length
  var accPoint = createPoint(0, 0)
  pointList.forEach((p) => {
    accPoint = add(accPoint, scale(p, 1.0 / n))
  })

  return accPoint
}

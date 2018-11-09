import * as glm from '../vendor/gl-matrix/gl-matrix.js'

export function create () {
  return glm.mat3.create()
}

export function createIdentity () {
  return glm.mat3.identity(glm.mat3.create())
}

export function matmul (a, b) {
  return glm.mat3.multiply(glm.mat3.create(), a, b)
}

// multiply matrix, m with vector v.
export function matmulVec (m, v) {
  return glm.vec3.transformMat3(glm.vec3.create(), v, m)
}

export function createTranslationMatrix (x, y) {
  var vt = glm.vec2.fromValues(x, y)
  return glm.mat3.fromTranslation(glm.mat3.create(), vt)
}

export function createScaleMatrix (xScale, yScale) {
  var vs = glm.vec2.fromValues(xScale, yScale)
  return glm.mat3.fromScaling(glm.mat3.create(), vs)
}

export function createRotationMatrix (angle) {
  return glm.mat3.fromRotation(glm.mat3.create(), angle)
}

export function applyMatrixToCanvas (ctx, mtx) {
  ctx.setTransform(mtx[0], mtx[1], mtx[3], mtx[4], mtx[6], mtx[7])
}

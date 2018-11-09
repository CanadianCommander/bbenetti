import * as math from '../math/math.js'
/**
Transformable
**/
const Transformable = base => class extends base {
  constructor () {
    super()
    this.reset()
  }

  applyToCanvas (ctx) {
    math.matrix.applyMatrixToCanvas(ctx, this.transform)
  }

  reset () {
    this.transform = math.matrix.createIdentity()
  }

  setMatrix (mtx) {
    this.transform = mtx
  }

  getMatrix () {
    return this.transform
  }

  multiply (mtx) {
    this.transform = math.matrix.matmul(mtx, this.transform)
  }

  translate (x, y) {
    var mtx = math.matrix.createTranslationMatrix(x, y)
    this.multiply(mtx)
  }

  scale (xS, yS) {
    var mtx = math.matrix.createScaleMatrix(xS, yS)
    this.multiply(mtx)
  }

  rotate (angle) {
    var mtx = math.matrix.createRotationMatrix(angle)
    this.multiply(mtx)
  }

}
export default Transformable

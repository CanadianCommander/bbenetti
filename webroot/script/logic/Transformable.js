import * as util from '/script/util.js'
/**
Transformable
**/
const Transformable = base => class extends base {
  constructor () {
    super()
    this.reset()
  }

  applyToCanvas (ctx) {
    util.applyMathJSMatrixToCanvas(ctx, this.transform)
  }

  reset () {
    this.transform = math.identity(3)
  }

  setMatrix (mtx) {
    this.transform = mtx
  }

  getMatrix () {
    return this.transform
  }

  multiply (mtx) {
    this.transform = math.multiply(mtx, this.transform)
  }

  translate (x, y) {
    var mtx = util.createTranslationMatrix(x, y)
    this.multiply(mtx)
  }

  scale (xS, yS) {
    var mtx = util.createScaleMatrix(xS, yS)
    this.multiply(mtx)
  }

  rotate (angle) {
    var mtx = util.createRotationMatrix(angle)
    this.multiply(mtx)
  }

}
export default Transformable

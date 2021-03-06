import * as math from '/script/math/math.js'
import * as util from '/script/util.js'
/**
RenderController, controlls the rendering operations on the canvas.
**/
export default class RenderController {
  /*
  construct the render controller targeting the given canvas.
  */
  constructor (canvas) {
    this.rContext = canvas.getContext('2d')
    this.width = parseInt($(canvas).attr('width'))
    this.height = parseInt($(canvas).attr('height'))
    this.graphicObjects = []
    this.isAnimating = false

    this.baseMatrix = math.matrix.createTranslationMatrix(-0.5, -0.5)
  }

  getRenderContext () {
    return this.rContext
  }

  addGraphicObject (gObj) {
    this.graphicObjects.push(gObj)
  }

  // startAnimation, starts refreshing the animation area.
  startAnimation () {
    this.isAnimating = true
    window.requestAnimationFrame(RenderController.prototype.update.bind(this))
  }

  // stopAnimation, stops refreshing the animation area
  stopAnimation () {
    this.isAnimating = false
  }

  // update, updates and renders graphics objects to the canvas.
  update () {
    // clear screen
    this.rContext.fillStyle = 'rgb(0, 0, 0)'
    this.rContext.fillRect(0, 0, this.width, this.height)

    // TODO: sort graphic objects in Z order

    // render graphics objects
    this.rContext.save()
    math.matrix.applyMatrixToCanvas(this.rContext, this.baseMatrix)

    this.graphicObjects.forEach((obj, i, arr) => {
      this.rContext.save()

      obj.applyToCanvas(this.rContext)// apply object transforms
      obj.draw(this.rContext)// draw

      this.rContext.restore()
    })
    this.rContext.restore()

    if (this.isAnimating) {
      window.requestAnimationFrame(RenderController.prototype.update.bind(this))
    }
  }
}

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

    // OK, so some one fucked up, this site does a good job of explaining why this is needed (really bad design, but hey its JS, what did you expect)
    // http://usefulangle.com/post/17/html5-canvas-drawing-1px-crisp-straight-lines
    this.baseMatrix = util.createTranslationMatrix(-0.5, -0.5)
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
    util.applyMathJSMatrixToCanvas(this.rContext, this.baseMatrix)

    this.graphicObjects.forEach((obj, i, arr) => {
      this.rContext.save()

      obj.applyToCanvas(this.rContext)// apply object transforms
      obj.draw(this.rContext)// draw
      util.applyMathJSMatrixToCanvas(this.rContext, this.baseMatrix)// reset transformation

      this.rContext.restore()
    })
    this.rContext.restore()

    if (this.isAnimating) {
      window.requestAnimationFrame(RenderController.prototype.update.bind(this))
    }
  }
}

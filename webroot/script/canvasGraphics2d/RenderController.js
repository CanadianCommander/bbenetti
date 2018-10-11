/**
RenderController, controlls the rendering of the canvas identified by "targetCanvasName".
**/
export default class RenderController {
  /*
  construct the render controller targeting the given canvas and canvasBackBuffer.
  The first is the display canvas and the second is the back buffer (just use a hidden canvas)
  */
  constructor (canvas, canvasBackBuffer) {
    this.rContext = canvas.getContext('2d')
    this.rBackContext = canvasBackBuffer.getContext('2d')
    this.width = parseInt($(canvas).attr('width'))
    this.height = parseInt($(canvas).attr('height'))
    this.graphicObjects = []
  }

  getRenderContext () {
    return this.rContext
  }

  addGraphicObject (gObj) {
    this.graphicObjects.push(gObj)
  }

  // startAnimation, starts refreshing the animation area, fps times a second.
  startAnimation (fps) {
    this.updateIntervalId = setInterval(
      RenderController.prototype.update.bind(this), 1000 / fps)
  }

  // stopAnimation, stops refreshing the animation area
  stopAnimation () {
    clearInterval(this.updateIntervalId)
  }

  // update, updates and renders graphics objects to the canvas.
  update () {
    // TODO: do some back buffer swap N clear
    this.rBackContext.fillStyle = 'rgb(0, 0, 0)'
    this.rBackContext.fillRect(0, 0, this.width, this.height)

    // TODO: sort graphic objects in Z order

    // render graphics objects
    this.rBackContext.save()
    // OK, so some one fucked up, this site does a good job of explaining why this is needed (really bad design, but hey its JS, what did you expect)
    // http://usefulangle.com/post/17/html5-canvas-drawing-1px-crisp-straight-lines
    this.rBackContext.translate(-0.5, -0.5)

    this.graphicObjects.forEach((obj, i, arr) => {
      obj.draw(this.rBackContext)
    })
    this.rBackContext.restore()

    // buffer swap
    this.rContext.putImageData(this.rBackContext.getImageData(0, 0, this.width, this.height), 0, 0)
  }
}

import RenderController from '/script/canvasGraphics2d/RenderController.js'
import GridEffect from '/script/effects/GridEffect.js'

var primaryCanvas = $('#animationArea').get(0)
var secondaryCanvas = $('#animationAreaBackBuffer').get(0)
if (primaryCanvas !== undefined && secondaryCanvas !== undefined) {
  var rController = new RenderController(primaryCanvas, secondaryCanvas)

  // add animation objects
  var GE = new GridEffect(0, 0, 1141, 301, 40, primaryCanvas, window)
  GE.setGridBias(-10, -10)
  rController.addGraphicObject(GE)

  rController.startAnimation(60)
} else {
  console.error('Could not locate canvas for animation playback')
}

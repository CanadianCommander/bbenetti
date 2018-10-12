import RenderController from '/script/canvasGraphics2d/RenderController.js'
import UpdateController from '/script/physics/UpdateController.js'
import GridEffect from '/script/effects/GridEffect.js'
import RadialGradientEffect from '/script/effects/RadialGradientEffect.js'

var primaryCanvas = $('#animationArea').get(0)
var secondaryCanvas = $('#animationAreaBackBuffer').get(0)

if (primaryCanvas !== undefined && secondaryCanvas !== undefined) {
  var rController = new RenderController(primaryCanvas, secondaryCanvas)
  var uController = new UpdateController()

  // create grid effect over entire screen
  var gridEffect = new GridEffect(0, 0, 1141, 301, 60)
  gridEffect.setGridBias(-10, -10)
  rController.addGraphicObject(gridEffect)

  // corner lights
  gridEffect.addHighlightEffect(new RadialGradientEffect(0, 300, 300, '#ff0000ff', '#ff000000'))
  gridEffect.addHighlightEffect(new RadialGradientEffect(1141, 0, 300, '#aa0000ff', '#aa000000'))

  // mouse tracking highlight effect
  var mouseHighlightEffect = new RadialGradientEffect(0, 0, 100, '#5879adff', '#5879ad00')
  gridEffect.addHighlightEffect(mouseHighlightEffect)

  // do mouse tracking
  var mouseX = -999
  var mouseY = -999
  $(window).on('mousemove', (event) => {
    mouseX = event.clientX - primaryCanvas.getBoundingClientRect().x
    mouseY = event.clientY - primaryCanvas.getBoundingClientRect().y
  })

  // move highlight to follow mouse
  uController.addTask(() => {
    mouseHighlightEffect.setX(mouseX)
    mouseHighlightEffect.setY(mouseY)
  })

  rController.startAnimation(60)
  uController.startUpdating(60)
} else {
  console.error('Could not locate canvas for animation playback')
}

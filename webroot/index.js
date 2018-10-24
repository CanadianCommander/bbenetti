import RenderController from '/script/canvasGraphics2d/RenderController.js'
import UpdateController from '/script/logic/UpdateController.js'
import GridEffect from '/script/effects/GridEffect.js'
import RadialGradientEffect from '/script/effects/RadialGradientEffect.js'

import RigidLine from '/script/physics/RigidLine.js'
import CollidePoly from '/script/physics/CollidePoly.js'
import * as util from '/script/util.js'

var primaryCanvas = $('#animationArea').get(0)
if (primaryCanvas !== undefined) {
  var rController = new RenderController(primaryCanvas)
  var uController = new UpdateController()

  // create grid effect over entire screen
  var gridEffect = new GridEffect(0, 0, 1141, 301, 60)
  gridEffect.setGridBias(-10, -10)
  rController.addGraphicObject(gridEffect)

  // corner lights
  gridEffect.addHighlightEffect(new RadialGradientEffect(0, 300, 300, '#5879adff', '#5879ad00'))
  gridEffect.addHighlightEffect(new RadialGradientEffect(1141, 0, 300, '#48699dff', '#48699d00'))

  // mouse tracking highlight effect
  var mouseHighlightEffect = new RadialGradientEffect(0, 0, 100, '#5879adff', '#5879ad00')
  gridEffect.addHighlightEffect(mouseHighlightEffect)

  // collide poly for line REMOVE
  var collidObj = new CollidePoly([
    util.toPoint(0, 0), util.toPoint(0, 300), // left wall
    util.toPoint(1141, 300), // bottom wall
    util.toPoint(1141, 0), // right wall
    util.toPoint(0, 0)])

  // line REMOVE
  var rigidLine = new RigidLine(math.matrix([[350], [100], [1]]), math.pi / 4, 50, 5, collidObj)
  rController.addGraphicObject(rigidLine.getGraphicEffect())
  uController.addUpdatable(rigidLine)

  // do mouse tracking
  var mouseX = -999
  var mouseY = -999
  $(window).on('mousemove', (event) => {
    mouseX = event.clientX - primaryCanvas.getBoundingClientRect().x
    mouseY = event.clientY - primaryCanvas.getBoundingClientRect().y
  })
  $(window).on('mouseout', (event) => {
    mouseX = -999
    mouseY = -999
  })

  // move highlight to follow mouse
  uController.addTask(() => {
    mouseHighlightEffect.setX(mouseX)
    mouseHighlightEffect.setY(mouseY)
  })

  rController.startAnimation()
  uController.startUpdating(60)
} else {
  console.error('Could not locate canvas for animation playback')
}

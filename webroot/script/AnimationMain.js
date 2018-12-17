// control
import RenderController from '/script/canvasGraphics2d/RenderController.js'
import UpdateController from '/script/logic/UpdateController.js'

// graphic
import GridEffect from '/script/effects/GridEffect.js'
import RadialGradientEffect from '/script/effects/RadialGradientEffect.js'
import TextEffect from '/script/effects/TextEffect.js'
import WordBounceEffect from '/script/effects/WordBounceEffect.js'

// physics
import RigidLine from '/script/physics/RigidLine.js'
import CollidePoly from '/script/physics/CollidePoly.js'

// misc
import * as util from '/script/util.js'
import * as math from '/script/math/math.js'

export default function initAnimation (target) {
  var primaryCanvas = $(target).get(0)
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

    // collide poly for word bounce effect
    var collideObj = new CollidePoly([
      math.point.createPoint(0, 0), math.point.createPoint(0, 300), // left wall
      math.point.createPoint(1141, 300), // bottom wall
      math.point.createPoint(1141, 0), // right wall
      math.point.createPoint(0, 0)])

    // word bounce effect
    var techList = ['C++', 'GoLang', 'C', 'Scala', 'Python', 'JS', 'Java', 'SQL', 'Bash', 'ARMv7', 'asm',
      'BareMetal', 'Linux', 'MacOs', 'Terminal', 'FullStack', 'BackEnd', 'FrontEnd', 'Web', 'Tensorflow',
      'RedHat', 'OpenGL', 'GUI', 'IoT', 'Networking', 'Threading', 'OO-Design', 'CLI',
      'VM', 'Cloud', 'git', 'Functional', 'MySQL', 'DB2', 'MCU', 'Maker', 'Perforce', 'Security', 'XSS', 'CSRF',
      '<3 Linux']
    var wBouncer = new WordBounceEffect(1141 / 2, 300 / 2, techList, 30, 'Monospace',
      collideObj, uController, rController)
    rController.addGraphicObject(wBouncer)
    uController.addUpdatable(wBouncer)

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
    uController.startUpdating(24)
  } else {
    console.error('Could not locate canvas for animation playback')
  }
}

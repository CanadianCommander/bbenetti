import Position from '../logic/Position.js'
import Updatable from '../logic/Updatable.js'
import GraphicCollection from '../canvasGraphics2d/GraphicCollection.js'
import RigidLine from '../physics/RigidLine.js'
import TextEffect from './TextEffect.js'
import * as util from '../util.js'

export default class WordBounceEffect extends Updatable(Position(GraphicCollection)) {
  constructor (x, y, wordList, fontSize, fontFamily, collideObj, updateController, renderController) {
    super()
    this.setX(x)
    this.setY(y)
    this.wList = wordList
    this.cObj = collideObj
    this.fontSize = fontSize
    this.fontFamily = fontFamily
    this.uController = updateController
    this.rController = renderController
    this.rigidLines = []
  }

  update (ups) {
    // randomly create new text objects
    if (math.randomInt(0, 128) == 1) {
      // spawn new word
      var word = math.pickRandom(this.wList)
      var randRGB = 'rgb(' + math.randomInt(0, 256) + ',' + math.randomInt(0, 256) + ',' + math.randomInt(0, 256) + ')'
      var gfx = new TextEffect(word, this.fontSize, this.fontFamily, randRGB, 100, 100)
      var rigidLine = new RigidLine(math.matrix([[math.random(100, 1000)], [math.random(50, 250)], [1]]), math.random(0, math.pi * 2),
        util.measureText(word, this.fontSize + 'px ' + this.fontFamily, this.rController.getRenderContext()).width, 5, this.cObj, gfx)
      rigidLine.applyForce(math.matrix([[math.random(-6000, 6000)], [math.random(-6000, 6000)], [0]]))

      this.rigidLines.push(rigidLine)
      this.add(rigidLine.getGraphicEffect())
    }

    // update all text objects
    this.rigidLines.forEach((l) => l.update(ups))
  }

  draw (ctx) {
    super.draw(ctx)
  }
}

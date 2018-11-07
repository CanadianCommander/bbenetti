import Position from '../logic/Position.js'
import Updatable from '../logic/Updatable.js'
import GraphicCollection from '../canvasGraphics2d/GraphicCollection.js'
import RigidLine from '../physics/RigidLine.js'
import TextEffect from './TextEffect.js'
import * as util from '../util.js'

export default class WordBounceEffect extends Updatable(Position(GraphicCollection)) {
  constructor ( x, y, wordList, font, collideObj, updateController, renderController) {
    super()
    this.setX(x)
    this.setY(y)
    this.wList = wordList
    this.cObj = collideObj
    this.font = font
    this.uController = updateController
    this.rController = renderController
    this.rigidLines = []
  }

  update () {
    // randomly create new text objects
    if (math.randomInt(0, 256) == 1) {
      //spawn new word
      var word = math.pickRandom(this.wList)
      var gfx = new TextEffect(word, this.font , "#ffffff", 100, 100)
      var rigidLine = new  RigidLine(math.matrix([[math.random(100, 1000)], [math.random(50,250)], [1]]), math.random(0, math.pi*2),
        util.measureText(word, this.font, this.rController.getRenderContext()).width, 5, this.cObj, gfx)
      rigidLine.applyForce(math.matrix([[math.random(-100, 100)],[math.random(-100, 100)],[0]]))

      this.rigidLines.push(rigidLine)
      this.add(gfx)
    }

    // update all text objects
    this.rigidLines.forEach((l) => l.update())
  }

  draw (ctx) {
    super.draw(ctx)
  }
}

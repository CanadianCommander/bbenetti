import Position from '../logic/Position.js'
import Updatable from '../logic/Updatable.js'
import GraphicCollection from '../canvasGraphics2d/GraphicCollection.js'
import RigidLine from '../physics/RigidLine.js'
import TextEffect from './TextEffect.js'

import * as util from '../util.js'
import * as math from '../math/math.js'

export default class WordBounceEffect extends Updatable(Position(GraphicCollection)) {
  constructor (x, y, wordList, fontSize, fontFamily, collideObj, updateController, renderController, maxActive = 30) {
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
    this.active = 0
    this.maxActive = maxActive
    this.spawnChance = 64 // 1 in 64

    // func(time) -> alpha. a function that gives an alpha value given time.
    this.fadeFunc = (time) => {
      // fade in, in fTime seconds then sit at max for fTime seconds, finally fade out over fTime  seconds.
      var fTime = 15
      if (time < fTime * 2) {
        return Math.min(time * (1.0 / fTime), 1.0)
      } else {
        return Math.max((fTime - (time - fTime * 2)) * (1.0 / fTime), 0)
      }
    }
  }

  /**
    set custom fade function. This function takes a time (seconds) value and produces alpha.
    f(time) = alpha
  **/
  setFadeFunc (func) {
    this.fadeFunc = func
  }

  update (ups) {
    // randomly create new text objects
    if (math.random.randomInt(0, this.spawnChance) == 1) {
      // spawn new word
      var word = math.random.pick(this.wList)
      var rgbaColor = {r: math.random.randomInt(0, 128), g: math.random.randomInt(64, 256), b: 255, a: 0.0}
      this.addWordEffect(word, this.getX() + math.random.random(-200, 200), this.getY(), math.random.random(0, Math.PI * 2),
        math.point.createPoint(math.random.random(-6000, 6000), math.random.random(-6000, 6000), 0), rgbaColor)
    }

    // update all words objects
    this.rigidLines.forEach((l) => {
      l.line.update(ups)
      this.updateWordAlpha(l, ups)
    })
  }

  // update alpha values of word according to fadeFunc
  updateWordAlpha (word, ups) {
    var alpha = this.fadeFunc(word.time)
    word.color.a = alpha
    word.line.getGraphicEffect().setColor(util.colorToString(word.color))
    word.time += 1.0 / ups
  }

  addWordEffect (txt, x, y, angle, force, color) {
    var colorString = util.colorToString(color)
    var gfx = new TextEffect(txt, this.fontSize, this.fontFamily, colorString, 0, 0)
    var rigidLine = new RigidLine(math.point.createPoint(x, y, 1), angle,
      util.measureText(txt, this.fontSize + 'px ' + this.fontFamily, this.rController.getRenderContext()).width, 10, this.cObj, gfx)
    rigidLine.applyForce(force)

    var newObj = {
      line: rigidLine,
      time: 0,
      color: color
    }
    this.rigidLines.push(newObj)
    this.add(rigidLine.getGraphicEffect())

    this.active ++
    if (this.active > this.maxActive) {
      this.removeWordEffect(this.rigidLines.shift())
    }
  }

  removeWordEffect (obj) {
    this.remove(obj.line.getGraphicEffect())
  }

  draw (ctx) {
    super.draw(ctx)
  }
}

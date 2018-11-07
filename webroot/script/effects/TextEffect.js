import GraphicObject from '../canvasGraphics2d/GraphicObject.js'
import Position from '../logic/Position.js'

export default class LineEffect extends GraphicObject(Position(Object)) {
  /**
  params
    text: text to be displayed
    font: a CSS font size string like '20px monospace' or '12pt sansarif'
    color: CSS color string
    x/y: possition of the center of the text.
  **/
  constructor (text, font, color, x, y) {
    super()
    this.setX(x)
    this.setY(y)
    this.text = text
    this.font = font
    this.color = color
    this.width = 0
  }

  // return width of text. only valid after text has been measured or drawn atleast once.
  getTextWidth () {
    return this.width
  }

  // measure text width using the given graphics context
  measureText (ctx) {
    ctx.save()

    ctx.fillStyle = this.color
    ctx.font = this.font
    var txtSize = ctx.measureText(this.text)
    this.width = txtSize.width

    ctx.restore()
    return this.width
  }

  draw (ctx) {
    ctx.save()

    ctx.fillStyle = this.color
    ctx.font = this.font
    var txtSize = ctx.measureText(this.text)
    this.width = txtSize.width
    ctx.fillText(this.text, this.getX() - txtSize.width/2, this.getY())

    ctx.restore()
  }
}

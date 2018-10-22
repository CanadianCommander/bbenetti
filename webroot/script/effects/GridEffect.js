import GraphicObject from '/script/canvasGraphics2d/GraphicObject.js'
import Position from '/script/logic/Position.js'
import * as util from '/script/util.js'

// grid effect configuration constants
const GRID_LINE_COLOR = '#101010'
const GRID_FILL_COLOR = '#000000'
const GRID_LINE_WIDTH = 2

/**
GridEffect produces a grid effect in the given region.
**/
export default class GridEffect extends GraphicObject(Position(Object)) {
  /*
  create new grid effect
  param:
    --omit obvious ones--
    spacing: is the spacing between grid lines. (so the number of pixels inbetween to parallel lines)
  */
  constructor (x, y, width, height, spacing) {
    super()
    this.setX(x)
    this.setY(y)
    this.width = width
    this.height = height
    this.spacing = spacing
    /*
      Map of GraphicObjects that are drawn after the grid but before the fill to cause
      a grid highlight effect. It is a map so that removal is fast! (no need to search through list)
    */
    this.highlightEffects = new Map([])
  }

  /*
  setGridBias sets the x and y grid bias (shift). this is the amount that the
  grid is shifted from zero.
  */
  setGridBias (xBias, yBias) {
    this.xBias = xBias
    this.yBias = yBias
  }

  addHighlightEffect (effect) {
    this.highlightEffects.set(effect, effect)
  }

  removeHighlightEffect (effect) {
    this.highlightEffects.delete(effect)
  }

  draw (ctx) {
    ctx.save()

    this.drawGrid(ctx)
    this.drawEffects(ctx)
    this.fillGrid(ctx)

    ctx.restore()
  }

  drawEffects (ctx) {
    ctx.save()

    // set clip
    ctx.beginPath()
    ctx.rect(this.getX(), this.getY(), this.width, this.height)
    ctx.clip()

    this.highlightEffects.forEach((obj, key, m) => {
      obj.draw(ctx)
    })

    ctx.restore()
  }

  fillGrid (ctx) {
    ctx.save()
    ctx.fillStyle = GRID_FILL_COLOR

    // set clip
    ctx.beginPath()
    ctx.rect(this.getX(), this.getY(), this.width, this.height)
    ctx.clip()

    // fill
    var startX = Math.ceil(this.getX() / this.spacing) * this.spacing + this.xBias
    var startY = Math.ceil(this.getY() / this.spacing) * this.spacing + this.yBias
    var gridLineWidth = Math.floor(GRID_LINE_WIDTH / 2)

    ctx.fillRect(this.getX() + gridLineWidth, this.getY() + gridLineWidth,
      startX - this.getX() - gridLineWidth * 2, startY - this.getY() - gridLineWidth * 2)

    for (var x = startX; x < this.getX() + this.width; x += this.spacing) {
      ctx.fillRect(x + gridLineWidth, this.getY() + gridLineWidth,
        this.spacing - gridLineWidth * 2, startY - this.getY() - gridLineWidth * 2)

      for (var y = startY; y <= (this.getY() + this.height); y += this.spacing) {
        ctx.fillRect(this.getX() + gridLineWidth, y + gridLineWidth,
          startX - this.getX() - gridLineWidth * 2, this.spacing - gridLineWidth * 2)

        ctx.fillRect(x + gridLineWidth, y + gridLineWidth,
          this.spacing - gridLineWidth * 2, this.spacing - gridLineWidth * 2)
      }
    }

    ctx.restore()
  }

  drawGrid (ctx) {
    ctx.save()
    // setup gfx context for line drawing
    ctx.strokeStyle = GRID_LINE_COLOR
    ctx.lineWidth = GRID_LINE_WIDTH

    ctx.beginPath()

    // draw grid X
    var startX = Math.ceil(this.getX() / this.spacing) * this.spacing + this.xBias
    for (var x = startX; x <= (this.getX() + this.width); x += this.spacing) {
      util.drawLineTo(ctx, x, this.getY(), x, this.getY() + this.height)
    }

    // draw grid Y
    var startY = Math.ceil(this.getY() / this.spacing) * this.spacing + this.yBias
    for (var y = startY; y <= (this.getY() + this.height); y += this.spacing) {
      util.drawLineTo(ctx, this.getX(), y, this.getX() + this.width, y)
    }
    ctx.stroke()
    ctx.restore()
  }

  fillBackground (ctx) {
    // Need to fill background because lines may draw with AA and thus alpha blend in to
    // the background (allowing color to seap through).
    ctx.save()
    ctx.fillRect(this.getX(), this.getY(), this.width, this.height)
    ctx.restore()
  }

  getZIndex () {
    return super.getZIndex()
  }
}

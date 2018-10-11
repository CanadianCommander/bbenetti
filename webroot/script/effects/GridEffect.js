import GraphicObject from '/script/canvasGraphics2d/GraphicObject.js'
import * as util from '/script/canvasGraphics2d/util.js'

// grid effect configuration constants
const GRID_LINE_COLOR = '#303030'
const GRID_FILL_COLOR = '#000000'
const GRID_MOUSE_HIGHLIGHT_COLOR = '#274f91'
const GRID_LINE_WIDTH = 2
const GRID_MOUSE_HIGHLIGHT_RADIUS = 100

/**
GridEffect produces a grid effect in the given region.
**/
export default class GridEffect extends GraphicObject(Object) {
  /*
  create new grid effect
  param:
    --omit obvious ones--
    spacing: is the spacing between grid lines. (so the number of pixels inbetween to parallel lines)
    targetElement: is the DOM element to which mouse positions should be relative. (Ex: canvas)
    mouseTrackElement: is the DOM element on which to listen for mouse move events. (Ex: window)
  */
  constructor (x, y, width, height, spacing, targetElement = undefined, mouseTrackElement = undefined) {
    super()
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.spacing = spacing
    this.mouseX = 0
    this.mouseY = 0

    if (mouseTrackElement !== undefined && targetElement !== undefined) {
      $(mouseTrackElement).on('mousemove', (event) => {
        this.mouseX = event.clientX - targetElement.getBoundingClientRect().x
        this.mouseY = event.clientY - targetElement.getBoundingClientRect().y
      })
    }
  }

  /*
  setGridBias sets the x and y grid bias (shift). this is the amount that the
  grid is shifted from zero.
  */
  setGridBias (xBias, yBias) {
    this.xBias = xBias
    this.yBias = yBias
  }

  draw (ctx) {
    ctx.save()

    this.drawGrid(ctx)
    this.mouseHighlight(ctx)
    this.fillGrid(ctx)

    ctx.restore()
  }

  mouseHighlight (ctx) {
    ctx.save()

    // set clip
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.clip()

    // construct gradient effect
    var gradientEffect = ctx.createRadialGradient(this.mouseX, this.mouseY, 0, this.mouseX, this.mouseY, GRID_MOUSE_HIGHLIGHT_RADIUS)
    gradientEffect.addColorStop(0, GRID_MOUSE_HIGHLIGHT_COLOR)
    gradientEffect.addColorStop(1, GRID_LINE_COLOR)
    ctx.fillStyle = gradientEffect

    // draw circle
    ctx.beginPath()
    ctx.arc(this.mouseX, this.mouseY, GRID_MOUSE_HIGHLIGHT_RADIUS, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }

  fillGrid (ctx) {
    ctx.save()
    ctx.fillStyle = GRID_FILL_COLOR

    // set clip
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.clip()

    // fill
    var startX = Math.ceil(this.x / this.spacing) * this.spacing + this.xBias
    var startY = Math.ceil(this.y / this.spacing) * this.spacing + this.yBias
    var gridLineWidth = Math.floor(GRID_LINE_WIDTH / 2)

    ctx.fillRect(this.x + gridLineWidth, this.y + gridLineWidth,
      startX - this.x - gridLineWidth * 2, startY - this.y - gridLineWidth * 2)

    for (var x = startX; x < this.x + this.width; x += this.spacing) {
      ctx.fillRect(x + gridLineWidth, this.y + gridLineWidth,
        this.spacing - gridLineWidth * 2, startY - this.y - gridLineWidth * 2)

      for (var y = startY; y <= (this.y + this.height); y += this.spacing) {
        ctx.fillRect(this.x + gridLineWidth, y + gridLineWidth,
          startX - this.x - gridLineWidth * 2, this.spacing - gridLineWidth * 2)

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
    var startX = Math.ceil(this.x / this.spacing) * this.spacing + this.xBias
    for (var x = startX; x <= (this.x + this.width); x += this.spacing) {
      util.lineTo(ctx, x, this.y, x, this.y + this.height)
    }

    // draw grid Y
    var startY = Math.ceil(this.y / this.spacing) * this.spacing + this.yBias
    for (var y = startY; y <= (this.y + this.height); y += this.spacing) {
      util.lineTo(ctx, this.x, y, this.x + this.width, y)
    }
    ctx.stroke()
    ctx.restore()
  }

  fillBackground (ctx) {
    // Need to fill background because lines may draw with AA and thus alpha blend in to
    // the background (allowing color to seap through).
    ctx.save()
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.restore()
  }

  getZIndex () {
    return super.getZIndex()
  }
}

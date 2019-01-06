import * as math from './math/math.js'

export function drawLineTo (ctx, x0, y0, x1, y1) {
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
}

export function drawLineToP (ctx, p1, p2) {
  drawLineTo(ctx, getPointX(p1), getPointY(p1), getPointX(p2), getPointY(p2))
}

// returns textMetrics object for th given text + font + context combination.
export function measureText (text, font, ctx) {
  ctx.save()
  ctx.font = font
  var txtSize = ctx.measureText(text)
  ctx.restore()

  return txtSize
}

export function colorToString (color) {
  return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')'
}

/*
  clientSpaceToViewportSpaceTransform calculates a transformation matrix that transforms
  from client space (DOM coordinates) to viewport coordinates.
*/
export function clientSpaceToViewportSpaceTransform (canvas) {
  // client space
  let cw = $(canvas).width()
  let ch = $(canvas).height()

  // viewport
  let vw = parseInt($(canvas).attr('width'))
  let vh = parseInt($(canvas).attr('height'))

  return math.matrix.createScaleMatrix(vw / cw, vh / ch)
}

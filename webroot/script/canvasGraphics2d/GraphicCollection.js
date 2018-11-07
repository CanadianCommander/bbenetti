import GraphicObject from './GraphicObject.js'

export default class GraphicCollection extends GraphicObject(Object) {
  constructor (gObjs) {
    super()

    if (gObjs !== undefined) {
      this.graphicList = gObjs
    } else {
      this.graphicList = []
    }
  }

  add (obj) {
    this.graphicList.push(obj)
  }

  remove (obj) {
    this.graphicList = this.graphicList.filter((o) => o !== obj)
  }

  draw (ctx) {
    this.graphicList.forEach((o) => {
      ctx.save()

      o.applyToCanvas(ctx)
      o.draw(ctx)

      ctx.restore()
    })
  }
}

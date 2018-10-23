import GraphicObject from './GraphicObject.js'

export default class GraphicCollection extends GraphicObject(Object) {
  constructor (gObjs) {
    super()

    this.graphicList = gObjs
  }

  draw (ctx) {
    this.graphicList.forEach((o) => o.draw(ctx))
  }
}

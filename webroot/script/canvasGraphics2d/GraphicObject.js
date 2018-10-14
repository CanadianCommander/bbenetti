import Transformable from '/script/logic/Transformable.js'
/**
GraphicObject is the base "class"(mixin) of all graphic objects. it provides a standard interface
that all graphics objects must implement.
**/
const GraphicObject = base => class extends Transformable(base) {
  // draw is called to render the object
  draw (ctx) {}

  /**
  getZIndex is used to get the objects z index for draw ordering.
  0 is closest -> infinity is farthest.
  **/
  getZIndex () {
    return 0
  }
}
export default GraphicObject

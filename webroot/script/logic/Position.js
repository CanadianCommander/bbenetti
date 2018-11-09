import * as math from '../math/math.js'
/*
Position is the interface for objects that have a position (x, y).
*/
const Position = base => class extends base {
  // because this object may be chained through many classes
  // directly passing x/y in to constructor is to hard.
  constructor () {
    super()
    this.pos = math.point.createPoint(0, 0)
  }

  setX (x) {
    this.pos[0] = x
  }

  setY (y) {
    this.pos[1] = y
  }

  setPosition (point) {
    this.pos = point
  }

  getX () {
    return this.pos[0]
  }

  getY () {
    return this.pos[1]
  }

  getPosition () {
    return this.pos
  }
}
export default Position

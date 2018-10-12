/*
Position is the interface for objects that have a position (x, y).
*/
const Position = base => class extends base {
  // because this object may be chained through many classes
  // directly passing x/y in to constructor is to hard.
  constructor () {
    super()
    this.pos = new DOMPoint(0, 0, 0, 1)
  }

  setX (x) {
    this.pos.x = x
  }

  setY (y) {
    this.pos.y = y
  }

  getX () {
    return this.pos.x
  }

  getY () {
    return this.pos.y
  }

  getPoint () {
    return this.pos
  }
}
export default Position

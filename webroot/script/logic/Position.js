/*
Position is the interface for objects that have a position (x, y).
*/
const Position = base => class extends base {
  // because this object may be chained through many classes
  // directly passing x/y in to constructor is to hard.
  constructor () {
    super()
    this.pos = math.matrix([[0], [0], [1]])
  }

  setX (x) {
    this.pos = math.subset(this.pos, math.index(0, 0), x)
  }

  setY (y) {
    this.pos = math.subset(this.pos, math.index(1, 0), y)
  }

  getX () {
    return math.subset(this.pos, math.index(0, 0))
  }

  getY () {
    return math.subset(this.pos, math.index(1, 0))
  }

  getPoint () {
    return this.pos
  }
}
export default Position

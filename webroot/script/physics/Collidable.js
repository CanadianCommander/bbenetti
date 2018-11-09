/**
Collidable is the interface for a collidable object
**/
const Collidable = base => class extends base {
  constructor () {
    super()
  }

  /*
  get a list of collission points.
  param:
    rayStart: start of ray
    rayEnd: end of ray
  return:
    a list of lists of the format [[point, surface normal], [point, surface normal], ...]
  */
  getCollissionPoints (rayStart, rayEnd) {

  }

  // true if colliding
  isColliding (rayStart, rayEnd) {

  }
}
export default Collidable

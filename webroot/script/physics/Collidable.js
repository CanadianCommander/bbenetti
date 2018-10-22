/**
Collidable is the interface for a collidable object
**/
const Collidable = base => class extends base {
  constructor () {
    super()
  }

  // return the point of collission or null
  getCollissionPoint (rayStart, rayEnd) {

  }

  // true if colliding
  isColliding (rayStart, rayEnd) {

  }
}
export default Collidable

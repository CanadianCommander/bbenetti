/**
Updatable is the interface for all objects which need to be updated by the UpdateController
**/
const Updatable = base => class extends base {
  constructor () {
    super()
  }

  update (ups) {
    // update here
  }
}
export default Updatable

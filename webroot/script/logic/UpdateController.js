
// UpdateController handles periodically updating things, like physics
export default class UpdateController {
  constructor () {
    this.tasks = new Map([])
    this.ups = 0
  }

  // add a new task to be run every update
  addTask (task) {
    this.tasks.set(task, task)
  }

  addUpdatable (uObj) {
    var ufunc = (ups) => { uObj.update(ups) }
    this.addTask(ufunc)
  }

  removeTaks (task) {
    this.delete(task)
  }

  startUpdating (ups) {
    this.ups = ups
    this.updateIntervalId = setInterval(
      UpdateController.prototype.update.bind(this), 1000 / ups)
  }

  stopUpdating () {
    clearInterval(this.updateIntervalId)
  }

  update () {
    this.tasks.forEach((t) => {
      t(this.ups)
    })
  }

}

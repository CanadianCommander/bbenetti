/**
  library abstraction layer for math functions. This way we separate our math from the library that
  provides it. maintainability ++
**/

import * as point from './point.js'
import * as matrix from './matrix.js'
import * as misc from './misc.js'
import * as random from './random.js'

export {point, matrix, misc, random}

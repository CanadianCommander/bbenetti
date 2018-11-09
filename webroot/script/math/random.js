
// return random float in range: (l, h]
export function random (l, h) {
  return l + Math.random() * (h - l)
}

// return random Int in range: (l, h]
export function randomInt (l, h) {
  return l + Math.floor(Math.random() * (h - l))
}

// pick element at random from the list and return it
export function pick (lst) {
  return lst[randomInt(0, lst.length)]
}

function hexToRgbA(hex, props = {}) {
  let c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')

    return {
      red: (c >> 16) & 255,
      green: (c >> 8) & 255,
      blue: c & 255,
      a: 1,
      arrayColor: [(c >> 16) & 255, (c >> 8) & 255, c & 255],
      ...props
    }
  }
  throw new Error('Bad Hex')
}

function colorDistance3d(a, b) {
  let dr = a.red - b.red
  let dg = a.green - b.green
  let db = a.blue - b.blue
  let redMean = (a.red + b.red) / 2
  return (2 + redMean / 256) * dr * dr + 4 * dg * dg + (2 + (255 - redMean) / 256) * db * db
}

function inventoryColorToHex(inventory) {
  return inventory.map(ink => hexToRgbA(ink.color, { ...ink }))
}

function colorDistance2d(v1, v2) {
  let i, d = 0
  for (i = 0; i < v1.length; i++) {
    d += (v1[i] - v2[i]) * (v1[i] - v2[i])
  }
  return Math.sqrt(d)
}

module.exports = {
  hexToRgbA,
  colorDistance3d,
  colorDistance2d,
  inventoryColorToHex
}
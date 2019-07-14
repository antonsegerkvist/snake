const CELL_SIZE = 20
const CELL_PADDING = 1
const BOARD_WIDTH = 30
const BOARD_HEIGHT = 30
const COLOR_MAP = [
  '#000',
  '#0f0',
  '#f00',
  '#00f'
]

const canvas = document.getElementById('poop')
const ctx = canvas.getContext('2d')

function drawCell (x, y, value) {
  ctx.fillStyle = COLOR_MAP[value]
  ctx.fillRect(
    x * CELL_SIZE + CELL_PADDING,
    y * CELL_SIZE + CELL_PADDING,
    CELL_SIZE - 2 * CELL_PADDING,
    CELL_SIZE - 2 * CELL_PADDING
  )
}

function drawBuffer (buf) {
  ctx.clearRect(0, 0, CELL_SIZE * BOARD_WIDTH, CELL_SIZE * BOARD_HEIGHT)
  let x = 0, y = 0
  for (let i = 0; i < buf.byteLength; ++i) {
    drawCell(x, y, (0xf0 & buf[i]) >> 4)
    drawCell(x + 1, y, 0x0f & buf[i])
    x = (x + 2) % BOARD_WIDTH
    if (x === 0) ++y
  }
}



const ws = new WebSocket(document.location.search.slice(1))

ws.onopen = event => {
  console.log('socket open')
  console.log(event)
  ws.send('hi')
}

const buf = new ArrayBuffer(BOARD_WIDTH * BOARD_HEIGHT / 2)

for (let i = 0; i < buf.byteLength; ++i) {
  buf[i] = Math.floor(Math.random() * 4) + (Math.floor(Math.random() * 4) << 4)
}

drawBuffer(buf)

// for (let x = 0; x < 30; ++x) {
//   for (let y = 0; y < 30; ++y) {
//     drawCell(x, y, 3)
//   }
// }

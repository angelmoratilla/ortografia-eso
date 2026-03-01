/**
 * Genera los iconos PWA usando solo módulos nativos de Node.js.
 * Produce PNGs reales con un fondo degradado indigo-purple y la letra Ó.
 */
import { createWriteStream } from 'fs'
import { mkdir } from 'fs/promises'
import { createDeflate } from 'zlib'
import { pipeline } from 'stream/promises'
import { Writable } from 'stream'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC = path.resolve(__dirname, '../public')

await mkdir(PUBLIC, { recursive: true })

// ── PNG helpers ───────────────────────────────────────────────────────────────

function crc32(buf) {
  const table = crc32.table ??= (() => {
    const t = new Uint32Array(256)
    for (let i = 0; i < 256; i++) {
      let c = i
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      t[i] = c
    }
    return t
  })()
  let c = 0xffffffff
  for (const b of buf) c = table[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function u32be(n) {
  return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff]
}

function chunk(type, data) {
  const typeBytes = [...type].map(c => c.charCodeAt(0))
  const payload = [...typeBytes, ...data]
  const len = u32be(data.length)
  const crc = u32be(crc32(new Uint8Array(payload)))
  return Uint8Array.from([...len, ...payload, ...crc])
}

function ihdr(w, h) {
  return chunk('IHDR', [
    ...u32be(w), ...u32be(h),
    8,  // bit depth
    2,  // color type RGB
    0, 0, 0,
  ])
}

async function deflateBytes(bytes) {
  const chunks = []
  const w = new Writable({ write(ch, _, cb) { chunks.push(ch); cb() } })
  const d = createDeflate({ level: 6 })
  d.pipe(w)
  d.end(Buffer.from(bytes))
  await new Promise((res, rej) => w.on('finish', res).on('error', rej))
  return Buffer.concat(chunks)
}

// ── Rasterizador de letra (bitmap 5×7 por carácter) ──────────────────────────

// Glyph de 'Ó' en cuadrícula 5×7 (1=pixel encendido)
const GLYPH_O_ACUTE = [
  [0,0,1,0,0],
  [0,1,1,1,0],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [0,1,1,1,0],
  [0,0,0,0,0],
]

// ── Render de imagen ──────────────────────────────────────────────────────────

function renderPixels(size) {
  // RGB flat array
  const pixels = new Uint8Array(size * size * 3)

  // Degradado indigo → purple
  const TOP    = [99,  102, 241]   // #6366f1 indigo-500
  const BOTTOM = [168, 85,  247]   // #a855f7 purple-500

  for (let y = 0; y < size; y++) {
    const t = y / (size - 1)
    const r = Math.round(TOP[0] + (BOTTOM[0] - TOP[0]) * t)
    const g = Math.round(TOP[1] + (BOTTOM[1] - TOP[1]) * t)
    const b = Math.round(TOP[2] + (BOTTOM[2] - TOP[2]) * t)
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 3
      pixels[i] = r; pixels[i+1] = g; pixels[i+2] = b
    }
  }

  // Esquinas redondeadas: limpiar a blanco puro fuera del radio
  const radius = size * 0.18
  const cx = size / 2, cy = size / 2
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Calcular la esquina más cercana
      const nearX = x < radius ? radius : x > size - 1 - radius ? size - 1 - radius : x
      const nearY = y < radius ? radius : y > size - 1 - radius ? size - 1 - radius : y
      const dx = x - nearX, dy = y - nearY
      if (dx*dx + dy*dy > radius*radius) {
        const i = (y * size + x) * 3
        pixels[i] = 248; pixels[i+1] = 250; pixels[i+2] = 252 // slate-50
      }
    }
  }

  // Dibujar la letra Ó escalada al centro
  const glyphH = GLYPH_O_ACUTE.length      // 7 filas
  const glyphW = GLYPH_O_ACUTE[0].length   // 5 cols
  const scale  = Math.floor(size * 0.52 / glyphH)
  const drawW  = glyphW * scale
  const drawH  = glyphH * scale
  const offX   = Math.floor((size - drawW) / 2)
  const offY   = Math.floor((size - drawH) / 2)

  for (let row = 0; row < glyphH; row++) {
    for (let col = 0; col < glyphW; col++) {
      if (!GLYPH_O_ACUTE[row][col]) continue
      for (let dy = 0; dy < scale; dy++) {
        for (let dx = 0; dx < scale; dx++) {
          const px = offX + col * scale + dx
          const py = offY + row * scale + dy
          if (px < 0 || py < 0 || px >= size || py >= size) continue
          const i = (py * size + px) * 3
          pixels[i] = 255; pixels[i+1] = 255; pixels[i+2] = 255
        }
      }
    }
  }

  return pixels
}

// ── Escritura PNG ─────────────────────────────────────────────────────────────

async function writePNG(filePath, size) {
  const pixels = renderPixels(size)

  // Construir scanlines con filtro byte 0 (None)
  const raw = []
  for (let y = 0; y < size; y++) {
    raw.push(0) // filter byte
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 3
      raw.push(pixels[i], pixels[i+1], pixels[i+2])
    }
  }

  const compressed = await deflateBytes(raw)
  const idat = chunk('IDAT', [...compressed])
  const iend = chunk('IEND', [])

  const header = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10])
  const file   = Buffer.concat([header, ihdr(size, size), idat, iend])

  await new Promise((res, rej) => {
    const ws = createWriteStream(filePath)
    ws.write(file, (err) => { if (err) rej(err) })
    ws.end(res)
  })

  const kb = (file.length / 1024).toFixed(1)
  console.log(`  ✅  ${path.basename(filePath)}  (${size}×${size}, ${kb} kB)`)
}

// ── favicon.ico (16×16 PNG embebido en ICO) ───────────────────────────────────

async function writeFavicon(filePath) {
  // Escribimos un ICO mínimo con un único frame 16×16
  const size = 16
  const pixels = renderPixels(size)

  // BMP DIB header (BITMAPINFOHEADER = 40 bytes) + XOR + AND masks
  const dibSize = 40
  const rowSize = size * 4          // RGBA, 4 bytes/pixel en BMP
  const xorSize = rowSize * size
  const andSize = Math.ceil(size / 8) * size

  const bmp = Buffer.alloc(dibSize + xorSize + andSize, 0)

  // BITMAPINFOHEADER
  bmp.writeUInt32LE(40, 0)           // biSize
  bmp.writeInt32LE(size, 4)          // biWidth
  bmp.writeInt32LE(size * 2, 8)      // biHeight (×2 por AND mask)
  bmp.writeUInt16LE(1, 12)           // biPlanes
  bmp.writeUInt16LE(32, 14)          // biBitCount
  // resto a 0

  // Pixel data (invertido verticalmente en BMP)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const src = (y * size + x) * 3
      const dst = dibSize + ((size - 1 - y) * rowSize) + x * 4
      bmp[dst + 0] = pixels[src + 2]   // B
      bmp[dst + 1] = pixels[src + 1]   // G
      bmp[dst + 2] = pixels[src + 0]   // R
      bmp[dst + 3] = 255               // A
    }
  }

  // ICO header + directory
  const ico = Buffer.alloc(6 + 16 + bmp.length)
  ico.writeUInt16LE(0, 0)             // reserved
  ico.writeUInt16LE(1, 2)             // type: icon
  ico.writeUInt16LE(1, 4)             // count

  // ICONDIRENTRY
  ico[6]  = size                      // width
  ico[7]  = size                      // height
  ico[8]  = 0                         // color count
  ico[9]  = 0                         // reserved
  ico.writeUInt16LE(1, 10)            // planes
  ico.writeUInt16LE(32, 12)           // bit count
  ico.writeUInt32LE(bmp.length, 14)   // bytes in res
  ico.writeUInt32LE(22, 18)           // offset to data

  bmp.copy(ico, 22)

  await new Promise((res, rej) => {
    const ws = createWriteStream(filePath)
    ws.write(ico, (err) => { if (err) rej(err) })
    ws.end(res)
  })
  console.log(`  ✅  favicon.ico  (${size}×${size})`)
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log('\n🎨  Generando iconos PWA…\n')

await writePNG(path.join(PUBLIC, 'pwa-192x192.png'), 192)
await writePNG(path.join(PUBLIC, 'pwa-512x512.png'), 512)
await writePNG(path.join(PUBLIC, 'apple-touch-icon.png'), 180)
await writeFavicon(path.join(PUBLIC, 'favicon.ico'))

console.log('\n✨  Listo.\n')

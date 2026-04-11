import type { PhotoItem } from '#types'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { encode as blurhashEncode } from 'blurhash'
import sharp from 'sharp'
import { defineLoader } from 'vitepress'

declare const data: PhotoItem[]
export { data }

const datePattern = /^(\d{4})(\d{2})(\d{2})$/
const MAX_SIZE = 1440
const QUALITY = 80

const photosRoot = path.resolve(process.cwd(), 'docs/public/photos')

export default defineLoader({
  watch: ['../../../docs/public/photos/**/*.{avif,gif,jpg,jpeg,png,webp}'],
  async load(files): Promise<PhotoItem[]> {
    const items = await Promise.all(
      files.map(async (filePath) => {
        const relativePath = path.relative(photosRoot, filePath)
        const [directoryName] = relativePath.split(path.sep)
        const date = formatPhotoDate(directoryName)

        if (!date)
          return undefined

        await compressImage(filePath)
        const blurhash = await generateBlurhash(filePath)

        return {
          date,
          blurhash,
          src: path.posix.join(`/photos`, ...relativePath.split(path.sep)),
        }
      }),
    )

    return items
      .filter(item => item !== undefined)
      .sort((a, b) => {
        if (a.date !== b.date)
          return b.date.localeCompare(a.date)

        return a.src.localeCompare(b.src)
      })
  },
})

async function compressImage(filepath: string) {
  const buffer = await fs.readFileSync(filepath)
  const img = sharp(buffer)
  const metadata = await img.metadata()
  const { format, width, height } = metadata

  if (!format || !width || !height)
    return

  if (!['jpeg', 'jpg', 'png', 'webp'].includes(format))
    return

  // 跳过已压缩的小图
  if (width <= MAX_SIZE && height <= MAX_SIZE) {
    const stat = fs.statSync(filepath)
    if (stat.size < 300 * 1024)
      return
  }

  let resized = img
  if (width > MAX_SIZE || height > MAX_SIZE) {
    resized = resized.resize(MAX_SIZE, MAX_SIZE, { fit: 'inside', withoutEnlargement: true })
  }

  const outFormat = format === 'jpeg' || format === 'jpg' ? 'jpeg' : format as 'png' | 'webp'
  if (outFormat === 'jpeg') {
    resized = resized.jpeg({ quality: QUALITY, mozjpeg: true })
  }
  else if (outFormat === 'webp') {
    resized = resized.webp({ quality: QUALITY })
  }
  else {
    resized = resized.png({ compressionLevel: 9 })
  }

  const outBuffer = await resized.withMetadata().toBuffer()

  if (outBuffer.byteLength < buffer.byteLength * 0.9) {
    fs.writeFileSync(filepath, outBuffer)
  }
}

async function generateBlurhash(filePath: string): Promise<string> {
  const buffer = await sharp(filePath)
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: 'cover' })
    .toBuffer({ resolveWithObject: true })

  return blurhashEncode(
    new Uint8ClampedArray(buffer.data),
    buffer.info.width,
    buffer.info.height,
    4,
    4,
  )
}

function formatPhotoDate(directoryName?: string): string | undefined {
  if (!directoryName)
    return undefined

  const match = datePattern.exec(directoryName)

  if (!match)
    return undefined

  const [, year, month, day] = match
  return `${year}-${month}-${day}`
}

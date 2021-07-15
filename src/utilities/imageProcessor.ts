import { promises as fsPromise } from "fs"
import path from "path"
import sharp from "sharp"

export default async function imageProcessor(
  thumbnail: string,
  filename: string,
  width: string,
  height: string
): Promise<boolean | string> {
  try {
    await fsPromise.access(thumbnail)

    return thumbnail
  } catch (e) {
    console.log(`... generating new thumbnail ${filename}`)

    const file = path.join(process.env.IMAGE_DIR as string, filename)

    try {
      const bufferFile = await fsPromise.readFile(file)
      const fileWidth = parseInt(width, 10)
      const fileHeight = parseInt(height, 10)

      await sharp(bufferFile).resize(fileWidth, fileHeight).toFile(thumbnail)
    } catch (e) {
      return false
    }

    return true
  }
}

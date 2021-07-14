import { promises as fsPromise } from "fs"
import path from "path"
import sharp from "sharp"

export default async function imageProcessor(
  thumbnail: string,
  filename: string,
  width: string,
  height: string
): Promise<boolean> {
  try {
    await fsPromise.access(thumbnail)

    return true
  } catch (e) {
    console.log(`... generating new thumbnail ${filename}`)

    const file = path.join(process.env.IMAGE_DIR as string, filename)
    const bufferFile = await fsPromise.readFile(file)
    const fileWidth = parseInt(width, 10)
    const fileHeight = parseInt(height, 10)

    await sharp(bufferFile).resize(fileWidth, fileHeight).toFile(thumbnail)

    return true
  }
}

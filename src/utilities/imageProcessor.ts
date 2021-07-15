import { promises as fsPromise } from "fs"
import path from "path"
import sharp from "sharp"

function getFilenameWithDimension(filename: string, width: string, height: string): string {
  return filename.split(".")[0] + `_${width}x${height}.jpg`
}

export default async function imageProcessor(
  thumbnail: string,
  filename: string,
  width: string,
  height: string
): Promise<boolean | string> {
  const filenameWithPath = getFilenameWithDimension(thumbnail, width, height)
  let fileWidth, fileHeight

  try {
    fileWidth = parseInt(width, 10)
    fileHeight = parseInt(height, 10)
  } catch (e) {
    console.log(e)
    return false
  }

  try {
    await fsPromise.access(filenameWithPath)

    return filenameWithPath
  } catch (e) {
    console.log(`... generating new thumbnail ${filename}`)

    const file = path.join(process.env.IMAGE_DIR as string, filename)

    try {
      const bufferFile = await fsPromise.readFile(file)
      const newFilenameWithPath = getFilenameWithDimension(filename, width, height)

      await sharp(bufferFile)
        .resize(fileWidth, fileHeight)
        .toFile(path.join(process.env.IMAGE_DIR as string, "thumbnails", newFilenameWithPath))

      return filenameWithPath
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

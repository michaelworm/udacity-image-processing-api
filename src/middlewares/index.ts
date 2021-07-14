import { NextFunction, Request, Response, Errback } from "express"
import sharp from "sharp"
import { promises as fsPromise } from "fs"
import path from "path"

const IMAGE_DIR = path.resolve(__dirname, "../../images/")

function sendFilePromise(res: Response, file: string): Promise<Errback | string> {
  return new Promise((resolve, reject) => {
    res.sendFile(file, (err: Errback) => {
      if (err) {
        console.log(err)

        res.send(`There was an error showing the image ${file}`)

        reject(err)
      } else {
        resolve(file)
      }
    })
  })
}

export default async function processImage(req: Request, res: Response, next: NextFunction) {
  const { filename, width, height } = req.query

  if (!filename || !width || !height) {
    res.send("Missing required parameters, for example: ?filename=encenadaport.jpg&width=200&height=200")
    return false
  }

  const fileWidth = parseInt(width as string, 10)
  const fileHeight = parseInt(height as string, 10)
  const file = path.join(IMAGE_DIR, filename as string)
  const thumbnail = path.join(IMAGE_DIR, "thumbnails", filename as string)
  const bufferFile = await fsPromise.readFile(file)

  try {
    await fsPromise.access(thumbnail)
  } catch (e) {
    console.log(`... generating new thumbnail ${filename}`)

    await sharp(bufferFile).resize(fileWidth, fileHeight).toFile(thumbnail)
  }

  console.log(`... show thumbnail ${filename}`)

  await sendFilePromise(res, thumbnail)

  next()
}

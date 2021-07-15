import { NextFunction, Request, Response, Errback } from "express"
import path from "path"
import imageProcessor from "../utilities/imageProcessor"

export default async function processImage(req: Request, res: Response, next: NextFunction) {
  const { filename, width, height } = req.query

  if (!filename || !width || !height) {
    res.send("Missing required parameters, for example: ?filename=encenadaport.jpg&width=200&height=200")
    return false
  }

  const thumbnail = path.join(process.env.IMAGE_DIR as string, "thumbnails", filename as string)

  const file = await imageProcessor(thumbnail, filename as string, width as string, height as string)

  if (!file) {
    res.send(`There was an error resizing the image, please check if all parameters are correct`)
    return false
  }

  res.sendFile(file as string, (err: Errback) => {
    if (err) {
      console.log(err)

      res.send(`There was an error showing the image ${file}`)
    } else {
      console.log(`... show thumbnail ${file}`)

      next()
    }
  })
}

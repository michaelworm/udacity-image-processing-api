import { Router, Request, Response, NextFunction } from "express"
import processImage from "../middlewares"

const routes = Router()

routes.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.redirect(301, "/api/images")
  next()
})

routes.get("/api/images", processImage)

export default routes

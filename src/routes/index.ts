import { Router, Request, Response, NextFunction } from "express"

const routes = Router()

routes.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.redirect(301, "/api/images")
  next()
})

routes.get("/api/images", (req: Request, res: Response, next: NextFunction): void => {
  res.send(`Welcome!`)
  next()
})

export default routes

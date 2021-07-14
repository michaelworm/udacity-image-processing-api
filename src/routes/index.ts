import { Router, Request, Response, NextFunction } from "express"

const routes = Router()

routes.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.send("hello")
  next()
})

export default routes

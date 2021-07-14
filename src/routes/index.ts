import express from "express"

const routes = express.Router()

routes.get("/", (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.send("hello")
  next()
})

export default routes

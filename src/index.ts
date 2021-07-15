import express, { Application } from "express"
import routes from "./routes"
import path from "path"

process.env.IMAGE_DIR = path.resolve(__dirname, "../images/")

const app: Application = express()

app.use("/", routes)

app.listen(3000, (): void => console.log("Server is running on http://localhost:3000"))

export default app

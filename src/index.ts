import express, { Application } from "express"
import routes from "./routes"

const app: Application = express()

app.use("/", routes)

app.listen(3000, (): void => console.log("Server is running on http://localhost:3000"))

import express, { Request, Response } from "express"
import cors from "cors"
import { metaHotTeardown } from "./metaHotTeardown"
import router from "./recipeRouter"
import path from "path"

const main = async () => {
  const app = express()
  app.use(
    cors({
      origin: true, // allows all origins
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allows all common HTTP methods
      credentials: true, // allows cookies and credentials
    })
  )

  app.use(express.json())

  app.use("/api", router)

  const pathToFrontend = "/app/frontend"
  console.log("static serve fronted at", pathToFrontend)
  app.use(express.static(pathToFrontend))

  app.get("/*", (req: Request, res: Response): any => {
    const pathToIndex = path.join(pathToFrontend, "index.html")
    console.log("sendfile from", pathToIndex)
    res.sendFile(pathToIndex)
  })

  const port = 4000

  const server = app.listen(port, () => {
    console.log("server listening to port", port)
  })

  metaHotTeardown(import.meta.hot, () => server.close())
}

main()

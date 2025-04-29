import express, { Request, Response } from "express"
import cors from "cors"
import { metaHotTeardown } from "./metaHotTeardown"
import router from "./recipeRouter"

// const app = express()
// app.use(
//   cors({
//     origin: true, // allows all origins
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allows all common HTTP methods
//     credentials: true, // allows cookies and credentials
//   })
// ) // Middleware to parse JSON request body
// app.use(express.json())

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, world!")
// })

// // Define an endpoint to generate a recipe
// app.post("/generate-recipe", async (req: Request, res: Response) => {
//   const { prompt } = req.body
//   // if (!prompt) {
//   //   return res.status(400).json({ error: "Prompt is required" })
//   // }

//   try {
//     const recipe = await generateRecipe(prompt)
//     res.json({ recipe })
//   } catch (error) {
//     res.status(500).json({ error: "Failed to generate recipe" })
//   }
// })

// app.post("/recipe", async (req: Request, res: Response) => {
//   const { prompt } = req.body
//   console.log("Recipe")
// })

// const PORT = process.env.PORT || 4000
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

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

  app.use("/", router)
  const port = 4000

  const server = app.listen(port, () => {
    console.log("server listening to port", port)
  })
  console.log("import.meta.hot is:", import.meta.hot)

  metaHotTeardown(import.meta.hot, () => server.close())
}

main()

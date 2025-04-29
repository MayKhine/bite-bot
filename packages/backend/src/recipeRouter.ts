import { Router, Request, Response } from "express"
import { generateRecipe } from "./groqApiCall"

const router: Router = Router()

router.get("/", (req: Request, res: Response) => {
  res.send({ status: "ok", message: "Recipe router is working" })
})

router.post("/generate-recipe", async (req: Request, res: Response) => {
  const { prompt } = req.body

  if (prompt) {
    try {
      const recipe = await generateRecipe(prompt)
      res.json({ recipe })
    } catch (error) {
      console.error("Error generating recipe in router:", error)
      res.status(500).json({ error: "Failed to generate recipe" })
    }
  }
})

export default router

import { useState } from "react"
import { Header } from "./components/Header"
import { RecipeBoard } from "./components/RecipeBoard"
import { Recipe } from "./components/Recipe"

export type RecipeResultType = {
  name: string
  ingredients: string[]
  instructions: string[]
  notes?: string
  funFact?: string
}
export const App = () => {
  const [recipeResult, setRecipeResult] = useState<string>()

  return (
    <div>
      <Header />
      <div className="bg-amber-200">
        <RecipeBoard
          getRecipeResult={(result: string) => {
            setRecipeResult(result)
          }}
        />

        {recipeResult && <Recipe recipeData={recipeResult} />}
      </div>
    </div>
  )
}

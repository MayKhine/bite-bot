import { useState } from "react"
import { Header } from "./components/Header"
import { GenerateRecipe } from "./components/GenerateRecipe"
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
    <div className="p-10 box-border ">
      <Header />

      <div className="flex flex-col gap-10">
        <GenerateRecipe
          getRecipeResult={(result: string) => {
            setRecipeResult(result)
          }}
        />
        {recipeResult && <Recipe recipeData={recipeResult} />}
      </div>
    </div>
  )
}

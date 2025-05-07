import { useState } from "react"
import { Header } from "./components/Header"
import { GenerateRecipe } from "./components/GenerateRecipe"
import { Recipe } from "./components/Recipe"
import { Footer } from "./components/Footer"

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
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex w-full justify-center flex-grow">
        <div className="flex flex-col gap-10 max-w-400 box-border p-10">
          <GenerateRecipe
            getRecipeResult={(result: string) => {
              setRecipeResult(result)
            }}
          />
          {recipeResult && <Recipe recipeData={recipeResult} />}
        </div>
      </div>
      <Footer />
    </div>
  )
}

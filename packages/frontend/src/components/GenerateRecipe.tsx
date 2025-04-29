import { useState } from "react"
import { IngredientDropdown } from "./IngredientDropdown"
import { IngredientButton } from "./IngredientButton"

type RecipeBoardProps = {
  getRecipeResult: (result: string) => void
}
export const GenerateRecipe = ({ getRecipeResult }: RecipeBoardProps) => {
  const [recipeIngredients, setRecipeIngredients] = useState<Array<string>>([])
  const [loading, setLoading] = useState(false)
  const [ingredient, setIngredient] = useState("")
  const [buttonText, setButtonText] = useState("Get recipe")

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    setButtonText("Get a different recipe")
    try {
      const res = await fetch("http://localhost:4000/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `${buttonText} using ${recipeIngredients} as the main ingredients. Return the result in the following structured format, using *** to separate each section: Recipe Name, Ingredients (as a bulleted list), Instructions (step-by-step), Notes (optional tips or serving suggestions), Fun Fact (optional, about the dish or an ingredient)`,
        }),
      })

      const data = await res.json()
      console.log("Data returned: ", data)
      getRecipeResult(data.recipe)
    } catch (error) {
      getRecipeResult(
        "Sorry, there was an error generating the recipe." + error
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full items-center">
      <div>
        <div> Recipe Ingredients</div>
        <IngredientDropdown
          value={ingredient}
          onSelect={(selectedIngredient) => {
            setButtonText("Get recipe")
            setIngredient(selectedIngredient)
            setRecipeIngredients((prev) => {
              if (!prev) return [selectedIngredient]
              return [...prev, selectedIngredient]
            })
          }}
        />
      </div>
      {recipeIngredients.length > 0 && (
        <div className="flex flex-row gap-3 flex-wrap w-full items-center justify-center">
          {recipeIngredients.map((ingredient, index) => {
            return (
              <IngredientButton
                key={index}
                value={ingredient}
                onClick={() => {
                  console.log("Delete this ", ingredient)
                }}
              />
            )
          })}
        </div>
      )}
      <button
        onClick={handleSubmit}
        className={`px-4 py-2 rounded-md w-max
          ${
            loading || recipeIngredients.length == 0
              ? "bg-gray-500 cursor-not-allowed text-white border-solid border-3 border-gray-500 box-border"
              : "bg-watermelon hover:bg-tomato text-white border-solid border-3 border-tomato box-border cursor-pointer"
          }
          `}
        disabled={loading || recipeIngredients.length == 0}
      >
        {loading ? "Generating..." : buttonText}
      </button>
    </div>
  )
}

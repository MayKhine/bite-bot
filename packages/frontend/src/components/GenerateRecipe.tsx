import { useRef, useState } from "react"
// import { IngredientDropdown } from "./IngredientDropdown"
import { IngredientButton } from "./IngredientButton"
import ingredients from "../assets/ingredients.json"
import { IngredientSearch } from "./IngredientSearch"
import Lottie, { ILottie } from "@lottielab/lottie-player/react"

type RecipeBoardProps = {
  getRecipeResult: (result: string) => void
}
export const GenerateRecipe = ({ getRecipeResult }: RecipeBoardProps) => {
  const [recipeIngredients, setRecipeIngredients] = useState<Array<string>>([])
  const [loading, setLoading] = useState(false)
  const [availableIngredientList, setAvailasbleIngredientList] =
    useState(ingredients)
  const [buttonText, setButtonText] = useState("Get recipe")

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    wavingRoboRef.current?.play()
    setButtonText("Get a different recipe")
    try {
      const res = await fetch("/api/generate-recipe", {
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
      wavingRoboRef.current?.pause()
    }
  }

  const wavingRoboRef = useRef<ILottie>(null)
  return (
    <div className="flex flex-col  w-full items-center">
      <Lottie
        className="wavingrobo w-60 "
        src="https://cdn.lottielab.com/l/CoxLa1TXM1C3QN.json"
        autoplay={false}
        ref={wavingRoboRef}
      />
      <div className="flex flex-col gap-5 w-full items-center">
        <div>
          <div> Recipe Ingredients</div>

          <IngredientSearch
            ingredientList={availableIngredientList}
            selectIngredient={(value) => {
              setRecipeIngredients((prev) => {
                if (!prev) return [value]
                return [...prev, value]
              })

              // remove the selected ingedient fromt he list
              setAvailasbleIngredientList((prev) => {
                return prev.filter((item) => item != value)
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
                    setRecipeIngredients((prev) => {
                      return prev.filter((item) => item != ingredient)
                    })
                    setButtonText("Get recipe")
                  }}
                />
              )
            })}
          </div>
        )}
        <button
          onClick={handleSubmit}
          className={`px-4 py-3 rounded-lg w-max
        ${
          loading || recipeIngredients.length == 0
            ? "bg-gray-500 cursor-not-allowed text-white border-solid box-border"
            : "bg-tomato hover:bg-cherry text-white border-solid box-border cursor-pointer"
        }
        `}
          disabled={loading || recipeIngredients.length == 0}
        >
          {loading ? "Generating..." : buttonText}
        </button>
      </div>
    </div>
  )
}

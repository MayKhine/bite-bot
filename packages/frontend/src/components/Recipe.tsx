import { useState } from "react"
import { IngredientDropdown } from "./IngredientDropdown"
export const Recipe = () => {
  const [recipeIngredients, setRecipeIngredients] = useState([
    "chiken",
    "tomato",
    "basil",
  ])
  const [recipeResult, setRecipeResult] = useState("test")
  const [loading, setLoading] = useState(false)
  const [ingredient, setIngredient] = useState("")

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("http://localhost:4000/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Generate a recipe using ${recipeIngredients}`,
        }),
      })

      const data = await res.json()
      console.log("Data returned: ", data)
      setRecipeResult(data.recipe)
    } catch (error) {
      setRecipeResult(
        "Sorry, there was an error generating the recipe." + error
      )
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <div> Recipe</div>
      <IngredientDropdown value={ingredient} onChange={setIngredient} />
      {ingredient && (
        <p className="mt-4 text-green-700">You selected: {ingredient}</p>
      )}
      <div>Recipe: {recipeResult}</div>
      <button
        onClick={handleSubmit}
        className={`px-4 py-2 rounded ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Generating..." : "Get Recipe"}
      </button>
    </div>
  )
}

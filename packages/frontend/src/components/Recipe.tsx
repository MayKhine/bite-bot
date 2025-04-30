import { TextCard } from "./TextCard"

type RecipeProps = {
  recipeData: string
}

type RecipeDataType = {
  name: string
  ingredients: string[]
  instructions: string[]
  notes?: string
  funFact?: string
}

const parseRecipe = (recipeDataRaw: string) => {
  const sectionRegex = /\*\*\*(.*?)\*\*\*\s*([\s\S]*?)(?=\*\*\*|$)/g
  const parsed: RecipeDataType = {
    name: "",
    ingredients: [],
    instructions: [],
  }
  let match
  while ((match = sectionRegex.exec(recipeDataRaw)) !== null) {
    const key = match[1].trim().toLowerCase()
    const value = match[2].trim()

    switch (key) {
      case "recipe name":
        parsed.name = value
        break
      case "ingredients":
        parsed.ingredients = value
          .split("\n")
          .map((line) => line.replace(/^\* /, "").trim())
        break
      case "instructions":
        parsed.instructions = value
          .split("\n")
          .map((line) => line.replace(/^\d+\.\s*/, "").trim())
        break
      case "notes":
        parsed.notes = value
        break
      case "fun fact":
        parsed.funFact = value
        break
    }
  }

  return parsed
}

export const Recipe = ({ recipeData }: RecipeProps) => {
  const recipe = parseRecipe(recipeData)
  return (
    <div className="flex flex-col gap-5 box-border">
      <div>
        <div className="text-2xl font-semibold flex">{recipe.name}</div>
      </div>
      <div className="flex flex-row gap-10 box-border flex-wrap md:flex-nowrap w-full">
        <div className="min-w-80 max-w-100">
          <div className="text-lg font-semibold">Ingredients</div>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="min-w-100">
          <div className="text-lg font-semibold">Instructions</div>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {recipe.notes && (
        <TextCard title="Notes" text={recipe.notes} color="watermelon" />
      )}
      {recipe.funFact && (
        <TextCard title="Fun Fact" text={recipe.funFact} color="tomato" />
      )}
    </div>
  )
}

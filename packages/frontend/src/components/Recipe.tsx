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
    <div>
      <div> Recipe </div>
      <div className="bg-blue-100 flex flex-col gap-2">
        <div>
          <div>Recipe</div>
          <div>{recipe.name}</div>
        </div>
        <div>
          <div>Ingredients</div>
          <div>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index}> {ingredient}</div>
            ))}
          </div>
        </div>

        <div>
          <div>Instructions</div>
          <div>
            {recipe.instructions.map((step, index) => (
              <div key={index}>
                {index + 1}: {step}
              </div>
            ))}
          </div>
        </div>
        {recipe.notes && (
          <div>
            <div>Notes</div>
            <div>{recipe.notes}</div>
          </div>
        )}
        {recipe.funFact && (
          <div>
            <div>Fun Fact</div>
            <div>{recipe.funFact}</div>
          </div>
        )}
      </div>
    </div>
  )
}

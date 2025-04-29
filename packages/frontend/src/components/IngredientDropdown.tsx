import ingredients from "../assets/ingredients.json"
export type IngredientCategory = {
  [category: string]: string[]
}

type IngredientDropdownProps = {
  value: string
  onChange: (value: string) => void
}

export const IngredientDropdown = ({
  value,
  onChange,
}: IngredientDropdownProps) => {
  const typedIngredients: IngredientCategory = ingredients

  return (
    <select
      className="border rounded p-2 w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {/* <option value="">Select an ingredient</option> */}
      {Object.entries(typedIngredients).map(([category, items]) => (
        <optgroup key={category} label={category}>
          {items.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}

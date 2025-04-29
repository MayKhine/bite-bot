import { useState } from "react"
import ingredients from "../assets/ingredients.json"
import CreatableSelect from "react-select/creatable"

type IngredientDropdownProps = {
  value: string
  onSelect: (value: string) => void
}

type SelectOptionType = {
  label: string
  value: string
}
export const IngredientDropdown = ({
  value,
  onSelect,
}: IngredientDropdownProps) => {
  const ingredientOptions = ingredients.map((item: string) => ({
    label: item,
    value: item,
  }))

  const selectedOption = ingredientOptions.find(
    (opt) => opt.value === value
  ) || {
    label: value,
    value,
  }

  const [option, setOption] = useState<SelectOptionType | null>(selectedOption)

  return (
    <CreatableSelect
      isClearable
      options={ingredientOptions}
      value={option}
      onChange={(newValue) => {
        if (newValue?.value) {
          onSelect(newValue.value)
          setOption({ label: "", value: "" })
        }
      }}
      placeholder="Select or type an ingredient"
    />
  )
}

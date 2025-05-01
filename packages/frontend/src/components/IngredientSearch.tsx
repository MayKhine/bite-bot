import { useEffect, useRef, useState } from "react"

type IngredientSearchProps = {
  ingredientList: Array<string>
  selectIngredient: (value: string) => void
}
export const IngredientSearch = ({
  ingredientList,
  selectIngredient,
}: IngredientSearchProps) => {
  const [inputValue, setInputValue] = useState("")
  const [openDropdown, setOpenDropdown] = useState(false)

  const filteredOptions = inputValue
    ? ingredientList.filter((ingredient) =>
        ingredient.toLowerCase().includes(inputValue.toLowerCase())
      )
    : ingredientList

  const wrapperRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  return (
    <div className=" box-border w-60 rounded-lg " ref={wrapperRef}>
      <div className="flex border-tomato border-2 rounded-lg">
        <input
          className="w-full px-2 py-2 focus:outline-none focus:border-0"
          type="text"
          placeholder="Type or select ingredient"
          value={inputValue}
          onClick={() => {
            setOpenDropdown(true)
          }}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
        ></input>
        {inputValue && (
          <button
            className="pr-2 cursor-pointer"
            onClick={() => {
              selectIngredient(inputValue)
              setInputValue("")
              setOpenDropdown(false)
            }}
          >
            ➕
          </button>
        )}
      </div>

      {openDropdown && filteredOptions.length > 0 && (
        <div className="bg-lighttomato p-1 box-border h-40 z-10 absolute rounded-lg">
          <ul className="h-full  overflow-y-scroll w-58 flex flex-col gap-1">
            {filteredOptions.map((item, index) => (
              <li
                className="hover:bg-pink-200 cursor-pointer p-1 mr-1 rounded-lg"
                key={index}
                onClick={() => {
                  setOpenDropdown(false)
                  selectIngredient(item)
                  setInputValue("")
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

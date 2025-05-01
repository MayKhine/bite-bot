type IngredientButtonProps = {
  value: string
  onClick: () => void
}
export const IngredientButton = ({ value, onClick }: IngredientButtonProps) => {
  return (
    // <div
    //   title="Remove ingredient"
    //   onClick={onClick}
    //   className="bg-pink-200 px-4 py-3  w-max rounded-md cursor-pointer"
    // >
    //   {value}
    // </div>

    <div className="relative group inline-block" onClick={onClick}>
      <span className="bg-pink-300 px-3 py-2  w-max rounded-3xl cursor-pointer font-light ">
        {value}
      </span>
      <div className="absolute -top-8 left-1/2 -translate-x bg-gray-700  text-gray-50 text-xs px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
        Delete {value}
      </div>
    </div>
  )
}

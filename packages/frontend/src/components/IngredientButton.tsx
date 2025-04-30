type IngredientButtonProps = {
  value: string
  onClick: () => void
}
export const IngredientButton = ({ value, onClick }: IngredientButtonProps) => {
  return (
    <div onClick={onClick} className="bg-pink-200 px-4 py-3  w-max rounded-md">
      {value}
    </div>
  )
}

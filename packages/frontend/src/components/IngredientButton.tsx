type IngredientButtonProps = {
  value: string
  onClick: () => void
}
export const IngredientButton = ({ value, onClick }: IngredientButtonProps) => {
  return (
    <div onClick={onClick} className="bg-pink-200 p-3 w-max">
      {value}
    </div>
  )
}

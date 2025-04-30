type TextCardProps = {
  title: string
  text: string
  color: string
}
export const TextCard = ({ title, text, color }: TextCardProps) => {
  return (
    <div className={`border-${color} border-2 p-5 box-border rounded-lg`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{text}</p>
    </div>
  )
}

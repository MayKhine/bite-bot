import { Header } from "./components/Header"
import { Recipe } from "./components/Recipe"

export const App = () => {
  return (
    <div>
      <Header />
      <div className="bg-amber-200">
        <Recipe />
      </div>
    </div>
  )
}

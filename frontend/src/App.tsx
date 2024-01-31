import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllRecipes from "./pages/AllRecipes";
import recipeService from "./services/recipes";
import { useEffect, useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    recipeService.getAll().then((response) => {
      setRecipes(response.data);
    });
  }, []);
  console.log("render", recipes.length, "recipes");
  return (
    <div className="flex flex-col m-auto min-h-[100vh]">
      <Header />
      <div className="flex-grow bg-blue-500">
        <AllRecipes recipes={recipes} />
      </div>
      <Footer />
    </div>
  );
}

export default App;

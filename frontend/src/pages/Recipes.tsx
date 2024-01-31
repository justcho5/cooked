import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import recipeService from "../services/recipes";

function Recipes() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const fetchedRecipes = await recipeService.getAll();

      setRecipes(fetchedRecipes);
    };

    fetchRecipes();
  }, []);

  return (
    <div className="m-[50px]">
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <Link to={`/recipes/${recipe._id}`}>
            <Card recipe={recipe} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Recipes;

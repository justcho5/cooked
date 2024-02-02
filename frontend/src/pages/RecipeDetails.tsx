import { useParams } from "react-router-dom";
import recipeService from "../services/recipes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
function RecipeDetails() {
  const [recipe, setRecipe] = useState<RecipeType>();
  const { _id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await recipeService.get(_id!);

      setRecipe(recipe);
    };
    fetchRecipe();
  }, [_id]);

  return recipe == undefined ? (
    <div>No Recipe</div>
  ) : (
    <div className="flex flex-col items-center">
      <h1>{recipe.name}</h1>
      <em>{recipe.description}</em>
      <img className="w-40 h-40 object-cover" src={recipe.img} />
      <div>{recipe.servings} Servings</div>
      <div>Ingredients:</div>
      {recipe.ingredients.map((ingredient, idx) => (
        <div key={idx}>{ingredient}</div>
      ))}
      <div>Instructions:</div>
      {recipe.instructions.map((instruction, idx) => (
        <div key={idx}>{instruction}</div>
      ))}
      <div className="flex gap-3">
        <Link to={`/recipes/${recipe._id}/edit`}>
          <Button text="Edit" />
        </Link>
        <Button text="Delete" />
      </div>
    </div>
  );
}

export default RecipeDetails;

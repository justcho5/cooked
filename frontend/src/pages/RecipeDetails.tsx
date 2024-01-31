import { useParams } from "react-router-dom";
import recipeService from "../services/recipes";
import { useEffect, useState } from "react";
function RecipeDetails() {
  const [recipe, setRecipe] = useState<RecipeType>();
  const { _id } = useParams();
  console.log(_id);
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
    <div>RecipeDetails {recipe!.name}</div>
  );
}

export default RecipeDetails;

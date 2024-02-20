import { useNavigate, useLoaderData, useSearchParams } from "react-router-dom";
import recipeService from "../services/recipes";
import { useState } from "react";
import Form from "../components/Form";
import RectangleButton from "../components/RectangleButton";

function RecipeDetails() {
  const [recipe, setRecipe] = useState(useLoaderData() as RecipeType);
  console.log(recipe);

  const [searchParams, setSearchParams] = useSearchParams();
  const edit = searchParams.get("edit");

  const handleEditClick = () => {
    setSearchParams("edit=true");
  };
  const navigate = useNavigate();
  const handleDeleteClick = async () => {
    if (recipe._id) {
      await recipeService.remove(recipe._id);
      navigate("/recipes");
    }
  };

  return recipe == undefined ? (
    <div>No Recipe</div>
  ) : edit === "true" ? ( // conditionally render form vs recipe view, (later - TODO: check if user is authorized)
    <Form recipe={recipe} setRecipe={setRecipe} />
  ) : (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl">{recipe.name}</h1>
      {recipe.description && <em>{recipe.description}</em>}
      <img className="w-44 h-44 object-cover" src={recipe.img} />
      <div className="text-lg">{recipe.servings} Servings</div>
      <div>
        <div className="text-lg">Ingredients:</div>
        {recipe.ingredients.map((ingredient, idx) => (
          <div key={idx}>{ingredient}</div>
        ))}
      </div>
      <div>
        <div className="text-lg">Instructions:</div>
        {recipe.instructions.map((instruction, idx) => (
          <div key={idx}>{instruction}</div>
        ))}
      </div>
      <div className="flex gap-3">
        <RectangleButton text="Edit" onClick={handleEditClick} />
        <RectangleButton text="Delete" onClick={handleDeleteClick} />
      </div>
    </div>
  );
}

export default RecipeDetails;

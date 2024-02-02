import { useParams, useNavigate } from "react-router-dom";
import recipeService from "../services/recipes";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import EditRecipe from "../components/EditRecipe";
function RecipeDetails() {
  const [recipe, setRecipe] = useState<RecipeType>();
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState<InputType>();
  const { _id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await recipeService.get(_id!);

      setRecipe(recipe);
    };
    fetchRecipe();
  }, [_id]);

  const handleEditClick = () => {
    setEdit(true);
    if (recipe) {
      //is there a better way to do this because if edit is being clicked there should already be a recipe
      const formDataObject: InputType = {
        title: recipe.name,
        description: recipe.description,
        servings: recipe.servings,
        ingredients: recipe.ingredients.map((ingred) => ({
          ingredient: ingred,
        })),
        instructions: recipe.instructions.map((instruction) => ({
          instruction: instruction,
        })),
      };
      setFormData(formDataObject);
    }
  };
  const navigate = useNavigate();
  const handleDeleteClick = () => {
    if (_id) {
      recipeService.remove(_id);
      navigate("/recipes");
    }
  };

  return recipe == undefined ? (
    <div>No Recipe</div>
  ) : edit && formData ? (
    <EditRecipe setState={[setEdit, setRecipe]} formData={formData} />
  ) : (
    <div className="flex flex-col items-center">
      <h1>{recipe.name}</h1>
      <em>{recipe.description}</em>
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
        <Button text="Edit" onClick={handleEditClick} />
        <Button text="Delete" onClick={handleDeleteClick} />
      </div>
    </div>
  );
}

export default RecipeDetails;

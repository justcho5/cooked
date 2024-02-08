import { useNavigate, useLoaderData, useSearchParams } from "react-router-dom";
import recipeService from "../services/recipes";
import { useState } from "react";
import Button from "../components/Button";
import EditRecipe from "../components/EditRecipe";
import MainContentContainer from "../components/MainContentContainer";
// import Section from "../components/Section";
function RecipeDetails() {
  const [recipe, setRecipe] = useState<RecipeType>(
    useLoaderData() as RecipeType
  );
  // const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState<InputType>();
  const [searchParams, setSearchParams] = useSearchParams();
  const edit = searchParams.get("edit");
  const handleEditClick = () => {
    // setEdit(true);
    setSearchParams("edit=true");

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
  ) : edit === "true" && formData ? ( //check if user is authorized
    <MainContentContainer>
      <EditRecipe setState={setRecipe} formData={formData} />
    </MainContentContainer>
  ) : (
    <MainContentContainer>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl">{recipe.name}</h1>
        {recipe.description.length > 0 && <em>{recipe.description}</em>}
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
          <Button text="Edit" onClick={handleEditClick} />
          <Button text="Delete" onClick={handleDeleteClick} />
        </div>
      </div>
    </MainContentContainer>
  );
}

export default RecipeDetails;

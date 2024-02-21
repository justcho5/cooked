import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import recipeService from "../services/recipes";

export default function CreateRecipe() {
  const navigate = useNavigate();

  const onSubmit = async (recipeObject: RecipeType) => {
    const returnedObject = await recipeService.create(recipeObject);
    navigate(`/recipes/${returnedObject._id}`);
  };

  // onsubmit component
  return <Form onSubmit={onSubmit} />;
}

import { useNavigate } from "react-router-dom";
import { Form } from "../components/Form";
import { create } from "../services/recipes";

export function CreateRecipe() {
  const navigate = useNavigate();

  const onSubmit = async (recipeObject: RecipeType) => {
    const returnedObject = await create(recipeObject);
    navigate(`/recipes/${returnedObject._id}`);
  };

  // onsubmit component
  return <Form onSubmit={onSubmit} />;
}

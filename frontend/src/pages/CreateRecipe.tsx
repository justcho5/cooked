import { SubmitHandler, useForm } from "react-hook-form";
import recipeService from "../services/recipes";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
export default function CreateRecipe() {
  const navigate = useNavigate();
  const form = useForm<InputType>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    console.log(data);
    const recipeObject: RecipeType = {
      name: data.title,
      description: data.description,
      img: data.img,
      servings: data.servings,
      ingredients: data.ingredients.map((e) => e.ingredient),
      instructions: data.instructions.map((e) => e.instruction),
    };
    //redirect
    const createdObject = await recipeService.create(recipeObject);
    navigate(`/recipes/${createdObject._id}`);
  };
  return <Form onSubmit={onSubmit} form={form} />;
}

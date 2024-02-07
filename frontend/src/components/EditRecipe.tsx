import { SubmitHandler, useForm } from "react-hook-form";
import recipeService from "../services/recipes";
import { useParams, useSearchParams } from "react-router-dom";
import Form from "./Form";

export default function EditRecipe({
  formData,
  setState,
}: {
  formData: InputType;
  setState: React.Dispatch<React.SetStateAction<RecipeType>>;
}) {
  const setRecipe = setState;
  const { _id } = useParams();
  const form = useForm<InputType>({
    defaultValues: formData,
    mode: "onTouched",
  });
  const [, setSearchParams] = useSearchParams();
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const recipeObject: RecipeType = {
      name: data.title,
      description: data.description,
      servings: data.servings,
      ingredients: data.ingredients.map((e) => e.ingredient),
      instructions: data.instructions.map((e) => e.instruction),
    };
    const updatedRecipe = await recipeService.update(_id!, recipeObject);
    setRecipe(updatedRecipe);
    // setEdit(false);
    setSearchParams("");
  };
  return <Form onSubmit={onSubmit} form={form} />;
}

import { SubmitHandler, useForm } from "react-hook-form";
import recipeService from "../services/recipes";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Form from "./Form";
interface InputType {
  title: string;
  description: string;
  img: string | undefined;
  servings: number;
  ingredients: { ingredient: string }[];
  instructions: { instruction: string }[];
}

export default function EditRecipe({
  formData,
  setState,
}: {
  formData: InputType;
  setState: [
    React.Dispatch<React.SetStateAction<boolean>>,
    React.Dispatch<React.SetStateAction<RecipeType | undefined>>
  ];
}) {
  const [setEdit, setRecipe] = setState;
  const { _id } = useParams();
  const form = useForm<InputType>({
    defaultValues: formData,
    mode: "onTouched",
  });

  //   const navigate = useNavigate();
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
    const updatedRecipe = await recipeService.update(_id!, recipeObject);
    setRecipe(updatedRecipe);
    setEdit(false);
  };
  return <Form onSubmit={onSubmit} form={form} />;
}

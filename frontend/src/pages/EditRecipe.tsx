import { SubmitHandler, useForm } from "react-hook-form";
import recipeService from "../services/recipes";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
interface InputType {
  title: string;
  description: string;
  img: string | undefined;
  servings: number;
  ingredients: { ingredient: string }[];
  instructions: { instruction: string }[];
}

export default function EditRecipe() {
  const { _id } = useParams();
  const form = useForm<InputType>();

  useEffect(() => {
    const fetchRecipe = async () => {
      const fetchedRecipe: RecipeType = await recipeService.get(_id!);
      const formDataObject = {
        title: fetchedRecipe.name,
        description: fetchedRecipe.description,
        img: fetchedRecipe.img,
        servings: fetchedRecipe.servings,
        ingredients: fetchedRecipe.ingredients.map((ingred) => ({
          ingredient: ingred,
        })),
        instructions: fetchedRecipe.instructions.map((instruction) => ({
          instruction: instruction,
        })),
      };
      console.log(formDataObject);
      form.reset(formDataObject);
    };

    fetchRecipe();
  }, [_id, form]);

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<InputType> = (data) => {
    console.log(data);
    const recipeObject: RecipeType = {
      name: data.title,
      description: data.description,
      img: data.img,
      servings: data.servings,
      ingredients: data.ingredients.map((e) => e.ingredient),
      instructions: data.instructions.map((e) => e.instruction),
    };
    recipeService.update(_id!, recipeObject);
    navigate(`/recipes/${_id}`);
  };
  return <Form onSubmit={onSubmit} form={form} />;
}

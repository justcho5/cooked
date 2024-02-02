import { SubmitHandler, useForm } from "react-hook-form";
import recipeService from "../services/recipes";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
export default function CreateRecipe() {
  const navigate = useNavigate();
  const form = useForm<InputType>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const recipeObject: RecipeType = {
      name: data.title,
      description: data.description,
      servings: data.servings,
      ingredients: data.ingredients.map((e) => e.ingredient),
      instructions: data.instructions.map((e) => e.instruction),
    };

    //redirect
    const createdObject = await recipeService.create(recipeObject);
    navigate(`/recipes/${createdObject._id}`);
  };
  return (
    <div>
      <Link to={`/recipes`}>
        <button className="border">View all</button>
      </Link>
      <Form onSubmit={onSubmit} form={form} />
    </div>
  );
}

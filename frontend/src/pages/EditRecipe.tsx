import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import RoundButton from "../components/RoundButton";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import recipeService from "../services/recipes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [formData, setFormData] = useState<InputType>();
  const { register, control, handleSubmit, reset } = useForm<InputType>({
    defaultValues: formData,
  });

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
      setFormData(formDataObject);
      reset(formDataObject);
    };

    fetchRecipe();
  }, [_id, reset]);

  const {
    fields: fieldsIngredients,
    append: appendIngredients,
    remove: removeIngredients,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: fieldsInstructions,
    append: appendInstructions,
    remove: removeInstructions,
  } = useFieldArray({
    control,
    name: "instructions",
  });

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
  };
  return (
    <form
      className="flex flex-col gap-5 border w-96 px-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="flex flex-col">
        Recipe Title{" "}
        <input
          type="text"
          placeholder="Recipe Title"
          {...register("title", { required: true })}
        />
      </label>
      <label className="flex flex-col">
        Description{" "}
        <textarea {...register("description", { maxLength: 500 })} />
      </label>
      <label className="flex flex-col">
        Image <input {...register("img")} />
      </label>
      <label className="flex flex-col">
        Servings{" "}
        <input
          type="number"
          placeholder="Servings"
          {...register("servings", { required: true, min: 1 })}
        />
      </label>

      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <span className="flex items-center">Ingredients</span>
          <RoundButton
            icon={faPlus}
            handleClick={() => {
              appendIngredients({ ingredient: "" });
            }}
          />
        </div>
        <ul className="flex flex-col">
          {fieldsIngredients.map((field, index) => (
            <li key={field.id} className="flex items-center">
              <input
                className="flex-1"
                placeholder="Enter ingredient"
                {...register(`ingredients.${index}.ingredient`, {
                  required: true,
                })}
              />
              <RoundButton
                icon={faMinus}
                handleClick={() => {
                  removeIngredients(index);
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <span className="flex items-center">Directions</span>
          <RoundButton
            icon={faPlus}
            handleClick={() => {
              appendInstructions({ instruction: "" });
            }}
          />
        </div>
        <ul className="flex flex-col">
          {fieldsInstructions.map((field, index) => (
            <li key={field.id} className="flex items-center">
              <input
                className="flex-1"
                placeholder="Enter instruction"
                {...register(`instructions.${index}.instruction`, {
                  required: true,
                })}
              />
              <RoundButton
                icon={faMinus}
                handleClick={() => {
                  removeInstructions(index);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <Link to={`/recipes/${_id}`}>
        <button className="border" type="submit">
          Save
        </button>
      </Link>
    </form>
  );
}

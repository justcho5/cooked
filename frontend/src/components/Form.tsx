import RoundButton from "./RoundButton";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import recipeService from "../services/recipes";
import { useSearchParams } from "react-router-dom";
import InputError from "./InputError";
import Button from "./Button";

interface Props {
  recipe?: RecipeType;
  setRecipe?: (recipe: RecipeType) => void;
}
function Form({ recipe, setRecipe }: Props) {
  // use the react-hook-forms useForm Hook
  const {
    control,
    handleSubmit,
    register, // method for registering input and apply validation rules to react hook form
    formState: { errors },
  } = useForm<InputType>({
    defaultValues: recipe // if there's a recipe (editing existing recipe), then prefill form
      ? {
          title: recipe.name,
          description: recipe.description,
          servings: recipe.servings,
          ingredients: recipe.ingredients.map((ingred) => ({
            ingredient: ingred,
          })),
          instructions: recipe.instructions.map((instruction) => ({
            instruction: instruction,
          })),
        }
      : {},
    mode: "onTouched",
  });

  // Custom hook for dynamic form input (ingredients)
  const {
    fields: fieldsIngredients,
    append: appendIngredients,
    remove: removeIngredients,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  // Custom hook for dynamic form input (instructions)
  const {
    fields: fieldsInstructions,
    append: appendInstructions,
    remove: removeInstructions,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  // set State and handler image selection and preview
  const [previewImage, setPreviewImage] = useState("");
  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        if (typeof fileReader.result === "string")
          setPreviewImage(fileReader.result);
      });
      fileReader.readAsDataURL(file);
    }
  };

  // useNavigate hook to programmatically navigate
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  // Submit handler conditionally sends either put or post req
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const recipeObject: RecipeType = {
      name: data.title,
      description: data.description,
      servings: data.servings,
      ingredients: data.ingredients.map((e) => e.ingredient),
      instructions: data.instructions.map((e) => e.instruction),
    };

    if (previewImage.length > 0) {
      recipeObject.img = previewImage;
    }
    if (recipe !== undefined && setRecipe !== undefined) {
      const returnedObject = await recipeService.update(
        recipe._id!,
        recipeObject
      );
      setRecipe(returnedObject);
      setSearchParams("");
    } else {
      const returnedObject = await recipeService.create(recipeObject);
      navigate(`/recipes/${returnedObject._id}`);
    }
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <label className="flex flex-col">
        <input
          className="text-lg"
          type="text"
          placeholder="Recipe Title"
          {...register("title", { required: "This is required" })}
        />
        <InputError message={errors.title?.message} />
      </label>

      <label className="flex flex-col">
        <textarea
          placeholder="Description..."
          {...register("description", { maxLength: 500 })}
        />
      </label>
      <label className="flex flex-col">
        Image
        <input
          type="file"
          placeholder="Recipe Image"
          {...register("img")}
          accept="image/*"
          onChange={handleSelectImage}
        />
        <div className="flex">
          {previewImage ? (
            <img src={previewImage} className="w-48 h-48 object-cover" />
          ) : recipe ? (
            <img src={recipe.img} className="w-24 h-24 object-cover" />
          ) : null}
        </div>
      </label>
      <div className="flex flex-col">
        <label className="flex gap-5">
          Servings:
          <input
            className="w-12
          "
            type="number"
            placeholder="4"
            {...register("servings", { required: "This is required", min: 1 })}
          />
        </label>
        <InputError message={errors.servings?.message} />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <span className="flex items-center">Ingredients:</span>
          <RoundButton
            icon={faPlus}
            onClick={() => {
              appendIngredients(
                { ingredient: "" },
                {
                  focusIndex: fieldsIngredients.length,
                }
              );
            }}
          />
        </div>
        <ul className="flex flex-col">
          {fieldsIngredients.map((field, index) => (
            <li key={field.id}>
              <div className="flex items-center">
                <input
                  className="flex-1"
                  placeholder="Enter ingredient"
                  {...register(`ingredients.${index}.ingredient`, {
                    required: "This is required",
                  })}
                />
                <RoundButton
                  icon={faMinus}
                  onClick={() => {
                    removeIngredients(index);
                  }}
                />
              </div>
              <InputError
                message={errors.ingredients?.[index]?.ingredient?.message}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <span className="flex items-center">Directions:</span>
          <RoundButton
            icon={faPlus}
            onClick={() => {
              appendInstructions(
                { instruction: "" },
                { focusIndex: fieldsInstructions.length }
              );
            }}
          />
        </div>
        <ul className="flex flex-col">
          {fieldsInstructions.map((field, index) => (
            <li key={field.id}>
              <div className="flex items-center">
                <input
                  className="flex-1"
                  placeholder="Enter instruction"
                  {...register(`instructions.${index}.instruction`, {
                    required: "This is required",
                  })}
                />
                <RoundButton
                  icon={faMinus}
                  onClick={() => {
                    removeInstructions(index);
                  }}
                />
              </div>
              <InputError
                message={errors.instructions?.[index]?.instruction?.message}
              />
            </li>
          ))}
        </ul>
      </div>
      <Button
        border="solid"
        color="transparent"
        height="24px"
        onClick={onSubmit}
        radius="5px"
        width="100%"
        type="submit"
      >
        Save
      </Button>
    </form>
  );
}

export default Form;

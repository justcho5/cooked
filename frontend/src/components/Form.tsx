import { RoundButton } from "./RoundButton";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import recipeService from "../services/recipes";
// import { useSearchParams } from "react-router-dom";
import { InputError } from "./InputError";
import { Button } from "./Button";

export interface Props {
  recipe?: RecipeType;
  onSubmit: (recipe: RecipeType) => Promise<void>;
}
export function Form({ recipe, ...props }: Props) {
  const defaultRecipeObject = recipe
    ? {
        title: recipe.name,
        description: recipe.description,
        servings: recipe.servings,
        ingredients: recipe.ingredients.map((ingredient) => ({
          ingredient,
        })),
        instructions: recipe.instructions.map((instruction) => ({
          instruction,
        })),
      }
    : {};

  console.log("default", defaultRecipeObject);
  const {
    control,
    reset,
    handleSubmit,
    register, // method for registering input and apply validation rules to react hook form
    formState: { errors },
  } = useForm<InputType>({
    defaultValues: defaultRecipeObject,

    mode: "onTouched",
  });

  // Custom hook for dynamic form input (ingredients)
  const ingredients = useFieldArray({
    control,
    name: "ingredients",
  });

  // Custom hook for dynamic form input (instructions)
  const instructions = useFieldArray({
    control,
    name: "instructions",
  });

  useEffect(() => {
    console.log("reset");
    reset(defaultRecipeObject);
  }, [recipe]);

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

  // Submit handler conditionally sends either put or post req
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    console.log("entered function");
    if (!data.ingredients || !data.instructions) {
      console.log("No data for ingredients or instructions");
      return; // Exit early if data is incomplete
    }
    const recipeObject: RecipeType = {
      name: data.title,
      description: data.description,
      servings: data.servings,
      ingredients: data.ingredients.map((e) => e.ingredient),
      instructions: data.instructions.map((e) => e.instruction),
    };
    console.log("after", data);

    if (previewImage.length > 0) {
      recipeObject.img = previewImage;
    }
    await props.onSubmit(recipeObject);
    console.log("after after", data);
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
              ingredients.append(
                { ingredient: "" },
                {
                  focusIndex: ingredients.fields.length,
                }
              );
            }}
          />
        </div>
        <ul className="flex flex-col">
          {ingredients.fields.map((field, index) => (
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
                    ingredients.remove(index);
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
              instructions.append(
                { instruction: "" },
                { focusIndex: instructions.fields.length }
              );
            }}
          />
        </div>
        <ul className="flex flex-col">
          {instructions.fields.map((field, index) => (
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
                    instructions.remove(index);
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
        radius="5px"
        width="100%"
        type="submit"
        onClick={() => {}}
      >
        Save
      </Button>
    </form>
  );
}

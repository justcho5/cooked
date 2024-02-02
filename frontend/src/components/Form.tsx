import RoundButton from "./RoundButton";
import { UseFormReturn, SubmitHandler, useFieldArray } from "react-hook-form";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function Form({
  onSubmit,
  form,
}: {
  onSubmit: SubmitHandler<InputType>;
  form: UseFormReturn<InputType>;
}) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = form;
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
          {...register("title", { required: "This is required" })}
        />
        {/*not rendering below*/}
        <p>{errors.title?.message}</p>
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
          {...register("servings", { required: "This is required", min: 1 })}
        />
        <p>{errors.servings?.message}</p>
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
                  handleClick={() => {
                    removeIngredients(index);
                  }}
                />
              </div>
              <p>{errors.ingredients?.[index]?.ingredient?.message}</p>
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
                  handleClick={() => {
                    removeInstructions(index);
                  }}
                />
              </div>
              <p>{errors.instructions?.[index]?.instruction?.message}</p>
            </li>
          ))}
        </ul>
      </div>

      <button className="border" type="submit">
        Save
      </button>
    </form>
  );
}

export default Form;

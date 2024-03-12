import { useNavigate } from "react-router-dom";

// import { RectangleButton } from "../components/RectangleButton";
import { Form } from "../components/Form";

import { create } from "../services/recipes";
import { importByURL, generateWithGPT } from "../services/generate";
import { useState } from "react";
import { Button } from "../@/components/ui/button";
import { Input } from "../@/components/ui/input";
import { Icons } from "../@/components/icons";

// export function InputWithButton({
//   text,
//   onClick,
// }: {
//   text: string;
//   onClick: (
//     event: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ) => Promise<void>;
// }) {
//   return (
//     <div className="flex w-full max-w-sm items-center space-x-2">
//       <Input
//         type="text"
//         placeholder="Enter a recipe url"
//         name="url"
//         value={url}
//       />
//       <Button type="submit" onClick={onClick}>
//         {text}
//       </Button>
//     </div>
//   );
// }

export function CreateRecipe() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState();
  const [url, setUrl] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isGenerateLoading, setGenerateIsLoading] = useState(false);
  const onSubmit = async (recipeObject: RecipeType) => {
    const returnedObject = await create(recipeObject);
    navigate(`/recipes/${returnedObject._id}`);
  };

  const handleImportByURL = async () => {
    try {
      setIsLoading(true);
      const returnedObject = await importByURL({ url });
      setRecipe(returnedObject);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    console.log("after setting", recipe);
  };
  const handleGenerateByAi = async () => {
    try {
      setGenerateIsLoading(true);
      const returnedObject = await generateWithGPT({ ingredients });
      setRecipe(returnedObject);
      setGenerateIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter a recipe url"
          name="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <Button type="submit" onClick={handleImportByURL}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Import
        </Button>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter some ingredients"
          name="ingredients"
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
        />
        <Button type="submit" onClick={handleGenerateByAi}>
          {isGenerateLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Generate
        </Button>
      </div>

      {recipe ? (
        <Form recipe={recipe} onSubmit={onSubmit} />
      ) : (
        <Form onSubmit={onSubmit} />
      )}
    </div>
  );
}

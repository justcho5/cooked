export interface Props {
  recipe: RecipeType;
}
export function Card({ recipe }: Props) {
  return (
    <div className="flex border rounded-md border-black mt-8 w-[100%] h-20">
      {/* <img
        className="w-24 h-24 object-cover"
        src="https://placekitten.com/200/300"
      /> */}
      <div className="p-1">
        <div>{recipe.name}</div>
        <div>
          <em>{recipe.description}</em>
        </div>
      </div>
    </div>
  );
}

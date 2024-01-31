function Card({ recipe }: { recipe: RecipeType }) {
  return (
    <div className="flex border rounded-md border-black mt-8">
      <img className="w-24 h-24 object-cover" src={recipe.img!} />
      <div>
        <div>{recipe.name}</div>
        <div>{recipe.description}</div>
      </div>
    </div>
  );
}

export default Card;

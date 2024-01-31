import Card from "../components/Card";
function AllRecipes({ recipes }: { recipes: RecipeType[] }) {
  return (
    <div className="m-[50px]">
      {recipes.map((recipe) => (
        <Card key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
}

export default AllRecipes;

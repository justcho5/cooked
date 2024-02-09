import Card from "../components/Card";
import { useLoaderData, Link } from "react-router-dom";

function Recipes() {
  // removed useEffect because useEffect because I already load data with the react-router data api
  const recipes = useLoaderData() as RecipeType[];
  return (
    <div className="">
      <Link to={`/recipes/new`}>
        <button className="border">Add new</button>
      </Link>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <Link to={`/recipes/${recipe._id}`}>
            <Card recipe={recipe} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Recipes;

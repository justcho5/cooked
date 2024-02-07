import Card from "../components/Card";
import { useLoaderData, Link } from "react-router-dom";

function Recipes() {
  // removed useEffect because useEffect should be used for side effects
  //such as when a certain param changes and not for lifecycle methods
  //useEffect is a hook in React that allows us to run side effects or
  //manage state changes after the component has rendered and the DOM has been updated.
  // instead we use useloaderdata
  const recipes = useLoaderData() as RecipeType[];
  return (
    <div className="m-[50px]">
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

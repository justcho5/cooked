import { Card } from "../components/Card";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { RectangleButton } from "../components/RectangleButton";

export function Recipes() {
  // removed useEffect because useEffect because I already load data with the react-router data api
  const recipes = useLoaderData() as RecipeType[];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/recipes/new");
  };
  return (
    <div className="">
      <RectangleButton text="New" onClick={handleClick} />
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

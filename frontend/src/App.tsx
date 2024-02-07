import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Recipes from "./pages/Recipes";
import {
  Outlet,
  Link,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RecipeDetails from "./pages/RecipeDetails";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import recipeService from "./services/recipes";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/recipes",

        handle: { crumb: () => <Link to="/recipes">recipes</Link> },
        children: [
          {
            index: true,
            loader: async () => {
              return await recipeService.getAll();
            },
            element: <Recipes />,
          },
          {
            path: "/recipes/:_id",
            element: <RecipeDetails />,
            loader: async ({ params }) => {
              return await recipeService.get(params._id!);
            },
            handle: {
              crumb: (data: RecipeType) => (
                <Link to={`/recipes/${data._id}`} reloadDocument>
                  {data.name}
                </Link>
              ),
            },
          },
          {
            path: "/recipes/new",
            element: <CreateRecipe />,
            handle: { crumb: () => <Link to="/recipes/new">new</Link> },
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  return (
    <div className="flex flex-col m-auto min-h-[100vh]">
      <Header />
      <div className="flex-grow flex justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;

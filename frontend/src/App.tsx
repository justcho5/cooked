import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Recipes } from "./pages/Recipes";
import {
  Outlet,
  Link,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RecipeDetails } from "./pages/RecipeDetails";
import { Home } from "./pages/Home";
import { CreateRecipe } from "./pages/CreateRecipe";
import { getAll, get } from "./services/recipes";
import { MainContentContainer } from "./components/MainContentContainer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route
        path="/"
        handle={{ crumb: () => <Link to={`/`}>cooked&nbsp;</Link> }}
      >
        <Route index={true} element={<Home />} />
        <Route
          path="/recipes"
          handle={{
            crumb: () => <Link to="/recipes">/&nbsp;recipes&nbsp;</Link>,
          }}
        >
          <Route
            index={true}
            element={<Recipes />}
            loader={async () => {
              const recipes = await getAll();
              return recipes.reverse();
            }}
          />
          <Route
            path="/recipes/:id"
            element={<RecipeDetails />}
            loader={({ params }) => get(params.id!)}
            handle={{
              crumb: (data: RecipeType) => (
                <Link to={`/recipes/${data._id}`} reloadDocument>
                  /&nbsp;
                  {data.name.length > 10
                    ? `${data.name.slice(0, 10)} ...`
                    : data.name}
                </Link>
              ),
            }}
          />
          <Route
            path="/recipes/new"
            element={<CreateRecipe />}
            handle={{
              crumb: () => <Link to="/recipes/new">/&nbsp;new</Link>,
            }}
          />
        </Route>
      </Route>
    </Route>
  )
);
// {
//   element: <Layout />,
//   children: [
//     {
//       path: "/",
//       handle: { crumb: () => <Link to={`/`}>cooked&nbsp;</Link> },
//       children: [
//         { index: true, element: <Home /> },
//         {
//           path: "/recipes",
//           handle: {
//             crumb: () => <Link to="/recipes">/&nbsp;recipes&nbsp;</Link>,
//           },
//           children: [
//             {
//               index: true,
//               loader: async () => {
//                 const recipes = await recipeService.getAll();
//                 return recipes.reverse();
//               },
//               element: <Recipes />,
//             },
//             {
//               path: "/recipes/:_id",
//               element: <RecipeDetails />,
//               loader: async ({ params }) => {
//                 return await recipeService.get(params._id!);
//               },
//               handle: {
//                 crumb: (data: RecipeType) => (
//                   <Link to={`/recipes/${data._id}`} reloadDocument>
//                     /&nbsp;
//                     {data.name.length > 10
//                       ? `${data.name.slice(0, 10)} ...`
//                       : data.name}
//                   </Link>
//                 ),
//               },
//             },
//             {
//               path: "/recipes/new",
//               element: <CreateRecipe />,
//               handle: {
//                 crumb: () => <Link to="/recipes/new">/&nbsp;new</Link>,
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],
// },
// ]);
function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <div className="flex-grow flex justify-center">
        <MainContentContainer>
          <Outlet />
        </MainContentContainer>
      </div>
      <Footer />
    </div>
  );
}

export default App;

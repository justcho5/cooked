import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Recipes from "./pages/Recipes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeDetails from "./pages/RecipeDetails";
import EditRecipe from "./pages/EditRecipe";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col m-auto min-h-[100vh]">
        <Header />
        <div className="flex-grow flex justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:_id" element={<RecipeDetails />} />
            <Route path="/recipes/:_id/edit" element={<EditRecipe />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

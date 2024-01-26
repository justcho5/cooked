// The router is in fact a middleware, that can be used for defining "related routes" in a single place, which is typically placed in its own module.
import express from "express";
const recipesRouter = express.Router();
import Recipe from "../models/recipe";

//get /api/recipes get all recipes
recipesRouter.get("/", async (req, res, next) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json(recipes);
  } catch (exception) {
    next(exception);
  }
});

//get /api/recipes/:id get single recipe
recipesRouter.get("/:id", async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

//post /api/recipes create/add single recipe
recipesRouter.post("/", async (req, res, next) => {
  console.log(req.body);
  const recipe = new Recipe(req.body);
  try {
    const result = await recipe.save();
    res.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
});

//put /api/recipes/:id update recipe
recipesRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    res.status(200).json(updatedRecipe);
  } catch (exception) {
    next(exception);
  }
});

//delete /api/recipes/:id delete recipe
recipesRouter.delete("/:id", async (req, res, next) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

export default recipesRouter;

import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import helper from "./helper";
import Recipe from "../models/recipe";

const api = supertest(app);

// make a test database before each test
beforeEach(async () => {
  await Recipe.deleteMany({});
  await Recipe.insertMany(helper.initialRecipes);
});

// tests for get req
test("recipes are returned as json", async () => {
  await api
    .get("/api/recipes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

// tests for get one

// tests for post
describe("Tests for adding a new recipe", () => {
  test("Succeeds with valid data", async () => {
    const recipesInDBStart = await helper.recipesInDb();

    await api
      .post("/api/recipes")
      .send(helper.newRecipe)
      .expect(201)
      .expect("Content-type", /application\/json/);

    //check db has the new recipe
    const recipesInDBEnd = await helper.recipesInDb();
    expect(recipesInDBEnd).toHaveLength(recipesInDBStart.length + 1);

    const addedRecipe = recipesInDBEnd.filter(
      (recipe) => recipe.name === helper.newRecipe.name
    );
    console.log(addedRecipe[0]);

    const objectProperties = [
      "name",
      "description",
      "servings",
      "ingredients",
      "instructions",
      "favorite",
      "tags",
      "difficulty",
      "notes",
      "rating",
    ] as const;
    for (const property of objectProperties) {
      expect(helper.newRecipe[property]).toEqual(addedRecipe[0][property]);
    }
  });
});

// tests for delete

// tests for put

afterAll(async () => {
  await mongoose.connection.close();
});

import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import helper from "./helper";
import Recipe, { RecipeType } from "../models/recipe";

const api = supertest(app);

// make a test database before each test
beforeEach(async () => {
  await Recipe.deleteMany({});
  await Recipe.insertMany(helper.initialRecipes);
});

// tests for get req
test("GET - recipes are returned as json", async () => {
  await api
    .get("/api/recipes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

// tests for get one
describe("GET one recipe tests", () => {
  test("get a valid recipe", async () => {
    const recipesInDBStart = await helper.recipesInDb();
    const recipeToView = recipesInDBStart[0];
    const resultRecipe = await api
      .get(`/api/recipes/${recipeToView._id.toString()}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(new Date(resultRecipe.body.dateCreated)).toEqual(
      recipeToView.dateCreated
    );
    for (const property of Object.keys(recipeToView)) {
      console.log(property);
      if (property === "dateCreated") {
        expect(new Date(resultRecipe.body[property])).toEqual(
          recipeToView[property]
        );
      } else {
        expect(resultRecipe.body[property]).toEqual(
          recipeToView[property as keyof RecipeType]
        );
      }
    }
    // expect(resultRecipe.body).toEqual(recipeToView);
  });
  test("fails with statuscode 404 if recipe does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/recipes/${validNonexistingId.toString()}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/recipes/${invalidId}`).expect(400);
  });
});
// tests for post
describe("POST - Tests for adding a new recipe", () => {
  test("Succeeds with valid data", async () => {
    const recipesInDBStart = await helper.recipesInDb();

    await api
      .post("/api/recipes")
      .send(helper.newRecipe)
      .expect(201)
      .expect("Content-type", /application\/json/);

    //check db one more recipe
    const recipesInDBEnd = await helper.recipesInDb();
    expect(recipesInDBEnd).toHaveLength(recipesInDBStart.length + 1);

    // check that the additional recipe is the same as the one that was added
    const addedRecipe = recipesInDBEnd.filter(
      (recipe) => recipe.name === helper.newRecipe.name
    );

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
      expect(addedRecipe[0][property]).toEqual(helper.newRecipe[property]);
    }
  });

  test("Fails with invalid/incomplete data", async () => {
    const recipesInDBStart = await helper.recipesInDb();

    const invalidRecipe = {
      name: "Mashed Potatoes",
      description: "Amazing potatoes",
    };

    // check that the data validation works. should fail
    await api.post("/api/recipes").send(invalidRecipe).expect(400);

    // confirm that the invalid data was not added
    const recipesInDBEnd = await helper.recipesInDb();
    expect(recipesInDBEnd).toHaveLength(recipesInDBStart.length);
    const filteredForInvalidRecipe = recipesInDBEnd.filter(
      (recipe) => recipe.name === invalidRecipe.name
    );
    expect(filteredForInvalidRecipe.length).toBe(0);
  });
});

// tests for delete
// 1. confirm delete returns 204 status code 2. confirm the recipe is not in db. length -1 and recipe not to contain
describe("DELETE - Tests for deleting a recipe from db", () => {
  test("Success with code 204 and confirm that recipe is not in db", async () => {
    const recipesAtStart = await helper.recipesInDb();
    const recipeToDelete = recipesAtStart[0];
    await api.delete(`/api/recipes/${recipeToDelete._id}`).expect(204);
    const recipesAtEnd = await helper.recipesInDb();
    expect(recipesAtEnd).toHaveLength(recipesAtStart.length - 1);
    const ids = recipesAtEnd.map((r) => r._id);
    expect(ids).not.toContain(recipeToDelete._id);
  });
});

// tests for put
// 1. confirm 200 2. check recipe before and after
describe("PUT - Tests for editing a recipe from db", () => {
  test("Success with code 200 and confirm that recipe has changed", async () => {
    const recipesAtStart = await helper.recipesInDb();
    const recipeToEdit = recipesAtStart[0];
    const editedRecipe = helper.newRecipe;

    const updatedRecipe = await api
      .put(`/api/recipes/${recipeToEdit._id}`)
      .send(editedRecipe)
      .expect(200);
    const recipesAtEnd = await helper.recipesInDb();
    expect(recipesAtEnd).toHaveLength(recipesAtStart.length);
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
      expect(updatedRecipe.body[property]).toEqual(editedRecipe[property]);
    }
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

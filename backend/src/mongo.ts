// trying mongodb connection

import mongoose from "mongoose";
import Recipe from "./models/recipe";
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://user:${password}@cluster0.1ds7wre.mongodb.net/recipeApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false); // setting this avoids strict mode, This is because empty query filters cause Mongoose to return all documents in the model, which can cause issues.
mongoose.connect(url);

const recipe = new Recipe({
  name: "PBJ",
  servings: 1,
  ingredients: ["2 slice bread", "1 tbsp peanut butter", "1 tbsp jam"],
  instructions: [
    "Spread peanut butter onto one slice of bread",
    "Spread jam onto the other slice of bread",
    "Put the slices together",
  ],
  favorite: false,
  tags: [],
  difficulty: "easy",
  notes: [],
  rating: 3,
});

recipe.save().then((result) => {
  console.log("recipe saved!", result);
  mongoose.connection.close();
});

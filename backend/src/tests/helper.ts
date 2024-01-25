import Recipe from "../models/recipe";
import { RecipeType } from "../models/types";
const newRecipe: RecipeType = {
  name: "Bacon-Wrapped Cherries",
  description:
    "This recipe for bacon-wrapped cherries makes one of my favorite appetizers. I say it serves 18 people, but if no one stops me, I will eat the whole batch myself and start making more.",
  servings: 18,
  ingredients: [
    "36 maraschino cherries",
    "18 slices bacon slices, halved",
    "36 toothpicks",
  ],
  instructions: [
    "Set the oven rack about 6 inches from the heat source and preheat the oven's broiler.",
    "Wrap each cherry with a bacon half, secure with a toothpick, and arrange on a baking sheet. Drizzle reserved cherry juice over wrapped cherries.",
    "Broil in the preheated oven until bacon is crisped to your liking, 3 to 10 minutes.",
  ],
  favorite: true,
  tags: ["appetizer"],
  difficulty: "easy",
  notes: ["delicious as is"],
  rating: 4.5,
};

const initialRecipes: Array<RecipeType> = [
  {
    name: "Spaghetti",
    description: "",
    servings: 1,
    ingredients: [
      "1 pound ground beef",
      "2 cubes beef bouillion",
      "1 (8-ounce) can tomato sauce",
      "1 (6-ounce) can tomato paste",
      "black pepper to taste",
      "2 cups hot water",
      "2 teaspoons sugar white or brown",
      "½ teaspoon dried basil",
      "½ teaspoon dried oregano",
      "dash of garlic",
      "16 ounces spaghetti noodles",
    ],
    instructions: [
      "Brown the ground beef in a large skillet. (drain excess fat)",
      "Once cooked, throw in salt, pepper, tomato sauce and paste, water (with the bouillon cubes in it), sugar, basil, oregano, and garlic. Simmer on low for an hour.",
      "A few minutes before the hour is done, cook box of spaghetti noodles as directed on package.",
      "Once the noodles are cooked, drain and add to spaghetti sauce. ENJOY!",
    ],
    favorite: true,
    tags: [],
    difficulty: "easy",
    notes: [],
    rating: 4,
  },
  {
    name: "PBJ",
    servings: 1,
    description: "",
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
  },
];

const nonExistingId = async () => {
  const recipe = new Recipe({ content: "willremovethissoon" });
  await recipe.save();
  await recipe.deleteOne();

  // function to make an id that doesnt exist in the db
  return recipe._id.toString();
};

// fetch all recipes in db
const recipesInDb = async () => {
  const recipes = await Recipe.find({});
  return recipes.map((recipe) => recipe.toJSON());
};

export default { newRecipe, initialRecipes, nonExistingId, recipesInDb };

import mongoose from "mongoose";
// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const recipeSchema = new mongoose.Schema({
  img: {
    type: String,
    default: "http://placekitten.com/g/200/300",
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  description: String,
  favorite: Boolean,
  tags: [String],
  difficulty: String,
  notes: [String],
  rating: Number,
  dateCreated: { type: Date, default: Date.now, required: false },
});
recipeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    // delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// creates a recipe type from recipe schema
export type Recipe = mongoose.InferSchemaType<typeof recipeSchema>;

export const Recipe = mongoose.model("Recipe", recipeSchema);

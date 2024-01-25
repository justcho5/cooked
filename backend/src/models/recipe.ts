import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
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
  favorite: Boolean,
  tags: [String],
  difficulty: String,
  notes: [String],
  rating: Number,
  dateCreated: { type: Date, default: Date.now, required: false },
});
recipeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export type RecipeType = mongoose.InferSchemaType<typeof recipeSchema>;

export default mongoose.model("Recipe", recipeSchema);

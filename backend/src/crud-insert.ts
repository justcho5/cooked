import { MONGODB_URI } from "./utils/config";
import { MongoClient } from "mongodb";
import recipesJson from "../MOCK_DATA.json";

// Replace the uri string with your MongoDB deployment's connection string.
const client = new MongoClient(MONGODB_URI!);
async function run() {
  try {
    await client.connect();
    console.log("Connected");
    // database and collection code goes here
    const db = client.db("recipeApp");
    const coll = db.collection("recipes");

    const recipes = recipesJson;

    const result = await coll.insertMany(recipes);
    // display the results of your operation
    console.log(result.insertedIds);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

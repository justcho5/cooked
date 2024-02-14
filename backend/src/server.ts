import app from "./app"; //the express app
import { MONGODB_URI, PORT } from "./utils/config";
import { logInfo, logError } from "./utils/logger";
import mongoose from "mongoose";

// connect to db
mongoose.set("strictQuery", false);

if (!MONGODB_URI) throw new Error("Must set $MONGODB_URI!");

const db = mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logInfo("connected to MongoDB");
  })
  .catch((error) => {
    logError("error connecting to db", error);
  });

db.then(() =>
  app.listen(PORT, () => {
    logInfo(`Server running on port ${PORT}`);
  })
);

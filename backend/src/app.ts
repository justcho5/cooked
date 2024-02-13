// This is my express app
import express from "express";
import mongoose from "mongoose";
// import cors from "cors";

import { MONGODB_URI } from "./utils/config";
import logger from "./utils/logger";
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware";

import recipesRouter from "./controllers/recipes";
// connect to db
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI!)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to db", error);
  });

// make an express app
const app = express();
// app.use(cors());
app.use(requestLogger);
app.use(express.json({ limit: "1mb" })); // It parses incoming requests with JSON payloads and is based on body-parser

// app routing
app.use("/api/recipes", recipesRouter);

//error handling
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;

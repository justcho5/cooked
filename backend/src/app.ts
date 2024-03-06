// This is my express app
import express from "express";
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware";
import { recipesRouter } from "./routers/recipes";

// make an express app
const app = express();
app.use(requestLogger);
app.use(express.json({ limit: "1mb" })); // It parses incoming requests with JSON payloads and is based on body-parser

// app routing
app.use("/api/recipes", recipesRouter);

//error handling
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;

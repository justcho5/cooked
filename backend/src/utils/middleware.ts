// custom middleware
import { logInfo, logError } from "./logger";
import { ErrorRequestHandler, RequestHandler } from "express";

export const requestLogger: RequestHandler = (request, response, next) => {
  logInfo("Method:", request.method);
  logInfo("Path:  ", request.path);
  logInfo("Body:  ", request.body);
  logInfo("---");
  next();
};

export const unknownEndpoint: RequestHandler = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  logError(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

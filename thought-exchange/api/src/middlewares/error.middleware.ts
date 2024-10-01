import { ErrorRequestHandler } from "express";
import { GeneralError } from "../const/error.const";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("error handler hit");

  if (err instanceof GeneralError) {
    res.status(err.getCode()).json({
      status: "Error",
      message: err.message,
    });
    return;
  }

  res.status(500).send({
    status: "Error",
    message: err.message,
  });
};

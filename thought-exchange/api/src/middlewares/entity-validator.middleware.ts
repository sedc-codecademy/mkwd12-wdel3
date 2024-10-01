import { RequestHandler } from "express";
import joi from "joi";

type EntityValidator = (schema: joi.ObjectSchema<any>) => RequestHandler;

export const entityValidator: EntityValidator = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).send({
        status: "Error",
        message: error.details[0].message,
      });
      return;
    }

    next();
  };
};

export const userSchema = joi.object({
  username: joi.string().min(6).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(30),
});

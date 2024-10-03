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

export const createPostSchema = joi.object({
  title: joi.string().min(3).max(40).required(),
  body: joi.string().min(3).max(240).required(),
});

export const updatePostSchema = joi.object({
  title: joi.string().min(3).max(40).optional(),
  body: joi.string().min(3).max(240).optional(),
});

export const createCommentSchema = joi.object({
  body: joi.string().min(3).max(140).required(),
  postId: joi.string().required(),
});

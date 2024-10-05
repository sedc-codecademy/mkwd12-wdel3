import { Router } from "express";
import { CommentsController } from "../controllers/comments.controller";
import {
  createCommentSchema,
  entityValidator,
} from "../middlewares/entity-validator.middleware";

export const commentsRouter = Router();

commentsRouter.post(
  "/",
  entityValidator(createCommentSchema),
  CommentsController.createComment
);
commentsRouter.get("/user", CommentsController.getCommentsByUser);

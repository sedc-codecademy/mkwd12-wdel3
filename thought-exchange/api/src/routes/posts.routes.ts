import { Router } from "express";
import { PostsController } from "../controllers/posts.controller";
import {
  createPostSchema,
  entityValidator,
  updatePostSchema,
} from "../middlewares/entity-validator.middleware";

export const postsRouter = Router();

postsRouter.get("/", PostsController.getAllPosts);
postsRouter.post(
  "/",
  entityValidator(createPostSchema),
  PostsController.createPost
);
postsRouter.get("/user", PostsController.getPostsByUser);
postsRouter.get("/:id", PostsController.getPostById);
postsRouter.patch(
  "/:id",
  entityValidator(updatePostSchema),
  PostsController.updatePost
);
postsRouter.delete("/:id", PostsController.deletePost);
postsRouter.patch("/:id/like", PostsController.likePost);
postsRouter.patch("/:id/dislike", PostsController.dislikePost);

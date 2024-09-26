import { Router } from "express";
import { PostsController } from "../controllers/posts.controller";

export const postsRouter = Router();

postsRouter.get("/", PostsController.getAllPosts);

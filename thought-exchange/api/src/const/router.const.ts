import { Router } from "express";
import { postsRouter } from "../routes/posts.routes";
import { authRouter } from "../routes/auth.routes";
import { authValidator } from "../middlewares/auth.middleware";
import { commentsRouter } from "../routes/comments.routes";

export const globalRouter = Router();

globalRouter.use("/auth", authRouter);
globalRouter.use("/posts", authValidator, postsRouter);
globalRouter.use("/comments", authValidator, commentsRouter);

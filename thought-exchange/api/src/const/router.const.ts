import { Router } from "express";
import { postsRouter } from "../routes/posts.routes";
import { authRouter } from "../routes/auth.routes";
import { authValidator } from "../middlewares/auth.middleware";
import { errorHandler } from "../middlewares/error.middleware";

export const globalRouter = Router();

globalRouter.use("/posts", authValidator, postsRouter);
globalRouter.use("/auth", authRouter);

globalRouter.use(errorHandler);

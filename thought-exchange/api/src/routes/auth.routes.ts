import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import {
  entityValidator,
  userSchema,
} from "../middlewares/entity-validator.middleware";
import { errorHandler } from "../middlewares/error.middleware";

export const authRouter = Router();

authRouter.post(
  "/register",
  entityValidator(userSchema),
  AuthController.registerUser
);
authRouter.post("/login", AuthController.loginUser);
authRouter.get("/logout", AuthController.logoutUser);

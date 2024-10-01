import { RequestHandler } from "express";
import { RegisterReq } from "../interfaces/auth.interface";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static registerUser: RequestHandler = async (req, res, next) => {
    try {
      const userData: RegisterReq = req.body;

      await AuthService.registerUser(userData);

      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  };
  static loginUser: RequestHandler = async (req, res, next) => {
    try {
      const credentials: { email: string; password: string } = req.body;

      const userData = await AuthService.loginUser(
        credentials.email,
        credentials.password
      );

      res.json(userData);
    } catch (error) {
      next(error);
    }
  };
  static logoutUser: RequestHandler = async (req, res, next) => {
    try {
      await AuthService.logoutUser();

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}

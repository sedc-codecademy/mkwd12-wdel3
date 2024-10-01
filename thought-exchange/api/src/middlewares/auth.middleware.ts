import { RequestHandler } from "express";
import { getAuth } from "firebase/auth";

export const authValidator: RequestHandler = (req, res, next) => {
  const auth = getAuth();

  if (!auth.currentUser) {
    res.sendStatus(403);
    return;
  }

  req.userId = auth.currentUser.uid;

  next();
};

import { RequestHandler } from "express";
import { CommentsService } from "../services/comments.service";

export class CommentsController {
  static createComment: RequestHandler = async (req, res, next) => {
    try {
      const { postId, body } = req.body;

      const createdComment = await CommentsService.createComment(
        req.userId,
        postId,
        body
      );

      res.status(201).json(createdComment);
    } catch (error) {
      next(error);
    }
  };
}

import { BadRequest, GeneralError } from "../const/error.const";
import { Comment } from "../models/comment.model";
import { PostsService } from "./posts.service";

export class CommentsService {
  static createComment = async (
    userId: string,
    postId: string,
    body: string
  ) => {
    try {
      const foundPost = await PostsService.getPostById(postId);

      console.log(userId, postId, body);

      const comment = new Comment({
        author: userId,
        post: postId,
        body,
      });

      const createdComment = await comment.save();

      foundPost.comments.push(createdComment._id);

      await foundPost.save();

      return createdComment;
    } catch (error) {
      console.log(error);
      throw new BadRequest(`Couldn't create comment, ERROR: ${error}`);
    }
  };
  static getCommentsByUser = async (userId: string) => {
    try {
      const comments = await Comment.find({
        author: userId,
      }).sort("-createdAt");

      return comments;
    } catch (error) {
      throw new GeneralError(`Couldn't fetch comments, ERROR: ${error}`);
    }
  };
}

import { RequestHandler } from "express";
import { PostsService } from "../services/posts.service";

export class PostsController {
  //1. Get all posts
  static getAllPosts: RequestHandler = async (req, res) => {
    try {
      const posts = await PostsService.getAllPosts();

      res.json(posts);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

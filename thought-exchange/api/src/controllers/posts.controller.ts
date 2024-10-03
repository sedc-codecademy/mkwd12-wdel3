import { RequestHandler } from "express";
import { PostsService } from "../services/posts.service";
import { CreateUpdatePostReq } from "../interfaces/post.interface";

export class PostsController {
  //1. Get all posts
  static getAllPosts: RequestHandler = async (req, res, next) => {
    try {
      const posts = await PostsService.getAllPosts();

      res.json(posts);
    } catch (error) {
      next(error);
    }
  };
  //2. Create a post
  static createPost: RequestHandler = async (req, res, next) => {
    try {
      const post = await PostsService.createPost(req.userId, req.body);

      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  };
  //3. Get post by id
  static getPostById: RequestHandler = async (req, res, next) => {
    try {
      const postId = req.params.id;

      const foundPost = await PostsService.getPostById(postId);

      res.json(foundPost);
    } catch (error) {
      next(error);
    }
  };
  //4. Update post
  static updatePost: RequestHandler = async (req, res, next) => {
    try {
      const updateData: Partial<CreateUpdatePostReq> = req.body;

      await PostsService.updatePost(req.userId, req.params.id, updateData);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
  //5. Delete psot
  static deletePost: RequestHandler = async (req, res, next) => {
    try {
      await PostsService.deletePost(req.userId, req.params.id);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
  //6. Like Post
  static likePost: RequestHandler = async (req, res, next) => {
    try {
      const response = await PostsService.likePost(req.userId, req.params.id);

      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  //7. Dislike Post
  static dislikePost: RequestHandler = async (req, res, next) => {
    try {
      const response = await PostsService.dislikePost(
        req.userId,
        req.params.id
      );

      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  //8. Get posts by user
  static getPostsByUser: RequestHandler = async (req, res, next) => {
    try {
      const userPosts = await PostsService.getPostsByUser(req.userId);

      res.json(userPosts);
    } catch (error) {
      next(error);
    }
  };
}

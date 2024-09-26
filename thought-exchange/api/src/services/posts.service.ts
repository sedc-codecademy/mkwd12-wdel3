import { Post } from "../models/post.model";

export class PostsService {
  //1. Get all posts
  static async getAllPosts() {
    try {
      const posts = await Post.find({});

      return posts;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong when fetching posts");
    }
  }
}

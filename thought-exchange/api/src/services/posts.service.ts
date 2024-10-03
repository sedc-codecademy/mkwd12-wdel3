import { BadRequest, GeneralError, NotFound } from "../const/error.const";
import { CreateUpdatePostReq } from "../interfaces/post.interface";
import { Post } from "../models/post.model";

export class PostsService {
  //1. Get all posts
  static async getAllPosts() {
    try {
      const posts = await Post.find({})
        .populate({
          path: "author",
          select: "username",
        })
        .sort("-createdAt");

      return posts;
    } catch (error) {
      console.log(error);
      throw new GeneralError(`Something went wrong  ${error}`);
    }
  }
  //2. Create a post
  static async createPost(userId: string, postData: CreateUpdatePostReq) {
    try {
      const { title, body } = postData;

      const post = new Post({ author: userId, title, body });

      const createdPost = await post.save();

      return createdPost;
    } catch (error) {
      throw new BadRequest(`Couldn't create post, ERROR: ${error}`);
    }
  }
  //3. Get post by id
  static async getPostById(postId: string) {
    try {
      const foundPost = await Post.findById(postId)
        .populate({
          path: "author",
          select: "username",
        })
        .populate({
          path: "comments",
          populate: {
            path: "author",
            select: "username",
          },
          options: {
            sort: { createdAt: "desc" },
          },
        });

      if (!foundPost) throw "Post not found";

      return foundPost;
    } catch (error) {
      throw new NotFound(`Couldn't find post, ERROR: ${error}`);
    }
  }
  //4. Update post
  static async updatePost(
    userId: string,
    postId: string,
    updateData: Partial<CreateUpdatePostReq>
  ) {
    try {
      const post = await Post.findOne({ _id: postId, author: userId });

      if (!post) throw "Post not found";

      Object.assign(post, updateData);

      await post.save();
    } catch (error) {
      throw new BadRequest(`Couldn't update post, ERROR: ${error}`);
    }
  }
  //5. Delete post
  static async deletePost(userId: string, postId: string) {
    try {
      const response = await Post.findOneAndDelete({
        _id: postId,
        author: userId,
      });

      console.log(response);

      if (!response) throw "Post not found";
    } catch (error) {
      throw new NotFound(`Couldn't delete post, ERROR: ${error}`);
    }
  }
  //6. Like Post
  static async likePost(userId: string, postId: string) {
    try {
      const post = await Post.findById(postId);

      if (!post) throw "Post not found";

      if (post.author === userId) throw "Operation not permitted";

      post.likes += 1;

      const updatedPost = await post.save();

      return { likes: updatedPost.likes };
    } catch (error) {
      throw new BadRequest(`Couldn't like post, ERROR: ${error}`);
    }
  }
  //7. Dislike Post
  static async dislikePost(userId: string, postId: string) {
    try {
      const post = await Post.findById(postId);

      if (!post) throw "Post not found";

      if (post.author === userId) throw "Operation not permitted";

      post.dislikes += 1;

      const updatedPost = await post.save();

      return { dislikes: updatedPost.dislikes };
    } catch (error) {
      throw new BadRequest(`Couldn't dislike post, ERROR: ${error}`);
    }
  }
  //8. Get posts by user
  static async getPostsByUser(userId: string) {
    try {
      const posts = Post.find({ author: userId }).sort("-createdAt");

      return posts;
    } catch (error) {
      throw new NotFound(`Couldn't fetch user's posts, ERROR: ${error}`);
    }
  }
}

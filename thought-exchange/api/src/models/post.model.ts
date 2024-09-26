import { model, Schema } from "mongoose";

export interface PostModel {
  title: string;
  body: string;
  author: string;
}

const postSchema = new Schema<PostModel>(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
    },
    body: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 240,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = model<PostModel>("Post", postSchema);

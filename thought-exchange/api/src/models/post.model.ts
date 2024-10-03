import { model, Schema, Types } from "mongoose";

export interface PostModel {
  title: string;
  body: string;
  author: string;
  likes: number;
  dislikes: number;
  comments: Types.ObjectId[];
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
    likes: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    dislikes: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    author: {
      type: String,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Post = model<PostModel>("Post", postSchema);

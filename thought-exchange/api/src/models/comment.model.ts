import { model, Schema, Types } from "mongoose";

export interface CommentModel {
  body: string;
  author: string;
  post: Types.ObjectId;
}

const commentSchema = new Schema<CommentModel>(
  {
    body: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 140,
    },
    author: {
      type: String,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

export const Comment = model<CommentModel>("Comment", commentSchema);

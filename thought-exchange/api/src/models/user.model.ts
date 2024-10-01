import { model, Schema } from "mongoose";

export interface UserModel {
  _id: string;
  username: string;
  email: string;
}

const userSchema = new Schema<UserModel>({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export const User = model<UserModel>("User", userSchema);

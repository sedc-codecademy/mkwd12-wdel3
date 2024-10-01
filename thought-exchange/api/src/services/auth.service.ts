import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { User } from "../models/user.model";
import { RegisterReq } from "../interfaces/auth.interface";
import { BadRequest, GeneralError, Unauthorized } from "../const/error.const";

export class AuthService {
  static registerUser = async (registerReq: RegisterReq) => {
    const auth = getAuth();
    try {
      //1. Create a user in firebase
      const res = await createUserWithEmailAndPassword(
        auth,
        registerReq.email,
        registerReq.password
      );

      //2. Save user document in db
      const newUser = new User({
        _id: res.user.uid,
        email: res.user.email,
        username: registerReq.username,
      });

      await newUser.save();
    } catch (error) {
      auth.currentUser?.delete();
      console.log(error);
      throw new BadRequest("Can't create user");
    }
  };
  static loginUser = async (email: string, password: string) => {
    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = await User.findById(userCredential.user.uid);

      return userData;
    } catch (error) {
      throw new Unauthorized("Invalid Credentials");
    }
  };
  static logoutUser = async () => {
    try {
      const auth = getAuth();

      await auth.signOut();
    } catch (error) {
      throw new GeneralError("Something went wrong");
    }
  };
}

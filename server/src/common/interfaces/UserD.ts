import { Document } from "mongoose";
import { ImageType } from "./Image";

export interface UserType extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  password: { key: string; salt: string };
  profilePicture: ImageType;
  email: string;
  type: number;
  following: string[];
  followers: string[];
  apiKeys: string[];
  secureKeys: string[];
}

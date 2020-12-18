import { ImageType } from "./Image";

export interface UserView {
  userName: string;
  firstName: string;
  lastName: string;
  profilePicture: ImageType;
  type: number;
}

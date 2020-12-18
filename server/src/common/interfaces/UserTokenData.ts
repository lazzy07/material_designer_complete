import { ImageType } from "./Image";

export interface UserTokenData {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  profilePicture: ImageType;
  type: number;
}

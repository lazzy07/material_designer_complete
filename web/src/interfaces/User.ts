import { Image } from "./Image";

export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  type?: number;
  profilePicture?: Image;
  isFollowing?: boolean;
}

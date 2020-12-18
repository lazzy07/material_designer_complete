import { User } from "./User";
import { Comment } from "./Comment";

export interface Post<T> {
  id: string;
  user: User;
  tags: string[];
  comments: Comment[];
  likes: number;
  liked: boolean;
  data: T;
  noOfComments: number;
  updatedAt: number;
}

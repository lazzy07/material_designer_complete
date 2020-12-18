import { User } from "./User";
import { Reply } from "./Reply";

export interface Comment {
  id: string;
  user: User;
  postId: string;
  comment: string;
  replies: Reply[];
  dateTime: number;
}

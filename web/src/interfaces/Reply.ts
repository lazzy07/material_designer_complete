import { User } from "./User";

export interface Reply {
  id: string;
  user: User;
  commentId: string;
  reply: string;
  dateTime: number;
}

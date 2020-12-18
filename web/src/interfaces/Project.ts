import { User } from "./User";

export interface Project {
  user: User;
  projectName: string;
  data: any;
}

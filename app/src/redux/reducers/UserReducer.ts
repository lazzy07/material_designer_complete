import { Image } from "../actions/UserActions";
import { LOGIN_USER, LOGOUT_USER } from "../actions/UserActions";

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  sessionId: string;
  profilePicture?: Image;
  type: number;
}

const initState: UserState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  sessionId: "",
  profilePicture: undefined,
  type: -1
};

export const userReducer = (state = initState, action: any): UserState => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...action.payload };

    case LOGOUT_USER:
      return { ...initState };
    default:
      return state;
  }
};

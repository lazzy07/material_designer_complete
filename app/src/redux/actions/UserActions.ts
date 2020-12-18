export interface Image {
  width: number;
  height: number;
  preview: string;
  url: string;
}

export const LOGIN_USER = "login_user";
export const LOGOUT_USER = "logout_user";

export const loginUser = (userData: {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  image: Image | undefined;
  sessionId: string;
  type: number;
}) => {
  return { type: LOGIN_USER, payload: userData };
};

export const logoutUser = () => {
  return { type: LOGOUT_USER };
};

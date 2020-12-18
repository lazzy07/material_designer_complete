import Axios from "axios";
import { getConnectionUrl } from "./Connection";
import { USER_SERVER } from "../constants/index";
import Log from "../classes/Log";
import { UserType } from "../interfaces/UserD";

export const createUser = (args: any): Promise<UserType> => {
  return new Promise((resolve, reject) => {
    Axios.post(getConnectionUrl(USER_SERVER, "setuser/"), args)
      .then(res => {
        if (res.data.error) {
          reject(new Error(res.data.data.message));
        }
        resolve(res.data.data);
      })
      .catch(err => {
        reject("Internal server error");
        Log.addError(err);
      });
  });
};

export const isUserExists = (userId: string): Promise<UserType | null> => {
  return new Promise((resolve, reject) => {
    Axios.post(getConnectionUrl(USER_SERVER, "isuser/"), { id: userId })
      .then(res => {
        resolve(res.data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getUser = (
  email: string,
  userName: string,
  password: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.post(getConnectionUrl(USER_SERVER, "getuser/"), {
      email,
      userName,
      password
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

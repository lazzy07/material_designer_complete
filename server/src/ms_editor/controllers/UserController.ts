import { UserInputError } from "apollo-server-express";
import Axios from "axios";
import { getConnectionUrl } from "./../../common/functions/Connection";
import { USER_SERVER } from "../../common/constants";

export const employeeLogin = (
  userId: string,
  secureUser: string,
  secureKey: string
) => {
  return new Promise((resolve, reject) => {
    if (userId) {
      Axios.post(getConnectionUrl(USER_SERVER, "loginemployee"), {
        userId,
        secureUser,
        secureKey
      }).then(res => {
        if (res.data.error) {
          reject(new Error("Cant use this PC to login"));
        } else {
          resolve(true);
        }
      });
    } else {
      reject(new Error("No userId"));
    }
  });
};

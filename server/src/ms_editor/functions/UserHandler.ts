import {
  getAccessToken,
  setRefreshCookie
} from "../../common/functions/SessionManagement";
import { Response } from "express";
import {
  UserInputError,
  ApolloError,
  AuthenticationError
} from "apollo-server-express";
import Log from "../../common/classes/Log";
import { createUser, getUser } from "../../common/functions/UserConnection";
import { Context } from "../../common/interfaces/Context";
import { compare } from "bcrypt";
import { employeeLogin } from "../controllers/UserController";

export const createUserResolver = async (args: any, res: Response) => {
  try {
    let result = await createUser(args);
    try {
      setRefreshCookie(result, res);
      return getAccessToken(result);
    } catch (er) {
      Log.addError(er);
      return new ApolloError("Internal server error");
    }
  } catch (err) {
    return new UserInputError(err);
  }
};

export const loginResolver = async (
  args: {
    email: string;
    userName: string;
    password: string;
    secureKey: string;
    secureUser: string;
  },
  { req, res }: Context
) => {
  if (!req.headers.authorization) {
    const data = await getUser(args.email, args.userName, args.password);
    if (!data.error) {
      try {
        let user = data.data.user;
        if (user) {
          if (await compare(args.password, user.password)) {
            if (args.secureKey.length && args.secureUser.length) {
              if (args.secureUser !== user.userName) {
                try {
                  let rest = await employeeLogin(
                    user.id,
                    args.secureUser,
                    args.secureKey
                  );
                  setRefreshCookie(user, res);
                  return getAccessToken(user);
                } catch (error) {
                  return new UserInputError(error.message);
                }
              } else {
                setRefreshCookie(user, res);
                return getAccessToken(user);
              }
            } else {
              setRefreshCookie(user, res);
              return getAccessToken(user);
            }
          } else {
            return new UserInputError("Invalid username or password");
          }
        } else {
          return new UserInputError("Invalid username or password");
        }
      } catch (err) {
        Log.addError(err);
        return new ApolloError("Internal server error");
      }
    } else {
      return new ApolloError("Internal server error");
    }
  } else {
    return new AuthenticationError("Already logged in");
  }
};

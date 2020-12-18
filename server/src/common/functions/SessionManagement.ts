import { sign, verify } from "jsonwebtoken";
import { UserType } from "../interfaces/UserD";
import { UserTokenData } from "./../interfaces/UserTokenData";
import { AUTH_TOKEN_SETTINGS } from "./../constants/index";
import { Context } from "./../interfaces/Context";
import { AuthenticationError } from "apollo-server-express";
import { Response, Request } from "express";
import Log from "../classes/Log";

export const getAccessToken = (user: UserType) => {
  const sessionInfo: UserTokenData = {
    id: user.id,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicture: user.profilePicture,
    type: user.type
  };
  return sign({ ...sessionInfo }, AUTH_TOKEN_SETTINGS.sessionTokenSecret, {
    expiresIn: AUTH_TOKEN_SETTINGS.sessionTokenExpiration
  });
};

export const getRefreshToken = (user: UserType) => {
  return sign({ id: user.id }, AUTH_TOKEN_SETTINGS.refreshTokenSecret, {
    expiresIn: AUTH_TOKEN_SETTINGS.refreshTokenExpiration
  });
};

//Authorization must be in fom of bearer 219289018kjlajdlaj
export const isAuth = (context: Context) => {
  const { req } = context;

  const authorization = req.headers["authorization"];
  if (!authorization) {
    return false;
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, AUTH_TOKEN_SETTINGS.sessionTokenSecret);
    context.payload = payload as any;
    return payload;
  } catch (err) {
    return new AuthenticationError("Authentication failed");
  }
};

export const isAuthReq = (req: Request) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return false;
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, AUTH_TOKEN_SETTINGS.sessionTokenSecret);
    return payload;
  } catch (err) {
    Log.addError(err);
    return null;
  }
};

export const setRefreshCookie = (
  user: UserType,
  res: Response,
  falseHttp?: boolean
) => {
  res.cookie("jid", getRefreshToken(user), {
    httpOnly: falseHttp ? false : true,
    expires: new Date(
      new Date().getTime() +
        AUTH_TOKEN_SETTINGS.refreshTokenExpirationD * 24 * 60 * 60 * 1000
    )
  });
};

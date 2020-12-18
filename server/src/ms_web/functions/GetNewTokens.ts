import { Request, Response } from "express";
import Log from "./../../common/classes/Log";
import { verify } from "jsonwebtoken";
import { AUTH_TOKEN_SETTINGS } from "./../../common/constants/index";
import { isUserExists } from "../../common/functions/UserConnection";
import {
  getAccessToken,
  setRefreshCookie
} from "./../../common/functions/SessionManagement";

export const getNewTokens = async (req: Request, res: Response) => {
  const token = req.cookies.jid;

  if (!token) {
    return res.send({ error: true, accessToken: "" });
  }

  let payload: any = null;

  try {
    payload = verify(token, AUTH_TOKEN_SETTINGS.refreshTokenSecret);
  } catch (err) {
    Log.addError(err);
    return res.send({ error: true, accessToken: "" });
  }

  //Token is valid and send back an access token
  try {
    const user = await isUserExists(payload.id);
    if (user) {
      const token = getAccessToken(user);
      setRefreshCookie(user, res);
      return res.json({ error: false, accessToken: token });
    } else {
      return res.json({ error: true, accessToken: "" });
    }
  } catch (err) {
    Log.addError(err);
    return res.json({ error: true, message: "Auth failed" });
  }
};

import { Request, Response } from "express";
import { UserTokenData } from "./UserTokenData";

export interface Context {
  req: Request;
  res: Response;
  payload?: UserTokenData;
}

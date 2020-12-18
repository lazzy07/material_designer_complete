import { Request, Response } from "express";
import UserSchema from "../schemas/UserSchema";
import Log from "../../common/classes/Log";

export const loginEmployee = (req: Request, res: Response) => {
  if (req.body.userId && req.body.secureUser && req.body.secureKey) {
    UserSchema.findOne({
      $and: [
        { userName: req.body.secureUser },
        { following: req.body.userId },
        { secureKeys: req.body.secureKey }
      ]
    })
      .then(result => {
        if (result) {
          res.json({ error: false });
        } else {
          res.json({ error: true });
        }
      })
      .catch(err => {
        Log.addError(err);
        res.json({ error: true });
      });
  } else {
    res.json({ error: true });
  }
};

import { Request, Response } from "express";
import UserSchema from "../schemas/UserSchema";
import Log from "../../common/classes/Log";

export const isSecureKeyAvailable = (req: Request, res: Response) => {
  if (req.body.userId && req.body.secureKey) {
    UserSchema.findOne({
      userName: req.body.userId,
      secureKeys: { $in: [req.body.secureKey] }
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
  }
};

export const getSecureKeys = async (req: Request, res: Response) => {
  if (req.body.userId) {
    try {
      const user = await UserSchema.findById(req.body.userId).then();
      res.json({ error: false, secureKeys: (user as any).secureKeys || [] });
    } catch (err) {
      res.json({ error: false, secureKeys: [] });
    }
  } else {
    res.json({ error: false, secureKeys: [] });
  }
};

export const getApiKeys = async (req: Request, res: Response) => {
  if (req.body.userId) {
    try {
      const user = await UserSchema.findById(req.body.userId).then();
      res.json({ error: false, apiKeys: (user as any).apiKeys || [] });
    } catch (err) {
      res.json({ error: false, apiKeys: [] });
    }
  } else {
    res.json({ error: false, apiKeys: [] });
  }
};

export const setSecureKey = async (req: Request, res: Response) => {
  if (req.body.userId && req.body.key) {
    try {
      const userData = await UserSchema.findById(req.body.userId).then();
      userData.secureKeys = [...userData.secureKeys, req.body.key];
      const user = await userData.save();

      res.json({ error: false, secureKeys: (user as any).secureKeys || [] });
    } catch (err) {
      res.json({ error: false, secureKeys: [] });
    }
  } else {
    res.json({ error: false, secureKeys: [] });
  }
};

export const setApiKey = async (req: Request, res: Response) => {
  if (req.body.userId && req.body.key) {
    try {
      const userData = await UserSchema.findById(req.body.userId).then();
      userData.apiKeys = [...userData.apiKeys, req.body.key];
      const user = await userData.save();

      res.json({ error: false, apiKeys: (user as any).apiKeys || [] });
    } catch (err) {
      res.json({ error: false, apiKeys: [] });
    }
  } else {
    res.json({ error: false, apiKeys: [] });
  }
};

export const removeSecureKey = async (req: Request, res: Response) => {
  if (req.body.userId && req.body.key) {
    try {
      const userData = await UserSchema.findById(req.body.userId).then();

      let a: string[] = [];
      for (let i of userData.secureKeys) {
        if (i !== req.body.key) a.push(i);
      }
      userData.secureKeys = [...a];
      const user = await userData.save();

      res.json({ error: false, secureKeys: (user as any).secureKeys || [] });
    } catch (err) {
      res.json({ error: false, secureKeys: [] });
    }
  } else {
    res.json({ error: false, secureKeys: [] });
  }
};

export const removeApiKey = async (req: Request, res: Response) => {
  if (req.body.userId && req.body.key) {
    try {
      const userData = await UserSchema.findById(req.body.userId).then();

      let a: string[] = [];
      for (let i of userData.apiKeys) {
        if (i !== req.body.key) a.push(i);
      }
      userData.apiKeys = [...a];
      const user = await userData.save();

      res.json({ error: false, apiKeys: (user as any).apiKeys || [] });
    } catch (err) {
      res.json({ error: false, apiKeys: [] });
    }
  } else {
    res.json({ error: false, apiKeys: [] });
  }
};

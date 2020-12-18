import { Request, Response } from "express";
import PostSchema from "../schemas/Post";
import Log from "../../common/classes/Log";

export const search = async (req: Request, res: Response) => {
  try {
    const posts = await PostSchema.find({
      $and: [{ tags: req.body.searchTerm }, { type: req.body.type }]
    });

    res.json({ error: false, payload: posts || [] });
  } catch (err) {
    Log.addError(err);
    res.json({ erro: false, payload: [] });
  }
};

export const getUsersData = async (req: Request, res: Response) => {
  try {
    const userData = await PostSchema.find({
      $and: [{ userId: req.body.userId }, { type: req.body.type }]
    });

    res.json({ error: false, payload: userData || [] });
  } catch (err) {
    Log.addError(err);
    res.json({ error: false, payload: [] });
  }
};

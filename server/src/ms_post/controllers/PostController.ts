import { Request, Response } from "express";
import Log from "../../common/classes/Log";
import PostSchema from "../schemas/Post";

export const addNewPost = async (req: Request, res: Response) => {
  const data = {
    ...req.body,
    tags: req.body.tags,
    dataId: req.body.id
  };
  try {
    const post = new PostSchema(data);
    const p = await post.save();
    if (p) {
      Log.addLog(
        "md_data",
        "md_srv",
        req.body.userId,
        "Post data added: " + p.id
      );
      return res.status(200).send();
    } else {
      return res.status(404).send();
    }
  } catch (err) {
    Log.addError(err);
    return res.status(404).send();
  }
};

export const addLike = async (req: Request, res: Response) => {
  try {
    const post = await PostSchema.findById(req.body.postId);
    if (!post.likedBy.includes(req.body.userId)) {
      post.likes += 1;
      post.likedBy = [...post.likedBy, req.body.userId];
      await post.save();
      res.json({ error: false, payload: true });
    } else {
      post.likedBy = post.likedBy.filter(e => e !== req.body.userId);
      post.likes -= 1;
      await post.save();
      res.json({ error: false, payload: false });
    }
  } catch (err) {
    Log.addError(err);
    return res.status(404).send();
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const post = await PostSchema.findById(req.body.postId);

    let data = req.body;

    post.comments = [
      ...post.comments,
      {
        postId: data.postId,
        userId: data.userId,
        comment: data.comment
      }
    ];

    post.noOfComments += 1;

    await post.save();
    res.json({
      error: false,
      payload: {
        _id: data.postId,
        userId: data.userId,
        comment: data.comment
      }
    });
  } catch (err) {
    return res.status(404).send();
  }
};

export const getAllArtworks = async (req: Request, res: Response) => {
  try {
    const artworks = await PostSchema.find({ type: "artwork" });
    res.json({ error: false, payload: artworks || [] });
  } catch (err) {
    Log.addError(err);
    res.json({ error: true, payload: [] });
  }
};

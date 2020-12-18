import { Request, Response } from "express";
import ArtworkSchema from "../schemas/ArtworkSchema";
import Log from "../../common/classes/Log";
import Axios from "axios";
import { getConnectionUrl } from "./../../common/functions/Connection";
import { POST_SERVER } from "../../common/constants";

export const saveArtwork = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const artwork = new ArtworkSchema({ ...body.data, userId: body.userId });
    const art = await artwork.save();
    if (art) {
      Log.addLog(
        "srv_cdn",
        "srv_data",
        body.userId,
        "Artwork added: " + art.id
      );
      Axios.post(getConnectionUrl(POST_SERVER, "addnewpost"), {
        id: art.id,
        type: "artwork",
        tags: body.data.tags,
        userId: body.userId
      });
    } else {
      return res.status(404).send();
    }
    return res.status(200).send();
  } catch (err) {
    res.status(200).send();
    Log.addError(err);
    return res.status(404).send();
  }
};

export const searchArtwork = async (req: Request, res: Response) => {
  try {
    const artworks = await ArtworkSchema.find({
      $and: { tags: req.body.searchTerm, type: req.body.type }
    });

    res.json({ error: false, payload: artworks || [] });
  } catch (err) {
    Log.addError(err);
    res.json({ error: false, payload: [] });
  }
};

export const getArtwork = async (req: Request, res: Response) => {
  try {
    const artwork = await ArtworkSchema.findById(req.body.dataId);
    res.send({ error: false, payload: artwork });
  } catch (err) {
    Log.addError(err);
    res.status(404).send();
  }
};

import { Request, Response } from "express";
import Log from "../../common/classes/Log";
import MaterialSchema from "../schemas/MaterialSchema";
import { getConnectionUrl } from "../../common/functions/Connection";
import { POST_SERVER } from "../../common/constants";
import Axios from "axios";

export const addNewMaterial = (req: Request, res: Response) => {
  if (req.body.data) {
    const userId = req.body.userId;
    const data = req.body.data;

    try {
      const material = new MaterialSchema({ ...data, userId });
      material.save();
      const id = material.id;

      Axios.post(getConnectionUrl(POST_SERVER, "addnewpost"), {
        id,
        type: "material",
        tags: data.tags,
        userId
      });
    } catch (err) {
      Log.addError(err);
    }
  }

  res.status(404).send();
};

export const getMaterial = async (req: Request, res: Response) => {
  try {
    const artwork = await MaterialSchema.findById(req.body.dataId);
    res.send({ error: false, payload: artwork });
  } catch (err) {
    Log.addError(err);
    res.status(404).send();
  }
};

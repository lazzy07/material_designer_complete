import { Request, Response } from "express";
import { isAuthReq } from "../../common/functions/SessionManagement";
import fileUpload from "express-fileupload";
import Log from "../../common/classes/Log";
import uuid from "uuid";
import { sendPostData } from "./../../common/functions/SendPostData";
import { getImageData } from "../../common/functions/SendImageData";

export const handleUploadArtwork = async (req: Request, res: Response) => {
  let data = req.body;

  const result = isAuthReq(req);
  if (result) {
    if (!req.files || Object.keys(req.files).length !== 1) {
      return res.json({ error: true, data: { message: "Error! bad request" } });
    }

    const preview = req.body.preview;

    let picture: fileUpload.UploadedFile = req.files.artwork as any;
    if (picture) {
      if (picture.mimetype === "image/jpeg") {
        picture.name = (result as any).userName + "_" + uuid.v4();
        const uploadPath = "/usr/src/app/uploads/artwork/" + picture.name;
        const path = "/uploads/artwork/" + picture.name;
        if (picture.size < 2 * 1024 * 1024) {
          if (preview) {
            if (preview.length > 0) {
              picture.mv(uploadPath, async err => {
                if (err) {
                  Log.addError(err);
                  return res.json({
                    error: true,
                    data: { message: "Upload failed" }
                  });
                } else {
                  if (data.description.length > 0 && data.tags.length > 0) {
                    Log.addLog(
                      (result as any).id,
                      "md_srv_cdn",
                      (result as any).userName,
                      "File upload complete:" + picture.name
                    );

                    try {
                      const imData = await getImageData(
                        path,
                        (result as any).id,
                        preview
                      );
                      const dataToSend = {
                        ...req.body,
                        image: imData
                      };

                      sendPostData((result as any).id, "artwork", dataToSend);

                      return res.json({
                        error: false,
                        data: { message: "File upload complete" }
                      });
                    } catch (err) {
                      Log.addError(err);
                      return res.json({
                        error: true,
                        data: { message: "Server Error" }
                      });
                    }
                  } else {
                    return res.json({
                      error: true,
                      data: { message: "Bad request" }
                    });
                  }
                }
              });
            } else {
              return res.json({
                error: true,
                data: { message: "Preview  not set" }
              });
            }
          } else {
            return res.json({
              error: true,
              data: { message: "Preview not set" }
            });
          }
        } else {
          return res.json({ error: true, data: { message: "File too large" } });
        }
      } else {
        return res.json({
          error: true,
          data: { message: "Unsupported file type" }
        });
      }
    } else {
      return res.json({
        error: true,
        data: { message: "No file attached" }
      });
    }
  } else {
    return res.json({
      error: true,
      data: { message: "Authentification failed" }
    });
  }

  data.tags = JSON.parse(data.tags);
};

import { Request, Response } from "express";
import { isAuthReq } from "./../../common/functions/SessionManagement";
import fileUpload from "express-fileupload";
import Log from "../../common/classes/Log";
import { sendDataToDataServer } from "../../common/functions/SendImageData";
import { USER_SERVER } from "../../common/constants";
import { getConnectionUrl } from "./../../common/functions/Connection";

export const profilePictureUpload = (req: Request, res: Response) => {
  const result = isAuthReq(req);
  if (result) {
    if (!req.files || Object.keys(req.files).length !== 1) {
      return res.json({ error: true, data: { message: "Error! bad request" } });
    }

    const preview = req.body.preview;
    let picture: fileUpload.UploadedFile = req.files.profile_pic as any;
    if (picture) {
      if (picture.mimetype === "image/jpeg") {
        picture.name = (result as any).userName + "_profile_picture";
        const uploadPath = "/usr/src/app/uploads/profile/" + picture.name;
        const path = "/uploads/profile/" + picture.name;
        if (picture.size < 2 * 1024 * 1024) {
          if (preview) {
            if (preview.length > 0) {
              picture.mv(uploadPath, err => {
                if (err) {
                  Log.addError(err);
                  return res.json({
                    error: true,
                    data: { message: "Upload failed" }
                  });
                } else {
                  Log.addLog(
                    (result as any).id,
                    "md_srv_cdn",
                    (result as any).userName,
                    "File upload complete:" + picture.name
                  );

                  sendDataToDataServer(
                    path,
                    getConnectionUrl(USER_SERVER, "profilepicture/"),
                    preview,
                    (result as any).id
                  );

                  return res.json({
                    error: false,
                    data: { message: "File upload complete" }
                  });
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
        data: { message: "Picture not attached" }
      });
    }
  } else {
    return res.json({
      error: true,
      data: { message: "Authentification failed" }
    });
  }
};

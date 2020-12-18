import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import uuid from "uuid";
import { isAuthReq } from "../../common/functions/SessionManagement";
import Log from "../../common/classes/Log";
import { getImageData } from "../../common/functions/SendImageData";
import { sendPostData } from "../../common/functions/SendPostData";

export const handleUploadMaterial = (req: Request, res: Response) => {
  let returned = false;
  if (!req.files || Object.keys(req.files).length !== 2) {
    return res.json({ error: true, message: "Error! bad request 01" });
  }
  const result = isAuthReq(req);
  if (result) {
    const materialImage: fileUpload.UploadedFile = req.files
      .material_image as any;
    const textures: fileUpload.UploadedFile = req.files.textures as any;
    const preview = req.body.material_preview;
    const title = req.body.title;
    const description = req.body.description;
    const tagsA = req.body.tags;
    const materialA = req.body.material;
    const isPublicA = req.body.isPublic;

    if (
      materialImage &&
      preview &&
      title &&
      description &&
      tagsA &&
      materialA &&
      textures &&
      isPublicA
    ) {
      const tags = JSON.parse(tagsA);
      const material = JSON.parse(materialA);
      const isPublic = JSON.parse(isPublicA);
      if (
        materialImage.mimetype === "image/jpeg" &&
        preview.length > 0 &&
        title.length > 0 &&
        description.length > 0 &&
        tags.length > 0 &&
        material
      ) {
        const name = (result as any).userName + "_mat_" + uuid.v4();
        materialImage.name = name;

        const nameTex = (result as any).userName + "_mattex_" + uuid.v4();
        textures.name = nameTex;

        const uploadPath =
          "/usr/src/app/uploads/material/" + materialImage.name;
        const path = "/uploads/material/" + materialImage.name;

        const uploadPathTex = "/usr/src/app/uploads/material/" + textures.name;
        const pathTex = "/uploads/material/" + textures.name;

        if (materialImage.size < 2 * 1024 * 1024) {
          materialImage.mv(uploadPath, async err => {
            if (!err) {
              try {
                const imageData = await getImageData(
                  path,
                  (result as any).id,
                  preview
                );
                textures.mv(uploadPathTex, err2 => {
                  if (!err2) {
                    sendPostData((result as any).id, "material", {
                      image: imageData,
                      tags,
                      description,
                      material,
                      title,
                      data: pathTex,
                      isPublic
                    });
                    returned = true;
                    return res.json({ error: false });
                  } else {
                    Log.addError(err2);
                    return res.json({
                      error: true,
                      message: "Error! bad request 05"
                    });
                  }
                });
              } catch (err) {
                Log.addError(err);
                return res.json({
                  error: true,
                  message: "Error! bad request 04"
                });
              }
            } else {
              Log.addError(err);
              return res.json({
                error: true,
                message: "Error! bad request 03"
              });
            }
          });
        } else {
          return res.json({
            error: true,
            message: "Error! bad request 03"
          });
        }
      } else {
        return res.json({
          error: true,
          message: "Error! bad request 07"
        });
      }
    } else {
      return res.json({
        error: true,
        message: "Error! bad request 06"
      });
    }
  } else {
    returned = true;
    return res.json({ error: true, message: "Not Authenticated" });
  }
};

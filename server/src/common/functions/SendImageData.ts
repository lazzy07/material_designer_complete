import Axios from "axios";
import fs from "fs";
import probe from "probe-image-size";
import Log from "../classes/Log";
import { ImageType } from "../interfaces/Image";

export const sendDataToDataServer = (
  path: string,
  serverUrl: string,
  preview: string,
  userId: string
) => {
  const readStream = fs.createReadStream("/usr/src/app" + path);

  probe(readStream)
    .then((res: any) => {
      const toSend: ImageType = {
        userId,
        preview,
        width: res.width,
        height: res.height,
        url: path
      };
      readStream.destroy();
      Axios.post(serverUrl, toSend)
        .then(res => {
          console.log("ok");
        })
        .catch(err => {
          Log.addError(err);
        });
    })
    .catch(err => {
      Log.addError(err);
    });
};

export const getImageData = (path: string, userId: string, preview: string) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream("/usr/src/app" + path);
    if (readStream) {
      probe(readStream)
        .then((res: any) => {
          const toSend: ImageType = {
            userId,
            preview,
            width: res.width,
            height: res.height,
            url: path
          };
          readStream.destroy();
          resolve(toSend);
        })
        .catch(err => {
          Log.addError(err);
          reject(err);
        });
    } else {
      reject(new Error("file stream not found"));
    }
  });
};

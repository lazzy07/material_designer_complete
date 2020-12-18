import Compressor from "compressorjs";
import { ImageToUpload } from "../interfaces/ImageToUpload";

export const compressImage = (
  image: File,
  options?: { quality: number; maxWidth?: number; maxHeight?: number }
): Promise<Blob> => {
  let opt = {
    quality: 0.5,
    ...options
  };

  return new Promise((resolve, reject) => {
    new Compressor(image, {
      ...opt,
      success(res) {
        resolve(res);
      },
      error(err) {
        reject(err);
      }
    });
  });
};

export const getMaterialImage = (image: File | Blob): Promise<ImageToUpload> => {
  let opt = {
    quality: 0.4,
    maxWidth: 1200,
    maxHeight: 1200
  };

  let previewOpt = {
    quality: 0.3,
    maxWidth: 100,
    maxHeight: 100
  };

  return new Promise((resolve, reject) => {
    let result: Blob;
    let resultPreview: Blob;
    new Compressor(image, {
      ...opt,
      success(res) {
        result = res;

        new Compressor(image, {
          ...previewOpt,
          success(resPrev) {
            resultPreview = resPrev;
            var reader = new FileReader();
            reader.readAsDataURL(resultPreview);
            reader.onloadend = () => {
              resolve({ preview: reader.result, image: result });
            };
          },
          error(e) {
            reject(e);
          }
        });
      },
      error(err) {
        reject(err);
      }
    });
  });
};

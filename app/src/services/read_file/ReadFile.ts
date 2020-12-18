const fs = window.require("fs");
import fileType from "file-type";

type MatFileTypes = "image" | "envmap";
export const supportedImageFileTypes = ["image/png", "image/jpeg", "image/jpg"];

export const readFile = (filePath: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, (err: Error, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }
  });
};

export const getFileType = (data: any) => {
  return fileType(data);
};

export const isFileSupported = (fileType: MatFileTypes, type: string) => {
  switch (fileType) {
    case "image":
      for (let i = 0; i < supportedImageFileTypes.length; i++) {
        if (type === supportedImageFileTypes[i]) {
          return true;
        }
      }
      return false;

    case "envmap":
      return true;

    default:
      return false;
  }
};

export const readFolder = (folderPath): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err: Error, files: string[]) => {
      if (err) {
        reject(err);
      } else {
        if (files) {
          resolve(files);
        } else {
          resolve([]);
        }
      }
    });
  });
};

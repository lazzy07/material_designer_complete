import { ProjectSettings } from "../services/get_project_settings/ProjectSettings";
import { Mat } from "../types";

let mat = (window as any).mat;
let cv = (window as any).cv;

const perlinNoise = (
  seed: number,
  sizeX: number,
  sizeY: number,
  octaves: number,
  bias: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    let size = ProjectSettings.getGlobalResolution();
    mat.perlinNoise(
      seed,
      size,
      size,
      octaves,
      bias,
      (err: Error, val: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(val);
        }
      }
    );
  });
};

const randomNoise = (
  seed: number,
  sizeX: number,
  sizeY: number
): Promise<string> => {
  let size = ProjectSettings.getGlobalResolution();
  return new Promise((resolve, reject) => {
    mat.randomNoise(seed, size, size, (err: Error, val: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(val);
      }
    });
  });
};

const createImage = (type = cv.CV_8UC3, fill = [0, 0, 0]) => {
  let res = ProjectSettings.getGlobalResolution();
  let img1: Mat = new cv.Mat(res, res, type, fill);
  return img1;
};

const imageToString = (img: Mat): Promise<string> => {
  return new Promise((resolve, reject) => {
    cv.imencodeAsync(".jpg", img, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.toString("base64"));
      }
    });
  });
};

const blendImage = (
  img1: string,
  img2: string,
  type: number,
  influence: number
) => {
  return new Promise((resolve, reject) => {
    let size = ProjectSettings.getGlobalResolution();
    mat.imageArithmetic(
      img1,
      img2,
      type,
      influence,
      size,
      size,
      (err: Error, res: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

const splitColor = (
  image: string,
  sizeX: number,
  sizeY: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    let size = ProjectSettings.getGlobalResolution();

    mat.splitColor(
      image,
      size,
      size,
      (err: Error, r: string, g: string, b: string) => {
        if (err) {
          reject(err);
        } else {
          resolve({ r, g, b });
        }
      }
    );
  });
};

const mergeColor = (r: string, g: string, b: string) => {
  let size = ProjectSettings.getGlobalResolution();
  return new Promise((resolve, reject) => {
    mat.mergeColor(r, g, b, size, size, (err: Error, res: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const threshold = (
  image: string,
  threshVal: number,
  maxVal: number,
  threshType: number,
  kernel: number,
  substract: number
) => {
  let size = ProjectSettings.getGlobalResolution();
  return new Promise((resolve, reject) => {
    mat.threshold(
      image,
      threshVal,
      maxVal,
      threshType,
      kernel,
      substract,
      size,
      size,
      (err: Error, res: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

const blur = (
  image: string,
  type: number,
  ksizeX: number,
  ksizeY: number,
  sigmaX: number,
  sigmaY: number
) => {
  return new Promise((resolve, reject) => {
    let size = ProjectSettings.getGlobalResolution();
    mat.blur(
      image,
      type,
      ksizeX,
      ksizeY,
      sigmaX,
      sigmaY,
      size,
      size,
      (err: Error, res: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

const distanceTransform = (
  image: string,
  retType: number,
  distanceType: number,
  maskSize: number,
  labelType: number
) => {
  return new Promise((resolve, reject) => {
    let size = ProjectSettings.getGlobalResolution();
    mat.distanceTransform(
      image,
      retType,
      distanceType,
      maskSize,
      labelType,
      size,
      size,
      (err: Error, res: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

const highpass = (
  image: string,
  type: number,
  dx: number,
  dy: number,
  ksize: number,
  delta: number
) => {
  return new Promise((resolve, reject) => {
    let size = ProjectSettings.getGlobalResolution();
    mat.highpass(
      image,
      type,
      dx,
      dy,
      ksize,
      delta,
      size,
      size,
      (err: Error, res: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

const colorToGrayscale = (image: string) => {
  let size = ProjectSettings.getGlobalResolution();
  return new Promise((resolve, reject) => {
    mat.colorToGrayscale(image, size, size, (err: Error, res: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const invert = (image: string) => {
  let size = ProjectSettings.getGlobalResolution();
  return new Promise((resolve, reject) => {
    mat.invert(image, size, size, (err: Error, res: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const gammaCorrection = (image: string, gamma: number) => {
  let size = ProjectSettings.getGlobalResolution();
  return new Promise((resolve, reject) => {
    mat.gammaCorrection(image, gamma, size, size, (err: Error, res: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const morphologyOp = (
  image: string,
  operation: number,
  kernel: number,
  morphSize: number,
  iterations: number
) => {
  let size = ProjectSettings.getGlobalResolution();
  return new Promise((resolve, reject) => {
    mat.morphologyOp(
      image,
      operation,
      kernel,
      morphSize,
      iterations,
      size,
      size,
      (err: Error, res: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

const colorize = (image: string, lut: string) => {
  let size = ProjectSettings.getGlobalResolution();
  return new Promise((resolve, reject) => {
    mat.colorize(image, lut, size, size, (err: Error, res: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const exporter = {
  perlinNoise,
  randomNoise,
  createImage,
  imageToString,
  blendImage,
  splitColor,
  mergeColor,
  threshold,
  blur,
  distanceTransform,
  highpass,
  colorToGrayscale,
  invert,
  gammaCorrection,
  morphologyOp,
  colorize
};

export default exporter;

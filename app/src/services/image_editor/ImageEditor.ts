import ImageCompressor from "image-compressor.js";
import {
  MAX_PREVIEW_QUALITY,
  MAX_PREVIEW_WIDTH,
  MAX_PREVIEW_HEIGHT
} from "../../constants/images";

export const renderPreviewImage = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    new ImageCompressor(file, {
      quality: MAX_PREVIEW_QUALITY,
      maxWidth: MAX_PREVIEW_WIDTH,
      maxHeight: MAX_PREVIEW_HEIGHT,
      convertSize: 0,
      success(result) {
        resolve(result);
      },
      error(e) {
        return reject(e);
      }
    });
  });
};

export const dataURLtoFile = (
  dataurl: string,
  filename: string,
  mime: string
) => {
  let arr = dataurl.split(",");
  if (arr) {
    let bstr = atob(dataurl),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
};

export const blobToBase64 = (file: Blob): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    try {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        resolve(reader.result as string);
      };
    } catch (err) {
      reject(err);
    }
  });
};

export const dataURItoBlob = (byteString: string, mime: string) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  // var byteString;
  // if (dataURI.split(",")[0].indexOf("base64") >= 0)
  //   byteString = atob(dataURI.split(",")[1]);
  // else byteString = unescape(dataURI.split(",")[1]);

  // // separate out the mime component
  // var mimeString = dataURI
  //   .split(",")[0]
  //   .split(":")[1]
  //   .split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mime });
};

export const blobToFile = (theBlob: Blob, fileName: string): File => {
  var b: any = theBlob;
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  //Cast to a File() type
  return <File>theBlob;
};

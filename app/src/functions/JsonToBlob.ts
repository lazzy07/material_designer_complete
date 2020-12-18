export const encode = (s: string) => {
  var out: any = [];
  for (var i = 0; i < s.length; i++) {
    out[i] = s.charCodeAt(i);
  }
  return new Uint8Array(out);
};

export const getJsonBlob = (obj: object) => {
  var str = JSON.stringify(obj);
  var data = encode(str);

  var blob = new Blob([data], {
    type: "application/octet-stream"
  });

  return blob;
};

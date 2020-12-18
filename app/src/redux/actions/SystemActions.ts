export const SET_TOUPLOAD = "SET_TOUPLOAD";
export const REMOVE_TOUPLOAD = "REMOVE_TOUPLOAD";
export const REMOVE_ALL_TOUPLOAD = "REMOVE_ALL_TOUPLOAD";

export const SET_ENVMAPS_SYSTEM = "SET_ENVMAPS_SYSTEM";

export const SET_SELECTED_NODE = "SET_SELECTED_NODE";
export const SET_IMAGE_VIEWER_NODE = "SET_IMAGE_VIEWER_NODE";

export const SET_IMAGE_VIEWER = "SET_IMAGE_VIEWER";

export const setToUpload = (files: any[]) => {
  return {
    type: SET_TOUPLOAD,
    payload: files
  };
};

export const removeToUpload = (filePath: string) => {
  return {
    type: REMOVE_TOUPLOAD,
    payload: filePath
  };
};

export const removeAllToUpload = () => {
  return {
    type: REMOVE_ALL_TOUPLOAD
  };
};

export const setEnvMapsSystem = (files: string[]) => {
  return {
    type: SET_ENVMAPS_SYSTEM,
    payload: files
  };
};

export const setSelectedNode = (selected: any = {}) => {
  return {
    type: SET_SELECTED_NODE,
    payload: selected
  };
};

export const setImageViewerNode = (id: string) => {
  return {
    type: SET_IMAGE_VIEWER_NODE,
    payload: id
  };
};

export const setImageViewer = (image: string) => {
  return {
    type: SET_IMAGE_VIEWER,
    payload: image
  };
};

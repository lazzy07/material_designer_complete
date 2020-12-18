export const SET_CAPTURE = "SET_CAPTURE";
export const TOGGLE_CAPTURE = "TOGGLE_CAPTURE";
export const ADD_MATERIAL_TEXTURES = "ADD_MATERIAL_TEXTURES";
export const REMOVE_MATERIAL_TEXTURES = "REMOVE_MATERIAL_TEXTURES";

export const setCapture = (capture: string) => {
  return { type: SET_CAPTURE, payload: capture };
};

export const toggleCapture = () => {
  return { type: TOGGLE_CAPTURE };
};

export const addMaterialTextures = (textures: any) => {
  return { type: ADD_MATERIAL_TEXTURES, payload: textures };
};

export const removeMaterialTextures = () => {
  return { type: REMOVE_MATERIAL_TEXTURES };
};

import { textureDisp } from "../reducers/SettingsReducer";
import { Action } from "redux";

export const SET_VERSION = "SET_VERSION";
export const SET_TEXTURE_DISPLAY = "SET_TEXTURE_DISPLAY";

export const setTextureDisplay = (type: textureDisp) => {
  return {
    type: SET_TEXTURE_DISPLAY,
    payload: type
  };
};

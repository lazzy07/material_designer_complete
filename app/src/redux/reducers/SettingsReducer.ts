import { SET_VERSION, SET_TEXTURE_DISPLAY } from "../actions/SettingsActions";

export type textureDisp = "thumbLarge" | "thumbSmall" | "listView";

export interface SettingsState {
  version: string;
  textureDisplay: textureDisp;
}

const initState: SettingsState = {
  version: "0.0.0",
  textureDisplay: "thumbSmall"
};

export const settingsReducer = (
  state: SettingsState = initState,
  action: any
): SettingsState => {
  switch (action.type) {
    case SET_VERSION:
      return {
        ...state,
        version: action.payload
      };

    case SET_TEXTURE_DISPLAY:
      return {
        ...state,
        textureDisplay: action.payload
      };

    default:
      return state;
  }
};

import {
  SET_CAPTURE,
  TOGGLE_CAPTURE,
  ADD_MATERIAL_TEXTURES,
  REMOVE_MATERIAL_TEXTURES
} from "../actions/MaterialActions";

export interface MaterialState {
  capture: string;
  startCapture: boolean;
  materialTextures: any;
}

const initialState: MaterialState = {
  capture: "",
  startCapture: false,
  materialTextures: {}
};

export const materialReducer = (
  state = initialState,
  action: any
): MaterialState => {
  switch (action.type) {
    case SET_CAPTURE:
      return {
        ...state,
        capture: action.payload
      };

    case TOGGLE_CAPTURE:
      return {
        ...state,
        startCapture: !state.startCapture
      };

    case ADD_MATERIAL_TEXTURES:
      return {
        ...state,
        materialTextures: action.payload
      };

    case REMOVE_MATERIAL_TEXTURES:
      return {
        ...state,
        materialTextures: {}
      };

    default:
      return state;
  }
};

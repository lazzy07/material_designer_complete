import {
  SET_TOUPLOAD,
  REMOVE_TOUPLOAD,
  REMOVE_ALL_TOUPLOAD,
  SET_ENVMAPS_SYSTEM,
  SET_SELECTED_NODE,
  SET_IMAGE_VIEWER_NODE,
  SET_IMAGE_VIEWER
} from "../actions/SystemActions";

export interface SystemState {
  toBeUploaded: any[];
  envMapsSystem: string[];
  environmentMap: string;
  selectedNode: any;
  viewerNodeId: string;
  imageViewer: string;
}

const initialState: SystemState = {
  toBeUploaded: [],
  envMapsSystem: [],
  environmentMap: "",
  selectedNode: {},
  viewerNodeId: "",
  imageViewer: ""
};

export const systemReducer = (
  state = initialState,
  action: any
): SystemState => {
  switch (action.type) {
    case SET_TOUPLOAD:
      return {
        ...state,
        toBeUploaded: action.payload
      };

    case REMOVE_TOUPLOAD:
      let toUpload = state.toBeUploaded;
      let newToUpload: any[] = [];

      toUpload.forEach(ele => {
        if (action.payload !== ele) {
          newToUpload.push(ele);
        }
      });

      return {
        ...state,
        toBeUploaded: newToUpload
      };

    case REMOVE_ALL_TOUPLOAD:
      return {
        ...state,
        toBeUploaded: []
      };

    case SET_ENVMAPS_SYSTEM:
      return {
        ...state,
        envMapsSystem: action.payload
      };

    case SET_SELECTED_NODE:
      return {
        ...state,
        selectedNode: action.payload
      };

    case SET_IMAGE_VIEWER_NODE:
      return {
        ...state,
        viewerNodeId: action.payload
      };

    case SET_IMAGE_VIEWER:
      return {
        ...state,
        imageViewer: action.payload
      };

    default:
      return state;
  }
};

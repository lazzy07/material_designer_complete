import {
  CHANGE_OPENED_FILE,
  NEW_LOCAL_PROJECT,
  OPEN_PROJECT_FILE,
  SET_RESOURCES_PATH
} from "../actions/FileActions";
import { LocalFile, CloudFile } from "../types";

export interface FileState {
  filePath: string;
  recentLocal: LocalFile[];
  recentCloud: CloudFile[];
  resourcesPath: string;
}

const initState: FileState = {
  filePath: "",
  recentLocal: [],
  recentCloud: [],
  resourcesPath: "./resources"
};

export const fileReducer = (state: FileState = initState, action: any) => {
  switch (action.type) {
    case CHANGE_OPENED_FILE:
      return {
        ...state,
        filePath: action.payload
      };

    case NEW_LOCAL_PROJECT:
      let localFiles = [...state.recentLocal];

      if (localFiles.length > 9) {
        localFiles = localFiles.slice(0, 9);
      }

      localFiles.push(action.payload);

      return {
        ...state,
        filePath: action.payload.path,
        recentLocal: [...localFiles]
      };

    case OPEN_PROJECT_FILE:
      for (let i = 0; i < state.recentLocal.length; i++) {
        if (state.recentLocal[i].path === action.payload.path) {
          return state;
        }
      }

      let lFiles = [...state.recentLocal];

      if (lFiles.length > 9) {
        localFiles = lFiles.slice(0, 9);
      }

      lFiles.push(action.payload);

      return {
        ...state,
        filePath: action.payload.path,
        recentLocal: [...lFiles]
      };

    case SET_RESOURCES_PATH:
      return {
        ...state,
        resourcesPath: action.payload
      };

    default:
      return state;
  }
};

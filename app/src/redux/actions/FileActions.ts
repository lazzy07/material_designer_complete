import { LocalFile } from "../types";

export const CHANGE_OPENED_FILE = "CHANGE_OPENED_FILE";
export const NEW_LOCAL_PROJECT = "NEW_LOCAL_PROJECT";
export const OPEN_PROJECT_FILE = "OPEN_PROJECT_FILE";
export const SET_RESOURCES_PATH = "SET_RESOURCES_PATH";

export const newLocalProject = (filePath: string) => {
  let path;
  if (window) {
    path = (window as any).require("path");
  } else {
    path = require("path");
  }

  if (filePath) {
    let name = path.basename(filePath);
    let file: LocalFile = {
      path: filePath,
      name
    };

    return {
      type: NEW_LOCAL_PROJECT,
      payload: file
    };
  }
};

export const openProjectFile = (filePath: string) => {
  let path;
  if (window) {
    path = (window as any).require("path");
  } else {
    path = require("path");
  }

  if (filePath) {
    let name = path.basename(filePath);
    let file: LocalFile = {
      path: filePath,
      name
    };

    return {
      type: OPEN_PROJECT_FILE,
      payload: file
    };
  }
};

export const openCloudFile = (fileName: string) => {
  return {
    type: CHANGE_OPENED_FILE,
    payload: "webfile"
  };
};

import { MatTex } from "../types";
import { createNewMaterialGraph } from "../new_material_graph/CreateNewMaterialGraph";

export const ADD_PROJECT_DATA = "ADD_PROJECT_DATA";
export const ADD_TEXTURE_DATA = "ADD_TEXTURE_DATA";
export const REMOVE_TEXTURE_DATA = "REMOVE_TEXTURE_DATA";

export const CHANGE_ENVMAP = "CHANGE_ENVMAP";
export const CHANGE_ENVMAP_EXPOSURE = "CHANGE_ENVMAP_EXPOSURE";
export const CHANGE_GEOMETRY = "CHANGE_GEOMETRY";
export const CHANGE_SUBDIVISIONS = "CHANGE_SUBDIVISIONS";
export const CHANGE_ENVMAP_ROTATION = "CHANGE_ENVMAP_ROTATION";
export const CHANGE_GEOMETRY_PATH = "CHANGE_GEOMETRY_PATH";
export const CHANGE_WIREFRAME = "CHANGE_WIREFRAME";

export const ADD_NEW_GRAPH = "ADD_NEW_GRAPH";
export const REMOVE_GRAPH = "REMOVE_GRAPH";
export const CHANGE_ACTIVE_GRAPH = "CHANGE_ACTIVE_GRAPH";
export const SET_ACTIVE_GRAPH_TITLE = "SET_ACTIVE_GRAPH_TITLE";
export const EDIT_ACTIVE_GRAPH = "EDIT_ACTIVE_GRAPH";
export const SET_GLOBAL_RESOLUTION = "SET_GLOBAL_RESOLUTION";
export const SET_PUBLIC = "SET_PUBLIC";
export const SET_PROJECT_NAME = "SET_PROJECT_NAME";

export const setPublic = (isPublic: boolean) => {
  return {
    type: SET_PUBLIC,
    payload: isPublic
  };
};

export const setProjectName = (projectName: string) => {
  return {
    type: SET_PROJECT_NAME,
    payload: projectName
  };
};

export const addProjectData = (data: string) => {
  return {
    type: ADD_PROJECT_DATA,
    payload: data
  };
};

export const addTextureData = (texture: MatTex) => {
  return {
    type: ADD_TEXTURE_DATA,
    payload: texture
  };
};

export const changeEnvmap = (envmap: string) => {
  return {
    type: CHANGE_ENVMAP,
    payload: envmap
  };
};

export const changeEnvmapExposure = (exposure: number) => {
  return {
    type: CHANGE_ENVMAP_EXPOSURE,
    payload: exposure
  };
};

export const changeGeometry = (type: string) => {
  return {
    type: CHANGE_GEOMETRY,
    payload: type
  };
};

export const changeSubdivisions = (subdivs: number) => {
  return {
    type: CHANGE_SUBDIVISIONS,
    payload: subdivs
  };
};

export const changeEnvmapRotation = (rotation: number) => {
  return {
    type: CHANGE_ENVMAP_ROTATION,
    payload: rotation
  };
};

export const changeGeometryPath = (path: string) => {
  return {
    type: CHANGE_GEOMETRY_PATH,
    payload: path
  };
};

export const changeWireframe = () => {
  return {
    type: CHANGE_WIREFRAME
  };
};

export const removeTextureProject = (uuid: string) => {
  return {
    type: REMOVE_TEXTURE_DATA,
    payload: uuid
  };
};

export const addNewGraph = () => {
  return {
    type: ADD_NEW_GRAPH,
    payload: { ...createNewMaterialGraph() }
  };
};

export const removeGraph = (uuid: string) => {
  return {
    type: REMOVE_GRAPH,
    payload: uuid
  };
};

export const changeActiveGraph = (uuid: string) => {
  return {
    type: CHANGE_ACTIVE_GRAPH,
    payload: uuid
  };
};

export const setActiveGraphTitle = (key: string, value: string) => {
  return {
    type: SET_ACTIVE_GRAPH_TITLE,
    payload: { key, value }
  };
};

export const editActiveGraph = (graphId: string, data: any) => {
  return {
    type: EDIT_ACTIVE_GRAPH,
    payload: {
      graphId,
      data
    }
  };
};

export const setGlobalResolution = (resolution: number) => {
  return {
    type: SET_GLOBAL_RESOLUTION,
    payload: resolution
  };
};

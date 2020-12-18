import {
  ADD_PROJECT_DATA,
  ADD_TEXTURE_DATA,
  CHANGE_ENVMAP_EXPOSURE,
  CHANGE_GEOMETRY,
  CHANGE_SUBDIVISIONS,
  CHANGE_ENVMAP_ROTATION,
  CHANGE_GEOMETRY_PATH,
  CHANGE_WIREFRAME,
  REMOVE_TEXTURE_DATA,
  ADD_NEW_GRAPH,
  REMOVE_GRAPH,
  CHANGE_ACTIVE_GRAPH,
  SET_ACTIVE_GRAPH_TITLE,
  EDIT_ACTIVE_GRAPH,
  SET_GLOBAL_RESOLUTION,
  SET_PROJECT_NAME,
  SET_PUBLIC
} from "../actions/ProjectActions";
import { MatTex, MatGraph } from "../types";
import { CHANGE_ENVMAP } from "./../actions/ProjectActions";
import { createNewMaterialGraph } from "../new_material_graph/CreateNewMaterialGraph";

interface ProjectConfigSettings {
  globalResolution: number;
}

interface projectConfig {
  projectName: string;
  projectPath: string;
  settings: ProjectConfigSettings;
  geometry: {
    type: string;
    subdivision: number;
    path: string;
    wireframe: boolean;
  };
  envMap: { tex: string; exposure: number; rotation: 0 };
  noWindowMaximized: boolean;
  isPublic: boolean;
}

export interface ProjectState {
  id: string;
  user: string;
  activeGraph: string;
  config: projectConfig;
  graphs: MatGraph[];
  textureList: MatTex[];
}

const initialState: ProjectState = {
  user: "",
  activeGraph: "",
  graphs: [],
  textureList: [],
  id: "",
  config: {
    projectName: "",
    projectPath: "",
    settings: { globalResolution: 1024 },
    geometry: { type: "cube", subdivision: 0, path: "", wireframe: false },
    envMap: { tex: "autumn_ground_4k.matenv", exposure: 1, rotation: 0 },
    noWindowMaximized: false,
    isPublic: false
  }
};

export const projectReducer = (
  state: ProjectState = initialState,
  action: any
): ProjectState => {
  switch (action.type) {
    case ADD_PROJECT_DATA:
      return {
        ...action.payload
      };

    case ADD_TEXTURE_DATA:
      return {
        ...state,
        textureList: [...state.textureList, action.payload]
      };

    case REMOVE_TEXTURE_DATA:
      let textureList: MatTex[] = [];
      for (let i = 0; i < state.textureList.length; i++) {
        if (state.textureList[i].uuid !== action.payload) {
          textureList.push(state.textureList[i]);
        }
      }
      return {
        ...state,
        textureList
      };

    case CHANGE_ENVMAP:
      return {
        ...state,
        config: {
          ...state.config,
          envMap: {
            ...state.config.envMap,
            tex: action.payload
          }
        }
      };

    case CHANGE_ENVMAP_EXPOSURE:
      return {
        ...state,
        config: {
          ...state.config,
          envMap: {
            ...state.config.envMap,
            exposure: action.payload
          }
        }
      };

    case CHANGE_ENVMAP_ROTATION:
      return {
        ...state,
        config: {
          ...state.config,
          envMap: {
            ...state.config.envMap,
            rotation: action.payload
          }
        }
      };

    case CHANGE_GEOMETRY:
      return {
        ...state,
        config: {
          ...state.config,
          geometry: {
            ...state.config.geometry,
            type: action.payload
          }
        }
      };

    case CHANGE_SUBDIVISIONS:
      return {
        ...state,
        config: {
          ...state.config,
          geometry: {
            ...state.config.geometry,
            subdivision: action.payload
          }
        }
      };

    case CHANGE_GEOMETRY_PATH:
      return {
        ...state,
        config: {
          ...state.config,
          geometry: {
            ...state.config.geometry,
            path: action.payload
          }
        }
      };

    case CHANGE_WIREFRAME:
      return {
        ...state,
        config: {
          ...state.config,
          geometry: {
            ...state.config.geometry,
            wireframe: !state.config.geometry.wireframe
          }
        }
      };

    case ADD_NEW_GRAPH:
      if (state.graphs.length === 0) {
        let newGraph = createNewMaterialGraph();
        return {
          ...state,
          graphs: [...state.graphs, newGraph],
          activeGraph: newGraph.uuid
        };
      } else {
        return {
          ...state,
          graphs: [...state.graphs, createNewMaterialGraph()]
        };
      }

    case REMOVE_GRAPH:
      const graphs: MatGraph[] = [];
      let i = 0;
      let uuid = "";
      for (i = 0; i < state.graphs.length; i++) {
        if (state.graphs[i].uuid !== action.payload) {
          graphs.push(state.graphs[i]);
        } else {
          //setting the activegraph to the graph before or front or els ""
          if (state.graphs[i - 1]) {
            uuid = state.graphs[i - 1].uuid;
          } else if (state.graphs[i + 1]) {
            uuid = state.graphs[i + 1].uuid;
          }
        }
      }

      return {
        ...state,
        activeGraph: uuid,
        graphs
      };

    case CHANGE_ACTIVE_GRAPH:
      return {
        ...state,
        activeGraph: action.payload
      };

    case SET_ACTIVE_GRAPH_TITLE:
      let arr: MatGraph[] = [];

      state.graphs.map(graph => {
        if (action.payload.key === graph.uuid) {
          graph.title = action.payload.value;
          arr.push(graph);
        } else {
          arr.push(graph);
        }
      });
      return {
        ...state,
        graphs: arr
      };

    case EDIT_ACTIVE_GRAPH:
      let finalgraphList: MatGraph[] = [];
      state.graphs.map(graph => {
        if (graph.uuid === action.payload.graphId) {
          let g = { ...graph, data: action.payload.data };
          finalgraphList.push(g);
        } else {
          finalgraphList.push(graph);
        }
      });
      return {
        ...state,
        graphs: finalgraphList
      };

    case SET_GLOBAL_RESOLUTION:
      return {
        ...state,
        config: {
          ...state.config,
          settings: {
            ...state.config.settings,
            globalResolution: action.payload
          }
        }
      };

    case SET_PROJECT_NAME:
      return {
        ...state,
        config: {
          ...state.config,
          projectName: action.payload
        }
      };

    case SET_PUBLIC:
      return {
        ...state,
        config: {
          ...state.config,
          isPublic: action.payload
        }
      };

    default:
      return state;
  }
};

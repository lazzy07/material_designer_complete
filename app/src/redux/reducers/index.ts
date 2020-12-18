import { combineReducers } from "redux";
import { fileReducer, FileState } from "./FileReducer";
import { settingsReducer, SettingsState } from "./SettingsReducer";
import { projectReducer, ProjectState } from "./ProjectReducer";
import { systemReducer, SystemState } from "./SystemReducer";
import { UserState, userReducer } from "./UserReducer";
import { MaterialState, materialReducer } from "./MaterialReducer";

export interface Store {
  file: FileState;
  settings: SettingsState;
  project: ProjectState;
  system: SystemState;
  user: UserState;
  material: MaterialState;
}

export const rootReducer = combineReducers({
  file: fileReducer,
  settings: settingsReducer,
  project: projectReducer,
  system: systemReducer,
  user: userReducer,
  material: materialReducer
});

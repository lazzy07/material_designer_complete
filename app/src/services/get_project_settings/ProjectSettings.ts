import { store } from "../../redux/store";
import { Store } from "../../redux/reducers";
import { setGlobalResolution } from "../../redux/actions/ProjectActions";
import Editor from "../../components/node_engine/Editor";
import ReteEngine from "../../components/node_engine/Engine";

export class ProjectSettings {
  private static globalResolution: number;

  static setInitGlobalResolution(res: number) {
    ProjectSettings.globalResolution = res;
  }

  static getGlobalResolution() {
    return ProjectSettings.globalResolution || 1024;
  }

  static setGlobalResolution(resolution: number) {
    store.dispatch(setGlobalResolution(resolution));
    //update editor
    Editor.getEditor().trigger("updateconnection");
    ReteEngine.updateEngine();
  }
}

import { initialProjectConfig } from "../initial_project_settings/InitialProjectConfig";
import { createNewMaterialGraph } from "./../../redux/new_material_graph/CreateNewMaterialGraph";
import { store } from "./../../redux/store";

export const createNewProject = (path: string): Promise<object> => {
  return new Promise((resolve, reject) => {
    if (path) {
      let fs = window.require("fs");
      let config = { ...initialProjectConfig };
      let graphData = createNewMaterialGraph();
      let initialFileData = {
        user: store.getState().user.userName,
        config,
        activeGraph: graphData.uuid,
        graphs: [{ ...graphData }],
        textureList: []
      };

      let nPath = (window as any).require("path");
      let name = nPath.basename(path);
      initialFileData.config.projectName = name;
      initialFileData.config.projectPath = path;

      let initialFileDataString = JSON.stringify(initialFileData);
      fs.writeFile(path, initialFileDataString, (err: Error) => {
        if (err) {
          reject(err);
        } else {
          resolve(initialFileData);
        }
      });
    }
  });
};

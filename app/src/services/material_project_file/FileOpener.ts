import { ProjectSettings } from "../get_project_settings/ProjectSettings";

const fs = window.require("fs");

export const openProjetFile = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (path) {
      fs.readFile(path, (err: Error, data: string) => {
        if (err) {
          reject(new Error("ERROR::: Readfile : Path is not valid"));
        } else {
          try {
            let objData = JSON.parse(data);
            ProjectSettings.setInitGlobalResolution(
              objData.config.settings.globalResolution
            );
            resolve(objData);
          } catch (err) {
            reject(err);
          }
        }
      });
    } else {
      reject(new Error("ERROR::: Readfile : Path is not valid"));
    }
  });
};

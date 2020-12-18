import { store } from "../../redux/store";
import { Store } from "../../redux/reducers";
import Editor from "../../components/node_engine/Editor";
import { MatGraph } from "../../redux/types";
import { ProjectState } from "../../redux/reducers/ProjectReducer";
import { client } from "../..";
import { saveProjectQuery } from "../../gql/SaveProject";
const fs = window.require("fs");

export const saveProject = () => {
  let projectState = getProjectFile();
  let state: Store = store.getState();
  let filePath = state.file.filePath;
  let strObj = JSON.stringify(projectState);
  if (projectState.config.projectPath !== "webfile") {
    fs.writeFile(filePath, strObj, (err: Error) => {
      //TODO Handle Error
      if (err) {
        console.log(err);
      }
    });
  } else {
    client
      .mutate({
        mutation: saveProjectQuery,
        variables: {
          projectData: strObj,
          secureUser: localStorage.getItem("secureUser") || "",
          secureKey: localStorage.getItem("secureKey") || ""
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const getProjectFile = () => {
  let state: Store = store.getState();
  let activeGraph = state.project.activeGraph;
  let projectState = state.project;

  let prjs: MatGraph[] = [];
  for (let i = 0; i < projectState.graphs.length; i++) {
    let g = projectState.graphs[i];
    if (activeGraph != g.uuid) {
      prjs.push(g);
    } else {
      let currG = Editor.getEditor().toJSON();
      g.data = currG;
      prjs.push(g);
    }
  }
  let p: ProjectState = {
    ...projectState,
    graphs: [...prjs]
  };

  return p;
};

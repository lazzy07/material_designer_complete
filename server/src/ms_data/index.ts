import Server from "../common/classes/Server";
import {
  saveArtwork,
  searchArtwork,
  getArtwork
} from "./controllers/ArtworkController";
import Mongoose from "mongoose";
import {
  addNewProject,
  getAllProjects,
  saveProjectData,
  searchProjects,
  getAllProjectsByUser
} from "./controllers/ProjectController";
import { addNewMaterial, getMaterial } from "./controllers/MaterialController";
import {
  DATA_SERVICE_PORT,
  DATABASE_CONNECTION_SETTINGS
} from "../common/constants";
import {
  DATA_DATABASE_URL,
  DATA_DATABASE_PORT,
  DATA_DATABASE_NAME
} from "./constants/Databse";

class DataClass {
  static main() {
    const server = Server.getInstance();
    server.setPort(DATA_SERVICE_PORT);

    Mongoose.connect(
      `${DATA_DATABASE_URL}:${DATA_DATABASE_PORT}/${DATA_DATABASE_NAME}`,
      DATABASE_CONNECTION_SETTINGS
    );
    Mongoose.set("useCreateIndex", true);

    const app = server.getApp();

    app.post("/uploadartwork", saveArtwork);
    app.post("/uploadmaterial", addNewMaterial);
    app.post("/getmaterial", getMaterial);

    app.post("/addnewproject", addNewProject);
    app.post("/getallprojects", getAllProjects);
    app.post("/saveproject", saveProjectData);
    app.post("/searchproject", searchProjects);
    app.post("/getprojectsbyuser", getAllProjectsByUser);
    app.post("/searchartwork", searchArtwork);
    app.post("/getartwork", getArtwork);

    server.listen("srv_data");
  }
}

DataClass.main();

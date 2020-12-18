import Server from "../common/classes/Server";
import {
  setUser,
  isUserExists,
  getUser,
  addProfilePicture,
  searchUser,
  addFollower,
  getUserbyUsername
} from "./controllers/UserHandler";
import { USER_SERVICE_PORT } from "../common/constants";
import mongoose from "mongoose";
import { DATABASE_CONNECTION_SETTINGS } from "./../common/constants/index";
import {
  USER_DATABASE_URL,
  USER_DATABASE_NAME,
  USER_DATABASE_PORT
} from "./constants/database";
import { loginEmployee } from "./controllers/EmployeeController";
import {
  getSecureKeys,
  setSecureKey,
  setApiKey,
  removeSecureKey,
  removeApiKey,
  getApiKeys
} from "./controllers/KeysController";

class UserMain {
  static main() {
    //Connecting database
    mongoose.connect(
      `${USER_DATABASE_URL}:${USER_DATABASE_PORT}/${USER_DATABASE_NAME}`,
      DATABASE_CONNECTION_SETTINGS
    );
    mongoose.set("useCreateIndex", true);

    //Connecting server
    const server = Server.getInstance();
    server.setPort(USER_SERVICE_PORT);
    const app = server.getApp();
    server.listen("srv_user");

    //Listning to routes required
    app.post("/setuser", (req, res) => setUser(req, res));
    app.post("/isuser", (req, res) => isUserExists(req, res));
    app.post("/getuser", (req, res) => getUser(req, res));
    app.post("/getuserbyusername", (req, res) => getUserbyUsername(req, res));
    app.post("/searchuser", (req, res) => searchUser(req, res));

    app.post("/addfollower", (req, res) => addFollower(req, res));

    app.post("/profilepicture", (req, res) => addProfilePicture(req, res));
    app.post("/loginemployee", (req, res) => loginEmployee(req, res));

    app.post("/getapikeys", (req, res) => getApiKeys(req, res));
    app.post("/setapikey", (req, res) => setApiKey(req, res));
    app.post("/removeapikey", (req, res) => removeApiKey(req, res));

    app.post("/getsecurekeys", (req, res) => getSecureKeys(req, res));
    app.post("/setsecurekey", (req, res) => setSecureKey(req, res));
    app.post("/removesecurekey", (req, res) => removeSecureKey(req, res));
  }
}

UserMain.main();

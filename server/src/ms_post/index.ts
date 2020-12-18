import Server from "../common/classes/Server";
import {
  POST_SERVICE_PORT,
  DATABASE_CONNECTION_SETTINGS
} from "../common/constants";
import {
  addNewPost,
  addComment,
  addLike,
  getAllArtworks
} from "./controllers/PostController";
import mongoose from "mongoose";
import {
  POST_DATABASE_URL,
  POST_DATABASE_PORT,
  POST_DATABASE_NAME
} from "./constants/Database";
import { search, getUsersData } from "./controllers/SearchController";

class PostMain {
  static main() {
    const server = Server.getInstance();
    server.setPort(POST_SERVICE_PORT);

    mongoose.connect(
      `${POST_DATABASE_URL}:${POST_DATABASE_PORT}/${POST_DATABASE_NAME}`,
      DATABASE_CONNECTION_SETTINGS
    );
    mongoose.set("useCreateIndex", true);

    const app = server.getApp();

    app.post("/addnewpost", addNewPost);
    app.post("/search", search);
    app.post("/getusersdata", getUsersData);

    app.post("/addcomment", addComment);
    app.post("/addlike", addLike);

    app.post("/getallartworks", getAllArtworks);

    server.listen("srv_post");
  }
}

PostMain.main();

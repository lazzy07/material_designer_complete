import Log from "../common/classes/Log";
import path from "path";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graph_schemas/TypeDefs";
import Server from "../common/classes/Server";
import { WEB_SERVICE_PORT } from "../common/constants";
import { resolvers } from "./graph_resolvers/Resolvers";
import { getNewTokens } from "./functions/GetNewTokens";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { logoutUser } from "./controllers/UserController";

class WebMain {
  static main() {
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => ({ req, res })
    });
    const server = Server.getInstance();
    const app = server.getApp();
    app.use(cors({ credentials: true, origin: true }));
    app.use(cookieParser());

    apolloServer.applyMiddleware({ app, cors: false });
    app.use(express.static("./public"));
    app.use(
      fileUpload({
        limits: { fileSize: 1024 * 1024 * 5 },
        useTempFiles: true,
        tempFileDir: "/tmp/"
      })
    );

    //Serving public data from express serve via http/https
    app.get("*", (req, res) => {
      res.sendFile(
        path.join(__dirname + "/usr/src/app/src/main/public/index.html")
      );
    });

    app.post("/refresh_token", getNewTokens);
    app.post("/logout", logoutUser);

    server.setPort(WEB_SERVICE_PORT);
    server
      .listen("web_service")
      .then(c => {
        Log.addLog(
          "web_service",
          "none",
          "admin",
          "Graphql served on port : " + apolloServer.graphqlPath
        );
      })
      .catch(err => {
        Log.addError(err);
      });
  }
}

WebMain.main();

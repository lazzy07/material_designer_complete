import Server from "../common/classes/Server";
import { EDITOR_SERVICE_PORT } from "../common/constants";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graph_schemas/TypeDefs";
import { resolvers } from "./graph_resolvers/Resolvers";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getNewTokens } from "./functions/GetNewTokens";

class EditorMain {
  static main() {
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => ({ req, res })
    });

    const server = Server.getInstance();
    const app = server.getApp();
    app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
    app.use(cookieParser());

    app.post("/refresh_token", getNewTokens);

    apolloServer.applyMiddleware({ app, cors: false });
    server.setPort(EDITOR_SERVICE_PORT);

    server.listen("srv_editor");
  }
}

EditorMain.main();

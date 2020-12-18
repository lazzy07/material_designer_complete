import SocketIO from "socket.io";
import Log from "./Log";

export default class Connection {
  private io: SocketIO.Namespace;
  private nameSpace: string;

  constructor(server: SocketIO.Server, nameSpace: string) {
    this.io = server.of(nameSpace);

    server.on("connection", socket => {
      const address = socket.request.client._peername.address;
      const port = socket.request.client._peername.port;

      Log.addLog(
        address + ":" + port,
        "server",
        socket.id.toString(),
        "USER SOCKET CONNECTION AQUIRED"
      );
      socket.join(nameSpace);

      socket.on("disconnect", () => {
        const address = socket.request.client._peername.address;
        const port = socket.request.client._peername.port;
        Log.addLog(
          address + ":" + port,
          "server",
          socket.id.toString(),
          "USER SOCKET DISCONNECTED"
        );
      });
    });
  }

  listner = (listnerFunc: (socket: SocketIO.Socket) => void) => {
    this.io.on("connection", socket => {
      listnerFunc(socket);
    });
  };
}

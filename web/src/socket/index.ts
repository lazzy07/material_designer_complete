import io from "socket.io-client";

class ConnectionSocket {
  private static socket: SocketIOClient.Socket;

  static initSocket = (socketServerAddr: string) => {
    let socket = io(socketServerAddr);
    ConnectionSocket.socket = socket;
    
  };

  static getSocket = () => {
    return ConnectionSocket.socket;
  };
}

export default ConnectionSocket;

import express, { Express } from "express";
import Log from "./Log";

export default class Server {
  _port: number;
  _app: Express;
  static _instance: Server;

  private constructor() {
    this._app = express();
    this._app.use(express.json({ limit: "50mb" }));
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    } else {
      this._instance = new Server();
      return this._instance;
    }
  }

  getApp = () => {
    return this._app;
  };

  setPort = (port: number) => {
    this._port = port;
  };

  listen = (type: string) => {
    return new Promise((resolve, reject) => {
      this._app.listen(this._port, err => {
        if (err) {
          reject(err);
        } else {
          Log.addLog(
            type,
            "none",
            "admin",
            type + " started listening on port ::: " + this._port
          );
          resolve(true);
        }
      });
    });
  };
}

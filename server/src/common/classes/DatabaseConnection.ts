import mongoose from "mongoose";
import Log from "./Log";

class DatabaseConnection {
  private static connection: DatabaseConnection;
  private _uri: string;
  private _database: string;
  private _databaseHandle: mongoose.Connection;
  private _userName: string;
  private _password: string;

  private constructor(
    uri: string,
    database: string,
    userName?: string,
    password?: string
  ) {
    this._uri = uri;
    this._database = database;
    this._userName = userName;
    this._password = password;
  }

  aquireConnection = () => {
    const uri = this._uri,
      userName = this._userName,
      password = this._password,
      database = this._database;

    return new Promise((resolve, reject) => {
      mongoose
        .createConnection(`mongodb://${uri}/${database}`, {
          useNewUrlParser: true,
          keepAlive: true,
          keepAliveInitialDelay: 300000
        })
        .then(connection => {
          this._databaseHandle = connection;
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  static setConnection = (
    uri: string,
    database: string,
    userName?: string,
    passsword?: string
  ) => {
    DatabaseConnection.connection = new DatabaseConnection(
      uri,
      database,
      userName,
      passsword
    );
    return new Promise((resolve, reject) => {
      DatabaseConnection.connection
        .aquireConnection()
        .then(isConnected => {
          Log.addLog(
            `database_${database}`,
            "server",
            "admin",
            `DATABASE_${database.toUpperCase()} CONNCETED ON ${uri}`
          );
          resolve(isConnected);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  static getConnection = () => {
    return DatabaseConnection.connection._databaseHandle;
  };
}

export default DatabaseConnection;

import * as fs from "fs";
/**
 * Class to add log files and to show logging on console
 */
class Log {
  /**
   * Logging data to file
   * @param  {string} fileName name of the file to be logged
   * @param  {string} path path of the file to be saved
   * @returns {boolean} wether the save successfull or not
   */
  private static logToFile = (
    fileName: string,
    path: string,
    record: string
  ): Promise<boolean> => {
    record = "\n" + record;
    return new Promise((resolve, reject) => {
      fs.appendFile(path + fileName, record, (err: Error) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  };

  /**
   * Function craeates a standard record to be saved
   * @param  {string} sender sender of the data
   * @param  {string} reciever reciever of the data client
   * @param  {string} data data to be saved
   * @returns {string} Record as a string
   */
  private static createRecord = (
    sender: string,
    reciever: string,
    data: string,
    user = "unknown"
  ): string => {
    let time = new Date();
    let timeString = time.toLocaleString().toString();

    let str = `${timeString}\t${sender}\t${reciever}\t${user}\t${data}`;

    return str;
  };

  /**
   * Function craeates a standard record in console
   * @param  {string} sender sender of the data
   * @param  {string} reciever reciever of the data client
   * @param  {string} data data to be saved
   * @returns {void}
   */
  private static consoleRecord = (
    sender: string,
    reciever: string,
    data: string
  ): void => {
    let time = new Date();
    console.log(
      "\x1b[33m" +
        time
          .toLocaleString()
          .toString()
          .padEnd(25, " ") +
        "\x1b[0m" +
        "\x1b[34m" +
        sender.padEnd(25, " ") +
        "\x1b[35m" +
        reciever.padEnd(25, " ") +
        "\x1b[36m" +
        data.padEnd(45, " ") +
        "\x1b[0m"
    );
  };

  /**
   * Creates an error record
   * @param  {string} error error to be saved
   * @returns {string}
   */
  private static createErrorString = (error: Error): string => {
    let time = new Date();
    let timeString = time.toLocaleString().toString();
    return timeString + "\t" + error.message;
  };

  private static consoleError = (error: Error): void => {
    let time = new Date();
    let timeString = time.toLocaleString().toString();

    console.log(
      "\x1b[34m" + timeString + "\x1b[31m ERROR::: " + error.message + "\x1b[0m"
    );
  };

  /**
   * @param  {string} sender sender of the data
   * @param  {string} reciever reciver of the data
   * @param  {string} user="unknown" user involved
   * @param  {string} data data to be sent
   * @returns {void}
   */
  public static addLog = (
    sender: string,
    reciever: string,
    user = "unknown",
    data: string
  ): void => {
    let time = new Date();
    let timeString = `${time.getFullYear()}_${time.getMonth()}_${time.getDate()}`;
    let folderName = "./logs/" + timeString + "/";

    const isLogFolderExists = fs.existsSync("./logs/");
    if (!isLogFolderExists) {
      fs.mkdirSync("./logs");
    }

    fs.exists(folderName, exist => {
      if (exist) {
        let fileName = timeString + `__${time.getHours()}_log.txt`;

        Log.logToFile(
          fileName,
          folderName,
          Log.createRecord(sender, reciever, data, user)
        ).catch(err => {
          console.log(Log.createErrorString(err));
        });
      } else {
        fs.mkdir(folderName, (err: Error) => {
          if (!err) {
            let fileName = timeString + `__${time.getHours()}_log.txt`;
            Log.logToFile(
              fileName,
              folderName,
              Log.createRecord(sender, reciever, data, user)
            ).catch(err => {
              console.log(Log.createErrorString(err));
            });
          } else {
            //TODO::: Handle error
            console.log(err);
          }
        });
      }
    });

    Log.consoleRecord(sender, reciever, data);
  };

  /**
   * @param  {string} error error to be recorded
   * @returns {void}
   */
  public static addError = (error: Error): void => {
    let time = new Date();
    let timeString = `${time.getFullYear()}_${time.getMonth()}_${time.getDate()}`;
    let folderName = "./logs/" + timeString + "/";
    const isLogFolderExists = fs.existsSync("./logs/");
    if (!isLogFolderExists) {
      fs.mkdirSync("./logs");
    }
    fs.exists(folderName, exist => {
      if (exist) {
        let fileName = timeString + `__${time.getHours()}_error.txt`;

        Log.logToFile(fileName, folderName, Log.createErrorString(error)).catch(
          err => {
            console.log(Log.createErrorString(err));
          }
        );
      } else {
        fs.mkdir(folderName, (err: Error) => {
          if (!err) {
            let fileName = timeString + `__${time.getHours()}_error.txt`;
            Log.logToFile(
              fileName,
              folderName,
              Log.createErrorString(error)
            ).catch(err => {
              console.log(Log.createErrorString(err));
            });
          } else {
            //TODO::: Handle error
            console.log(err);
          }
        });
      }
    });

    Log.consoleError(error);
  };
}

export default Log;

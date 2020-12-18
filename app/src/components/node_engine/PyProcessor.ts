/**
 *  Lasantha Madushan Senanayake
 *  2019 Material Designer
 * @export
 * @class PyProcessor
 */
export default class PyProcessor {
  args: string[];
  cwd: string;
  exe: string;
  static ChildProcess = window.require("child_process");

  constructor(
    args: string[],
    cwd = "./public/dependencies/python/dist/python",
    exe = "python"
  ) {
    this.args = args;
    this.cwd = cwd;
    this.exe = exe;
  }

  /**
   * Process data using python processor module
   * @returns {Promise<Buffer>} Returns buffer with processed data
   * @memberof PyProcessor
   */
  process(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      let process = PyProcessor.ChildProcess.spawn(this.exe, this.args, {
        cwd: this.cwd
      });

      process.stdout.on("data", (data: Buffer) => {
        resolve(data);
      });

      process.stderr.on("data", (data: string) => {
        reject(new Error("ERROR :::" + data));
      });

      process.on("error", (data: string) => {
        reject(new Error("ERROR :::" + data));
      });
    });
  }

  /**
   * Process daa and get as string instead of as an buffer
   * @returns {Promise<string>}
   * @memberof PyProcessor
   */
  processAsString(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.process()
        .then(data => {
          resolve(data.toString());
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

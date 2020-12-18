const exeReader = require("child_process").spawn;

class PythonProcessor{
  constructor(args, cwd="./public/dependencies/python/dist/python", exe="python" ){
    this.cwd = cwd;
    this.exe = exe;
    this.args = args;
    this.process = null;
  }

  execute(){
    return new Promise((resolve, reject) => {
      let process = exeReader(this.exe, this.args, {cwd: this.cwd});

      process.stdout.on("data", (data) => {
        resolve(data)
      })

      process.stderr.on("data", (data) => {
        reject(new Error("ERROR :::" + data))
      })

      process.on("error", (data) => {
        reject(new Error("ERROR :::" + data))
      })
    })
  }
}

module.exports = PythonProcessor;
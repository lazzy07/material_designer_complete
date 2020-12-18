const ipcMain = require("electron").ipcMain;
const  {GET_STORE} = require("./actions");
class Store{
  /**
   * Stored local store object
   * @param {object} localStore 
   */
  constructor(){
    this.store = {
      nodes: {
        activeNode: "",
        nodeTrees: []
      },
      file: {
        path: "",
        fileName: ""
      }
    }
  }

  listen() {
    //listners goes here
    ipcMain.on(GET_STORE, (event) => {
      event.sender.send(this.store);
    })
  }

  //load initial data from file
  loadFromStorage(){
    
  }
}

module.exports = Store;
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");
const Tray = require("electron").Tray;
const ipcMain = require("electron").ipcMain;
const {mainStore} = require("./redux/store");
const {CHANGE_OPENED_FILE, SET_RESOURCES_PATH} = require("./redux/actions/FileActions");
const {SET_VERSION} = require("./redux/actions/SettingsActions");
const {APP_VERSION} = require("./constants");
// const {setImporterType} = require("./preloaders/ImporterType");

let mainWindow;
let splashScreen;
let tray;
let store;
let importType = "texture"

const initData = {
}

const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} = require("electron-devtools-installer");


function createStore(){
  store = mainStore()
}

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "/dependencies/img/icon_32x32.png"),
    width: 1000,
    height: 700,
    minWidth: 700,
    minHeight: 600,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "/preloaders/Editor.js"),
      nodeIntegration: true,
      webSecurity: false
    },
    title: "Material Designer - @lazzy07",
    show: false,
    frame: false
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

function createSplashScreen() {
  splashScreen = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true
  });
  splashScreen.loadURL(
    isDev
      ? `file://${path.join(__dirname, "../public/splash.html")}`
      : `file://${path.join(__dirname, "../build/splash.html")}`
  );
}

function createChildScreen(dimensions, alwaysOnTop, url, options){
  let scr = new BrowserWindow({
    width: dimensions.width,
    height: dimensions.height,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
    alwaysOnTop,
    ...options
  })
  scr.loadURL(isDev ? `http://localhost:3000`
  : `file://${path.join(__dirname, "../build/index.html")}`
  )

  return scr;
}

function checkForOpenFile(path){
  if(path){
    return true;
  }else{
    return false;
  }
}

function setResourcespath(){
  if(store){
    store.dispatch({
      type: SET_RESOURCES_PATH,
      payload: isDev ? "." : "./resources"
    })
  }
}

function createTray(){
  let icon = path.join(__dirname, "/dependencies/img/icon_32x32.png");
  tray = new Tray(icon);
  // tray.displayBalloon({title: `Material Designer ${version}`, content: "Welcome to Material Designer"})
  tray.setToolTip("Material Designer")
}

app.on("ready", () => {
  // var cookies = electron.session.defaultSession.cookies;

  // cookies.on('changed', function(event, cookie, cause, removed) {
  //   if (cookie.session && !removed) {
  //     var url = `${(!cookie.httpOnly && cookie.secure) ? 'https' : 'http'}://${cookie.domain}${cookie.path}`;
  //     console.log('url', url);
  //     cookies.set({
  //       url: url,
  //       name: cookie.name,
  //       value: cookie.value,
  //       domain: cookie.domain,
  //       path: cookie.path,
  //       secure: cookie.secure,
  //       httpOnly: cookie.httpOnly,
  //       expirationDate: Math.floor(new Date().getTime()/1000)+1209600
  //     }, function(err) {
  //       if (err) {
  //         console.error('Error trying to persist cookie', err, cookie);
  //       }
  //     });
  //   }
  // });

  createSplashScreen();
  createStore();
  if(checkForOpenFile(process.argv[1])){
    store.dispatch({
      type: CHANGE_OPENED_FILE,
      payload: process.argv[1]
    })

    store.dispatch({
      type: SET_VERSION,
      payload: APP_VERSION
    })
  }else{
    console.log("A file not opened")
    store.dispatch({
      type: CHANGE_OPENED_FILE,
      payload: "."
    })
  }
  
  setResourcespath();
  createTray();
  createWindow();
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    splashScreen.destroy();
  });
  if(isDev){
    mainWindow.webContents.openDevTools({ mode: "detach" })
  };

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));

  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("INITIALIZE", (event) => {
  console.log("APP_INITIALIZATION_COMPLETE");
  event.sender.send("INIT_FILE", {initData});
})

ipcMain.on("CREATE_IMPORT_SCREEN", (event, arg) => {
  let args = JSON.parse(arg);
  let importerPath = "./preloaders/ImporterTexture.js";
  if(args.url === "envmap"){
    importerPath = "./preloaders/ImporterEnvMap.js";
  }
  let importScr = createChildScreen({
    width: 700, 
    height: 540
  },
  true, `import/${args.url}`, 
  {
    parent: mainWindow, 
    modal: true, 
    hasShadow: true, 
    resizable: false, 
    maximizable: false, 
    webPreferences: {
      nodeIntegration: true,  
      preload: path.join(__dirname, importerPath),
    }});
  if(isDev){
    importScr.webContents.openDevTools({ mode: "detach" })
  };
})

ipcMain.on("CREATE_WEB_PROJECT", (event, arg) => {
  // let args = JSON.parse(arg);
  let importerPath = "./preloaders/NewWebProject.js";

  let newWebProjectScreen = createChildScreen({
    width: 500, 
    height: 340
  }, true, "/newwebproject", {
    parent: mainWindow, 
    modal: true, 
    hasShadow: true, 
    resizable: false, 
    maximizable: false, 
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, importerPath),
    }
  })

  if(isDev){
    newWebProjectScreen.webContents.openDevTools({ mode: "detach" })
  };
})

ipcMain.on("CREATE_MATERIAL_EXPORTER", () => {
  let materialExporterPath = "./preloaders/MaterialExporter.js";

  let importScr = createChildScreen({
    width: 700, 
    height: 540
  },
  true, `/exportmaterial`, 
  {
    parent: mainWindow, 
    modal: true, 
    hasShadow: true,
    resizable: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,  
      preload: path.join(__dirname, materialExporterPath),
    }});
  if(isDev){
    importScr.webContents.openDevTools({ mode: "detach" })
  };
})

ipcMain.on("OPEN_PROJECT_SETTINGS", () => {
  let materialExporterPath = "./preloaders/OpenProjectSettings.js";

  let importScr = createChildScreen({
    width: 700, 
    height: 540
  },
  true, `/exportmaterial`, 
  {
    parent: mainWindow, 
    modal: true, 
    hasShadow: true,
    resizable: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,  
      preload: path.join(__dirname, materialExporterPath),
    }});
  if(isDev){
    importScr.webContents.openDevTools({ mode: "detach" })
  };
})

ipcMain.on("OPEN_APPLICATION_SETTINGS", () => {
  let materialExporterPath = "./preloaders/OpenApplicationSettings.js";

  let importScr = createChildScreen({
    width: 700, 
    height: 540
  },
  true, `/exportmaterial`, 
  {
    parent: mainWindow, 
    modal: true, 
    hasShadow: true,
    resizable: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,  
      preload: path.join(__dirname, materialExporterPath),
    }});
  if(isDev){
    importScr.webContents.openDevTools({ mode: "detach" })
  };
})

ipcMain.on("RESTART_APP", () => {
  app.relaunch();
  app.exit(0);
})

module.exports = importType;
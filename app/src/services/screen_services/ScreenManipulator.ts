export const maximizeWindow = (): void => {
  let { remote } = window.require("electron");
  let cWindow = remote.BrowserWindow.getFocusedWindow();
  if (cWindow) {
    cWindow.isMaximized() ? cWindow.unmaximize() : cWindow.maximize();
  }
};

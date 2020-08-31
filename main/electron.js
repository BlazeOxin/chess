const { app, BrowserWindow, ipcMain } = require("electron");
const EV = require("../shared/Events");

function createWindow() {
  let mainWin = new BrowserWindow({
    title: "Electron React App",
    icon: "assets/icons/icon.ico",
    width: 1280,
    height: 720,
    minWidth: 512,
    minHeight: 550,
    webPreferences: { nodeIntegration: true },
    frame: false,
  });

  mainWin.loadFile("main/app.html");

  ipcMain.on(EV.APP_QUIT, (e) => {
    e.sender.send(EV.APP_QUIT_COMPLETE);
    mainWin = null;
    app.quit();
  });
  ipcMain.on(EV.APP_MAXIMIZE, (e) => {
    mainWin.maximize();
    e.sender.send(EV.APP_MAXIMIZE_COMPLETE);
  });
  ipcMain.on(EV.APP_MINIMIZE, (e) => {
    mainWin.minimize();
    e.sender.send(EV.APP_MAXIMIZE_COMPLETE);
  });
  ipcMain.on(EV.APP_UNMAXIMIZE, (e) => {
    mainWin.unmaximize();
    e.sender.send(EV.APP_UNMAXIMIZE_COMPLETE);
  });
  ipcMain.on(EV.APP_IS_MAXIMIZED, (e) => {
    e.sender.send(EV.APP_IS_MAXIMIZED_RETURN, mainWin.isMaximized());
  });
  ipcMain.on(EV.APP_OPEN_DEVTOOLS, (e) => {
    mainWin.webContents.openDevTools();
    e.sender.send(EV.APP_OPEN_DEVTOOLS_COMPLETE);
  });
}

app.on("ready", createWindow);

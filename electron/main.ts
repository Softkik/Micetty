import { app, BrowserWindow, Menu } from "electron";
import * as path from "path";
import * as config from "./config";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import { menu } from "./menu";
import { ipcMain } from "electron/main";

function createWindow() {
  const win = new BrowserWindow({
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    title: config.app.title,
    width: 900,
    height: 600,
    minHeight: 440,
    minWidth: 720,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  Menu.setApplicationMenu(menu);
  ipcMain.on("testMenu", (arg) => {
    console.log("testMenu");
  });
  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL("http://localhost:3000/index.html");

    win.webContents.openDevTools();

    // Hot Reloading on 'node_modules/.bin/electronPath'
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron" + (process.platform === "win32" ? ".cmd" : ""),
      ),
      forceHardReset: true,
      hardResetMethod: "exit",
    });
  }
}

app.whenReady().then(() => {
  // DevTools
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log("An error occurred: ", err));

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    } else {
    }
  });
});

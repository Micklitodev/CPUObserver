const { app, BrowserWindow } = require("electron");
const path = require("path");
const os = require("os-utils");
const { ipcMain } = require("electron");

if (require("electron-squirrel-startup")) {
  app.quit();
} 

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.webContents.openDevTools();

  ipcMain.handle("get-stats", async () => {
    return {
      cpu: await new Promise((resolve) => {
        os.cpuUsage((v) => {
          resolve(v * 10);
        });
      }),
      mem: os.freememPercentage() * 100,
      totalMem: os.totalmem() / 1000,
    };
  });

  return myFunc;
};

app.whenReady().then(() => {
  const myFunc = createWindow();
  myFunc();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  if (app.isPackaged) {
    // Producción: carga el archivo HTML empaquetado
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    // Desarrollo: carga el servidor de Vite
    mainWindow.loadURL('http://localhost:5173');
  }
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// Impresión silenciosa
ipcMain.on('print-image', () => {
mainWindow.webContents.print({
  silent: true,
  printBackground: true,
  pageSize: {
    width: 100000,  // 100 mm = 10 cm
    height: 150000  // 150 mm = 15 cm
  },
  dpi: 300
});
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

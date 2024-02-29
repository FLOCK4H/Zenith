const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const os = require('os');
const devnerdFilePath = path.join(os.tmpdir(), 'devnerd.json');

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  awaitWriteFinish: true,
});

const initialWidth = 1080;
const initialHeight = 720;
function createWindow () {
  let isMaximized = false;
    const win = new BrowserWindow({
      width: initialWidth,
      height: initialHeight,
      frame: false,
      transparent: true,
      titleBarStyle: 'hidden',
      titleBarOverlay: false,
      icon: path.join(__dirname, 'logo.png'),
      webPreferences: {
        preload: path.join(__dirname, 'prl.js'),
        contextIsolation: true,
        nodeIntegration: false
      }
    });
  
    win.loadURL('http://localhost:3000');
    win.resizable = true;
    ipcMain.on('close-window', () => {
        console.log('Close window requested');
        win.close();
    });
    
    win.webContents.on('did-finish-load', () => {
      const css = `
          ::-webkit-scrollbar {
              display: none;
          }
      `;
      win.webContents.insertCSS(css);
  });

    ipcMain.on('minimize-window', () => {
        win.minimize();
    });

    ipcMain.on('maximize-window', () => {
      if (isMaximized) {
          win.setSize(initialWidth, initialHeight);
          win.center();
          isMaximized = false;
      } else {
          win.maximize();
          isMaximized = true;
      }
  });

    ipcMain.on('resize-window', () => {
      win.setSize(initialWidth, initialHeight);
      win.center();
  });

  ipcMain.on('execute-python-script', (event, content) => {
    const tempFileName = `script-${Date.now()}.py`;
    const filePath = path.join(os.tmpdir(), tempFileName);
  
    fs.writeFileSync(filePath, content);
  
    exec(`python "${filePath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Execution error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
  
      event.reply('python-script-executed', { stdout, stderr });
  
      fs.unlink(filePath, err => {
        if (err) console.error(`Error deleting temp file: ${err}`);
      });
    });
  });

  ipcMain.on('update-devnerd', (event, data) => {
    fs.writeFile(devnerdFilePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Failed to write devnerd.json:', err);
      }
    });
  });

  ipcMain.on('read-devnerd', (event) => {
    fs.readFile(devnerdFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Failed to read devnerd.json:', err);
        event.reply('devnerd-data', { error: err.message });
      } else {
        event.reply('devnerd-data', { data: JSON.parse(data) });
      }
    });
  });

  }

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const lsl = require('../../lsl/index')


function createWindow() {
   const win = new BrowserWindow(
      {
        width: 900, 
        height: 680,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        }
      });

      win.loadURL('http://localhost:3000'); 
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});




app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

const { default: axios } = require('axios');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

let progressProccessing
function createWindow() {
   const win = new BrowserWindow(
      {
        width: 900, 
        height: 680,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        }
      });

      ipcMain.on('open_dialog', (event, text) => {
        dialog.showMessageBox(win, {
          message: text,
          icon: null
        });
      })


      
      
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



const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 200,
        height: 200,
        resizable: false,
        maximizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    app.on('did-become-active', () => {
        const win = BrowserWindow.getFocusedWindow()
        if (win) {
            win.webContents.send('active')
        }
    })
})

app.on('window-all-closed', () => {
    app.quit()
})

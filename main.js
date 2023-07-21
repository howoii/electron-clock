const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 240,
        height: 240,
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
            const time = new Date()
            win.webContents.send('active')
        }
    })
})

app.on('window-all-closed', () => {
    app.quit()
})

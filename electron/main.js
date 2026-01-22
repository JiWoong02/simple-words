import {app, BrowserWindow, ipcMain, Menu} from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from "fs";

const isDev = !app.isPackaged
const configPath = path.join(app.getPath("userData"), "theme.json")

ipcMain.handle("theme:load", async () => {
    try {
        const data = fs.readFileSync(configPath, "utf-8")
        return JSON.parse(data)
    } catch {
        return { isDark: false }
    }
})

ipcMain.handle("theme:save", async (_, theme) => {
    console.log("theme:save", theme);
    fs.writeFileSync(configPath, JSON.stringify(theme))
})

ipcMain.on("app:quit", () => {
    app.quit();
});

function createWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 700,
        // resizable: false,
        // frame: false,
        icon: path.join(app.getAppPath(), '../public/logo.ico'),
        webPreferences: {
            preload: path.join(app.getAppPath(), "preload.js"),
        },
    })

    if (isDev) {
        win.loadURL('http://localhost:5173')
    } else {
        win.loadFile(
            path.join(app.getAppPath(), 'dist', 'index.html')
        )
    }
}

app.whenReady().then(createWindow)

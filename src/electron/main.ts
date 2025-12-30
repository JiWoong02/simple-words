import { app, ipcMain } from "electron"
import fs from "fs"
import path from "path"

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
    fs.writeFileSync(configPath, JSON.stringify(theme))
})

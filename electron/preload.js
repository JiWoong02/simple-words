const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("themeAPI", {
    load: () => ipcRenderer.invoke("theme:load"),
    save: (theme) => ipcRenderer.invoke("theme:save", theme),
})

contextBridge.exposeInMainWorld("electronAPI", {
    appQuit: () => ipcRenderer.send("app:quit")
});
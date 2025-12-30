declare global {
    interface Window {
        themeAPI: {
            load: () => Promise<{ isDark: boolean }>
            save: (theme: { isDark: boolean }) => void
        },
        electronAPI: {
            appQuit: () => void
        }
    }
}
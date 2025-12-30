import { create } from 'zustand'

interface ThemeState {
    isDark: boolean
    hydrated: boolean
    setDark: (v: boolean) => void
    hydrate: () => Promise<void>
}

export const useThemeStore = create<ThemeState>((set) => ({
    isDark: false,
    hydrated: false,

    setDark: (v) => {
        set({ isDark: v })
        window.themeAPI?.save({ isDark: v })
    },

    hydrate: async () => {
        const data = await window.themeAPI?.load()
        set({
            isDark: data?.isDark ?? false,
            hydrated: true,
        })
    },
}))
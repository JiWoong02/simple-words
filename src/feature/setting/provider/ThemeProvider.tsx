import { useEffect } from 'react'
import { useThemeStore } from '@/feature/setting/store/themeStore.ts'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const isDark = useThemeStore((s) => s.isDark)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark)
    }, [isDark])

    return <>{children}</>
}
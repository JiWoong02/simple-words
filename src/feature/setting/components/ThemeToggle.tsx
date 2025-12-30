import { useThemeStore } from '@/feature/setting/store/themeStore.ts'
import {Button} from "@/components/ui/button.tsx";
import {Moon, Sun} from "lucide-react";

export function ThemeToggle() {
    const { isDark, setDark } = useThemeStore()

    return (
        <Button
            size="icon"
            variant="ghost"
            onClick={() => setDark(!isDark)}
        >
            {isDark ? <Moon /> : <Sun />}
        </Button>
    )
}

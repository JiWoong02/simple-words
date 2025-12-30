import type {ReactNode} from "react"
import { Button } from "@/components/ui/button"
import { Home, Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"
interface MainLayoutProps {
    children: ReactNode
    onOpenSettings?: () => void
}

export default function MainLayout({
                                       children,
                                       onOpenSettings,
                                   }: MainLayoutProps) {
    const navigate = useNavigate()


    return (
        <div className="flex flex-col bg-background text-foreground">
            <header className="flex items-center justify-end gap-2 px-4 py-3 border-b">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => navigate("/")}
                    aria-label="Go to home"
                >
                    <Home className="h-5 w-5" />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={onOpenSettings}
                    aria-label="Open settings"
                >
                    <Settings className="h-5 w-5" />
                </Button>
            </header>
            <main className="p-6 flex-1">
                {children}
            </main>
        </div>
    )
}

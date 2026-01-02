import type {ReactNode} from "react"
import {Button} from "@/components/ui/button"
import {ArrowLeft, Home, Settings} from "lucide-react"
import {useLocation, useNavigate} from "react-router-dom"
import {useTitleStore} from "@/store/uiStore.ts";

interface MainLayoutProps {
    children: ReactNode
    onOpenSettings?: () => void
}

export default function MainLayout({
                                       children,
                                       onOpenSettings,
                                   }: MainLayoutProps) {
    const navigate = useNavigate()
    const location = useLocation();
    const {title} = useTitleStore();
    const isRoot = location.pathname === "/";

    return (
        <div className="flex h-screen flex-col bg-background text-foreground">
            <header className="flex items-center justify-end gap-2 px-4 py-3 border-b">
                {!isRoot &&
                    <div className="flex items-center gap-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            aria-label="Go to home"
                        >
                            <ArrowLeft className="h-5 w-5"/>
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => navigate("/")}
                            aria-label="Go to home"
                        >
                            <Home className="h-5 w-5"/>
                        </Button>
                    </div>}
                <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold">
                    {title}
                </h1>
                <div className="ml-auto">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={onOpenSettings}
                        aria-label="Open settings"
                    >
                        <Settings className="h-5 w-5"/>
                    </Button>
                </div>
            </header>

            <main className="flex-1 overflow-hidden px-3 py-8">
                {children}
            </main>
        </div>
    )
}

import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog.tsx"
import {ThemeToggle} from "@/feature/setting/components/ThemeToggle.tsx";
import {Settings} from "lucide-react";

interface SettingsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function SettingsModal({
                                  open,
                                  onOpenChange,
                              }: SettingsModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xs sm:max-w-md p-0">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-muted-foreground" />
                        <DialogTitle className="text-base font-semibold">
                            설정
                        </DialogTitle>
                    </div>
                </div>
                <div className="px-6 py-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <span lang={'ko'} className="text-sm font-medium">다크 모드</span>
                        <ThemeToggle />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

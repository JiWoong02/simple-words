import {useDialogStore} from "@/store/uiStore.ts";
import {Dialog, DialogContent, DialogFooter, DialogHeader} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {DialogTitle} from "@radix-ui/react-dialog";

export function GlobalDialog() {
    const {
        open,
        type,
        title,
        message,
        onConfirm,
        close,
    } = useDialogStore();

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-w-xs sm:max-w-md p-6">
                {title && (
                    <DialogHeader>
                        <DialogTitle className="text-base">
                            {title}
                        </DialogTitle>
                    </DialogHeader>
                )}

                <p className="mt-2 text-sm text-muted-foreground">
                    {message}
                </p>

                <DialogFooter className="mt-6 flex-row justify-end gap-2">
                    {type === "confirm" && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={close}
                        >
                            취소
                        </Button>
                    )}
                    <Button
                        size="sm"
                        onClick={() => {
                            onConfirm?.();
                            close();
                        }}
                    >
                        확인
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

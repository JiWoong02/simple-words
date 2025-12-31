import { Folder, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type {Folder as FolderType} from "@/feature/folder/type.ts";
type FolderItemProps = {
    folder: FolderType
}
export function FolderItem({ folder }: FolderItemProps) {
    return (
        <div className="relative flex items-center justify-between rounded-lg border px-4 py-3 hover:bg-muted transition">
            <span className="absolute right-3 top-2 text-xs text-muted-foreground">
    생성시간: {folder.createdAt}
  </span>

            <div className="flex items-center gap-3">
                <Folder className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{folder.name}</span>
            </div>
            <div className="flex items-center gap-1">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => console.log("수정")}
                >
                    <Pencil className="h-4 w-4" />
                </Button>

                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => console.log("삭제")}
                >
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
            </div>
        </div>
    )
}

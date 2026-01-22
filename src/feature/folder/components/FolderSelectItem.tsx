import {Folder} from "lucide-react"
import type {Folder as FolderType} from "@/feature/folder/type.ts";
import {formatDate, truncateText} from "@/util/formatUtil.ts";
import {RadioGroupItem} from "@/components/ui/radio-group.tsx";

type FolderSelectItemProps = {
    folder: FolderType;
    selected: boolean;
}

export function FolderSelectItem({ folder, selected }: FolderSelectItemProps) {
    return (
        <label
            htmlFor={folder.id}
            className={`
                flex items-center justify-between rounded-lg border px-4 py-3
                transition cursor-pointer
                ${selected ? "bg-muted border-primary" : "hover:bg-muted"}
            `}
        >
            <div className="flex items-start gap-3 min-w-0">
                <Folder className="mt-1 h-5 w-5 text-muted-foreground shrink-0" />

                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate">
                        {truncateText(folder.folderName)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {formatDate(folder.createdAt)}
                    </span>
                </div>
            </div>

            <RadioGroupItem
                value={folder.id}
                id={folder.id}
                className="ml-3"
            />
        </label>
    );
}

import {Folder, Pencil, Trash2} from "lucide-react"
import {Button} from "@/components/ui/button"
import type {Folder as FolderType} from "@/feature/folder/type.ts";
import {formatDate, truncateText} from "@/util/formatUtil.ts";
import {db} from "@/db.ts";
import type {Dispatch, SetStateAction} from "react";
import {toast} from "sonner";
import {useDialogStore} from "@/store/uiStore.ts";
import {useNavigate} from "react-router-dom";

type FolderItemProps = {
    folder: FolderType;
    setFolders: Dispatch<SetStateAction<FolderType[]>>;
    handleClickEditBtn: (folderId: string) => void;
}

export function FolderItem({folder, setFolders, handleClickEditBtn}: FolderItemProps) {
    const { openConfirm } = useDialogStore();
    const navigate = useNavigate();

    const deleteFolderWithWords = async (folderId: string) => {
        try {
            await db.transaction("rw", db.words, db.folders, async () => {

                await db.words
                    .where("folderId")
                    .equals(folderId)
                    .delete();

                await db.folders.delete(folderId);
            });

            setFolders(prev => prev.filter(folder => folder.id !== folderId));

            toast.success("폴더와 해당 단어들이 삭제되었습니다.");
        } catch (error) {
            console.error(error);
            toast.error("단어 삭제 중 오류가 발생했습니다.");
        }
    };

    const confirmDeleteFolder = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        openConfirm('삭제한 폴더는 되돌릴 수 없습니다.', () => deleteFolderWithWords(folder.id),'정말 삭제하시겠습니까?');
    }

    const handleClickEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        handleClickEditBtn(folder.id)
    }

    const handleClickFolder = () => {
        navigate('/folder/' + folder.id);
    }

    return (
        <div className="flex items-center justify-between rounded-lg border px-4 py-3 hover:bg-muted transition" onClick={handleClickFolder}>
            <div className="flex items-start gap-3">
                <Folder className="mt-1 h-5 w-5 text-muted-foreground"/>
                <div className="flex flex-col">
                    <span className="flex font-medium text-xs">{truncateText(folder.folderName)}</span>
                    <span className="flex text-xs text-muted-foreground">
                    {formatDate(folder.createdAt)}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" onClick={handleClickEdit}>
                    <Pencil className="h-4 w-4"/>
                </Button>
                <Button size="icon" variant="ghost" onClick={confirmDeleteFolder}>
                    <Trash2 className="h-4 w-4 text-destructive"/>
                </Button>
            </div>
        </div>
    )
}

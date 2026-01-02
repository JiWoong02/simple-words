import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog.tsx"
import {Field, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {db} from "@/db.ts";
import {v4 as uuid} from "uuid"
import type {Folder, FolderManageAction} from "@/feature/folder/type.ts";
import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import {toast} from "sonner";


interface AddFolderModalProps {
    action: FolderManageAction;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    setFolders: Dispatch<SetStateAction<Folder[]>>;
    folderId?: string;
}

export function ManageFolderModal({
                                      action,
                                      open,
                                      onOpenChange,
                                      setFolders,
                                      folderId
                                  }: AddFolderModalProps) {
    const [folderName, setFolderName] = useState<string>("");

    const addFolder = async () => {
        const id = uuid();
        const createdAt = Date.now();
        await db.folders.add({
            id,
            folderName,
            createdAt,
        }).then(() => {
            toast.success(`${folderName} 폴더가 생성되었습니다.`);
            setFolders(prev => [...prev, {id, folderName, createdAt}])
        })
    }
    const editFolder = async () => {
        const createdAt = Date.now();
        if(folderId){
            await db.folders.update(folderId,{
                folderName,
                createdAt,
            }).then(() => {
                toast.success(`폴더명이 수정되었습니다.`);
                setFolders(prev =>
                    prev.map(folder =>
                        folder.id === folderId
                            ? { ...folder, folderName, createdAt }
                            : folder
                    )
                );
            }).catch(()=>{
                toast.error(`수정에 실패했습니다.`);
            })
        }else{
            toast.error(`수정에 실패했습니다.`);
        }
    }

    useEffect(() => {
        if(!open) return;

        const init = async () => {
            if (folderId) {
                const loadFolder = async () => {
                    const folder = await db.folders.get(folderId);
                    if (folder) {
                        setFolderName(folder.folderName);
                    } else {
                        toast.error(`폴더 조회에 실패했습니다.`);
                        onOpenChange(false);
                    }
                }
                loadFolder();
            } else {
                setFolderName("");
            }
        }

        init();
    }, [open]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const folderName = formData.get("folderName")?.toString().trim();
        if (folderName) {
            switch (action){
                case "edit":
                    editFolder().then((result) => {
                        console.log(result);
                    })
                    break;
                case "add":
                    addFolder().then((result) => {
                        console.log(result);
                    })
                    break;
            }
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xs sm:max-w-md p-0">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <DialogTitle className="text-base font-semibold">폴더 추가</DialogTitle>
                </div>
                <div className="px-6 py-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FieldGroup>
                            <FieldSet>
                                <Field>
                                    <FieldLabel htmlFor="folder-name">폴더 이름</FieldLabel>
                                    <Input
                                        id="folder-name"
                                        name="folderName"
                                        placeholder="예: 1단원 단어"
                                        value={folderName ?? ""}
                                        onChange={(e) => setFolderName(e.target.value)}
                                        maxLength={15}
                                        required
                                    />
                                </Field>
                            </FieldSet>
                            <div className="flex justify-end gap-2 mt-2">
                                <Button type="submit">저장</Button>
                                <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                                    취소
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

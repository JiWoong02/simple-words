import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog.tsx"
import {Field, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {db} from "@/db.ts";
import { v4 as uuid } from "uuid"
import type {Folder} from "@/feature/folder/type.ts";
import type {Dispatch, SetStateAction} from "react";

interface AddFolderModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    setFolders: Dispatch<SetStateAction<Folder[]>>
}

export function AddFolderModal({
                                  open,
                                  onOpenChange,
                                   setFolders
                              }: AddFolderModalProps) {
    const addFolder = async (name: string) => {
        const id = uuid();
        const createdAt = Date.now();
        await db.folders.add({
            id,
            name,
            createdAt,
        }).then(()=>{
            setFolders(prev => [...prev, { id, name, createdAt }])
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const folderName = formData.get("folderName")?.toString().trim();
        if(folderName){
            addFolder(folderName).then((result) => {
                console.log(result);
            })
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

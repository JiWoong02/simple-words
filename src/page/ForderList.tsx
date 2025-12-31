import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {AddFolderModal} from "@/feature/word/components/AddFolderModal.tsx";
import {useToggle} from "@/hook/useToggle.ts";
import {db} from "@/db.ts";
import {FolderItem} from "@/feature/folder/components/FolderItem.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Fragment, useEffect, useState} from "react";
import type {Folder} from "@/feature/folder/type.ts";

export default function ForderList(){
    const addFolder = useToggle();
    const [folders, setFolders] = useState<Folder[]>([])
    const openFolderModal = () => {
        addFolder.on();
    }

    useEffect(() => {
        const loadFolders = async () => {
            const allFolders = await db.folders.toArray()
            setFolders(allFolders)
        }

        loadFolders()
    }, [])
    return (
        <div className="flex h-full flex-col p-4">

            {/* 스크롤 영역 */}
            <ScrollArea className="max-h-75 pr-2">
                <div className="flex flex-col gap-2">
                    {folders.map((folder, index) => (
                        <Fragment key={folder.id}>
                            <FolderItem folder={folder} />

                            {index < folders.length - 1 && (
                                <Separator />
                            )}
                        </Fragment>
                    ))}
                </div>
            </ScrollArea>

            {/* 하단 고정 영역 */}
            <div className="sticky bottom-0 bg-background pt-4">
                <Button
                    size="lg"
                    variant="default"
                    className="w-full"
                    onClick={openFolderModal}
                >
                    <Plus className="mr-2 h-5 w-5" />
                    폴더 추가
                </Button>
            </div>

            <AddFolderModal open={addFolder.value} onOpenChange={addFolder.set} setFolders={setFolders} />
        </div>
    )
}
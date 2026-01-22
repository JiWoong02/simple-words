import {Button} from "@/components/ui/button.tsx";
import {Folder as FolderIcon, Plus} from "lucide-react";
import {ManageFolderModal} from "@/feature/folder/components/ManageFolderModal.tsx";
import {useToggle} from "@/hook/useToggle.ts";
import {db} from "@/db.ts";
import {FolderManageItem} from "@/feature/folder/components/FolderManageItem.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Fragment, useEffect, useState} from "react";
import type {Folder, FolderManageAction} from "@/feature/folder/type.ts";
import {ContentWithFooter} from "@/layout/ContentWithFooter.tsx";
import {useTitleStore} from "@/store/uiStore.ts";

export default function ManageFolder() {
    const manageFolder = useToggle();
    const [folders, setFolders] = useState<Folder[]>([]);
    const [action, setAction] = useState<FolderManageAction>("add");
    const [selectedFolderId, setSelectedFolderId] = useState<string>("");
    const {setTitle} = useTitleStore();

    const openAddModal = () => {
        setAction("add");
        manageFolder.on();
    }

    const openEditModal = (folderId: string) => {
        setAction("edit");
        setSelectedFolderId(folderId);
        manageFolder.on();
    }

    useEffect(() => {
        setTitle('폴더 관리');
        const loadFolders = async () => {
            const allFolders = await db.folders.toArray()
            setFolders(allFolders)
        }

        loadFolders()
    }, [])
    return (
        <ContentWithFooter
            footer={
                <Button
                    size="lg"
                    variant="default"
                    className="w-full"
                    onClick={openAddModal}
                >
                    <Plus className="mr-2 h-5 w-5"/>
                    폴더 추가
                </Button>
            }
        >
            {folders.length > 0 ? <ScrollArea className="h-full pr-2">
                <div className="flex flex-col gap-2 p-4">
                    {folders.map((folder, index) => (
                        <Fragment key={folder.id}>
                            <FolderManageItem folder={folder} setFolders={setFolders} handleClickEditBtn={openEditModal}/>
                            {index < folders.length - 1 && <Separator/>}
                        </Fragment>
                    ))}
                </div>
            </ScrollArea> : <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-muted-foreground">
                <FolderIcon className="h-12 w-12 opacity-50" />
                <div className="space-y-1">
                    <p className="text-base font-medium text-foreground">
                        아직 등록된 폴더가 없어요
                    </p>
                    <p className="text-sm">
                        아래 버튼을 눌러 첫 폴더를 추가해보세요
                    </p>
                </div>
            </div>
            }
            <ManageFolderModal
                action={action}
                open={manageFolder.value}
                onOpenChange={manageFolder.set}
                setFolders={setFolders}
                folderId={selectedFolderId}
            />
        </ContentWithFooter>

    )
}
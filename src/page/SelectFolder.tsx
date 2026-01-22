import {useTitleStore} from "@/store/uiStore.ts";
import {Fragment, useEffect, useState} from "react";
import {db} from "@/db.ts";
import type {Folder} from "@/feature/folder/type.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Play} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {ContentWithFooter} from "@/layout/ContentWithFooter.tsx";
import {FolderSelectItem} from "@/feature/folder/components/FolderSelectItem.tsx";
import {RadioGroup} from "@/components/ui/radio-group.tsx";

export default function SelectFolder() {
    const {setTitle} = useTitleStore();
    const navigate = useNavigate();
    const [folders, setFolders] = useState<Folder[]>([]);
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

    const handleClickStart = async () => {
        if (!selectedFolderId) {
            toast.error("폴더를 선택해주세요.");
            return;
        }
        const isEmptyFolder = await db.words
            .where("folderId")
            .equals(selectedFolderId)
            .count() === 0;
        if(isEmptyFolder){
            toast.error("단어가 등록되어있지 않은 폴더 입니다. 먼저 단어를 등록해주세요.");
        }else{
            navigate(`/flash-card/${selectedFolderId}`);
        }
    };

    useEffect(() => {
        setTitle('폴더 선택');
        const loadFolders = async () => {
            return await db.folders.toArray();
        }
        loadFolders().then((folders)=>{
            if(folders.length == 0){
                toast.error('등록된 폴더가 없습니다');
                navigate('/');
            }else{
                setFolders(folders);
            }
        })
    }, [])

    return (
        <ContentWithFooter
            footer={
                <Button
                    size="lg"
                    variant="default"
                    className="w-full"
                    onClick={handleClickStart}
                >
                    <Play className="mr-2 h-5 w-5" />
                    시작
                </Button>
            }
        >
            <ScrollArea className="h-full pr-2">
                <RadioGroup
                    value={selectedFolderId ?? ""}
                    onValueChange={setSelectedFolderId}
                    className="flex flex-col gap-2 p-4"
                >
                    {folders.map((folder, index) => (
                        <Fragment key={folder.id}>
                            <FolderSelectItem
                                folder={folder}
                                selected={selectedFolderId === folder.id}
                            />
                            {index < folders.length - 1 && <Separator />}
                        </Fragment>
                    ))}
                </RadioGroup>
            </ScrollArea>
        </ContentWithFooter>
    )
}
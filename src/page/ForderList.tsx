import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {AddFolderModal} from "@/feature/word/components/AddFolderModal.tsx";
import {useToggle} from "@/hook/useToggle.ts";

export default function ForderList(){
    const addFolder = useToggle();
    const openFolderModal = () => {
        addFolder.on();
    }
    return (
        <>
        <div className="flex flex-col gap-2 p-4">

            <div className="mt-4">
                <Button size="lg" variant="default" className="w-full" onClick={openFolderModal}>
                    <Plus className="mr-2 h-5 w-5" />
                    폴더 추가
                </Button>
            </div>
        </div>
            <AddFolderModal open={addFolder.value} onOpenChange={addFolder.set} />
        </>
    )
}
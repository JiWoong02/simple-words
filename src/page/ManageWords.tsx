import {Button} from "@/components/ui/button.tsx";
import {BookOpen, Plus} from "lucide-react";
import {useToggle} from "@/hook/useToggle.ts";
import {db} from "@/db.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Fragment, useEffect, useState} from "react";
import {ContentWithFooter} from "@/layout/ContentWithFooter.tsx";
import type {Word} from "@/feature/word/type.ts";
import {useParams} from "react-router-dom";
import {ManageWordModal, type WordManageAction} from "@/feature/word/components/ManageWordModal.tsx";
import {toast} from "sonner";
import {WordItem} from "@/feature/word/components/WordItem.tsx";
import {useTitleStore} from "@/store/uiStore.ts";

export default function ManageWords() {
    const {folderId} = useParams<{ folderId: string }>();
    const manageWord = useToggle();
    const [words, setWords] = useState<Word[]>([]);
    const [action, setAction] = useState<WordManageAction>("add");
    const [selectedWordId, setSelectedWordId] = useState<string>("");
    const {setTitle} = useTitleStore();
    const openAddModal = () => {
        setAction("add");
        setSelectedWordId("");
        manageWord.on();
    };

    const openEditModal = (wordId: string) => {
        setAction("edit");
        setSelectedWordId(wordId);
        manageWord.on();
    };

    /* 폴더 이름 + 단어 로딩 */
    useEffect(() => {
        if (!folderId) return;

        const loadData = async () => {
            const folder = await db.folders.get(folderId);
            if (!folder) {
                toast.error("폴더를 찾을 수 없습니다.");
                return;
            }

            setTitle(folder.folderName);

            const folderWords = await db.words
                .where("folderId")
                .equals(folderId)
                .toArray();

            setWords(folderWords);
        };

        loadData();
    }, [folderId]);

    if (!folderId) return null;

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
                    단어 추가
                </Button>
            }
        >
            {words.length > 0 ? <ScrollArea className="h-full pr-2">
                <div className="w-full">
                    <div className="flex flex-col gap-2 p-4">
                        {words.map((word, index) => (
                            <Fragment key={word.id}>
                                <WordItem
                                    word={word}
                                    setWords={setWords}
                                    handleClickEditBtn={openEditModal}
                                />
                                {index < words.length - 1 && <Separator/>}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </ScrollArea> : <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-muted-foreground">
                <BookOpen className="h-12 w-12 opacity-50" />

                <div className="space-y-1">
                    <p className="text-base font-medium text-foreground">
                        아직 등록된 단어가 없어요
                    </p>
                    <p className="text-sm">
                        아래 버튼을 눌러 첫 단어를 추가해보세요
                    </p>
                </div>
            </div>}
                <ManageWordModal
                action={action}
                open={manageWord.value}
                onOpenChange={manageWord.set}
                setWords={setWords}
                wordId={selectedWordId}
                folderId={folderId}
            />
        </ContentWithFooter>
    );
}

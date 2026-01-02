import { Pencil, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Word } from "@/feature/word/type";
import type { Dispatch, SetStateAction } from "react";
import { db } from "@/db";
import { toast } from "sonner";
import { useDialogStore } from "@/store/uiStore";
import {truncateText} from "@/util/formatUtil.ts";

type WordItemProps = {
    word: Word;
    setWords: Dispatch<SetStateAction<Word[]>>;
    handleClickEditBtn: (wordId: string) => void;
};

export function WordItem({
                             word,
                             setWords,
                             handleClickEditBtn,
                         }: WordItemProps) {
    const { openConfirm } = useDialogStore();

    const deleteWord = async (id: string) => {
        try {
            await db.words.delete(id);
            setWords(prev => prev.filter(w => w.id !== id));
            toast.success(`"${word.term}" 단어가 삭제되었습니다.`);
        } catch {
            toast.error("단어 삭제 실패");
        }
    };

    const confirmDeleteWord = () => {
        openConfirm(
            "삭제한 단어는 되돌릴 수 없습니다.",
            () => deleteWord(word.id),
            "정말 삭제하시겠습니까?"
        );
    };

    return (
        <div className="flex items-center gap-3 rounded-lg border px-4 py-3 hover:bg-muted transition">
            <div className="flex items-start gap-3 min-w-0 flex-1">
                <BookOpen className="mt-1 h-5 w-5 text-muted-foreground shrink-0" />

                <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-xs flex font-medium truncate">
                            {truncateText(word.term)}
                        </span>

                    {word.meaning && (
                        <span className="flex text-sm text-muted-foreground truncate">
                    {truncateText(word.meaning)}
                </span>
                    )}
                </div>
            </div>

            {/* 오른쪽: 버튼 (절대 줄어들지 않음) */}
            <div className="flex items-center gap-1 shrink-0">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleClickEditBtn(word.id)}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={confirmDeleteWord}
                >
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
            </div>
        </div>

    );
}

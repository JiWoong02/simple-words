import {useEffect, useState} from "react";
import type {Word} from "@/feature/word/type.ts";
import {v4 as uuid} from "uuid"
import {db} from "@/db.ts";
import {toast} from "sonner";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

export type WordManageAction = "add" | "edit";

interface ManageWordModalProps {
    action: WordManageAction;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    setWords: React.Dispatch<React.SetStateAction<Word[]>>;
    wordId?: string;
    folderId: string;
}

export function ManageWordModal({
                                    action,
                                    open,
                                    onOpenChange,
                                    setWords,
                                    wordId,
                                    folderId,
                                }: ManageWordModalProps) {
    const [term, setTerm] = useState("");
    const [reading, setReading] = useState("");
    const [meaning, setMeaning] = useState("");
    const [hint, setHint] = useState("");
    const [stage, setStage] = useState<Word["stage"]>("new");

    /* 단어 추가 */
    const addWord = async () => {
        const id = uuid();
        const word: Word = {
            id,
            term,
            reading: reading || undefined,
            meaning,
            hint: hint || undefined,
            stage,
            folderId,
        };

        await db.words.add(word);
        toast.success("단어가 추가되었습니다.");
        setWords(prev => [...prev, word]);
    };

    /* 단어 수정 */
    const editWord = async () => {
        if (!wordId) {
            toast.error("수정할 단어가 없습니다.");
            return;
        }

        await db.words.update(wordId, {
            term,
            reading: reading || undefined,
            meaning,
            hint: hint || undefined,
            stage,
        });

        toast.success("단어가 수정되었습니다.");
        setWords(prev =>
            prev.map(word =>
                word.id === wordId
                    ? { ...word, term, reading, meaning, hint, stage }
                    : word
            )
        );
    };

    const resetForm = () => {
        setTerm("");
        setReading("");
        setMeaning("");
        setHint("");
        setStage("new");
    };

    /* 수정일 때 기존 데이터 로딩 */
    useEffect(() => {
        if (!open) return;

        const init = async () => {
            if (action === "edit" && wordId) {
                const word = await db.words.get(wordId);

                if (!word) {
                    toast.error("단어를 불러오지 못했습니다.");
                    onOpenChange(false);
                    return;
                }

                setTerm(word.term);
                setReading(word.reading ?? "");
                setMeaning(word.meaning);
                setHint(word.hint ?? "");
                setStage(word.stage ?? "new");
            } else {
                resetForm();
            }
        };

        init();
    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!term || !meaning) {
            toast.error("단어와 의미는 필수입니다.");
            return;
        }

        if (action === "add") addWord();
        if (action === "edit") editWord();

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md p-0">
                <div className="border-b px-6 py-4">
                    <DialogTitle className="text-base font-semibold">
                        {action === "add" ? "단어 추가" : "단어 수정"}
                    </DialogTitle>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 px-6 py-4">
                    {/* 단어 */}
                    <div className="space-y-1.5">
                        <Label htmlFor="term">단어</Label>
                        <Input
                            id="term"
                            placeholder="단어를 입력하세요"
                            maxLength={10}
                            value={term}
                            onChange={e => setTerm(e.target.value)}
                        />
                    </div>

                    {/* 발음 */}
                    <div className="space-y-1.5">
                        <Label htmlFor="reading">발음 (선택)</Label>
                        <Input
                            id="reading"
                            placeholder="발음"
                            maxLength={10}
                            value={reading}
                            onChange={e => setReading(e.target.value)}
                        />
                    </div>

                    {/* 의미 */}
                    <div className="space-y-1.5">
                        <Label htmlFor="meaning">의미</Label>
                        <Input
                            id="meaning"
                            placeholder="의미"
                            maxLength={20}
                            value={meaning}
                            onChange={e => setMeaning(e.target.value)}
                        />
                    </div>

                    {/* 힌트 */}
                    <div className="space-y-1.5">
                        <Label htmlFor="hint">힌트 (선택)</Label>
                        <Textarea
                            id="hint"
                            placeholder="기억을 돕는 힌트를 입력하세요"
                            maxLength={50}
                            rows={4}
                            value={hint}
                            onChange={e => setHint(e.target.value)}
                            className="resize-none"
                        />
                    </div>

                    {/* 버튼 */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="submit">저장</Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            취소
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}


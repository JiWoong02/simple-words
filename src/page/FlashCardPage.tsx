import {db} from "@/db.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Word} from "@/feature/word/type.ts";
import {toast} from "sonner";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function FlashCardPage() {
    const { folderId } = useParams<{ folderId: string }>();
    const navigate = useNavigate();

    const [words, setWords] = useState<Word[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const currentWord = words[currentIndex];


    useEffect(() => {
        if (!folderId) return;

        const loadWords = async () => {
            const result = await db.words
                .where("folderId")
                .equals(folderId)
                .toArray();

            if (result.length === 0) {
                toast.error("해당 폴더에 단어가 없습니다.");
                navigate(-1);
                return;
            }

            setWords(result);
        };

        loadWords();
    }, [folderId, navigate]);


    const handleShowHint = () => {
        if (!currentWord?.hint) {
            toast.info("힌트가 등록되어있지 않습니다.");
            return;
        }
        toast(currentWord.hint);
    };

    const handleCheckAnswer = () => {
        setShowAnswer(prevState => !prevState);
    };

    const updateStageAndNext = async (
        stage: "learning" | "mastered"
    ) => {
        if (!currentWord) return;

        await db.words.update(currentWord.id, { stage });

        setShowAnswer(false);

        if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            toast.success("시험이 끝났습니다 🎉");
            navigate(-1);
        }
    };

    if (!currentWord) return null;

    return (
        <div className="flex h-full flex-col justify-between px-4 py-6">

            <div className="flex flex-1 items-center justify-center">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="py-12">
                        {!showAnswer ? (
                            <span className="text-3xl font-bold">
                                {currentWord.term}
                            </span>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <span className="text-2xl font-semibold">
                                    {currentWord.meaning}
                                </span>
                                {currentWord.reading && (
                                    <span className="text-sm text-muted-foreground">
                                        {currentWord.reading}
                                    </span>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col gap-3">
                {/* 1행: 힌트 보기 */}
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={handleShowHint}
                >
                    힌트 보기
                </Button>

                <div className="grid grid-cols-3 gap-2">
                    <Button
                        size="lg"
                        variant="secondary"
                        onClick={handleCheckAnswer}
                    >
                        {showAnswer ? '문제 확인' : '정답 확인'}
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => updateStageAndNext("learning")}
                    >
                        잘 모르겠어요
                    </Button>

                    <Button
                        size="lg"
                        variant="default"
                        onClick={() => updateStageAndNext("mastered")}
                    >
                        외웠어요
                    </Button>
                </div>
            </div>
        </div>
    );
}
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useTitleStore} from "@/store/uiStore.ts";

export default function Home(){
    const navigate = useNavigate();
    const {setTitle} = useTitleStore();
    const quitApp = () => {
        window.electronAPI.appQuit()
    }

    const handleClickManageWords = () => {
        navigate('/forderList');
    }

    const handleClickFlachCard = () => {
        navigate('/selectFolder')
    }

    useEffect(() => {
        setTitle('Simple Words')
    }, []);

    return (
            <div className="flex flex-col items-center justify-center gap-6 p-10 bg-background text-foreground">
                <div className="flex flex-col gap-4 w-60">
                    <Button size="lg" variant="default" onClick={handleClickManageWords}>
                        단어 등록
                    </Button>
                    <Button size="lg" variant="default" onClick={handleClickFlachCard}>
                        플래시 카드
                    </Button>
                    <Button size="lg" variant="destructive" onClick={quitApp}>
                        종료
                    </Button>
                </div>
            </div>
    )
}
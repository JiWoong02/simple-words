import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    const quitApp = () => {
        window.electronAPI.appQuit()
    }
    const handleClickManageWords = () => {
        navigate('/forderList');
    }


    return (
            <div className="flex flex-col items-center justify-center gap-6 p-10 bg-background text-foreground">
                <div className="flex flex-col gap-4 w-60">
                    <Button size="lg" variant="default" onClick={handleClickManageWords}>
                        단어 관리
                    </Button>
                    <Button size="lg" variant="default">
                        플래시카드
                    </Button>
                    <Button size="lg" variant="destructive" onClick={quitApp}>
                        종료
                    </Button>
                </div>
            </div>
    )
}
import './App.css'
import { Routes, Route } from "react-router-dom"
import MainLayout from "@/layout/MainLayout.tsx";
import Home from "@/page/Home.tsx";
import {SettingsModal} from "@/feature/setting/components/SettingModal.tsx";
import {useToggle} from "@/hook/useToggle.ts";
import {useThemeStore} from "@/feature/setting/store/themeStore.ts";
import {useEffect} from "react";
import ForderList from "@/page/ForderList.tsx";

function App() {
    const settings = useToggle();
    const hydrate = useThemeStore((s) => s.hydrate);
    const hydrated = useThemeStore((s) => s.hydrated);

    useEffect(() => {
        hydrate()
    }, []);

    if(!hydrated){
        return null;
    }
    return (
        <>
            <MainLayout onOpenSettings={settings.on}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/forderList" element={<ForderList />} />
                </Routes>
            </MainLayout>
            <SettingsModal open={settings.value} onOpenChange={settings.set}/>
        </>
    )
}

export default App

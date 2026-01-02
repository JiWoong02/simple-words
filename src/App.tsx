import './App.css'
import { Routes, Route } from "react-router-dom"
import MainLayout from "@/layout/MainLayout.tsx";
import Home from "@/page/Home.tsx";
import {SettingsDialog} from "@/feature/setting/components/SettingDialog.tsx";
import {useToggle} from "@/hook/useToggle.ts";
import {useThemeStore} from "@/feature/setting/store/themeStore.ts";
import {useEffect} from "react";
import ManageForder from "@/page/ManageFolder.tsx";
import {GlobalDialog} from "@/components/GlobalDialog.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import ManageWords from "@/page/ManageWords.tsx";

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
                    <Route path="/forderList" element={<ManageForder />} />
                    <Route path="/folder/:folderId" element={<ManageWords />} />
                </Routes>
            </MainLayout>
            <SettingsDialog open={settings.value} onOpenChange={settings.set}/>
            <GlobalDialog />
            <Toaster position="top-center" duration={1500} />
        </>
    )
}

export default App

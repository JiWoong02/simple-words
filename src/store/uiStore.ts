import {create} from "zustand";

type DialogType = "alert" | "confirm";

interface DialogState {
    open: boolean;
    type: DialogType;
    title?: string;
    message: string;
    onConfirm?: () => void;
    openAlert: (message: string, title?: string) => void;
    openConfirm: (
        message: string,
        onConfirm: () => void,
        title?: string
    ) => void;
    close: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
    open: false,
    type: "alert",
    message: "",
    openAlert: (message, title) =>
        set({ open: true, type: "alert", message, title }),
    openConfirm: (message, onConfirm, title) =>
        set({ open: true, type: "confirm", message, onConfirm, title }),
    close: () => set({ open: false }),
}));

interface TitleState {
    title?: string;
    setTitle: (title: string) => void;
}

export const useTitleStore = create<TitleState>((set) => ({
    title: "Simple Words",
    setTitle: (title) => set({ title }),
}))
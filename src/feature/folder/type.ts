export interface Folder {
    id: string;          // 고유 ID, UUID
    folderName: string;        // 폴더 이름
    createdAt: number;   // 생성 시각 (timestamp)
}

export type FolderManageAction = "add" | "edit";
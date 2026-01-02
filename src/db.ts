// db.ts
import {Dexie, type EntityTable} from "dexie"
import type {Word} from "@/feature/word/type.ts";
import type {Folder} from "@/feature/folder/type.ts";

const db = new Dexie("SimpleWordsDB") as Dexie & {
    words: EntityTable<Word, "id">
    folders: EntityTable<Folder, "id">
}

//2026-01-02 컬럼명 수정
db.version(1)
    .stores({
        folders: "++id, folderName, createdAt",
        words: "++id, term, reading, meaning, stage, folderId, hint",
    })
    // .upgrade(async (tx) => {
    //     const folders = tx.table("folders");
    //
    //     await folders.toCollection().modify(folder => {
    //         folder.folderName = folder.name;
    //         delete folder.name;
    //     });
    // });

export { db }
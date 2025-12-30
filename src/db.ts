// db.ts
import {Dexie, type EntityTable} from "dexie"
import type {Folder, Word} from "@/feature/word/type/type.ts";

const db = new Dexie("StudyKanjiDB") as Dexie & {
    words: EntityTable<Word, "id">
    folders: EntityTable<Folder, "id">
}

// 스키마 선언
db.version(1).stores({
    folders: "++id, name, createdAt",  // Folder 테이블
    words: "++id, term, reading, meaning, stage, folderId" // Word 테이블
})

export type { Word, Folder }
export { db }
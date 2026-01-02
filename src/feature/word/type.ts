export interface Word {
    id: string;          // 고유 ID, UUID나 인덱스
    term: string;        // 단어 (예: 旅行)
    reading?: string;    // 발음 (예: りょこう)
    meaning: string;     // 의미 (예: 여행)
    stage?: 'new' | 'learning' | 'mastered';
    folderId?: string;   // 속한 폴더 ID
    hint?: string;       // 힌트
}

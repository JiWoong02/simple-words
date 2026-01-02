export const formatDate = (timestamp: number) => {
    const date = new Date(timestamp + 9 * 60 * 60 * 1000);
    return date.toISOString().slice(0, 10);
}

export function truncateText(text: string, maxLength = 8): string {
    if (!text) return "";
    return text.length > maxLength
        ? text.slice(0, maxLength) + "..."
        : text;
}